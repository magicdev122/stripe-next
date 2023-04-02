
import ProductOverlayCard from "@components/product/product-overlay-card";

import Alert from "@components/ui/alert";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@utils/firebase";
import { useQuery } from "react-query";


interface ProductsProps {
	sectionHeading: string;
	categorySlug?: string;
	className?: string;
	variant?: "left" | "center";
}

const ProductsFeatured: React.FC<ProductsProps> = ({
	
	className = "mb-12 md:mb-14 bg-black text-white xl:mb-16 mt-4",
	variant = "left",
}) => {

	async function fetchData() {
		const snapshot=await getDocs(collection(db,"products"))
		let arr:any=[]
		snapshot.forEach((item:any)=>{
		  arr.push({id:item.id,...item.data()})
	
		})
		
		
		return arr
	  }
	  const { data, isError }:any = useQuery('users', fetchData);
	

	return (
		<div className={className}>
			{/* <SectionHeader
				sectionHeading={sectionHeading}
				categorySlug={categorySlug}
			/> */}
			{isError ? (
				<Alert message={isError?.message} />
			) : (
				<div className=" bg-black pt-5">
					<div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-5 xl:gap-7">
						{data?.map((product:any, idx: number) => (
							<ProductOverlayCard
								key={`product--key${product.id}`}
								product={product}
								variant={variant}
								index={idx}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductsFeatured;
