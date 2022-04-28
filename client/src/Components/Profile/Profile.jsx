import CreatorForm from "../SignUpForm/CreatorForm/CreatorForm";

export default function Profile() {

    const [isCreatorClick, setIsCreatorClick] = useState(false);

    function handleOnClick() {
        setIsCreatorClick(!isCreatorClick);
    }

    return (
        <div>
            <div>
                <h1>Profile</h1>
            </div>
            <div>
                <h2>Mis datos</h2>
            </div>
            <div>
                <h2>¿Desea subir al siguiente nivel?</h2>
                <button onClick={handleOnClick}>Subir a Creador</button>
                {isCreatorClick ? <CreatorForm /> : (
                    <div>
                        <h4>Beneficios de convertirse en Creador.</h4>
                        <li>
                            <ul>Posibilidad de publicar tu contenido.</ul>
                            <ul>Visibilidad a tu contenido.</ul>
                            <ul>Sección donde gestionar tu contenido.</ul>
                        </li>
                    </div>

                )}

            </div>
        </div>
    )
}