import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { Artists } from "../Artists/Artists"
import { Appointments } from "../Appointments/Appointments"
import { ArtistAppointments } from "../ArtistAppointments/ArtistAppointments"
import { AdminAppointments } from "../AdminAppointments/AdminAppointments"
import { Profile } from "../Profile/Profile"
// import { Admin } from "../Admin/Admin"
import { Login } from "../Login/Login"


export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/myappointments" element={<Appointments/>}/>
                <Route path="/myappointmentsArtists" element={<ArtistAppointments/>}/>
                <Route path="/Allappointments" element={<AdminAppointments/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/artists" element={<Artists />} />
                {/* <Route path="/admin" element={<Admin />} /> */}
                
            </Routes>
        </>
    )
}