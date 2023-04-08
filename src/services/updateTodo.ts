import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";

type UpdateTodoArg = {
	id: string; // assuming id is the unique identifier for a todo
	data: Partial<Omit<Todo, "id">>; // assuming Todo is the type for your todo data
};

const updateTodo = async (arg: UpdateTodoArg) => {
	const { data } = await baseAxios.patch(`/todos/${arg.id}`, arg.data); // assuming you have an endpoint like /todos/:id to update a specific todo
	return data;
};

// Функция для обновления todo
export const useUpdateTodo = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: updateTodo,
		onSettled() {
			queryClient.invalidateQueries({
				predicate(query) {
					return query.queryKey?.[0] === "todos";
				},
			});
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};
