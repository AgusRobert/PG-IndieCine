import { /*useEffect, */useState } from "react";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

export default function CreatorForm() {

    const [input, setInput] = useState({
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

    // -------- TRAER LA LISTA DE PAISES --------
    const countries = [{ id: '01', name: 'Argentina' }, { id: '02', name: 'Bolivia' }, { id: '03', name: 'Chile' }, { id: '04', name: 'Colombia' }, { id: '05', name: 'Costa Rica' }, { id: '06', name: 'Cuba' }/*, 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela'*/];
    // const { countries } = useSelector(state => state);
    // useEffect(() => {
    //     dispatch(getCountries());
    // }, []);

    function validateForm(state) {
        const errors = {};
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
        }
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
        if (e.target.value) {
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

            // despachar la accion para updatear el usuario.
            // Si la ruta post es la misma que el usuario básico,
            // agregar el booleano 'creator' en true.

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
                        <label htmlFor="country">País</label>
                        <select
                            name="country"
                            onChange={handleOnSelect}>
                            <option value="" /*disabled selected*/>Seleccione un país</option>
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
                            <option value="" /*disabled selected*/>Seleccione una opción</option>
                            <option value="natural">Persona Natural</option>
                            <option value="juridica">Persona Jurídica</option>
                        </select>
                    </div>
                    {errors.person && <span>{errors.person}</span>}
                </div>
                {personSelected ?
                    <div>
                        <label htmlFor="role">Rol</label>
                        {
                            input.person === 'natural' ? (
                                <select name="role" onChange={handleOnSelect}>
                                    <option value='' /*disabled selected*/>Roles</option>
                                    <option value='director'>Director/a</option>
                                    <option value='productor'>Productor/a</option>
                                    <option value='montajista'>Montajista</option>
                                </select>
                            ) : (
                                <select name="role" onChange={handleOnSelect}>
                                    <option value='' /*disabled selected*/>Roles</option>
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
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={handleOnChange} />
                    </div>
                    {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                </div>
                <div>
                    <div>
                        <label htmlFor="mail">Acepte los </label>
                        <Link to={'/terms'}>términos y condiciones</Link>
                        <input
                            type="checkbox"
                            name="termsAndConditions"
                            onChange={handleOnCheckbox} />
                    </div>
                    {errors.termsAndConditions && <span>{errors.termsAndConditions}</span>}
                </div>
                <div>
                    <button type="submit">Registrarse</button>
                </div>
            </div>
        </form>
    )
}