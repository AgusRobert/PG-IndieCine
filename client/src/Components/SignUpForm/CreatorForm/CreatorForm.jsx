import { /*useEffect, */useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch/*, useSelector*/ } from "react-redux";
import { isCreator, signUpFunction } from "../../../redux/actions";
import { useAuth0 } from '@auth0/auth0-react';

export default function CreatorForm() {

    const [input, setInput] = useState({
        country: '',
        people: null,//-------> tipo de persona.
        rol: '',
        telephone: '',
        typeOfDocument: '',//-------> tipo de identificacion.
        numberOfDocument: '',
        frontDocument: '',     //---> id file updated.--> input type file
        reverseDocument: '',      //---^
        // termsAndConditions: false,
    });
    const [errors, setErrors] = useState({})
    const [personSelected, setPersonSelected] = useState(false);
    const { user } = useAuth0()

    // -------- TRAER LA LISTA DE PAISES --------
    const dispatch = useDispatch();
    const countries = [
        { id: '01', name: 'Argentina' },
        { id: '02', name: 'Bolivia' },
        { id: '03', name: 'Chile' },
        { id: '04', name: 'Colombia' },
        { id: '05', name: 'Costa Rica' },
        { id: '06', name: 'Cuba' },
        { id: '07', name: 'Ecuador' },
        { id: '08', name: 'El Salvador' },
        { id: '09', name: 'Guatemala' },
        { id: '10', name: 'Honduras' },
        { id: '11', name: 'México' },
        { id: '12', name: 'Nicaragua' },
        { id: '13', name: 'Panamá' },
        { id: '14', name: 'Paraguay' },
        { id: '15', name: 'Perú' },
        { id: '16', name: 'Puerto Rico' },
        { id: '17', name: 'República Dominicana' },
        { id: '18', name: 'Uruguay' },
        { id: '19', name: 'Venezuela' }
    ];

    // const { countries } = useSelector(state => state);
    // useEffect(() => {
    //     if (!countries.length) {
    //         dispatch()
    //         dispatch(getCountries());
    //     }
    // }, []);

    function validateForm(state) {
        const errors = {};
        // country
        if (!state.country) {
            errors.country = "Pais es requerido";
        }
        // people
        if (state.people === null) {
            errors.people = "Tipo de persona es requerido";
        }
        // rol
        if (!state.rol) {
            errors.rol = "Rol es requerido";
        }
        // telephone
        if (!state.telephone) {
            errors.telephone = "Número de teléfono es requerido";
        } else if (!/^[\d.+-]/i.test(state.telephone)) {
            errors.telephone = "Número de teléfono debe ser válido.";
        }
        // typeOfDocument
        if (!state.typeOfDocument) {
            errors.typeOfDocument = "Tipo de identificación es requerido";
        }
        // numberOfDocument
        if (!state.numberOfDocument) {
            errors.numberOfDocument = "Número de identificación es requerido";
        } else if (!/^[0-9]/.test(state.numberOfDocument)) {
            errors.numberOfDocument = "Número de identificación debe ser válido.";
        }
        // termsAndConditions
        // if (!state.termsAndConditions) {
        //     errors.termsAndConditions = "Debe aceptar los términos y condiciones.";
        // }

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
        if (e.target.name === 'people') setPersonSelected(true)
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
            // input.termsAndConditions &&
            input.country &&
            input.people &&
            input.rol &&
            input.telephone &&
            input.typeOfDocument &&
            input.numberOfDocument &&
            input.frontDocument &&
            input.reverseDocument
        ) {
            alert("Formulario enviado correctamente");
            dispatch(signUpFunction({
                ...input,
                ...user,
                creator: true
            }));

            // direccionamiento al home? al login?
            // resetear el estado de input??
        } else {
            alert("Porfavor revise los datos ingresados");
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <div>
                    <div>
                        <label htmlFor="country">País</label>
                        <select
                            name="country"
                            onChange={handleOnSelect}>
                            <option value="" disabled selected>Seleccione un país</option>
                            {countries.length ? (
                                countries.map(country => (
                                    <option
                                        key={country.id}
                                        value={country.name}>
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
                        <label htmlFor="people">Persona</label>
                        <select
                            name="people"
                            onChange={handleOnSelect}>
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="true">Persona Natural</option>
                            <option value="false">Persona Jurídica</option>
                        </select>
                    </div>
                    {errors.people && <span>{errors.people}</span>}
                </div>
                {personSelected ?
                    <div>
                        <label htmlFor="rol">Rol</label>
                        {
                            input.people ? (
                                <select name="rol" onChange={handleOnSelect}>
                                    <option value='' disabled selected>Roles</option>
                                    <option value='director'>Director/a</option>
                                    <option value='productor'>Productor/a</option>
                                    <option value='montajista'>Montajista</option>
                                </select>
                            ) : (
                                <select name="rol" onChange={handleOnSelect}>
                                    <option value='' disabled selected>Roles</option>
                                    <option value='productora'>Productora</option>
                                </select>
                            )
                        }
                        {errors.rol && <span>{errors.rol}</span>}
                    </div>
                    : null
                }
                <div>
                    <div>
                        <label htmlFor="telephone">Teléfono</label>
                        <input
                            type="text"
                            name="telephone"
                            value={input.telephone}
                            onChange={handleOnChange} />
                    </div>
                    {errors.telephone && <span>{errors.telephone}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="typeOfDocument">Tipo de identificación</label>
                        <select
                            name="typeOfDocument"
                            onChange={handleOnSelect}>
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="dni">DNI</option>
                            <option value="pasaporte">Pasaporte</option>
                            <option value="ruc">RUC</option>
                        </select>
                    </div>
                    {errors.typeOfDocument && <span>{errors.typeOfDocument}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="numberOfDocument">Número de identificación</label>
                        <input
                            type="text"
                            name="numberOfDocument"
                            value={input.numberOfDocument}
                            onChange={handleOnChange}
                            placeholder="Ingrese su número de identificación" />
                    </div>
                    {errors.numberOfDocument && <span>{errors.numberOfDocument}</span>}
                </div>
                {/* decidí dejar dos input file que reciben un archivo máximo cada uno de los dos
                para que el path de la img se guarde en el value de cada input. Porque, en caso
                contrario, si dejo un input file que reciba multiples archivos solo se guarda el
                path del primer archivo en value. Y para acceder al resto habría que acceder a 
                los demás archivos golpeando la propiedad files del input file. */}
                <div>
                    <div>
                        <label htmlFor="frontDocument">Subir foto del anverso del documento</label>
                        <input
                            type="file"
                            name="frontDocument"
                            value={input.frontDocument}
                            multiple={false}
                            onChange={handleOnChange}
                            accept='image/png, image/jpeg, image/jpg' />
                    </div>
                    {errors.frontDocument && <span>{errors.frontDocument}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="reverseDocument">Subir foto del reverso del documento</label>
                        <input
                            type="file"
                            name="reverseDocument"
                            value={input.reverseDocument}
                            multiple={false}
                            onChange={handleOnChange}
                            accept='image/png, image/jpeg, image/jpg' />
                    </div>
                    {errors.reverseDocument && <span>{errors.reverseDocument}</span>}
                </div>
                {/* <div>
                    <div>
                        <label htmlFor="mail">Acepte los </label>
                        <Link to={'/terms'}>términos y condiciones</Link>
                        <input
                            type="checkbox"
                            name="termsAndConditions"
                            onChange={handleOnCheckbox} />
                    </div>
                    {errors.termsAndConditions && <span>{errors.termsAndConditions}</span>}
                </div> */}
                <div>
                    <button type="submit">Registrarse</button>
                </div>
            </div>
        </form>
    )
}