import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/LoginInput/LoginImput";
import { RegisterUser, userLogin } from "../../services/apiCalls";
import { login, userData } from "../userSlice";
import "./Register.css";
import Button from "react-bootstrap/Button";

export const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const inputHandler = (event) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    RegisterUser(registerData)
      .then(() => {
        const credentials = {
          email: registerData.email,
          password: registerData.password,
        };

        return userLogin(credentials);
      })
      .then((response) => {
        // Verificamos si response incluye un campo "token"
        const token = response?.token || "";

        if (token) {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
  
          const data = {
            token: token,
            userData: decodedToken,
            decodedToken,
          };
  

        //guardamos al igual que en el login nuestros datos de usuario logeado
        dispatch(login({ credentials: data }));
        navigate("/");
       } else {
        throw new Error('Token no válido en la respuesta.');
      }
    })

      .catch((err) => console.error("ha ocurrido un error", err));
  };

  return (
    <div className="RegisterDiv">
      <div className="TituloRegister">
        <h1>REGÍSTRATE CON NOSOTROS</h1>
      </div>

      <br></br>

      <div className="RegisterForm">
        <CustomInput
          placeholder={"escriba un nickname"}
          type={"username"}
          name={"username"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
          placeholder={"introduce tu email"}
          type={"email"}
          name={"email"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
          placeholder={"escriba su contraseña"}
          type={"password"}
          name={"password"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
          placeholder={"escriba su nombre"}
          type={"first_name"}
          name={"first_name"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
          placeholder={"escriba su apellido"}
          type={"last_name"}
          name={"last_name"}
          handler={inputHandler}
        ></CustomInput>
        <CustomInput
          placeholder={"escriba su teléfono"}
          type={"phone_number"}
          name={"phone_number"}
          handler={inputHandler}
        ></CustomInput>
      </div>

      <br></br>

      <Button variant="dark" onClick={() => buttonHandler()}>
        CREAR PERFIL
      </Button>
    </div>
  );
};
