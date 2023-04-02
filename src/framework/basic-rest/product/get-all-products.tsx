
import {useEffect} from 'react'
import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";

import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
import {db} from "@utils/firebase"
import { collection, getDocs } from 'firebase/firestore';

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	let data:any=[];

	const getData=async()=>{
		const snapshot=await getDocs(collection(db,"products"))
		snapshot.forEach((item:any)=>{
			data.push(item.data())
		})
			
	}
	useEffect(()=>{
		getData()
	})
	return {
		data: shuffle(data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	);
};

export { useProductsQuery, fetchProducts };
