import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

export default function CreatorForm() {

    const [input, setInput] = useState({
        name: '',
        surname: '',
        username: '', // Validar que no se repita
        mail: '',
        password: '',
        passwordConfirm: '',
        country: '', // Un select que renderice todos los paises?
        person: '',//-------> tipo de persona.
        role: '',
        idType: '',//-------> tipo de identificacion.
        //id file uploaded.
        idPhotoFrontside: '',
        idPhotoBackside: '',
        idNumber: '',
        phoneNumber: '',
        termsAndConditions: false,
    });
    const [errors, setErrors] = useState({})
    const [personSelected, setPersonSelected] = useState(false);

    // Validación del username
    // const dispacth = useDispatch();
    // const { listOfUsers } = useSelector(state => state);

    // Traer todos los países.
    // const { countries } = useSelector(state => state);

    function validateForm(state) {
        const errors = {};
        // name
        if (!state.name) {
            errors.name = "Nombre es requerido";
        } else if (!/^[a-zñá-ú\s']{3,}$/i.test(state.name)) {
            errors.name = "Nombre debe tener al menos 3 caracteres";
        }
        // surname
        if (!state.surname) {
            errors.surname = "Apellido es requerido";
        } else if (!/^[a-zñá-ú\s']{3,}$/i.test(state.surname)) {
            errors.surname = "Apellido debe tener al menos 3 caracteres";
        }
        // username
        if (!state.username) {
            errors.username = "Username es requerido";
        } else if (!/^[a-zñá-ú\s'\d]{6,}$/i.test(state.surname)) {
            errors.surname = "Username debe tener al menos 6 caracteres";
        }
        // mail
        if (!state.mail) {
            errors.mail = "Email es requerido";
        } else if (!/\S+@\S+\.\S+/i.test(state.mail)) {
            errors.mail = "Email debe ser un correo válido.";
        }
        // password
        if (!state.password) {
            errors.password = "Contraseña es requerido";
        } /*else if (!/^[a-zñá-ú\s']{8,}$/i.test(state.password)) {
            errors.password = "Contraseña debe contener por lo menos 8 caracteres.";
        }*/
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
        } else if (!/^[\d.]$/i.test(state.idNumber)) {
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
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    function handleOnSelect(e) {
        if (e.target.name === 'person') {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
            setPersonSelected(true);
        }
        if (e.target.name === 'idType') {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        }
    }

    function handleOnCheckbox(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.checked
        });
    }

    return (
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
            <div>
                <div>
                    <label htmlFor="idPhotoFrontside">Subir foto del anverso del documento</label>
                    <input
                        type="file"
                        name="idPhotoFrontside"
                        value={input.idPhotoFrontside}
                        onChange={handleOnChange}
                        accept='image/png, image/jpeg, .doc, .docx. .pdf' />
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
                        onChange={handleOnChange}
                        accept='image/png, image/jpeg, .doc, .docx. .pdf' />
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
                    <input
                        type="checkbox"
                        name="termsAndConditions"
                        onChange={handleOnCheckbox} />
                </div>
                {errors.termsAndConditions && <span>{errors.termsAndConditions}</span>}
            </div>
        </div>
    )
}