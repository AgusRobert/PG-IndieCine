// // import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import CreatorForm from "./CreatorForm/CreatorForm";
// import UserForm from "./UserForm/UserForm";

// export default function SignUpForm() {

//     const [user, setUser] = useState(false);
//     const [creator, setCreator] = useState(false);
//     const [typeOfUser, setTypeOfUser] = useState(false);

//     function handleOnClick(e) {
//         // Esta función se ejecuta cuando el cliente decide cómo registrarse:
//         // si decide registrarse como usuario, se cambia el estado de user a true
//         // , el estado de creator a false y se renderiza <UserForm/>
//         // si decide registrarse como creador, se cambia el estado de creator a true
//         // , el estado de user a false y se renderiza <CreatorForm/>
//         if (e.target.name === 'user') {
//             setUser(true);
//             if (creator) {
//                 setCreator(false);
//             }
//             setTypeOfUser(true);
//         }
//         if (e.target.name === 'creator') {
//             setCreator(true);
//             if (user) {
//                 setUser(false);
//             }
//             setTypeOfUser(true);
//         }
//     }

//     return (
//         <div>
//             <div>
//                 {/* div provisorio */}
//                 <Link to={'/'}>Home (link provisorio)</Link>
//             </div>
//             <div>
//                 <label>¿Ya tienes una cuenta?</label>
//                 <Link to={'/signin'}>
//                     <button>Inicia Sesión</button>
//                 </Link>
//             </div>
//             <div>
//                 <h2>¿Desea registrarse como Usuario o como Creador?</h2>
//                 <div >
//                     <div >
//                         <button name='user' onClick={handleOnClick}>Usuario</button>
//                     </div>
//                     <div >
//                         <button name='creator' onClick={handleOnClick}>Creador</button>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 {typeOfUser ? user ? <UserForm /> : <CreatorForm /> : <span>Por favor elija con qué perfil desea registrarse.</span>}
//             </div>
//         </div>
//     )
// }