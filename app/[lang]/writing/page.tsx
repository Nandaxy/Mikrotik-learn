import { getDictionary } from "../dictionaries";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FileText, GitPullRequest, Type, MessageSquare } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { lang: string };
}): Promise<Metadata> {
	const { lang } = await params;
	const dict = await getDictionary(lang as "id" | "en");

	return {
		title: dict.writing.metadata?.title || dict.writing.title,
		description: dict.writing.metadata?.description || dict.writing.intro,
	};
}

export default async function WritingPage({
	params,
}: {
	params: { lang: string };
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang as "id" | "en");
	const { writing } = dict;

	const guidelineIcons = [
		<FileText key="filetext" className="h-8 w-8 text-primary" />,
		<Type key="type" className="h-8 w-8 text-primary" />,
		<GitPullRequest key="gitpullrequest" className="h-8 w-8 text-primary" />,
		<MessageSquare key="messagesquare" className="h-8 w-8 text-primary" />,
	];

	return (
		<div className="container py-12 md:py-16 lg:py-24">
			<div className="mx-auto max-w-4xl space-y-8">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						{writing.title}
					</h1>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
						{writing.intro}
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{writing.guidelines.map((guideline, index) => (
						<Card key={index} className="h-full">
							<CardHeader>
								<div className="mb-2">{guidelineIcons[index]}</div>
								<CardTitle>{guideline.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									{guideline.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h2 className="mb-4 text-xl font-semibold">
						Contoh Format Penulisan
					</h2>
					<pre className="rounded-md bg-muted p-4 overflow-x-auto">
						<code>{`---
title: Apa itu Mikrotik?
difficulty: Pemula
difficultyEn: Beginner
prerequisites:
  - Pengetahuan dasar jaringan komputer
  - Pemahaman dasar IP Address
relatedMaterials:
  - title: Perangkat Mikrotik dan RouterOS
    path: /id/materials/1/2
  - title: Kelebihan dan Kekurangan Mikrotik
    path: /id/materials/1/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Apa itu Mikrotik?
    id: apa-itu-mikrotik
  - title: Sejarah Mikrotik
    id: sejarah-mikrotik
  - title: Fitur Utama
    id: fitur-utama
  - title: Kesimpulan
    id: kesimpulan
references:
---

## Pendahuluan {#pendahuluan}


Pada era digital saat ini, setiap organisasi dan individu membutuhkan jaringan komputer yang handal untuk berkomunikasi dan bertukar data. Dalam membangun jaringan tersebut, diperlukan perangkat-perangkat khusus seperti router, switch, dan access point. **MikroTik** adalah salah satu penyedia solusi jaringan yang populer, khususnya dalam dunia router dan perangkat jaringan lainnya. Materi ini akan membahas secara sederhana tentang apa itu MikroTik, sejarah singkatnya, serta fitur-fitur utamanya agar mudah dipahami oleh pemula.`}</code>
					</pre>
				</div>
			</div>
		</div>
	);
}
