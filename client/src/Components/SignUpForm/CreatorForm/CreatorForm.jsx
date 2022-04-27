import { /*useEffect, */useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

export default function CreatorForm() {

    const [input, setInput] = useState({
        name: '',
        surname: '',
        username: '', // Validar que no se repita
        mail: '',
        password: '',
        passwordConfirm: '',
        country: '',
        person: '',//-------> tipo de persona.
        role: '',
        idType: '',//-------> tipo de identificacion.
        idPhotoFrontside: '',     //---> id file updated.--> input type file
        idPhotoBackside: '',      //---^
        idNumber: '',
        phoneNumber: '',
        termsAndConditions: false,
    });
    const [errors, setErrors] = useState({})
    const [personSelected, setPersonSelected] = useState(false);

    // -------- VALIDACIÓN DEL USERNAME --------
    // const dispacth = useDispatch();
    // const { listOfUsers } = useSelector(state => state);
    const listOfUsers = [{ id: 1, name: 'user1' }, { id: 2, name: 'user2' }];

    // -------- VALIDACIÓN DEL MAIL --------
    // const { listOfMails } = useSelector(state => state);
    const listOfMails = ['ejemplo1@gmail.com', 'ejemplo2@gmail.com']

    // -------- TRAER LA LISTA DE PAISES --------
    const countries = [{ id: 01, name: 'Argentina' }, { id: 02, name: 'Bolivia' }, 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela'];
    // const { countries } = useSelector(state => state);
    // useEffect(() => {
    //     dispatch(getCountries());
    // }, []);

    function validateForm(state) {
        const errors = {};
        // name
        if (!state.name) {
            errors.name = "Nombre es requerido";
        } else if (!/^[a-zñá-ú\s']{3,20}$/i.test(state.name)) {
            errors.name = "Nombre debe tener al menos 3 caracteres";
        }
        // surname
        if (!state.surname) {
            errors.surname = "Apellido es requerido";
        } else if (!/^[a-zñá-ú\s']{3,20}$/i.test(state.surname)) {
            errors.surname = "Apellido debe tener al menos 3 caracteres";
        }
        // username
        if (!state.username) {
            errors.username = "Username es requerido";
        } else if (!/^[a-zñá-ú'\d_@./#&+-]{6,15}$/i.test(state.username) && !listOfUsers.includes(state.username)) {
            errors.surname = "Username debe tener al menos 6 caracteres y no puede haber espacios.";
        }
        // mail
        if (!state.mail) {
            errors.mail = "Email es requerido";
        } else if (!/\S+@\S+\.\S+/i.test(state.mail) && !listOfMails.includes(state.mail)) {
            errors.mail = "Email debe ser un correo válido.";
        }
        // password
        if (!state.password) {
            errors.password = "Contraseña es requerido";
        } else if (!/^(?=.*[A-Z])(?=.[0-9])[a-zñA-ZÑ0-9!@#$%^&]{6,16}$/.test(state.password)) {
            errors.password = "Contraseña debe tener entre 6 y 16 caracteres, al menos una mayúscula y un número. Ejemplo: Pepito123";
        }
        // passwordConfirm
        if (!state.passwordConfirm) {
            errors.passwordConfirm = "Confirmar contraseña es requerido";
        } else if (state.password !== state.passwordConfirm) {
            errors.passwordConfirm = "Las contraseñas no coinciden";
        }
        // country
        if (!state.country) {
            errors.country = "Pais es requerido";
        }
        // person
        if (!state.person) {
            errors.person = "Tipo de persona es requerido";
        }
        // role
        if (!state.role) {
            errors.role = "Rol es requerido";
        } /*else if (!/^[a-zñá-ú\s']$/i.test(state.role)) {
            errors.role = "Rol no pueden ser números.";
        }*/
        // idType
        if (!state.idType) {
            errors.idType = "Tipo de identificación es requerido";
        }
        // idNumber
        if (!state.idNumber) {
            errors.idNumber = "Número de identificación es requerido";
        } else if (!/^[\d]$/.test(state.idNumber)) {
            errors.idNumber = "Número de identificación debe contener por lo menos 8 caracteres.";
        }
        // phoneNumber
        if (!state.phoneNumber) {
            errors.phoneNumber = "Número de teléfono es requerido";
        } else if (!/^[\d.+-]$/i.test(state.phoneNumber)) {
            errors.phoneNumber = "Número de teléfono debe ser válido.";
        }
        // termsAndConditions
        if (!state.termsAndConditions) {
            errors.termsAndConditions = "Debe aceptar los términos y condiciones.";
        }

        return errors;
    }

    function handleOnChange(e) {
        setInput((prevState) => {
            const newInput = {
                ...prevState,
                [e.target.name]: e.target.value
            }
            setErrors(validateForm(newInput));
            return newInput;
        });
    }

    function handleOnSelect(e) {
        setInput((prevState) => {
            const newInput = {
                ...prevState,
                [e.target.name]: e.target.value
            }
            setErrors(validateForm(newInput));
            return newInput;
        });
        if (e.target.name === 'person') setPersonSelected(true);
        // Esto es para el renderizado condicional del select de roles.
    }

    function handleOnCheckbox(e) {
        setInput((prevState) => {
            const newInput = {
                ...prevState,
                [e.target.name]: e.target.value
            }
            setErrors(validateForm(newInput));
            return newInput;
        });
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        setErrors(validateForm(input));
        if (!Object.keys(errors).length &&
            input.name &&
            input.surname &&
            input.username &&
            input.mail &&
            input.password &&
            input.passwordConfirm &&
            input.termsAndConditions &&
            input.country &&
            input.person &&
            input.role &&
            input.idType &&
            input.idPhotoFrontside && 
            input.idPhotoBackside && 
            input.idNumber &&
            input.phoneNumber
        ) {
            alert("Formulario enviado correctamente");
            // direccionamiento al home? al login?
            // resetear el estado de input??
        } else {
            alert("Formulario no enviado");
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <div>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={handleOnChange}
                            placeholder="Ingrese su nombre" />
                    </div>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="surname">Apellido</label>
                        <input
                            type="text"
                            name="surname"
                            value={input.surname}
                            onChange={handleOnChange}
                            placeholder="Ingrese su apellido" />
                    </div>
                    {errors.surname && <span>{errors.surname}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={input.username}
                            onChange={handleOnChange}
                            placeholder="Ingrese un username" />
                    </div>
                    {errors.username && <span>{errors.username}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type='password'
                            name="password"
                            value={input.password}
                            onChange={handleOnChange}
                            placeholder="Contraseña" />
                    </div>
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="passwordConfirm">Repita su contraseña</label>
                        <input
                            type='password'
                            name="passwordConfirm"
                            value={input.passwordConfirm}
                            onChange={handleOnChange}
                            placeholder="Contraseña" />
                    </div>
                    {errors.passwordConfirm && <span>{errors.passwordConfirm}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="mail">Email</label>
                        <input
                            type="text"
                            name="mail"
                            value={input.mail}
                            onChange={handleOnChange}
                            placeholder="Ingrese un mail" />
                    </div>
                    {errors.mail && <span>{errors.mail}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="country">País</label>
                        <select
                            name="country"
                            onChange={handleOnSelect}
                            defaultValue="">
                            {countries.length ? (
                                countries.map(country => (
                                    <option
                                        key={country.id}
                                        value={country.id.toLowerCase()}>
                                        {country.name}
                                    </option>
                                ))
                            ) : null}
                        </select>
                    </div>
                    {errors.country && <span>{errors.country}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="person">Persona</label>
                        <select
                            name="person"
                            onChange={handleOnSelect}>
                            <option value="">Seleccione una opción</option>
                            <option value="natural">Persona Natural</option>
                            <option value="juridica">Persona Jurídica</option>
                        </select>
                    </div>
                    {errors.person && <span>{errors.person}</span>}
                </div>
                {personSelected ?
                    <div>
                        {
                            input.person === 'natural' ? (
                                <select name="role" onChange={handleOnSelect}>
                                    <option value='' disabled selected>Roles</option>
                                    <option value='director'>Director/a</option>
                                    <option value='productor'>Productor/a</option>
                                    <option value='montajista'>Montajista</option>
                                </select>
                            ) : (
                                <select name="role" onChange={handleOnSelect}>
                                    <option value='' disabled selected>Roles</option>
                                    <option value='productora'>Productora</option>
                                </select>
                            )
                        }
                        {errors.role && <span>{errors.role}</span>}
                    </div>
                    : null
                }
                <div>
                    <div>
                        <label htmlFor="idType">Tipo de identificación</label>
                        <select
                            name="idType"
                            onChange={handleOnSelect}>
                            <option value="dni">DNI</option>
                            <option value="pasaporte">Pasaporte</option>
                            <option value="ruc">RUC</option>
                        </select>
                    </div>
                    {errors.idType && <span>{errors.idType}</span>}
                </div>
                {/* decidí dejar dos input file que reciben un archivo máximo cada uno de los dos
                para que el path de la img se guarde en el value de cada input. Porque, en caso
                contrario, si dejo un input file que reciba multiples archivos solo se guarda el
                path del primer archivo en value. Y para acceder al resto habría que acceder a 
                los demás archivos golpeando la propiedad files del input file. */}
                <div> 
                    <div>
                        <label htmlFor="idPhotoFrontside">Subir foto del anverso del documento</label>
                        <input
                            type="file"
                            name="idPhotoFrontside"
                            value={input.idPhotoFrontside}
                            multiple={false}
                            onChange={handleOnChange}
                            accept='image/png, image/jpeg, image/jpg' />
                    </div>
                    {errors.idPhotoFrontside && <span>{errors.idPhotoFrontside}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="idPhotoBackside">Subir foto del reverso del documento</label>
                        <input
                            type="file"
                            name="idPhotoBackside"
                            value={input.idPhotoBackside}
                            multiple={false}
                            onChange={handleOnChange}
                            accept='image/png, image/jpeg, image/jpg' />
                    </div>
                    {errors.idPhotoBackside && <span>{errors.idPhotoBackside}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="idNumber">Número de identificación</label>
                        <input
                            type="text"
                            name="idNumber"
                            value={input.idNumber}
                            onChange={handleOnChange}
                            placeholder="Ingrese su número de identificación" />
                    </div>
                    {errors.idNumber && <span>{errors.idNumber}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="phoneNumber">Teléfono</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={handleOnChange} />
                    </div>
                    {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="mail">Términos y Condiciones</label>
                        <Link>Link a los términos y condiciones.</Link>
                        {/* ver este link que onda, si queda así o si va un componente TyC o qué */}
                        <input
                            type="checkbox"
                            name="termsAndConditions"
                            onChange={handleOnCheckbox} />
                    </div>
                    {errors.termsAndConditions && <span>{errors.termsAndConditions}</span>}
                </div>
            </div>
        </form>
    )
}