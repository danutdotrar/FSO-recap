import { useNotificationDispatch } from "../context/NotificationContext";
import { createNew } from "../services/anecdoteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();

    const { setMessage, clearMessage } = useNotificationDispatch();

    const newAnecdoteMutation = useMutation({
        mutationFn: async (content) => {
            await createNew(content);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
        },
        onError: (error) => {
            setMessage("The anecdote is too short, must have 5 length or more");
            setTimeout(() => {
                clearMessage();
            }, 5000);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        newAnecdoteMutation.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
