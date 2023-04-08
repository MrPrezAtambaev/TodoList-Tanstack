// import { useFetchTodoById } from "@/services/fetchTodoById";
// import { Title } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import TodoForm, { TodoFormValues } from "../TodoForm";
import { useCreateTodo } from "@/services/createTodo";

type Props = ContextModalProps<{}>;

const CreateTodoModal = ({ context, id, innerProps }: Props) => {
	// const [todo, { isLoading, isError }] = useFetchTodoById({
	// 	id: innerProps.todoId,
	// });

	const [createTodo] = useCreateTodo();

	const handleSubmit = (data: TodoFormValues) => {
		createTodo({ data });
		context.closeModal(id);
	};

	// if (isLoading) return <Title color="red">Loading...</Title>;
	// if (isError) return <Title color="red">Error!!</Title>;
	// if (!todo) return <Title color="red">Not found!!</Title>;

	return (
		<TodoForm
			// defaultValues={{
			// 	title: todo.title,
			// 	completed: todo.completed,
			// }}
			onSubmit={handleSubmit}
		/>
	);
};

export default CreateTodoModal;
