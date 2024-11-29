const { GraphQLError } = require("graphql");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const jwt = require("jsonwebtoken");
const Person = require("../models/person");
const User = require("../models/user");

// define the resolvers
// the resolvers correspond to the queries described in the schema
const resolvers = {
    Query: {
        personCount: async () => {
            return Person.collection.countDocuments();
        },
        allPersons: async (root, args) => {
            // const byPhone = (person) =>
            //     args.phone === "YES" ? person.phone : !person.phone;

            // return persons.filter(byPhone);

            if (!args.phone) {
                return Person.find({});
            }

            return Person.find({ phone: { $exists: args.phone === "YES" } });
        },
        findPerson: async (root, args) => {
            return Person.findOne({ name: args.name });
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },

    Person: {
        address: (root) => {
            return { city: root.city, street: root.street };
        },
    },

    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator("PERSON_ADDED"),
        },
    },

    Mutation: {
        addPerson: async (root, args, context) => {
            // create new Person with the Person model
            const person = new Person({ ...args });
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError("Not Authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            try {
                // try to save the new person
                await person.save();

                // updated current user list of friends
                currentUser.friends = currentUser.friends.concat(person);
                // save current user
                await currentUser.save();
            } catch (error) {
                throw new GraphQLError("Saving person failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
            // publish a notification about the operation to all subscribers
            pubsub.publish("PERSON_ADDED", { personAdded: person });

            return person;
        },

        editNumber: async (root, args) => {
            // find and update person's phone
            const person = await Person.findOne({ name: args.name });
            person.phone = args.phone;

            // save updated person
            try {
                await person.save();
            } catch (error) {
                throw new GraphQLError("Saving number failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
            return person;
        },

        createUser: async (root, args) => {
            const user = new User({ username: args.username });

            return user.save().catch((error) => {
                throw new GraphQLError("Creating the user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.username,
                        error,
                    },
                });
            });
        },

        login: async (root, args) => {
            // find the user in the mongodb
            const user = await User.findOne({
                username: args.username,
            });

            if (!user || args.password !== "secret") {
                throw new GraphQLError("Wrong credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            // if user exists, create user obj with the info that will be included in the jwt token
            const userForToken = {
                username: user.username,
                id: user._id,
            };

            const token = jwt.sign(userForToken, process.env.JWT_SECRET);

            // create a jwt token with the jwt sign
            return { value: token };
        },

        addAsFriend: async (root, args, { currentUser }) => {
            // check if person is already in the currentUser list of friends
            const isFriend = (person) =>
                currentUser.friends
                    .map((f) => f._id.toString())
                    .includes(person._id.toString());

            if (!currentUser) {
                throw new GraphQLError("wrong credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const person = await Person.findOne({ name: args.name });

            if (!isFriend(person)) {
                currentUser.friends = currentUser.friends.concat(person);
            }

            await currentUser.save();

            return currentUser;
        },
    },
};

module.exports = resolvers;
