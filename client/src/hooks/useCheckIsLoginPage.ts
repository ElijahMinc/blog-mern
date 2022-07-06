import { useLocation } from "react-router-dom";

export const useCheckIsLoginPage = () => {
   const location = useLocation();

   const isLoginPage = location?.pathname.substring(1) === 'login'


   return isLoginPage
}