import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";

import { useWindowSize } from "@utils/use-window-size";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@utils/firebase";
import { useTranslation } from "next-i18next";
import {useEffect,useState} from "react"
import {auth} from "@utils/firebase"
import { useRouter } from "next/router";
const OrdersTable: React.FC = () => {
	const router=useRouter()
	const { width } = useWindowSize();
	const { t } = useTranslation("common");
	const[orders,setOrders]:any=useState([])

	const loadData=async()=>{
		let arr: any = [];
		const data = await getDocs(collection(db, "orders"));
		data.forEach((doc: any) => {
			if(user){
				if(user.email===doc.data().email){
					arr.push({...doc.data(),id:doc.id})
		
				  }
			}
		  
		  
		});
		setOrders(arr)
		
		
	}

const [user,setUser]:any=useState(null)
	
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
	  useEffect(()=>{
		if(orders.length==0){
			loadData()

		}
	})
	return (
		<>
			<h2 className="text-lg text-white md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-orders")}
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex flex-col`}
			>
				{width >= 1025 ? (
					<table>
						<thead className="text-sm lg:text-base">
							
							<tr>
							<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("text-product")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									{t("text-total")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
									{t("quantity")}
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
									{t("text-shipping-address")}
								</th>
							</tr>
						</thead>
						<tbody className="text-sm lg:text-base">
							{orders.map((item:any)=>{
								
							return	<tr key={item.id} className="border-b text-white border-gray-300 last:border-b-0">
								
								<td className="text-start lg:text-center  text-white px-4 py-5 text-heading">
									{item.name}
								</td>
								<td className="text-start lg:text-center text-white px-4 py-5 text-heading">
									{item.itemTotal}
								</td>
								<td className="text-start lg:text-center text-white px-4 py-5 text-heading">
									{item.quantity}
								</td>
								<td className="text-start lg:text-center text-white px-4 py-5 text-heading">
									{item.address}
								</td>
							
							</tr>
							})}
							
						
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
						{
							orders.map((item:any)=>{
								return <ul className="text-sm text-white font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
							
								<li className="flex items-center  text-white justify-between">
									{t("text-product")}
									<span className="font-normal">{item.name}</span>
								</li>
								<li className="flex items-center  text-white justify-between">
									{t("text-total")}
									<span className="font-normal">{item.itemTotal}$</span>
								</li>
								<li className="flex items-center text-white  justify-between">
									{t("quantity")}
									<span className="font-normal">{item.quantity}</span>
								</li>
								<li className="flex items-center text-white justify-between">
									{t("text-shipping-address")}
									<span className="font-normal">
										{item.address}
									</span>
								</li>
							</ul>

							})
						}
						
						
					</div>
				)}
			</motion.div>
		</>
	);
};

export default OrdersTable;
