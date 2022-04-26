export default function LoginForm() {
    const [input, setInput] = useState({
        name: '',
        surname: '',
        // username: '', // Validar que no se repita
        // mail: '',
        // password: '',
        // passwordConfirm: '',
        // country: '', // Un select que renderice todos los paises?
        // person: '',//-------> tipo de persona.
        // role: '',// Cuales van a ser los roles?
        // idType: '',//-------> tipo de identificacion.
        // //id file uploaded.
        // idPhotoFrontside: '',
        // idPhotoBackside: '',
        // idNumber: '',
        // phoneNumber: '',
        // termsAndConditions: false, 
    });
    const [user, setUser] = useState(false);
    const [creator, setCreator] = useState(false);

    return (
        <div>
            <div>
                <h2>¿Desea registrarse como Usuario o como Creador?</h2>
                <div >
                    <div >
                        <button >Usuario</button>
                    </div>
                    <div >
                        <button >Creador</button>
                    </div>
                </div>
                <form>Formulario</form>
            </div>
        </div>
    )
}