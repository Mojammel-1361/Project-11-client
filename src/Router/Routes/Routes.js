import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Details from "../../Pages/Details/Details";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SeeAll from "../../Pages/SeeAll/SeeAll";
import SignUp from "../../Pages/SignUp/SignUp";
import Review from "../../Pages/Review/Review";
import Blog from "../../Pages/Blog/Blog";
import Update from '../../Update/Update';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/details/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`https://doctor-server-two.vercel.app/services/${params.id}`),
      },
      {
        path: "/seeall",
        element: <SeeAll></SeeAll>,
      },
      {
        path: "/review",
        element: <Review></Review>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/update/:id",
        element: <Update></Update>,
        
      },
    ],
  },
]);

export default router;
