import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getArtistsAppointments } from "../../services/apiCalls";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const ArtistAppointments = () => {
  const [myAppointments, setMyAppointments] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData.id;

  useEffect(() => {
    if (myAppointments.length === 0) {
      getArtistsAppointments(token, id).then((myAppointments) => {
        setMyAppointments(myAppointments);
        
      });
    }
  }, [token, id]); // Asegúrate de incluir token y id en la lista de dependencias

  return (
    <Container>
      <h1 className="text-center mt-5 mb-4">Mis citas</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {myAppointments.map((appointment) => (
          <Col key={appointment.id}>
            <Card className="shadow-sm appointment-card" id="custom-card">
              <Card.Body>
                <Card.Title className="text-center fs-5">
                  {appointment.user.name} {appointment.user.last_name}
                </Card.Title>
                <hr />
                <div className="text-center">
                  <p>
                    <strong>Date:</strong> {appointment.appointment_date}
                  </p>
                  <p>
                    <strong>Contact:</strong> {appointment.user.phone_number}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
