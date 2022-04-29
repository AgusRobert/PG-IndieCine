import { useNavigate } from "react-router-dom";

export default function ProfileBtn() {
    const navigate = useNavigate();

    function handleOnClick() {
        navigate('/profile')
    }

    return (
        <div>
            <button onClick={handleOnClick}>Mi perfil</button>
        </div>
    )
}