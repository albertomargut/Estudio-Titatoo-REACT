import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getArtistsAppointments } from "../../services/apiCalls";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const ArtistAppointments = () => {
  const [artistAppointments, setArtistAppointments] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData.id;
  

  useEffect(() => {
    if (artistAppointments.length === 0) {
      getArtistsAppointments(token, id).then((artistAppointments) => {
        console.log("hola", artistAppointments)
        setArtistAppointments(artistAppointments);
      });
    }
  }, [token, id]); // Asegúrate de incluir token y id en la lista de dependencias

  return (
    <Container>
      <h1 className="text-center mt-5 mb-4">Mis citas</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {artistAppointments && artistAppointments.length > 0 ? (
          artistAppointments.map((appointment) => (
            <Col key={appointment.id}>
              <Card className="shadow-sm appointment-card" id="custom-card">
                <Card.Body>
                  <Card.Title className="text-center fs-5">
                    {appointment.client.user.first_name} {appointment.client.user.last_name}
                  </Card.Title>
                  <hr />
                  <div className="text-center">
                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p>
                    <strong>Contact:</strong> {appointment.client.user.phone_number}
                  </p>
                  </div>
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
//     <Container>
//     <h1 className="text-center mt-4 mb-4">All Appointments</h1>
//     <Row xs={1} md={2} lg={3} className="g-4">
//       {artistAppointments && artistAppointments.length > 0 ? (
//         artistAppointments.map((appointment) => (
//           <Col key={`${appointment.id}-${appointment.date}-${appointment.time}`}>
//             <Card className="shadow-sm appointment-card" id="custom-card">
//               <Card.Body>
//                 <Card.Title className="text-center fs-5">Artist: {appointment.artist.id}</Card.Title>
//                 <hr />
//                 <div className="text-center">
//                   <p><strong>Date:</strong> {appointment.date}</p>
//                   <p><strong>Time:</strong> {appointment.time}</p>
//                   <p><strong>Customer:</strong> {appointment.client_id}</p>
//                 </div>
//                 <Button variant="danger" size="sm" onClick={() => removeButtonHandler(appointment.id)}>Delete</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))
//       ) : (
//         <Col>
//           <p className="text-center">No appointments available.</p>
//         </Col>
//       )}
//     </Row>
//   </Container>
//   );
// };

