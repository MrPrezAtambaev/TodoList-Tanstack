import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "@/components/modals";

declare module "@mantine/modals" {
	export interface MantineModalsOverride {
		modals: typeof modals;
	}
}

export default function App(props: AppProps) {
	const { Component, pageProps } = props;
	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<QueryClientProvider client={queryClient}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						/** Put your mantine theme override here */
						colorScheme: "light",
					}}
				>
					<ModalsProvider modals={modals}>
						<Component {...pageProps} />
					</ModalsProvider>
				</MantineProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}
