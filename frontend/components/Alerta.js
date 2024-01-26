import React from 'react';

const Alerta = ({ message }) => (
  <div className="bg-red-500 text-white px-4 py-2 rounded-md text-center mt-5 mx-20">
    {message}
  </div>
);

export default Alerta;
