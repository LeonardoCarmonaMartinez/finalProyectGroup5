import React, { useState, useEffect, useContext } from 'react';

import MyContext from '../MyContext';

import { useParams, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
  const { users, exitoLogin, setExitoLogin } = useContext(MyContext);
  const { id_us } = useParams();
  const navigate = useNavigate();

  const [ correoIngresado, setCorreoIngresado ]         = useState("");
  const [ contrasenaIngresada, setContrasenaIngresada ] = useState("");
  const [ obtenerToken, setObtenerToken ]               = useState([]);
  // const [ mapToUser, setMapToUser ]                     = useState([]);
  // const [ mapToToken, setMapToToken ]                   = useState([]);

  console.log(exitoLogin)
 
  const endpoint2   = "/examplesUsuarios.json";

  const getToken = async () => {
    const res = await fetch (endpoint2);
    const infoToken = await res.json();

    setObtenerToken(infoToken)
  };

  useEffect(() => {
    getToken()
  }, []);


  const HandleLoginSesion = (e) => {
    e.preventDefault()

    if(correoIngresado === "" || contrasenaIngresada === "" ) {
      alert("Debes ingresar tus datos para ingresar")
    }
    else{
    
    if( (users.filter(us => us.id_usuario === obtenerToken.map(ot => ot.id_usuario_token))) &&
          (users.filter(user => user.correo === correoIngresado)) && 
          (users.filter(u => u.contrasena === contrasenaIngresada)) &&
          (users.filter(use => use.token === obtenerToken.map(obt => obt.token)))) {
            console.log("Credenciales válidas")
            setExitoLogin(true)
      }
      else { alert("Datos ingresados incorrectos")}

      if(exitoLogin === true) {
        navigate(`/perfil/${id_us}`)
      }
  }};


    
  return (
    <Form className='login' onSubmit={HandleLoginSesion}>
      <Form.Group className="mb-3" controlId="formBasicId">
        <Form.Control type="hidden"
                      name="idusuario"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email"
                      name="correo"
                      placeholder="Correo electrónico"
                      onChange ={(e) => setCorreoIngresado(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password"
                      name="contraseña"
                      placeholder="Contraseña"
                      onChange ={(e) => setContrasenaIngresada(e.target.value)}
                      />
        </Form.Group>

      <Button variant="primary" type="submit">
        Iniciar Sesión 
      </Button>     
    </Form>
  );
};

export default Login;