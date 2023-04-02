import Container from "@components/ui/container";
import Layout from "@components/layout/layout";


import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Toaster } from 'react-hot-toast'
import {useEffect} from "react"

import { useRouter } from "next/router";

import {auth} from "@utils/firebase"


export default function CheckoutPage() {
	const router=useRouter()

	
	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if(user){
				


			}else{
router.push("/signin")
			}
		});
		return () => unsubscribe();
	  }, []);
	
	return (
		<>
		<Toaster/>
			{/* <PageHeader pageHeader="text-page-checkout" /> */}
			<Container>
				<div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
					<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
						<CheckoutForm />
					</div>
					<div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
						<CheckoutCard />
					</div>
				</div>
				{/* <Subscription /> */}
			</Container>
		</>
	);
}

CheckoutPage.Layout = Layout;

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
