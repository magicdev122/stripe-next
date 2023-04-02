import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { useCart } from "@contexts/cart/cart.context";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import Button from "@components/ui/button";


import { useTranslation } from "next-i18next";
import { toast,Toaster } from "react-hot-toast";
import {useState,useEffect} from "react"

import { useRouter } from "next/router";
import {
	
	collection,
	
	addDoc,
	
  } from "firebase/firestore";
  import { db } from "@utils/firebase";

import {auth} from "@utils/firebase"


interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
}

const CheckoutForm: React.FC = () => {
	const { items } = useCart();
	const router=useRouter()
	const [user,setUser]:any=useState(null)
	
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();
	async function onSubmit(input: CheckoutInputType) {
		updateUser(input);

		
		if(items.length>0){
			items.forEach((item:any)=>{
				try {addDoc(collection(db,"orders"),{
					...item,
					...input,
					email:user.email
				})
					
				} catch (error:any) {
					toast.error(error.message)
					
				}
				
				
			})
			toast.success('Order Placed Successfully')

		}else{
			toast.error("No product found")
		}
		
		
		
		// Router.push(ROUTES.ORDER);
	}

	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if(user){
				setUser(user);


			}else{
router.push("/signin")
			}
		});
		return () => unsubscribe();
	  }, []);
	
	
	return (
		<>
		<Toaster/>
			<h2 className="text-lg md:text-xl xl:text-2xl text-white font-bold text-heading mb-6 xl:mb-8">
				{t("text-shipping-address")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col   lg:flex-row space-y-4  items-center lg:space-y-0">
						<Input
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							errorKey={errors.firstName?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:last-name-required",
							})}
							errorKey={errors.lastName?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div>
					<Input
						labelKey="forms:label-address"
						{...register("address", {
							required: "forms:address-required",
						})}
						errorKey={errors.address?.message}
						variant="solid"
					/>
					<div className="flex flex-col lg:flex-row space-y-4  items-center lg:space-y-0">
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phone", {
								required: "forms:phone-required",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
						/>
{/* <Input
							labelKey="forms:label-city"
							{...register("city")}
							variant="solid"
							className="w-full lg:w-1/2 "
						/> */}
						{/* <Input
							type="email"
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "forms:email-required",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "forms:email-error",
								},
							})}
							errorKey={errors.email?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/> */}
					</div>
					{/* <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						

						<Input
							labelKey="forms:label-postcode"
							{...register("zipCode")}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
						/>
					</div> */}
					{/* <div className="relative flex items-center ">
						<CheckBox labelKey="forms:label-save-information" />
					</div>
					<TextArea
						labelKey="forms:label-order-notes"
						{...register("note")}
						placeholderKey="forms:placeholder-order-notes"
						className="relative pt-3 xl:pt-6"
					/> */}
					<div className="flex w-full">
						<Button
							className="w-full sm:w-auto"
							loading={isLoading}
							disabled={isLoading}
							
						>
							{t("common:button-place-order")}
						</Button>
					</div>
				</div>
			</form>
		</>
	);
};

export default CheckoutForm;
