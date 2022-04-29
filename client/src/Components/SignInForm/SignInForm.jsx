// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { signInSignOut } from "../../redux/actions";
// import { useAuth0 } from "@auth0/auth0-react";

// export default function SignInForm() {

//     const [input, setInput] = useState({
//         mail: '', //--> validar que sea un mail que se encuentre en la db.
//         password: '',//---> validar que sea una password correcta.
//     });
//     const [errors, setErrors] = useState({});

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     // const { listOfMails } = useSelector(state => state);
//     const listOfMails = ['ejemplo1@gmail.com', 'ejemplo2@gmail.com', 'ejemplo3@gmail.com']

//     function validateForm(state) {
//         const errors = {};
//         // mail
//         if (!state.mail) {
//             errors.mail = "Email es requerido";
//         } else if (!/\S+@\S+\.\S+/i.test(state.mail) && !listOfMails.includes(state.mail)) {
//             errors.mail = "Email debe ser un correo válido.";
//         }
//         // password
//         if (!state.password) {
//             errors.password = "Contraseña es requerido";
//         } else if (!/^(?=.*[A-Z])(?=.[0-9])[a-zñA-ZÑ0-9!@#$%^&]{6,16}$/.test(state.password)) {
//             errors.password = "Contraseña debe tener entre 6 y 16 caracteres, al menos una mayúscula y un número. Ejemplo: Pepito123";
//         }
//         return errors;
//     }

//     function handleChange(e) {
//         setInput((prevState) => {
//             const newinput = {
//                 ...prevState,
//                 [e.target.name]: e.target.value
//             }
//             setErrors(validateForm(newinput));
//             return newinput;
//         })
//     }

//     function handleOnSubmit(e) {
//         e.preventDefault();
//         setErrors(validateForm(input));
//         if (!Object.keys(errors).length && input.mail && input.password) {
//             alert('Sesión iniciada con éxito');
//             //dispacth(login(input));
//             dispatch(signInSignOut(true));

//             navigate('/'); //--> redireccionamiento al home
//             //setear el estado global de signIn en true

//         } else {
//             alert('Por favor, revisa los datos ingresados');
//         }
//     }

//     // ----------- AUTH0 LOGIN AUTHENTICATION -----------------
//     const { loginWithRedirect } = useAuth0();
//     function handleOnLogin() {
//         loginWithRedirect();
//         dispatch(signInSignOut(true));
//     }

//     return (
//         <div>
//             <div>
//                 {/* div provisorio */}
//                 <Link to={'/'}>Home (link provisorio)</Link>
//             </div>
//             <div>
//                 <label>¿Aún no tienes una cuenta?</label>
//                 <Link to={'/signup'}>
//                     <button>Registrate</button>
//                 </Link>
//             </div>
//             <div>
//                 <h2>Formulario de inicio de sesión</h2>
//             </div>
//             {/* <div>
//                 <form onSubmit={handleOnSubmit}>
//                     <div>
//                         <div>
//                             <label htmlFor="mail">Email</label>
//                             <input
//                                 name="mail"
//                                 type="mail"
//                                 onChange={handleChange}
//                                 placeholder="Ingrese su email" />
//                         </div>
//                         {errors.mail && <span>{errors.mail}</span>}
//                     </div>
//                     <div>
//                         <div>
//                             <label htmlFor="password">Contraseña</label>
//                             <input
//                                 name="password"
//                                 type="password"
//                                 onChange={handleChange}
//                                 placeholder="Ingrese su contraseña" />
//                             {errors.password && <span>{errors.password}</span>}
//                         </div>
//                     </div>
//                     <div>
//                         <button>Iniciar sesión</button>
//                     </div>
//                 </form>
//             </div> */}
//             <div>
//                 <h4>O inicia con ...</h4>
//                 <div>
//                     {/* Inicio con Auth0/Google */}
//                     <button onClick={handleOnLogin}>Google</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
