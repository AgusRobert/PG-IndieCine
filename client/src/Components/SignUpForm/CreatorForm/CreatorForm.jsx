import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, updateUser } from "../../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { styled, Box } from "@mui/system";
import { deepPurple, grey, amber } from "@mui/material/colors";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { SERVER_BACK } from "../../../paths/path";

const BoxStyle = styled(Box)({
  padding: "20px",
});

const MenuItemStyle = styled(MenuItem)({
  marginLeft: "auto",
  color: "black",
  backgroundColor: "#b388ff",
});

const SelectStyle = styled(TextField)({
  borderRadius: 2,
  borderColor: "white",
  width: 160,
  padding: 0,
  backgroundColor: "#b388ff",
});

export default function CreatorForm({ fillFormFn }) {
  const [documents, setDocuments] = useState({ back: null, front: null });
  const [input, setInput] = useState({
    country: null,
    people: null, //-------> tipo de persona.
    rol: null,
    telephone: null,
    typeOfDocument: null, //-------> tipo de identificacion.
    numberOfDocument: null,
    cafecito: null,
    // termsAndConditions: false,
  });
  const [errors, setErrors] = useState({});
  const [personSelected, setPersonSelected] = useState(false);
  const { user } = useAuth0();
  const navigate = useNavigate();

  // -------- TRAER LA LISTA DE PAISES --------
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state);
  useEffect(() => {
    !countries.length && dispatch(getCountries());
  }, []);

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
    // cafecito
    // if (state.cafecito && !/(http[s]?:\/\/cafecito.app\/)([^\/\s]+\/)(.*)/.test(state.cafecito)) {
    //   errors.cafecito = "Debe ser un link de cafecito válido.";
    // }
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
        [e.target.name]: e.target.value,
      };
      setErrors(validateForm(newInput));
      return newInput;
    });
  }

  function handleOnSelect(e) {
    setInput((prevState) => {
      const newInput = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      setErrors(validateForm(newInput));
      return newInput;
    });
    if (e.target.name === "people") setPersonSelected(true);
    // Esto es para el renderizado condicional del select de roles.
  }

  const handleSelectFiles = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  function handleOnCheckbox(e) {
    setInput((prevState) => {
      const newInput = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      setErrors(validateForm(newInput));
      return newInput;
    });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(input));
    if (
      !Object.keys(errors).length &&
      input.country &&
      input.people &&
      input.rol &&
      input.telephone &&
      input.typeOfDocument &&
      input.numberOfDocument
    ) {
      const responses = {};
      console.log("Datos antes de enviar:", documents);
      if (documents?.back && user?.email) {
        const formDocBack = new FormData();
        //adicion de la imagen para la subida
        formDocBack.append("email", user.email);
        formDocBack.append("tipo", "docBack");
        formDocBack.append("extra", "");
        formDocBack.append("file", documents.back);
        const rBack = (
          await axios.post(`${SERVER_BACK}/upload/inter`, formDocBack)
        )?.data;
        if (typeof rBack === "string") responses.backDocument = rBack;
      }
      if (documents?.front && user?.email) {
        const formDocFront = new FormData();
        formDocFront.append("email", user.email);
        formDocFront.append("tipo", "docFront");
        formDocFront.append("extra", "");
        formDocFront.append("file", documents.front);
        const rFront = (
          await axios.post(`${SERVER_BACK}/upload/inter`, formDocFront)
        )?.data;
        if (typeof rFront === "string") responses.frontDocument = rFront;
      }
      dispatch(
        updateUser({
          ...input,
          // ...user,
          email: user.email,
          ...responses,
          // creator: false,
          status: "pending",
        })
      );
      fillFormFn(true);
      
      Swal.fire({
        title: "Solicitud enviada correctamente, en breve nos comunicaremos con usted.",
        width: 600,
        timer: 3000,
        timerProgressBar: true,
        padding: '1em',
        icon: "success",
        color: '#716add',
        background: 'black',
        backdrop: `
          rgba(0,0,123,0.2)0  `,
        confirmButtonText: 'OK!',
      });
      navigate("/profile");
    } else {
      Swal.fire({
        title: "Porfavor revise los datos ingresados",
        width: 600,
        timer: 3000,
        timerProgressBar: true,
        padding: '1em',
        icon: "error",
        color: '#716add',
        background: 'black',
        backdrop: `
          rgba(0,0,123,0.2)0  `,
        confirmButtonText: 'OK!',
      });
     
    }
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <BoxStyle>
        {/* País */}
        <div>
          <div>
            <label htmlFor="country">País</label>
            <SelectStyle
              name="country"
              onChange={handleOnSelect}
              select
              label="País"
              variant="outlined"
              size="small"
              /*  color="white" */
              sx={{
                ":active": {
                  color: "black",
                  borderColor: deepPurple[600],
                },
                ":focused": {
                  borderColor: deepPurple[600],
                },
              }}
            >
              {countries.length
                ? countries.map((country) => (
                    <MenuItemStyle key={country.id} value={country.name}>
                      {country.name}
                    </MenuItemStyle>
                  ))
                : null}
            </SelectStyle>
          </div>
          {errors.country && <span>{errors.country}</span>}
        </div>

        {/* Persona */}
        <div>
          <div>
            <label htmlFor="people">Persona</label>
            <Box>
              {/* {" "} */}
              <SelectStyle
                name="people"
                onChange={handleOnSelect}
                select
                // label="Tipo de Persona"
                variant="outlined"
                size="small"
                sx={{
                  ":active": {
                    color: "black",
                    borderColor: deepPurple[600],
                  },
                  ":focused": {
                    borderColor: deepPurple[600],
                  },
                }}
              >
                <MenuItemStyle value="true">Persona Natural</MenuItemStyle>
                <MenuItemStyle value="false">Persona Jurídica</MenuItemStyle>
              </SelectStyle>
            </Box>
          </div>
          {errors.people && <span>{errors.people}</span>}
        </div>

        {/* Roles */}
        {personSelected ? (
          <div>
            <label htmlFor="rol">Rol</label>
            <Box>
              {input.people === "true" ? (
                <SelectStyle
                  name="rol"
                  onChange={handleOnSelect}
                  select
                  variant="outlined"
                  size="small"
                  sx={{
                    ":active": {
                      color: "black",
                      borderColor: deepPurple[600],
                    },
                    ":focused": {
                      borderColor: deepPurple[600],
                    },
                  }}
                >
                  <MenuItemStyle value="director">Director/a</MenuItemStyle>
                  <MenuItemStyle value="productor">Productor/a</MenuItemStyle>
                  <MenuItemStyle value="montajista">Montajista</MenuItemStyle>
                </SelectStyle>
              ) : (
                <SelectStyle
                  name="rol"
                  onChange={handleOnSelect}
                  select
                  variant="outlined"
                  size="small"
                  sx={{
                    ":active": {
                      color: "black",
                      borderColor: deepPurple[600],
                    },
                    ":focused": {
                      borderColor: deepPurple[600],
                    },
                  }}
                >
                  <MenuItemStyle value="productora">Productora</MenuItemStyle>
                </SelectStyle>
              )}
            </Box>
            {errors.rol && <span>{errors.rol}</span>}
          </div>
        ) : null}

        {/* Teléfono */}
        <div>
          <div>
            <label htmlFor="telephone">Teléfono</label>
            <input
              type="text"
              name="telephone"
              value={input.telephone}
              onChange={handleOnChange}
            />
          </div>
          {errors.telephone && <span>{errors.telephone}</span>}
        </div>

        {/* Tipo de documento */}
        <div>
          <div>
            <label htmlFor="typeOfDocument">Tipo de identificación</label>
            <Box>
              {" "}
              <SelectStyle
                name="typeOfDocument"
                onChange={handleOnSelect}
                select
                label="
                    Tipo de Documento"
                variant="outlined"
                size="small"
                sx={{
                  ":active": {
                    color: "black",
                    borderColor: deepPurple[600],
                  },
                  ":focused": {
                    borderColor: deepPurple[600],
                  },
                }}
              >
                <MenuItemStyle value="" disabled selected>
                  Seleccione una opción
                </MenuItemStyle>
                <MenuItemStyle value="dni">DNI</MenuItemStyle>
                <MenuItemStyle value="pasaporte">Pasaporte</MenuItemStyle>
                <MenuItemStyle value="ruc">RUC</MenuItemStyle>
              </SelectStyle>
            </Box>
          </div>
          {errors.typeOfDocument && <span>{errors.typeOfDocument}</span>}
        </div>

        {/* Número de identificación */}
        <div>
          <div>
            <label htmlFor="numberOfDocument">Número de identificación</label>
            <input
              type="text"
              name="numberOfDocument"
              value={input.numberOfDocument}
              onChange={handleOnChange}
              placeholder="Ingrese su número de identificación"
            />
          </div>
          {errors.numberOfDocument && <span>{errors.numberOfDocument}</span>}
        </div>

        {/* Foto del frente del documento */}
        <div>
          <div>
            <label htmlFor="frontDocument">
              Subir foto del anverso del documento
            </label>
            <input
              type="file"
              name="front"
              multiple={false}
              onChange={(e) => handleSelectFiles(e)}
              required
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
        </div>

        {/* Foto del reverso del documento */}
        <div>
          <div>
            <label htmlFor="reverseDocument">
              Subir foto del reverso del documento
            </label>
            <input
              type="file"
              name="back"
              multiple={false}
              accept="image/png, image/jpeg, image/jpg"
              required
              onChange={(e) => handleSelectFiles(e)}
            />
          </div>
        </div>

        {/* Link de cafecito */}
        <div>
          <div>
            <label>Tu cafecito ☕</label>
            <p>Si usted desea recibir donaciones, complete el siguiente campo.</p>
            <input
              type="text"
              name="cafecito"
              value={input.cafecito}
              onChange={handleOnChange}
              placeholder="Ingrese el link de su cafecito"
            />
          </div>
          {errors.cafecito && <span>{errors.cafecito}</span>}
        </div>
        <div>
          <button type="submit">Registrarse</button>
        </div>
      </BoxStyle>
    </form>
  );
}
