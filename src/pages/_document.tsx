import React from 'react'

import { ServerStyleSheet } from 'styled-components'

import Document, { Html, Head, Main, NextScript } from 'next/document'

import { theme } from '../styles/theme'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta content={theme.colors.primary} name="theme-color" />
					<link
						href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

MyDocument.getInitialProps = async ctx => {
	const sheet = new ServerStyleSheet()
	const originalRenderPage = ctx.renderPage

	try {
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
			})

		const initialProps = await Document.getInitialProps(ctx)
		return {
			...initialProps,
			styles: (
				<React.Fragment>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</React.Fragment>
			)
		}
	} finally {
		sheet.seal()
	}
}
