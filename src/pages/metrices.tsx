
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";


import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {useState,useEffect} from "react"

import { useRouter } from "next/router";

import {auth,database} from "@utils/firebase"

import {  ref, child, get } from "firebase/database";


import React from "react";





export default function Home() {
	const router=useRouter()
	const [user,setUser]:any=useState(null)
	const [completedSessions,setCompletedSessions]:any=useState([])
    
	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if(user){
				setUser(user);
				if(completedSessions.length<=0){
					loadData2()

				}
				


			}else{
router.push("/signin")
			}
		});
		return () => unsubscribe();
	  },[user,completedSessions]);
     
	
      const loadData2=async()=>{
        const dbRef = ref(database);
	get(child(dbRef, `UserSessions/`)).then((snapshot)=>{
		if (snapshot.exists()) {


            Object.entries(snapshot.val()).forEach(([key,value]:any)=>{
                
				
                if(user){
                    if(key===user.uid){
						let arr:any=[]

                        Object.entries(value).forEach(([key2,value2]:any)=>{
							
							
							
                            if(value2.endDate!==""){
								console.log(key2);
								
								arr.push(value2)
								// const date = new Date(Date.parse(value2.endDate));
								// const today = new Date();
								// const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
								// const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
								
								
								
								// if (date >= weekStart && date <= weekEnd) {
								  
								  
								  
								// }
								
                            }
                        })
                        arr.reverse()
						setCompletedSessions(arr)
                        
                        
                        
    
                    }
                }
                
              
            })
            
            
            

            
            
            
            
            
            
		  }
	})

    }
	return (
		<>
		
			
			<Container >
				<div className="min-h-screen pt-12">
				<div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead className="p-8">
          <tr className="bg-white text-black border rounded-md">
		  <th className="px-4 border  py-2">Session</th>

            <th className="px-4 border  py-2">Category </th>
            <th className="px-4 border py-2">Start Date</th>
            <th className="px-4 border py-2">End Date</th>
          </tr>
        </thead>
        <tbody>
			{
			completedSessions && completedSessions.length>0 &&  completedSessions.map((item:any)=>{
					return  <tr key={item.id} className="bg-black text-white">
					<td  className="border px-4 text-white py-2">{item.sessionName}</td>

					<td className="border px-4 text-white py-2">{item.category}</td>
					<td className="border px-4  text-white py-2">{item.startDate}</td>
					<td className="border px-4 text-white py-2">{item.endDate}</td>
				  </tr>

				})
			}
          
         
         
        </tbody>
      </table>
    </div>
                </div>
				{/* <ProductsFeatured sectionHeading="text-featured-products" />
				<BannerCard
					key={`banner--key${banner[0].id}`}
					banner={banner[0]}
					className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
				/>
				
				
				<Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" /> */}


			</Container>
			<Divider className="mb-0" />
		</>
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
