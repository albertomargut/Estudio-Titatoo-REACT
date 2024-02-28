import "./Artists.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewAppointment, getArtists, getUserProfile } from "../../services/apiCalls";
import { userData } from "../userSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
// import { CustomInput } from "../../components/LoginInput/LoginImput";



export const Artists = () =>{
    const navigate = useNavigate();
    const userRdxData = useSelector(userData);
    const [Artists, setArtists] = useState([]);
    const [PedirCita, setPedirCita] = useState(0);
    const [smShow, setSmShow] = useState(false);
    const [dateConfirmation, setDateConfirmation] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        client_id: "",
        artist_id: "",
        shift: "",
        date: ""
      });
    

    const token = userRdxData.credentials.token;
    const id = userRdxData.credentials.userData?.userId;
    const decoded = userRdxData.credentials?.userData;
    

    useEffect(() => {
        getArtists().then((res) => {
            setArtists(res)
        })
        if (token) {
             getUserProfile(token, id).then((res) => {
            setAppointmentData((prevState) => ({
                ...prevState,
                "client_id": res.id
              }));
        });
        }
       
      }, []);
    
    const buttonHandlerNewDate = (id) => {
        const artistId = id;
        setDateConfirmation(false)
        setAppointmentData((prevState) => ({
            ...prevState,
            "artist_id": artistId
          }));

        if (PedirCita > 0) {
            setPedirCita(0);
        } else if (PedirCita === 0) {
            setPedirCita(id)
        }
    }

    const shiftHandler = (e) => {
        const shift = e.shift;
        setAppointmentData((prevState) => ({
          ...prevState,
          "shift": shift
        }));

        if (appointmentData.date !== "") {
            setDateConfirmation(true)
        } else {
            null
        }
    };

    const dateHandler = (event) => {
        setAppointmentData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
    };

    const buttonHandlerCreateAppointment = () => {
        createNewAppointment(token, appointmentData).then((res) => {
            setPedirCita(0)
            if (res.status === 201) {
                setSmShow(true)
            } else if (res.status !== 201) {
                //futura gestión de errores por implementar
                alert("Error creando la cita")
            }
        });

    };
    


    return (
        <div className="artistPage">
            <div className="pageTitle">
                <h1>CONOCE A NUESTROS TATUADORES</h1>
            </div>
            <div className="modal">
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Cita creada correctamente!
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Vas a tatuarte más o quieres ver tus citas confirmadas?
                </Modal.Body>
                <div className="modalButtons">
                <Button variant="secondary" href="/profile" >MIS CITAS</Button>
                <Button variant="dark" onClick={() => setSmShow(false)} >MÁS TINTA</Button>
                </div>
            </Modal>
            </div>
            <div className="artistDiv">
                 {Artists.map((artist, i)=>{
                    return (
                        <Card className="artistcard" key={i} >
                            <Card.Img className="artistimg" variant="top" src={Artists[i]?.profile_image} />
                            <Card.Body className="bodyCard">
                                <div className="artistData">

                                    <Card.Title>{Artists[i]?.first_name}</Card.Title>
                                    <Card.Text>{Artists[i]?.last_name}</Card.Text>
                                    <Card.Text>Tlf. contacto: {Artists[i]?.phone_number}</Card.Text>
                                    <Card.Text>Estilo: {Artists[i]?.tattoo_style}</Card.Text>

                                    {decoded?.userRoles === "client" && PedirCita === 0  ? (
                                        <Button variant="success" 
                                        onClick={() => buttonHandlerNewDate(Artists[i]?.id)}  >Pedir Cita</Button>
                                    ): null }

                                    {decoded?.userRoles === "client" && PedirCita !== 0 && PedirCita === Artists[i]?.id ?(
                                        <Button variant="danger" 
                                        onClick={() => buttonHandlerNewDate(Artists[i]?.id)}  >Otra vez será</Button>
                                    ): null }
                                    
                                </div>

                                {PedirCita !== 0 && PedirCita === Artists[i]?.id && decoded?.userRoles === "client"? (
                                    
                                    <div className="appointmentForm">

                                        {dateConfirmation === true ? (

                                            <div className="confirmationDate">

                                                <h3 className="titleConfirmation">Confirmar cita para el día         {appointmentData.date} por la
                                                    {appointmentData.shift === "morning" ? (" mañana "): null}
                                                    {appointmentData.shift === "afternoon" ? (" tarde "): null}
                                                    con {Artists[i]?.first_name }
                                                </h3> 

                                                <Button variant="success" 
                                                onClick={() => buttonHandlerCreateAppointment()} >Confirmar</Button>

                                            </div>

                                        ): null}
                                   
                                        {dateConfirmation === false ? (

                                            <div className="appointmentForm">

                                                <h3>Cuándo quieres venir?</h3>
                                                <Form.Group controlId="date">
                                                    <Form.Control
                                                        type="date"
                                                        name="date"
                                                        value={appointmentData.date}
                                                        onChange={dateHandler}
                                                    />
                                                </Form.Group>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    Por la mañana o tarde?
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="bg-dropdown">
                                                        <Dropdown.Item name="shift" value="morning" onClick={(e) => 
                                                        shiftHandler({shift: e.target.getAttribute("value")
                                                        })}
                                                        >Mañana</Dropdown.Item>
                                                        <Dropdown.Item name="shift" value="afternoon" onClick={(e) => 
                                                        shiftHandler({shift: e.target.getAttribute("value")
                                                        })}
                                                        >Tarde</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>
                                        ): null}
                                        
                                       
                                    </div>

                                ): null }
                                
                            </Card.Body>
                         </Card>
                        )
                    })}
            </div>
        
        </div>
    )
}