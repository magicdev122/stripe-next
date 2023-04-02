type FooterItemProps = {
	id: string;
	name: string;
	price: string;
};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
	item,
}) => {
	return (
		<div className="flex items-center text-white py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
			{item.name}
			<span className="ms-auto text-white flex-shrink-0">{item.price}</span>
		</div>
	);
};
