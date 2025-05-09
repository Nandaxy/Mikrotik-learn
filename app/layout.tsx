import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const fontSans = Poppins({
	weight: ["400", "500", "600", "700"],
	variable: "--font-sans",
	subsets: ["latin"],
});

const fontMono = Geist_Mono({
	variable: "--font--mono",
	subsets: ["latin"],
});

export const metadata = {
	title: {
		default: "Belajar Mikrotik - Platform Edukasi Mikrotik Secara Gratis",
		template: "%s | Belajar Mikrotik",
	},
	description:
		"Belajar Mikrotik adalah platform edukasi yang membantu Anda memahami dasar-dasar Mikrotik, termasuk konfigurasi, manajemen bandwidth, dan penggunaan routerboard. Dapatkan tutorial yang lengkap dan mudah dipahami untuk Anda mulai belajar Mikrotik.",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-theme="dark">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>

			<body className={`${fontSans.variable} ${fontMono.variable}`}>
				{children}
			</body>
		</html>
	);
}
