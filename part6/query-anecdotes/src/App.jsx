import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, updateAnecdote } from "./services/anecdoteService";
import { useNotificationDispatch } from "./context/NotificationContext";

const App = () => {
    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAll,
        retry: false,
    });

    const queryClient = useQueryClient();

    const updateAnecdoteMutation = useMutation({
        mutationFn: async (anecdote) => {
            const response = await updateAnecdote(anecdote);
            return response;
        },
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ["anecdotes"] });

            // manually invalidate the queryKey
            queryClient.setQueryData(["anecdotes"], (oldData) => {
                if (!oldData) return [];

                return oldData.map((item) =>
                    item.id === data.id ? data : item
                );
            });
        },
    });

    const { setMessage, clearMessage } = useNotificationDispatch();

    const handleVote = (anecdote) => {
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

        updateAnecdoteMutation.mutate(updatedAnecdote);

        const messageForNotification = `anecdote "${updatedAnecdote.content}" voted`;

        // dispatchMessage({
        //     type: "SET_MESSAGE",
        //     payload: messageForNotification,
        // });
        setMessage(messageForNotification);

        setTimeout(() => {
            clearMessage();
        }, 5000);
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
