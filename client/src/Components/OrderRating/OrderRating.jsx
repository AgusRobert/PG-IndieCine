import React from "react";
import { RATING_ASC, RATING_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { orderByRating } from '../../redux/actions/index';

export default function OrderRating (){

    let dispatch = useDispatch()
  
  function onSelectChange(e) {
    dispatch(orderByRating(e.target.value));
  }

    return (
        <div>
            <select name="select" onChange={onSelectChange}>
                    <option value='' disabled selected>Rating</option>
                    <option value={RATING_ASC}>Peor al Mejor</option>
                    <option value={RATING_DES}>Mejor al Peor</option>
            </select>
        </div>
    )
}