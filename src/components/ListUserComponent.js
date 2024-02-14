import React, { useEffect, useState } from "react";
import UserService from "../services/userService.js";
import { Link } from "react-router-dom";
import ErrorComponent from "./UserInfoComponent.js";

export const ListUserComponent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const initialUsers = await UserService.getAllUsers();
      const initialAddresses = await UserService.getAllAddress();

      const combinedData = initialUsers.data.map((user) => ({
        ...user,
        address: initialAddresses.data.find(
          (address) => address.userId === user.id
        ),
      }));

      setUsers(combinedData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      fetchData(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setError("Error al eliminar usuario. Intente nuevamente.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Lista de usuarios</h2>
      {error && <ErrorComponent error={error} />}{" "}
      {/* Render the error object */}
      {isLoading && <p className="text-center">Cargando datos...</p>}
      {!isLoading && (
        <>
          <Link to="/Register" className="btn btn-primary mb-2">
            Registrar
          </Link>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Addres</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userWithAddress) => (
                <tr key={userWithAddress.id}>
                  <td>{userWithAddress.id}</td>
                  <td>{userWithAddress.name}</td>
                  <td>{userWithAddress.phone}</td>
                  <td>{userWithAddress.email}</td>
                  <td>{userWithAddress.address}</td>
                  <td>
                    <Link
                      className="btn btn-info"
                      to={`/Modificar/${userWithAddress.id}`}
                    >
                      Modificar
                    </Link>
                    <button
                      style={{ marginLeft: "20px" }}
                      className="btn btn-danger"
                      onClick={() => deleteUser(userWithAddress.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListUserComponent;
