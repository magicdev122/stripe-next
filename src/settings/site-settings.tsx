import { ILFlag } from "@components/icons/ILFlag";
import { SAFlag } from "@components/icons/SAFlag";
import { CNFlag } from "@components/icons/CNFlag";
import { USFlag } from "@components/icons/USFlag";
import { DEFlag } from "@components/icons/DEFlag";
import { ESFlag } from "@components/icons/ESFlag";
export const siteSettings = {
	name: "AlmaFit",
	description:
		"Fastest AlmaFit app built with React, NextJS, TypeScript, React-Query and Tailwind CSS.",
	author: {
		name: "AlmaFit",
		websiteUrl: "https://",
		address: "",
	},
	logo: {
		url: "/assets/images/logo.png",
		alt: "Loho",
		href: "/",
		width: 100,
		height: 62,
	},
	defaultLanguage: "en",
	currencyCode: "USD",
	site_header: {
		menu: [
			
			{
				id: 11,
				path: "/",
				label: "Home",
				
			},
			{
				id: 1,
				path: "/products",
				label: "products",
			},
			{
				id: 12,
				path: "/contact-us",
				label: "menu-contact-us",
				
			},
			{
				id: 13,
				path: "/Subscription",
				label: "subscribe",
				
			},
			
			
			
			{
				id: 2,
				path: "/checkout",
				label: "menu-checkout",
			},
			{
				id: 10,
				path: "/metrices",
				label: "metrices",
				
			},
			{
				id: 3,
				path: "/my-account/orders",
				label: "menu-order",
			},
			
		],
		mobileMenu: [
			{
				id: 12,
				path: "/contact-us",
				label: "menu-contact-us",
				
			},
			{
				id: 13,
				path: "/Subscription",
				label: "subscribe",
				
			},
			{
				id: 10,
				path: "/metrices",
				label: "metrices",
				
			},
			{
				id: 11,
				path: "/",
				label: "Home",
				
			},
			{
				id: 1,
				path: "/products",
				label: "products",
			},
			
		
			
			{
						id: 4,
						path: "/contact-us",
						label: "menu-contact-us",
					},
					{
						id: 3,
						path: "/checkout",
						label: "menu-checkout",
					},
					{
						id: 2,
						path: "/my-account/orders",
						label: "menu-order",
					},
		],
		languageMenu: [
			{
				id: "ar",
				name: "عربى - AR",
				value: "ar",
				icon: <SAFlag width="20px" height="15px" />,
			},
			{
				id: "zh",
				name: "中国人 - ZH",
				value: "zh",
				icon: <CNFlag width="20px" height="15px" />,
			},
			{
				id: "en",
				name: "English - EN",
				value: "en",
				icon: <USFlag width="20px" height="15px" />,
			},
			{
				id: "de",
				name: "Deutsch - DE",
				value: "de",
				icon: <DEFlag width="20px" height="15px" />,
			},
			{
				id: "he",
				name: "rעברית - HE",
				value: "he",
				icon: <ILFlag width="20px" height="15px" />,
			},
			{
				id: "es",
				name: "Español - ES",
				value: "es",
				icon: <ESFlag width="20px" height="15px" />,
			},
		],
	},
};
