"use client"
import React, { useEffect } from 'react';
import axios from 'axios';

const ListadoUsuarios = ({users, setUsers}) => {
  useEffect(() => {
    // Obtener usuarios 
    axios.get('http://127.0.0.1:8000/api/users')
      .then((response) => {
        // Actualizar el estado con la lista de usuarios obtenida
        setUsers(response.data);
      })
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []); 

  return (
    <div className="flex justify-center mt-10">
      <table className="min-w-full bg-white border border-gray-300 shadow-md overflow-hidden sm:rounded-lg">
        <thead>
          <tr className='border'>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Edad</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user._id} 
              className={user._id % 2 === 0 ? 'bg-gray-100' : ''}
            >
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoUsuarios;
