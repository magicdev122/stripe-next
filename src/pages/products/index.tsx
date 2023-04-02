
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import ProductsFeatured from "@containers/products-featured";


import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
	return (
		<div style={{transform:"translateY(-18px)"}}>
			
			<Container >
				
				<ProductsFeatured sectionHeading="text-featured-products" />
				{/* <BannerCard
					key={`banner--key${banner[0].id}`}
					banner={banner[0]}
					className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
				/> */}
				
				
				{/* <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" /> */}
			</Container>
			<Divider className="mb-0" />
		</div>
	);
}

Home.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
