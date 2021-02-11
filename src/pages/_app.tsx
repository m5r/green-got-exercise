import App from "next/app";
import Head from "next/head";

import { pageTitle } from "./_document";

class NextApp extends App {
	public render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>{pageTitle}</title>
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}

export default NextApp;
