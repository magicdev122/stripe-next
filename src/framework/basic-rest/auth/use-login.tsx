import { useUI } from "@contexts/ui.context";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import {auth} from "@utils/firebase"
import {signInWithEmailAndPassword} from "firebase/auth"
import { toast } from 'react-hot-toast'

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  let token:any;
  await signInWithEmailAndPassword(auth,input.email,input.password).then((user:any)=>{
    
    
      token=`${input.email}.${input.remember_me}.${user.user.uid}`.split("").reverse().join("")
    
    

  }).catch((error:any)=>{
    toast.error(error.message)
    console.log(error)
    return
  })
  return token
  




  
}
export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data:any) => {
      
      
      Cookies.set("auth_token", data.token);
      authorize();
      closeModal();
      window.location.href="/"
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
