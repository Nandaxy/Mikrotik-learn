import type React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getDictionary } from "./dictionaries";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
	return [{ lang: "id" }, { lang: "en" }];
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { lang: string };
}>) {
	const { lang } = await params;
	
	const dict = await getDictionary(lang as "id" | "en");

	if (lang !== "id" && lang !== "en") {
		redirect("/id");
	}

	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<div className="flex min-h-screen flex-col">
					<Navbar dict={dict.navbar} lang={lang} />
					<div className="flex-1">{children}</div>
					<Footer dict={dict.footer} lang={lang} />
				</div>
			</ThemeProvider>
		</>
	);
}