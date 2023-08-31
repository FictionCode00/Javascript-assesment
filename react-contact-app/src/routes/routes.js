import { Route, Routes } from "react-router-dom"
import Contacts from "../components/contact"
import AddContact from "../components/addContact";


const AppRoutes=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<Contacts/>} />
            <Route path="/add" element={<AddContact/>} />
        </Routes>
        </>
    )
}

export default AppRoutes;