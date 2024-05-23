const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
    console.log("state: ", state);
    console.log("action: ", action);

    switch (action.type) {
        case "VOTE_ANECDOTE":
            // find the anecdote we need to update in the state based on payload id
            const anecdoteToUpdate = state.find(
                (item) => item.id === action.payload.id
            );

            // create a copy based on anecdote and update votes + 1
            const changedAnecdote = {
                ...anecdoteToUpdate,
                votes: anecdoteToUpdate.votes + 1,
            };

            // map over the state and for the items with id !== anecdote id, leave them alone
            //  for the item with id == action.payload.id, replace with changed object
            return state.map((item) =>
                item.id !== action.payload.id ? item : changedAnecdote
            );

        default:
            return state;
    }
};

export const voteAnecdote = (id) => {
    return {
        type: "VOTE_ANECDOTE",
        payload: {
            id: id,
        },
    };
};

export default reducer;
