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

  // instancio redux en modo escritura
  const dispatch = useDispatch();

  // // instancio redux en modo lectura
  const userRdxData = useSelector(userData);

  const inputHandler = (event) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    
    //definimos las credenciales para el futuro login con los datos de registro
    const credentials = {
      email: registerData.email,
      password: registerData.password,
    }; 

    RegisterUser(registerData).then(() => {
    //hacemos login con el usuario recien creado cuando tengamos la respuesta de nuestro registro
    userLogin(credentials)
      .then((token) => {
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: data.user,
          decodedToken,
        };
       
        
        //guardamos al igual que en el login nuestros datos de usuario logeado 
        dispatch(login({ credentials : data}));
        navigate("/");

      })

      .catch((err) => console.error("ha ocurrido un error", err));
    });

   
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

      <Button variant="dark" onClick={() => buttonHandler()} >CREAR PERFIL</Button>
      
    </div>
  );
};
