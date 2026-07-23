import Image from "next/image";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile, featuredHighlightIds, itemById } from "@/content/data";
import ProfilePicture from "../../public/images/profile.jpg";
import FadeIn from "@/components/motion/FadeIn";
import Button from "@/components/ui/Button";
import StatStrip from "@/components/StatStrip";
import SectionPreview from "@/components/SectionPreview";
import PortfolioItemView from "@/components/PortfolioItemView";
import Footer from "@/components/Footer";

export default function Home() {
	const highlights = featuredHighlightIds
		.map((id) => itemById(id))
		.filter((i): i is NonNullable<typeof i> => Boolean(i));

	return (
		<>
			<main className="mx-auto max-w-5xl px-5 sm:px-8">
				{/* Hero */}
				<section className="relative pb-14 pt-16 sm:pt-24">
					{/* soft amber accent shape */}
					<div
						aria-hidden
						className="pointer-events-none absolute -right-10 -top-10 -z-10 h-64 w-64 rounded-full bg-accent-soft blur-3xl"
					/>
					<div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
						<FadeIn onView={false} y={20} className="min-w-0 flex-1">
							<h1 className="font-serif text-5xl font-semibold leading-tight text-ink sm:text-6xl">
								{profile.name}
							</h1>
							<p className="mt-4 text-balance text-xl text-muted sm:text-2xl">
								{profile.tagline}
							</p>
							<p className="mt-2 text-base text-muted">{profile.positioning}</p>
							<div className="mt-7 flex flex-wrap gap-3">
								<Button href="/resume" variant="primary">
									Résumé
								</Button>
								<Button href={`https://github.com/${profile.github}`} variant="ghost" external>
									<FiGithub className="h-4 w-4" />
									GitHub
								</Button>
								<Button href={`https://linkedin.com/in/${profile.linkedin}`} variant="ghost" external>
									<FiLinkedin className="h-4 w-4" />
									LinkedIn
								</Button>
								<Button href={`mailto:${profile.email}`} variant="ghost" external>
									<FiMail className="h-4 w-4" />
									Email
								</Button>
							</div>
						</FadeIn>
						<FadeIn
							onView={false}
							y={20}
							delay={0.1}
							className="mx-auto w-full max-w-[240px] shrink-0 md:mx-0 md:w-[300px] md:max-w-none"
						>
							<div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-lift">
								<Image
									src={ProfilePicture}
									alt={`Portrait of ${profile.name}`}
									fill
									priority
									placeholder="blur"
									sizes="(min-width: 768px) 300px, 240px"
									className="object-cover"
								/>
							</div>
						</FadeIn>
					</div>
				</section>

				{/* Intro blurb */}
				<FadeIn className="border-t border-border py-12">
					<p className="max-w-3xl text-lg leading-relaxed text-ink">{profile.intro}</p>
				</FadeIn>

				{/* Stat strip */}
				<FadeIn className="py-2">
					<StatStrip />
				</FadeIn>

				{/* Section previews */}
				<section className="py-14">
					<FadeIn>
						<h2 className="font-serif text-2xl font-semibold text-ink">Explore</h2>
						<p className="mt-1 text-muted">A quick map of what I get up to — open any area for the full story.</p>
					</FadeIn>
					<FadeIn className="mt-6">
						<SectionPreview />
					</FadeIn>
				</section>

				{/* Featured highlights */}
				<section className="border-t border-border py-14">
					<FadeIn>
						<h2 className="font-serif text-2xl font-semibold text-ink">A few highlights</h2>
					</FadeIn>
					<div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
						{highlights.map((item, i) => (
							<FadeIn key={item.id} delay={i * 0.08}>
								<PortfolioItemView item={item} />
							</FadeIn>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
