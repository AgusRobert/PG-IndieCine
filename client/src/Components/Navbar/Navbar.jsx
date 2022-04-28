import React from "react";
import OrderAZ from "../OrderAZ/OrderAZ.jsx";
import OrderRating from "../OrderRating/OrderRating.jsx";
import FilterMoviesByGenre from "../FilterByGenre/FilterMovieByGenre.jsx";
import SignInBtn from "../SignInBtn/SignInBtn.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileBtn from "../ProfileBtn/ProfileBtn.jsx";

export default function Navbar() { //los parametros son los que quiero que aparezcan en la card
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            <OrderAZ />
            <OrderRating />
            <FilterMoviesByGenre />
            <SignInBtn />
            {isAuthenticated && (<ProfileBtn />)}
            {!isAuthenticated && (<SignUpBtn />)}
        </div>
    )
}