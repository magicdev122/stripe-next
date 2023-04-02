import React, { useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";




import { useCart } from "@contexts/cart/cart.context";



import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";


const productGalleryCarouselResponsive = {
	"768": {
		slidesPerView: 2,
	},
	"0": {
		slidesPerView: 1,
	},
};

const ProductSingleDetails: React.FC<{data:any,isLoading:any}> = ({data,isLoading}:any) => {
	data=data?data[0]:""
	
	
	const { width } = useWindowSize();
	
	const { addItemToCart } = useCart();
	
	const [quantity, setQuantity] = useState(1);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	
	if (isLoading) return <p>Loading...</p>;
	

	

	function addToCart() {
		
		// to show btn feedback while product carting
		setAddToCartLoader(true);
		setTimeout(() => {
			setAddToCartLoader(false);
		}, 600);

		const item = data;
		addItemToCart(item, quantity);
		
		
		toast("Added to the bag", {
			type: "dark",
			progressClassName: "fancy-progress-bar",
			position: width > 768 ? "bottom-right" : "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
		
	}



	return (
		<div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
			{width < 1025 ? (
				<Carousel
					pagination={{
						clickable: true,
					}}
					breakpoints={productGalleryCarouselResponsive}
					className="product-gallery"
					buttonClassName="hidden"
				>
					{data?.images?.map((item:any, index: number) => (
						<SwiperSlide key={`product-gallery-key-${index}`}>
							<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
								<img
									src={
										item
									}
									alt={`${data?.name}--${index}`}
									className="object-cover w-full"
								/>
							</div>
						</SwiperSlide>
					))}
				</Carousel>
			) : (
				<div className="col-span-5 grid grid-cols-2 gap-2.5">
					{data?.images?.map((item:any, index: number) => (
						<div
							key={index}
							className="col-span-1 transition duration-150 ease-in hover:opacity-90"
						>
							<img
								src={
									item
								}
								alt={`${data?.name}--${index}`}
								className="object-cover w-full"
							/>
						</div>
					))}
				</div>
			)}

			<div className="col-span-4 pt-8 lg:pt-0">
				<div className="pb-7 mb-7 border-b  text-white border-gray-300">
					<h2 className="text-heading text-white text-lg md:text-xl text-white lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{data?.name}
					</h2>
					<p className=" text-white text-body  text-sm lg:text-base  leading-6 lg:leading-8">
						{data?.description}
					</p>
					<div className="flex items-center justify-between mt-5">
						<div className="text-heading  text-white text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							price : {data.price}$
						</div>
						{/* <div className="text-heading  text-white text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							Stock : {data.initialStock}
						</div> */}
						
					</div>
				</div>

				<div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b text-white border-gray-300 py-8">
					<Counter
						quantity={quantity}
						onIncrement={() => setQuantity((prev) => prev + 1)}
						onDecrement={() =>
							setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
						}
						disableDecrement={quantity === 1}
					/>
					<Button
						onClick={addToCart}
						variant="slim"
						className={`w-full md:w-6/12 xl:w-full`}
						
						loading={addToCartLoader}
					>
						<span className="py-2 3xl:px-8">Add to cart</span>
					</Button>
				</div>
				<div className="py-6">
					<ul className="text-sm space-y-5 pb-1">
						
						<li>
							<span className="font-semibold text-white text-heading inline-block pe-2">
								Category:
							</span>
							<Link
								href="#"
								className="transition  text-white hover:underline hover:text-heading"
							>
								{data?.category}
							</Link>
						</li>
						
					</ul>
				</div>

				{/* <ProductMetaReview data={data}/> */}
			</div>
		</div>
	);
};

export default ProductSingleDetails;
