"use client"

import { useState } from "react";
import Header from "../../components/Header";
import Formulario from "../../components/Formulario";
import ListadoUsuarios from "../../components/ListadoUsuarios";

export default function Home() {
  
  //State
  const [users, setUsers] = useState([]);
  const [infoUser, setInfoUser] = useState({
    name: '',
    age: "",
  });

  const [alert, setAlert] = useState("")

  return (
    <>
      <Header />
      <main className="m-20">
        <h1 className="text-3xl font-bold mt-10">Listado de Personas</h1>
        <Formulario 
          infoUser={infoUser} 
          setInfoUser={setInfoUser} 
          setUsers={setUsers} users={users} 
          alert={alert} 
          setAlert={setAlert}
        />
        <ListadoUsuarios users={users} setUsers={setUsers}/>
      </main>
    </>
  );
}
