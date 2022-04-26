import { useState } from "react";

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
        role: '',// Cuales van a ser los roles?
        idType: '',//-------> tipo de identificacion.
        //id file uploaded.
        idPhotoFrontside: '',
        idPhotoBackside: '',
        idNumber: '',
        phoneNumber: '',
        termsAndConditions: false,
    });
    const [errors, setErrors] = useState({})

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
        }
        if (e.target.name === 'idType') {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        }
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
                        <option value="natural">Persona Natural</option>
                        <option value="juridica">Persona Jurídica</option>
                    </select>
                </div>
                {errors.person && <span>{errors.person}</span>}
            </div>
            {/* {input.person === 'natural' ? () : ()} //---> en el handleOnSelect que setea un estado en true si seleccionó alguna persona*/}
            <div>
                <div>
                    <label htmlFor="role">Rol</label>
                    <input
                        type="text"
                        name="role" //----> ACÁ VA UN SELECT CON TRES ROLES. BASADO EN EL RADIO DE PERSONA.
                        onChange={handleOnChange}
                        placeholder="Ingrese su rol" />
                </div>
                {errors.role && <span>{errors.role}</span>}
            </div>
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
                        onChange={handleOnCheck} />
                </div>
                {errors.termsAndConditions && <span>{errors.termsAndConditions}</span>}
            </div>
        </div>
    )
}