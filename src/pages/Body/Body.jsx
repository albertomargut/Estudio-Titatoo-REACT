import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { Artists } from "../Artists/Artists"
import { Appointments } from "../Appointments/Appointments"
import { ArtistAppointments } from "../ArtistAppointments/ArtistAppointments"
import { ClientAppointments } from "../ClientAppointments/ClientAppointments"
import { AdminAppointments } from "../AdminAppointments/AdminAppointments"
import { Profile } from "../Profile/Profile"
import { Admin } from "../Admin/Admin"
import { Login } from "../Login/Login"
import { userData } from "../userSlice"
import { useSelector } from "react-redux"


export const Body = () => {
    const userRdxData = useSelector(userData)
    const isLoggedIn = userRdxData.credentials.token
  


    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/artists" element={<Artists />} />
                {isLoggedIn && (<>
                <Route path="/newappointments" element={<Appointments/>}/>
                <Route path="/myappointments" element={<ClientAppointments/>}/>
                <Route path="/myappointmentsArtists" element={<ArtistAppointments/>}/>
                <Route path="/Allappointments" element={<AdminAppointments/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                </>
                )}
            </Routes>
        </>
    )
}