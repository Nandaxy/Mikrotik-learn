import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "./dictionaries";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Router, Network, Zap, Users, Clock, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getMaterialStats } from "@/lib/materials";

export default async function Home({ params }: { params: { lang: string } }) {
	const { lang } = await params;

	const dict = await getDictionary(lang as "id" | "en");
	const { home } = dict;

	const { materialCount, chapterCount } = await getMaterialStats(
		lang as "id" | "en"
	);

	const featureIcons = [
		<Network key="network" className="h-10 w-10 text-primary" />,
		<Zap key="zap" className="h-10 w-10 text-primary" />,
		<Router key="router" className="h-10 w-10 text-primary" />,
		<Users key="users" className="h-10 w-10 text-primary" />,
	];

	const stats = [
		{
			value: "10K+",
			label: home.stats[0].label,
		},
		{
			value: materialCount.toString(),
			label: home.stats[1].label,
		},
		{
			value: chapterCount.toString(),
			label: "Bab",
		},
		{
			value: "24/7",
			label: home.stats[3].label,
		},
	];

	return (
		<div className="flex flex-col items-center">
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-40">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<Badge className="mb-2">{home.newBadge}</Badge>
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									{home.title}
								</h1>
								<p className="max-w-[600px] text-muted-foreground md:text-xl">
									{home.tagline}
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link href={`/${lang}/materials`}>
									<Button size="lg" className="w-full min-[400px]:w-auto">
										{home.cta}
									</Button>
								</Link>
								<Link href={`/${lang}/about`}>
									<Button
										size="lg"
										variant="outline"
										className="w-full min-[400px]:w-auto"
									>
										{home.secondaryCta}
									</Button>
								</Link>
							</div>
						</div>
						<div className="flex items-center justify-center">
							<Image
								src="/image/Landing-cat.png"
								width={600}
								height={400}
								alt="Mikrotik Router Illustration"
								className="rounded-lg object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="w-full py-12 md:py-24 border-y bg-muted/30">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-16">
						{stats.map((stat, index) => (
							<div
								key={index}
								className="flex flex-col items-center justify-center text-center"
							>
								<div className="text-3xl font-bold md:text-4xl lg:text-5xl">
									{stat.value}
								</div>
								<div className="mt-1 text-sm font-medium text-muted-foreground md:text-base">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								{home.featuresTitle}
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								{home.featuresSubtitle}
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
						{home.features.map((feature, index) => (
							<Card key={index} className="h-full">
								<CardHeader>
									<div className="mb-2">{featureIcons[index]}</div>
									<CardTitle>{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Popular Materials Section */}
			<section className="w-full py-12 md:py-24 bg-muted/50">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								{home.popularTitle}
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								{home.popularSubtitle}
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
						{home.popularMaterials.map((material, index) => (
							<Card key={index} className="h-full">
								<CardHeader className="pb-4">
									<div className="flex items-center gap-2">
										<Badge
											variant={
												material.level === "Pemula"
													? "default"
													: material.level === "Menengah"
													? "secondary"
													: "outline"
											}
										>
											{material.level}
										</Badge>
										<div className="flex items-center text-sm text-muted-foreground">
											<Clock className="mr-1 h-3 w-3" />
											{material.duration}
										</div>
									</div>
									<CardTitle className="line-clamp-2">
										{material.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="line-clamp-3 text-base">
										{material.description}
									</CardDescription>
									<Link
										href={`/${lang}/materials/${material.path}`}
										className="mt-4 inline-flex items-center text-sm font-medium text-primary"
									>
										{home.readMore} <ArrowRight className="ml-1 h-4 w-4" />
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="flex justify-center mt-8">
						<Link href={`/${lang}/materials`}>
							<Button variant="outline" size="lg">
								{home.viewAllMaterials}
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								{home.testimonialsTitle}
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								{home.testimonialsSubtitle}
							</p>
						</div>
					</div>
					<div className="mx-auto max-w-5xl py-12">
						<Tabs defaultValue="tab1" className="w-full">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="tab1">
									{home.testimonials[0].name}
								</TabsTrigger>
								<TabsTrigger value="tab2">
									{home.testimonials[1].name}
								</TabsTrigger>
								<TabsTrigger value="tab3">
									{home.testimonials[2].name}
								</TabsTrigger>
							</TabsList>
							{home.testimonials.map((testimonial, index) => (
								<TabsContent
									key={index}
									value={`tab${index + 1}`}
									className="mt-6 space-y-4"
								>
									<div className="flex flex-col items-center space-y-4 text-center">
										<Avatar className="h-20 w-20">
											<AvatarImage
												src={`/placeholder.svg?height=80&width=80`}
												alt={testimonial.name}
											/>
											<AvatarFallback>
												{testimonial.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="text-lg font-bold">
												{testimonial.name}
											</div>
											<div className="text-sm text-muted-foreground">
												{testimonial.role}
											</div>
										</div>
										<div className="max-w-3xl text-lg italic">
											"{testimonial.quote}"
										</div>
									</div>
								</TabsContent>
							))}
						</Tabs>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								{home.ctaTitle}
							</h2>
							<p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								{home.ctaSubtitle}
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Link href={`/${lang}/materials`}>
								<Button
									size="lg"
									variant="secondary"
									className="w-full min-[400px]:w-auto"
								>
									{home.ctaButton}
								</Button>
							</Link>
							<Link href={`/${lang}/contact`}>
								<Button
									size="lg"
									variant="outline"
									className="w-full min-[400px]:w-auto border-primary-foreground text-primary hover:bg-primary-foreground hover:opacity-80"
								>
									{home.ctaSecondaryButton}
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
