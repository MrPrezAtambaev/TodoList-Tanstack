import { useFetchTodo } from "@/services/fetchTodo";
import {
	ActionIcon,
	Button,
	Container,
	FocusTrap,
	Group,
	Header,
	List,
	Pagination,
	Stack,
	TextInput,
	useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { IconMoonStars, IconSearch, IconSun } from "@tabler/icons-react";
import TodoItem from "@/components/TodoItem";
import { openContextModal } from "@mantine/modals";
import TodoForm from "@/components/TodoForm";
import { useCreateTodo } from "@/services/createTodo";
import Navbar from "@/components/Header";

export default function Home() {
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);

	const [todos] = useFetchTodo({
		_sort: "created_at",
		_order: "desc",
		q: searchText,
		_page: page,
		_limit: 10,
	});

	const [createTodo] = useCreateTodo();

	//! Dark Theme

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	return (
		<>
			<Container>
				<Navbar />
				<ActionIcon
					variant="outline"
					color={dark ? "yellow" : "blue"}
					onClick={() => toggleColorScheme()}
					title="Toggle color scheme"
				>
					{dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
				</ActionIcon>
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
				<Pagination
					value={page}
					onChange={setPage}
					siblings={1}
					total={20}
					styles={(theme) => ({
						control: {
							"&[data-active]": {
								backgroundImage: theme.fn.gradient({
									from: "green",
									to: "violet",
								}),
							},
						},
					})}
				/>
			</Container>
		</>
	);
}
