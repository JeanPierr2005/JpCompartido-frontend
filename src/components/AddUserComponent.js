import React, { useEffect, useState } from "react";
import UserService from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddUserComponent = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [department, setdepartment] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState([]);

  const saveOrUpdateUser = async (e) => {
    e.preventDefault();
    const user = {
      name,
      phone,
      email,
      address: {
        street,
        city,
        department,
        postalCode,
      },
    };

    const isValid = validateUser(user);
    if (!isValid) return;

    if (id) {
      try {
        await UserService.modifyUser(id, user);
        navigate("/Modificar");
      } catch (error) {
        console.log("Error al actualizar usuario", error);
        setErrors([error.message]);
      }
    } else {
      try {
        await UserService.createUser(user);
        navigate("/Register");
      } catch (error) {
        console.log("Error al crear usuario", error);
        setErrors([error.message]);
      }
    }
  };

  useEffect(() => {
    if (id) {
      UserService.getUserById(id)
        .then((response) => {
          setName(response.data.name);
          setPhone(response.data.phone);
          setEmail(response.data.email);
          setStreet(response.data.address?.street);
          setCity(response.data.address?.city);
          setdepartment(response.data.address?.department);
          setPostalCode(response.data.address?.postalCode);
        })
        .catch((error) => {
          console.log("Error al obtener usuario", error);
          setErrors([error.message]);
        });
    }
  }, []);

  const title = () => {
    return id ? <h2>Actualizar usuario</h2> : <h3>Agregar usuario</h3>;
  };

  const validateUser = (user) => {
    const errors = [];

    if (!user.name) errors.push("El nomvbes es obligatorio");
    if (!user.phone) errors.push("El telefonon es obligatorio");
    if (!user.email) errors.push("El email es obligatorio");
    if (!user.address?.street) errors.push("La calle es obligatoria");
    if (!user.address?.city) errors.push("La ciudad es obligatoria");
    if (!user.address?.department)
      errors.push("El departamento es obligatario");
    if (!user.address?.postalCode) errors.push("El código postal es obligario");

    setErrors(errors);
    return !errors.length;
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </div>
                )}
                <div className="form-group mb-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    placeholder="Digite su nombre"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Phone</label>
                  <input
                    type="number"
                    placeholder="Digite su telefono"
                    name="phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Digite su correo"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    placeholder="Digite su calle"
                    name="street"
                    className="form-control"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    placeholder="Digite su ciudad"
                    name="city"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Departament</label>
                  <input
                    type="text"
                    placeholder="Digite su departamento"
                    name="department"
                    className="form-control"
                    value={department}
                    onChange={(e) => setdepartment(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">PostalCode</label>
                  <input
                    type="text"
                    placeholder="Digite su Codigo Postal"
                    name="postalCode"
                    className="form-control"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateUser(e)}
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <Link to="/List" className="btn btn-danger">
                  Exit
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserComponent;
