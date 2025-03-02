import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ConnectedUsers = () => {
  const socket = io("https://gestcafe-backend.onrender.com"); // Conéctate al servidor
  const [usuariosConectados, setUsuariosConectados] = useState([]);

  useEffect(() => {
    // Escuchar el evento "usuariosConectados" y actualizar el estado
    socket.on("usuariosConectados", (users) => {
      setUsuariosConectados(users);
    });

    return () => {
      socket.off("usuariosConectados");
    };
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="card shadow-xl bg-white p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-2 text-[#1B1B1B]">Usuarios Conectados: {usuariosConectados.length}</h2>
      <div className="flex flex-col gap-2">
        {usuariosConectados.map((user) => (
          <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="relative">
            <div  className="avatar online placeholder">
              <div className="bg-neutral text-white w-10   flex items-center justify-center rounded-full">
                <span className="text-base ">{getInitials(user.nombre)}</span>
              </div>
            </div>
            </div>
            <span className="text-sm font-medium text-gray-900">{user.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedUsers;
