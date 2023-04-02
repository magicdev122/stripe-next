import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";

const Layout: React.FC = ({ children }) => (
	<div className="flex flex-col min-h-screen">
		<NextSeo
			additionalMetaTags={[
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0",
				},
			]}
			title=" React - React Next E-commerce "
			description="Fastest E-commerce App built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
			canonical="https://google.com"
			openGraph={{
				url: "https://google.com",
				title: " React - React Next E-commerce App",
				description:
					"Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.",
				images: [
					{
						url: "/assets/images/og-image-01.png",
						width: 800,
						height: 600,
						alt: "Og Image Alt",
					},
					{
						url: "/assets/images/og-image-02.png",
						width: 900,
						height: 800,
						alt: "Og Image Alt Second",
					},
				],
			}}
		/>
		<Header />
		<main
			className="relative flex-grow"
			style={{
				minHeight: "-webkit-fill-available",
				WebkitOverflowScrolling: "touch",
			}}
		>
			{children}
		</main>
		<Footer />
		<MobileNavigation />
		<Search />
	</div>
);

export default Layout;
