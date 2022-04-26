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
        // if (e.target.name === 'idType') {
        //     setInput({
        //         ...input,
        //         [e.target.name]: e.target.value
        //     });
        // }
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