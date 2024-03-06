import { getUserProfile, updateUser, getMyAppointments, updateAppointment, deleteAppointment} from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export const ClientAppointments = () => {
  const [profileData, setProfileData] = useState({});
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.userId;

  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [detailsOpen, setDetailsOpen] = useState(false);
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

  const inputHandler = (event) => {
    setEditableData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (editMode) {
      updateUser(token, myId, editableData)
        .then((updatedProfile) => {
          setProfileData(updatedProfile);
          setEditMode(false);
          window.location.reload(); // Recargar la página después de actualizar el perfil
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      setEditMode(true);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

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
        {!!profileData.phone_number ? (
          <>
            <Container className="mt-5">
              <Card.Title className="profile-card-title">
                Welcome {profileData.name} {profileData.last_name}
              </Card.Title>{" "}
              {/* Aplica la clase CSS al título */}
              <Row className="justify-content-center">
                {/* Lado Izquierdo: Imagen */}
                {/* <Col md={5} className="mt-md-4 text-center mx-auto">
                  <img
                    src={profileData.photo}
                    className="img-fluid"
                    alt="Imagen de perfil"
                  />
                </Col> */}
                {/* Lado Derecho: Detalles del perfil */}
                <Col md={7} className="mt-md-4">
                  <Card className="profile-card">
                    {" "}
                    {/* Aplica la clase CSS al componente Card */}
                    <Card.Body>
                      <Col md={5} className="mt-md-4 text-center mx-auto">
                        <img
                          src={profileData.photo}
                          className="img-fluid"
                          alt="Imagen de perfil"
                        />
                      </Col>
                      <Button
                        variant="primary"
                        className="view-details-button"
                        onClick={toggleDetails}
                      >
                        {detailsOpen ? "Hide details" : "View details"}
                      </Button>
                      {detailsOpen && (
                        <>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Name:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={editableData.name}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.name
                              )}
                            </li>
                            <li className="list-group-item">
                              Last Name:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="last_name"
                                  value={editableData.last_name}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.last_name
                              )}
                            </li>
                            <li className="list-group-item">
                              Email: {profileData.email}
                            </li>
                            <li className="list-group-item">
                              Phone number:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="phone_number"
                                  value={editableData.phone_number}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.phone_number
                              )}
                            </li>
                            <li className="list-group-item">
                              Address:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="address"
                                  value={editableData.address}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.address
                              )}
                            </li>
                          </ul>
                          <Button
                            variant="primary"
                            className="mt-3"
                            onClick={buttonHandler}
                          >
                            {editMode ? "Save" : "Update details"}
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <p>Cargando datos de perfil...</p>
        )}{" "}
      </div>
      {/* Mostrar los appointments en un cuadro aparte */}
      {myAppointments.length > 0 && (
        <Container className="mt-5">
          <h3 className="text-center mb-4">Next Sessions</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {myAppointments.map((appointment, index) => (
              <Col key={index}>
                <Card className="h-100" id="custom-card-profile">
                  <Card.Body>
                    <Card.Title>Artist: {appointment.artist.name}</Card.Title>
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
    </>
  );
};
