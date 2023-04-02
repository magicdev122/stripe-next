import Container from "@components/ui/container";
import Layout from "@components/layout/layout";

import ProductSingleDetails from "@components/product/product-single-details";

import Divider from "@components/ui/divider";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@utils/firebase";
import { useQuery } from "react-query";
import { useRouter } from 'next/router';
import { useEffect } from "react";


export default function ProductPage() {
	const { data, isLoading }:any = useQuery('users', fetchData);


	const router = useRouter();
	const { slug } = router.query;
  
	async function fetchData() {
		const snapshot=await getDocs(collection(db,"products"))
		let arr:any=[]
		snapshot.forEach((item:any)=>{
			if(item.id===slug){
				arr.push({id:item.id,...item.data()})

			}
	
		})
		
		
		return arr
	  }
	  const loadData=async()=>{

	  }
	useEffect(()=>{
		loadData()
	})
	return (
		<>
			<Divider className="mb-0" />
			<Container>
				{/* <div className="pt-8">
					<Breadcrumb />
				</div> */}
				<ProductSingleDetails  data={data} isLoading={isLoading} />
				
				{/* <Subscription /> */}
			</Container>
		</>
	);
}

ProductPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => {
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
