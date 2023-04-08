import { useDeleteTodo } from "@/services/deleteTodo";
import { useUpdateTodo } from "@/services/updateTodo";
import { Todo } from "@/utils/types/todo";
import { ActionIcon, Anchor, Group, Text } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

type Props = {
	todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
	const [deleteTodo] = useDeleteTodo();
	const [updateTodo] = useUpdateTodo();

	const handleOpenDetails = () => {
		openContextModal({
			modal: "updateTodo",
			innerProps: {
				todoId: todo.id,
			},
		});
	};

	const handleToggle = () => {
		updateTodo({
			id: todo.id,
			data: {
				completed: !todo.completed,
			},
		});
	};
	return (
		<Group align="center">
			<Text
				style={{
					textDecoration: todo.completed ? "line-through" : "auto",
					cursor: "pointer",
				}}
				onClick={handleToggle}
			>
				{todo.title}
			</Text>
			<Group align="center" spacing={5}>
				<ActionIcon
					size="xs"
					variant="light"
					color="red"
					onClick={() => deleteTodo({ id: todo.id })}
				>
					<IconTrash />
				</ActionIcon>
				<ActionIcon size="xs" variant="light" onClick={handleOpenDetails}>
					<IconPencil />
				</ActionIcon>
			</Group>
		</Group>
	);
};

export default TodoItem;
