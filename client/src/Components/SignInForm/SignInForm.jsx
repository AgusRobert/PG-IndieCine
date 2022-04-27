export default function SignInForm() {
    return (
        <div>
            <div>
                <h2>Formulario de inicio de sesión</h2>
            </div>
            <div>
                <form>
                    <div>
                        <label htmlFor="mail">Email</label>
                        <input type="mail" placeholder="Ingrese su email" />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder="Ingrese su contraseña" />
                    </div>
                    <div>
                        <button>Iniciar sesión</button>
                    </div>
                </form>
            </div>
            <div>
                Inicio con Auth0
            </div>
        </div>
    )
}