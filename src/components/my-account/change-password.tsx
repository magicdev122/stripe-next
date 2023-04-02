import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { auth } from "@utils/firebase";
import {sendPasswordResetEmail} from "firebase/auth"
import {toast,Toaster} from "react-hot-toast"
import {
	useChangePasswordMutation,
	ChangePasswordInputType,
} from "@framework/customer/use-change-password";
import { useTranslation } from "next-i18next";

const defaultValues = {
	oldPassword: "",
	newPassword: "",
};


const ChangePassword: React.FC = () => {
	const { isLoading } = useChangePasswordMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ChangePasswordInputType>({
		defaultValues,
	});
	async function onSubmit(input: ChangePasswordInputType) {
		await sendPasswordResetEmail(auth,input.newPassword).then(()=>{
			toast.success("check your email to reset password")
		})
		
		
	}
	const { t } = useTranslation();
	return (
		<>
		<Toaster/>
			<h2 className="text-white text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("common:text-change-password")}
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex  h-full lg:w-8/12 flex-col`}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full mx-auto flex flex-col justify-center "
				>
					<div className="text-white flex flex-col space-y-3">
						
						<PasswordInput
							labelKey="forms:Enter-Email"
							errorKey={errors.newPassword?.message}
							{...register("newPassword", {
								required: "forms:Enter-Email",
							})}
							className="mb-4"
						/>

						<div className="relative">
							<Button
								type="submit"
								loading={isLoading}
								disabled={isLoading}
								className="h-13 mt-3"
							>
								{t("common:text-change-password")}
							</Button>
						</div>
					</div>
				</form>
			</motion.div>
		</>
	);
};

export default ChangePassword;
