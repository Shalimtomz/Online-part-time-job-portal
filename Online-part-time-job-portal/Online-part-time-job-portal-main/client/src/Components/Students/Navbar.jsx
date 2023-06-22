import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import '../../styles/Navbar.css'
function Navbar(prop) {
    const [Cookies, setCookies] = useCookies(["access_token_s"]);
    const navigate = useNavigate();
    const [NavElements, setNavElements] = useState({ N_ToJM: false, N_Home: false, N_Noti: false,N_Logout:false,N_Apjbs:false })
    useEffect((() => {
        setNavElements({
            N_ToJM: false, N_Home: false, N_Noti: false,N_Logout:false,N_Apjbs:false
        })
        setNavElements({
            N_ToJM: prop.N_ToJM, N_Home: prop.N_Home, N_Noti: prop.N_Noti,N_Logout:prop.N_Logout,N_Apjbs:prop.N_Apjbs
        })
        console.log(NavElements)
    }
    ), [])
    function logout() {
        setCookies("access_token_s", "");
        window.localStorage.removeItem("s_userId");
        navigate("/sauth")
    }
    function ToJM(){
        navigate("/jmhome")
    }
    return (
        <nav>
            <div className="navDiv">
                {NavElements.N_Home && <Link to="/shome">Home</Link> }
                {NavElements.N_Logout && <button onClick={logout}>Logout</button> }
                {NavElements.N_Noti && <button onClick={() => prop.toggle_noti()}>Notifications</button> }
                {NavElements.N_Apjbs && <button onClick={() => prop.toggle_Apjbs()}>Applied Jobs</button> }
                {NavElements.N_ToJM && <button className="button-17" onClick={ToJM}>Are you a Employer</button> }
                
            </div>
        </nav>

    )
}
export default Navbar;

