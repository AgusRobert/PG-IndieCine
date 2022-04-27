import { useDispatch } from "react-redux";
import { logInLogOut } from "../../redux/actions";

export default function LogInBtn() {

    const dispatch = useDispatch();
    const { isLogedIn } = useSelector(state => state);

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(logInLogOut());
    }

    return (
        <div>
            <button onClick={handleOnClick}>{isLogedIn ? ('Log out') : ('Log in')}</button>
        </div>
    )
}