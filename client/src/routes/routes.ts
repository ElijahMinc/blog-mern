import { RouteProps } from "react-router-dom";
import { AuthForm } from "@components/Common/Form/AuthForm/AuthForm";
import { Home } from "@pages/Home";
import { Post } from "@pages/Post";

export const publicRoutes: RouteProps[] = [
   {
      path: '/login',
      component: AuthForm,
      exact: true,
   },
   {
      path: '/register',
      component: AuthForm,
      exact: true,
   }
]

export const privateRoutes: RouteProps[] = [
   {
      path: '/home',
      component: Home,
      exact: true
   },
   {
      path: '/post/:id',
      component: Post,
      exact: true
   },
   {
      path: '/post/edit/:id',
      component: Post,
      exact: true
   },
   {
      path: '/post',
      component: Post,
      exact: true
   }
]