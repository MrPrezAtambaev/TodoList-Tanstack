import { useFetchTodo } from "@/services/fetchTodo";
import {
	Button,
	Container,
	FocusTrap,
	Group,
	Header,
	List,
	Stack,
	TextInput,
} from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import TodoItem from "@/components/TodoItem";
import { openContextModal } from "@mantine/modals";
import TodoForm from "@/components/TodoForm";
import { useCreateTodo } from "@/services/createTodo";

export default function Home() {
	const [searchText, setSearchText] = useState("");

	const [todos] = useFetchTodo({
		_sort: "created_at",
		_order: "desc",
		q: searchText,
	});

	const [createTodo] = useCreateTodo();

	const openCreateTodoModal = () => {
		openContextModal({
			title: "Создать задачу",
			modal: "createTodo",
			innerProps: {},
		});
	};

	return (
		<>
			<Container>
				<Header height={58} mb={120}>
					<Container>
						<Group py="sm" position="apart">
							<MantineLogo size={34} />
							<TextInput
								icon={<IconSearch />}
								placeholder="..."
								value={searchText}
								onChange={(e) => setSearchText(e.currentTarget.value)}
							/>
							<Button onClick={openCreateTodoModal}>Создать</Button>
						</Group>
					</Container>
				</Header>
				<Stack spacing={10}>
					<TodoForm onSubmit={(values) => createTodo({ data: values })} />
					<List>
						{todos.map((todo) => (
							<List.Item mb="xs" key={todo.id}>
								<TodoItem todo={todo} />
							</List.Item>
						))}
					</List>
				</Stack>
			</Container>
		</>
	);
}
