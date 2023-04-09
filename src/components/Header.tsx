import { Button, Container, Group, Header, TextInput } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { openContextModal } from "@mantine/modals";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";

const Navbar = () => {
	const [searchText, setSearchText] = useState("");

	const openCreateTodoModal = () => {
		openContextModal({
			title: "Создать задачу",
			modal: "createTodo",
			innerProps: {},
		});
	};

	return (
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
	);
};

export default Navbar;
