import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./utils";

const materialsDirectory = path.join(process.cwd(), "materials");

export async function getMaterialContent(
	lang: string,
	chapter: string,
	section: string
) {
	const fullPath = path.join(
		materialsDirectory,
		lang,
		`chapter-${chapter}`,
		`section-${section}.md`
	);

	let fileContents = "";
	const metadata = {
		title: "",
		difficulty: "Pemula",
		difficultyEn: "Beginner",
		duration: "30 menit",
		prerequisites: [] as string[],
		relatedMaterials: [] as { title: string; path: string }[],
		tableOfContents: [] as { title: string; id: string }[],
		references: [] as { title: string; url?: string }[],
	};

	try {
		if (!fs.existsSync(fullPath)) {
			throw new Error("File not found");
		}

		fileContents = fs.readFileSync(fullPath, "utf8");
	} catch (error) {
		console.error(`Error reading file: ${fullPath}`, error);

		return {
			content: `## ${
				lang === "id" ? "Materi Tidak Ditemukan" : "Material Not Found"
			}\n\n${
				lang === "id"
					? "Materi yang Anda cari tidak ditemukan. Silakan periksa kembali atau pilih materi lain."
					: "The material you're looking for was not found. Please check again or choose another material."
			}`,
			metadata: {
				...metadata,
				title: lang === "id" ? "Materi Tidak Ditemukan" : "Material Not Found",
				updatedAt: new Date()
					.toLocaleString("id-ID", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					})
					.replace(/\//g, "-"),
			},
		};
	}

	const matterResult = matter(fileContents);

	const readingTime = calculateReadingTime(matterResult.content);

	const processedContent = matterResult.content.replace(
		/^(#{1,6})\s+(.*?)\s+\{#(.*?)\}/gm,
		"$1 $2"
	);

	return {
		content: processedContent,
		metadata: {
			...metadata,
			...matterResult.data,
			duration: readingTime,
			keywords: matterResult.data.keywords || [],
			updatedAt:
				matterResult.data.updatedAt ||
				new Date()
					.toLocaleString("id-ID", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					})
					.replace(/\//g, "-"),
		},
	};
}

export async function getAllMaterialPaths() {
	const languages = ["id", "en"];
	const paths: { lang: string; chapter: string; section: string }[] = [];

	for (const lang of languages) {
		const langDir = path.join(materialsDirectory, lang);

		try {
			if (!fs.existsSync(langDir)) continue;

			const chapters = fs.readdirSync(langDir);

			for (const chapter of chapters) {
				const chapterDir = path.join(langDir, chapter);
				const chapterNum = chapter.replace("chapter-", "");

				if (fs.statSync(chapterDir).isDirectory()) {
					const sections = fs.readdirSync(chapterDir);

					for (const section of sections) {
						if (section.endsWith(".md")) {
							const sectionNum = section
								.replace("section-", "")
								.replace(".md", "");
							paths.push({
								lang,
								chapter: chapterNum,
								section: sectionNum,
							});
						}
					}
				}
			}
		} catch (error) {
			console.error(`Error reading directory: ${langDir}`, error);
		}
	}

	return paths;
}

export async function getMaterialStats(lang = "id") {
	let materialCount = 0;
	let chapterCount = 0;

	try {
		const langDir = path.join(materialsDirectory, lang);
		if (fs.existsSync(langDir)) {
			const chapters = fs.readdirSync(langDir);
			chapterCount = chapters.length;

			for (const chapter of chapters) {
				const chapterDir = path.join(langDir, chapter);
				if (fs.statSync(chapterDir).isDirectory()) {
					const sections = fs.readdirSync(chapterDir);
					materialCount += sections.filter((file) =>
						file.endsWith(".md")
					).length;
				}
			}
		}
	} catch (error) {
		console.error(`Error counting materials: ${error}`);
	}

	return {
		materialCount,
		chapterCount,
	};
}
