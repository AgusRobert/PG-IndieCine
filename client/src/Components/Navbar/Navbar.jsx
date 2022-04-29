import React from "react";
import OrderAZ from "../OrderAZ/OrderAZ.jsx";
import OrderRating from "../OrderRating/OrderRating.jsx";
import FilterMoviesByGenre from "../FilterByGenre/FilterMovieByGenre.jsx";
import SignInBtn from "../SignInBtn/SignInBtn.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import OrderDate from "../OrderDate/OrderDate.jsx";
import FilterMovieByCountry from "../FilterByCountry/FilterMoviesByCountry.jsx";
import "./Navbar.css"

export default function Navbar() {
    return (
        <div class="content-select">
            <OrderAZ />
            <OrderDate/>
            <OrderRating />
            <FilterMoviesByGenre />
            <FilterMovieByCountry/>
            <SignInBtn />
            <SignUpBtn />
        </div>
    )
}