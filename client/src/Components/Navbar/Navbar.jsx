import React from "react";
import OrderAZ from "../OrderAZ/OrderAZ.jsx";
import OrderRating from "../OrderRating/OrderRating.jsx";
import FilterMoviesByGenre from "../FilterByGenre/FilterMovieByGenre.jsx";
import SignInBtn from "../SignInBtn/SignInBtn.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";

export default function Navbar() { //los parametros son los que quiero que aparezcan en la card
    return (
        <div>
            <OrderAZ />
            <OrderRating />
            <FilterMoviesByGenre />
            <SignInBtn />
            <SignUpBtn />
        </div>
    )
}