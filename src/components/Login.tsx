import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import { Avatar, Group, Image } from "@mantine/core";

const Login = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<Group>
				<label>{session.user?.name}</label>
				<Avatar
					src={session.user?.image}
					size="md"
					radius="xl"
					style={{ cursor: "pointer" }}
				/>
				<IconLogout onClick={() => signOut()} style={{ cursor: "pointer" }} />
			</Group>
		);
	} else {
		return (
			<Group>
				<label>You are not Signed</label>
				<IconLogin onClick={() => signIn()} style={{ cursor: "pointer" }} />
			</Group>
		);
	}
};

export default Login;
