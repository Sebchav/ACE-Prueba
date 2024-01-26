"use client"
import React from 'react';
import axios from 'axios';

import Alerta from './Alerta';

const Formulario = ({infoUser, setInfoUser, setUsers, users, setAlert, alert}) => {
  
  //Rellenar campos mientras el usuario escribe
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      [name]: value,
    }));
  };
  
  //Creamos un nuevo Usuario y lo guardamos en state
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Alerta en caso de que no pase la validación del formulario
    if (Object.values(infoUser).some(value => !value.trim())) {
        setAlert('Por favor, complete todos los campos antes de guardar.');
        setTimeout(()=>{
            setAlert("")
        }, 3000)
        return;
    }

    if (isNaN(parseInt(infoUser.age)) || parseInt(infoUser.age) < 1 || parseInt(infoUser.age) > 105) {
        setAlert('Edad no válida');
        setTimeout(()=>{
            setAlert("")
        }, 3000)
        return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user', {
        name: infoUser.name,
        age: parseInt(infoUser.age)
      });

      if (response.status === 200) {
        infoUser._id = response.data._id;
    
        setUsers([...users, infoUser])

        setInfoUser({
            name: "",
            age: ""
        })
        
      } else {
        console.error('Error al guardar la información del usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  //Eliminamos el último usuario
  const handleDeleteLast = async() => {
    if (users.length > 0) {
      const ultimoUsuario = users[users.length - 1];

      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/user/${ultimoUsuario._id}`);
  
        if (response.status === 200) {
            
        setUsers(users => users.filter(user => user._id !== ultimoUsuario._id));
          
        } else {
          console.error('Error al eliminar el usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    
  
    } else {
      console.log('No hay usuarios para eliminar.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {alert && <Alerta message={alert}/>}
      <div className='flex flex-col md:flex-row justify-center gap-10 md:gap-40 mt-10'>
        <div>
          <label className='text-2xl'>Nombre: </label>
          <input
            type='text'
            name='name'
            value={infoUser.name}
            onChange={handleInputChange}
            className='border-solid border border-black w-80 p-2 w-full'
          />
        </div>

        <div>
          <label className='text-2xl'>Edad: </label>
          <input
            type='text'
            name='age'
            value={infoUser.age}
            onChange={handleInputChange}
            className='border-solid border border-black w-80 p-2 w-full'
          />
        </div>
      </div>

      <div
       id='actions' 
       className='flex justify-center gap-20 mt-10'
      >
        <button 
            type='submit' 
            className='bg-blue-500 text-white px-8 py-2 rounded shadow-md text-xl'
        >
          Guardar
        </button>
        <button
         type='button' 
         onClick={()=> handleDeleteLast()} 
         className='bg-red-500 text-white px-8 py-2 rounded shadow-md text-xl'
        >
          Eliminar último
        </button>
      </div>
    </form>
  );
};

export default Formulario;
