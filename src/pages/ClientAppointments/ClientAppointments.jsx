import {
  getMyAppointments,
  updateAppointment,
  deleteAppointment,
} from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export const ClientAppointments = () => {
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.client.id;
 

  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments(token, myId)
      .then((response) => {
        if (response && response.results) {
          const appointments = response.results;
          setMyAppointments(appointments);
        } else {
          console.error("Invalid response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [token, myId]);

  const handleEditAppointment = (index) => {
    const appointmentsCopy = [...myAppointments];
    appointmentsCopy[index].editable = true;
    setMyAppointments(appointmentsCopy);
  };

  const handleSaveAppointment = (index) => {
    const appointment = myAppointments[index];
    const { id, date, time } = appointment;
  

    if (!appointment || typeof appointment.id === "undefined") {
      console.error("Error: Appointment id is missing or undefined.");
      return;
    }

    updateAppointment(token, id, { date, time })
      .then((updatedAppointment) => {
       
        const updatedAppointments = [...myAppointments];
        updatedAppointments[index] = { ...updatedAppointment, editable: true };
        setMyAppointments(updatedAppointments);
        window.location.reload(); // Recargar la página
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
      });
  };

  const cancelButtonHandler = (id) => {
    deleteAppointment(token, id)
      .then(() => {
        // Eliminar la cita del estado local
        const updatedAppointments = myAppointments.filter(
          (appointment) => appointment.id !== id
        );
        setMyAppointments(updatedAppointments);
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  return (
    <Container>
      <h3 className="text-center mt-5 mb-4">Mis citas</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {myAppointments && myAppointments.length > 0 ? (
          myAppointments.map((appointment, index) => (
            <Col key={index}>
              <Card className="shadow-sm appointment-card" id="custom-card">
                <Card.Body>
                  <Card.Title className="text-center fs-5">
                    Tatuador:{" "}
                    {appointment.artist && appointment.artist.user
                      ? `${appointment.artist.user.first_name} ${appointment.artist.user.last_name}`
                      : "N/A"}
                  </Card.Title>
                  <Card.Text>
                    <span className="font-weight-bold">Día:</span>{" "}
                    {appointment.editable ? (
                      <Form.Control
                        type="date"
                        value={appointment.date || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setMyAppointments((prevAppointments) =>
                            prevAppointments.map((app, i) =>
                              i === index ? { ...app, date: value } : app
                            )
                          );
                        }}
                      />
                    ) : (
                      appointment.date || "N/A"
                    )}
                    <br />
                    <span className="font-weight-bold">Hora:</span>{" "}
                    {appointment.editable ? (
                      <Form.Control
                        type="time"
                        value={appointment.time || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setMyAppointments((prevAppointments) =>
                            prevAppointments.map((app, i) =>
                              i === index ? { ...app, time: value } : app
                            )
                          );
                        }}
                      />
                    ) : (
                      appointment.time || "N/A"
                    )}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (appointment.editable) {
                        handleSaveAppointment(index);
                      } else {
                        handleEditAppointment(index);
                      }
                    }}
                  >
                    {appointment.editable ? "Guardar" : "Cambiar cita"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => cancelButtonHandler(appointment.id)}
                  >
                    Cancelar cita
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No tienes citas programadas.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
