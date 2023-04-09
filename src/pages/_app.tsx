import { AppProps } from "next/app";
import Head from "next/head";
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from "@mantine/core";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "@/components/modals";
import { useState } from "react";

declare module "@mantine/modals" {
	export interface MantineModalsOverride {
		modals: typeof modals;
	}
}

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
	return (
		<>
			<Head>
				<title>Todo List</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link
					rel="shortcut icon"
					href="https://www.sketchappsources.com/resources/source-image/sketch-3-todo-list-app-icon-template.png"
					type="image/x-icon"
				/>
			</Head>

			<QueryClientProvider client={queryClient}>
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colorScheme,
						}}
					>
						<ModalsProvider modals={modals}>
							<Component {...pageProps} />
						</ModalsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}
