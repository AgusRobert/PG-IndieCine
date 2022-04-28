import { COM_ASC, COM_DES } from '../../redux/reducer/Ordercosntants';
import { useDispatch } from "react-redux";
import { sortByComment } from '../../redux/actions/index';

export default function OrderComments() {
   let dispatch = useDispatch()
  
  function onSelectChange(e) {
    dispatch(sortByComment(e.target.value));
  }
  return (
   <div> <select name="select" onChange={onSelectChange}>
      <option value='' disabled selected>Popular</option>
      <option value={COM_ASC}>Más discutido</option>
      <option value={COM_DES}>Menos discutido</option>
    </select></div>
  );
}

