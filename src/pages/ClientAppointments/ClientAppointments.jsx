import "./ClientAppointments.css"
import { getUserProfile, updateUser, getMyAppointments, updateAppointment, deleteAppointment} from "../../services/apiCalls";
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
    getUserProfile(token, myId).then((res) => {
      setProfileData(res);
      setEditableData(res);
    });

    getMyAppointments(token, myId)
      .then((appointments) => {
        setMyAppointments(appointments);
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
    updateAppointment(token, id, { date, time })
      .then((updatedAppointment) => {
        const updatedAppointments = [...myAppointments];
        updatedAppointments[index] = { ...updatedAppointment, editable: false };
        setMyAppointments(updatedAppointments);
        window.location.reload(); // Recargar la página después de guardar el nuevo appointment
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
  console.log();
  return (
    <>  
    <div className="body">  
      {/* Mostrar los appointments en un cuadro aparte */}
      {myAppointments.length > 0 && (
        <Container className="mt-5">
          <h3 className="text-center mb-4">Next Sessions</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {myAppointments.map((appointment, index) => (
              <Col key={index}>
                <Card className="h-100" id="custom-card-profile">
                  <Card.Body>
                    <Card.Title>Artist: {appointment.artist.first_name}</Card.Title>
                    <Card.Text>
                      <span className="font-weight-bold">Date:</span>{" "}
                      {appointment.editable ? (
                        <Form.Control
                          type="date"
                          value={appointment.date}
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
                        appointment.date
                      )}
                      <br />
                      <span className="font-weight-bold">Time:</span>{" "}
                      {appointment.editable ? (
                        <Form.Control
                          type="time"
                          value={appointment.time}
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
                        appointment.time
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
                      {appointment.editable ? "Save" : "Reschedule"}
                    </Button>
                    <Button
                      variant="danger" // O el estilo que desees para el botón de cancelar
                      onClick={() => cancelButtonHandler(appointment.id)}
                    >
                      Cancel
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
      </div> 
    </>
  );
};
