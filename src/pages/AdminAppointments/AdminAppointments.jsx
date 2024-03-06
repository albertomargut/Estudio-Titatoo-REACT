import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { deleteAppointment, getAllAppointments } from "../../services/apiCalls";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./AdminAppointments.css";

export const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (appointments.length === 0) {
      getAllAppointments(token)
        .then((res) => {
          console.log("hola", res.results)
          setAppointments(res.results);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [appointments, token]);

  const removeButtonHandler = (id) => {
    deleteAppointment(token, id).then(() => {
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
      
    });
  };

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">All Appointments</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Col key={`${appointment.id}-${appointment.date}-${appointment.time}`}>
              <Card className="shadow-sm appointment-card" id="custom-card">
                <Card.Body>
                  <Card.Title className="text-center fs-5">Artist: {appointment.artist.id}</Card.Title>
                  <hr />
                  <div className="text-center">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Customer:</strong> {appointment.client_id}</p>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => removeButtonHandler(appointment.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No appointments available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
