import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export async function getTermsContent(lang: string): Promise<string> {
	const filePath = path.join(contentDirectory, lang, "terms.md");
	return fs.readFileSync(filePath, "utf8");
}

export async function getPrivacyContent(lang: string): Promise<string> {
	const filePath = path.join(contentDirectory, lang, "privacy.md");
	return fs.readFileSync(filePath, "utf8");
}
