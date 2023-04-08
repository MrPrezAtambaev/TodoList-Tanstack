import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";

type CreateTodoArg = {
	data: Omit<Todo, "id" | "created_at">;
};

const createTodo = async (arg: CreateTodoArg) => {
	const { data } = await baseAxios.post<Todo>("/todos", {
		...arg.data,
		created_at: Date.now(),
	});
	return data;
};

export const useCreateTodo = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createTodo,
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
