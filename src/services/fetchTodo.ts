import { useQuery } from "@tanstack/react-query";
import { Todo } from "../utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";

export type FetchTodoArg = {
	_sort?: keyof Todo;
	_order?: "asc" | "desc";
	q?: string;
	_page?: number;
	_limit?: number;
};

const fetchTodo = async (arg?: FetchTodoArg) => {
	const { data } = await baseAxios.get<Todo[]>("/todos", {
		params: arg,
	});
	return data;
};

// Функция для получения списка todos
export const useFetchTodo = (arg?: FetchTodoArg) => {
	const query = useQuery({
		queryFn: () => fetchTodo(arg),
		queryKey: ["todos", arg],
		initialData: [],
	});

	return [query.data, query] as const;
};
