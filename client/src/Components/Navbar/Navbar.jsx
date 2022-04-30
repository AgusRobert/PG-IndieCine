import React from "react";
import OrderAZ from "../OrderAZ/OrderAZ.jsx";
import OrderRating from "../OrderRating/OrderRating.jsx";
import FilterMoviesByGenre from "../FilterByGenre/FilterMovieByGenre.jsx";
import SignInBtn from "../SignInBtn/SignInBtn.jsx";
import SignUpBtn from "../SignUpBtn/SignUpBtn.jsx";
import OrderDate from "../OrderDate/OrderDate.jsx";
import FilterMovieByCountry from "../FilterByCountry/FilterMoviesByCountry.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx"

import { useAuth0 } from "@auth0/auth0-react";
import ProfileBtn from "../ProfileBtn/ProfileBtn.jsx";

export default function Navbar() {
    const { isAuthenticated } = useAuth0();
    return (
<<<<<<< HEAD
        <div>
=======
        <div className="content-select">
>>>>>>> mirror
            <OrderAZ />
            <OrderDate/>
            <OrderRating />
            <FilterMoviesByGenre />
            <FilterMovieByCountry/>
            <SignInBtn />
            <SearchBar/>
            {isAuthenticated && (<ProfileBtn />)}
            {!isAuthenticated && (<SignUpBtn />)}
        </div>
    )
}