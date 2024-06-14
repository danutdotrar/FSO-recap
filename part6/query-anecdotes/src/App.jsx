import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll } from "./services/anecdoteService";

const App = () => {
    // Get the anecdotes from the backend
    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAll,
        retry: false,
    });

    console.log("result ", result.data);

    const handleVote = (anecdote) => {
        console.log("vote");
    };

    if (result.isPending) {
        return <div>Loading...</div>;
    }

    if (result.isError) {
        return (
            <div>
                Anecdote service not available due to problems in server.{" "}
                {result.error.message}
            </div>
        );
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {result?.data?.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
