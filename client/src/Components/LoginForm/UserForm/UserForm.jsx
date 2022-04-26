import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

export default function UserForm() {
    const [input, setInput] = useState({
        name: '',
        surname: '',
        username: '', // Validar que no se repita
        mail: '',
        password: '',
        passwordConfirm: '',
        termsAndConditions: false,
    });
    const [errors, setErrors] = useState({})

    // Validación del username
    // const dispacth = useDispatch();
    // const { listOfUsers } = useSelector(state => state);

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

    function handleOnSubmit(e) { }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
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
            </form>
        </div>
    )
}