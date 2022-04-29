import { DATE_ASC, DATE_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { sortDate } from '../../redux/actions/index';

export default function OrderDate() {
   let dispatch = useDispatch()
  
  function onSelectChange(e) {
    dispatch(sortDate(e.target.value));
  }
  return (
   <div> <select name="select" onChange={onSelectChange}>
      <option value='' hidden={true}>Fecha</option>
      <option value={DATE_ASC}>Lo nuevo</option>
      <option value={DATE_DES}>Lo clásico</option>
    </select></div>
  );
}

