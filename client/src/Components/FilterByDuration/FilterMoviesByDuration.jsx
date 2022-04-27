import { useDispatch } from "react-redux";
import {filterDuration} from '../../redux/actions/index'
import { Cortometrajes, Mediometrajes,Largometrajes } from "./constants";

export default function FilterMovieByDuration(){
    let dispatch = useDispatch()

    function onSelectChange(e) {
      e.preventDefault()
      dispatch(filterDuration(e.target.value));
      }

      return (
        <div><select name="select" onChange={onSelectChange}>
          <option value='' disabled selected>Duración</option>
          <option value={Cortometrajes}>Cortometrajes</option>
          <option value={Mediometrajes}>Mediometrajes</option>
          <option value={Largometrajes}>Largometrajes</option>
        </select></div>
      );
}