import { useEffect, useState } from "react";
import { getAll, deleteUser } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { userData } from "../userSlice";
import "./Admin.css";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (users.length === 0) {
      getAll(token).then((res) => {
        console.log("hola", res);
        setUsers(res);
      });
    }
  }, []);

  const removeButtonHandler = (id) => {
    deleteUser(token, id).then(() => {
      setUsers(users.filter((user) => user.id !== id)); // Actualiza el estado excluyendo el usuario eliminado
    });
  };

  console.log(users);
  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Usuarios</h1>
      <div className="row">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div className="col-md-4 mb-3" id="user-card" key={user.id}>
              <Card className="shadow-sm appointment-card" id="custom-card">
                <Card.Body>
                  <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>Phone: {user.phone_number}</Card.Text>
                  {/* Additional card text or information can be added here */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeButtonHandler(user.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No hay artistas para mostrar.</p>
        )}
      </div>
    </div>
  );
};
