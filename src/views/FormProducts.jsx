import React, { useContext, useState }from 'react';

import MyContext from "../MyContext";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Formulario = () => {

  const { products } = useContext(MyContext);
  const navigate = useNavigate();

  const [ nombre, setNombre ] = useState("");
  const [ imagen, setImagen ] = useState("");
  const [ descripcion , setDescripcion ] = useState("");
  const [ precio , setPrecio ] = useState("");
  const [ error, setError ] = useState(false);

  const preventRegistro = (e) => {
    e.preventDefault()
    if(nombre === "" || imagen === "" || descripcion === ""
        || precio === "" ) 
      { setError(true)}
    if ( error === false) {
        alert("Debes rellenar todos los campos!")}
 };

  function agregarProducto(){
    const assignId = products[products.length - 1]
    const newId = assignId.id_producto + 1
    let object = {
                  id_producto:newId,
                  name:nombre,
                  img:imagen,
                  desc:descripcion,
                  price:precio
                 }
                 products.push(object)
  }

  console.log (agregarProducto)

  function iraGaleria() {

    {navigate(`/galeria/`)}
  };

  function total() {

    iraGaleria()
    agregarProducto()
  }
  
  return (
    <Form className='formulario' onSubmit={preventRegistro}>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Título de la publicación" onChange={(e) => setNombre(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Adjunte imagen"  onChange={(e) => setImagen(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Indique un precio" onChange={(e) => setPrecio(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={() => total()}>
        Publicar
      </Button>
    </Form>
  );
};

export default Formulario;