import {Link} from "react-router-dom";
import {useCookies} from 'react-cookie';
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import '../../styles/Navbarjm.css'
function NavbarJm (prop){
    const [Cookies,setCookies]=useCookies(["access_token_jm"]);
    const navigate=useNavigate();
    const [NavElements, setNavElements] = useState({ N_ToS: false, N_Home: false, N_NewJob: false,N_Logout:false })
    useEffect((() => {
        setNavElements({
            N_ToS: false, N_Home: false, N_NewJob: false,N_Logout:false
        })
        setNavElements({
            N_ToS: prop.N_ToS, N_Home: prop.N_Home, N_NewJob: prop.N_NewJob,N_Logout:prop.N_Logout
        })
        console.log(NavElements)
    }
    ), [])
    function logout(){
        setCookies("access_token_jm","");
        window.localStorage.removeItem("jm_userId");
        navigate("/jmauth")
    }

    function ToS(){
        navigate("/shome")
    }
    return(
        <nav>
            
            <div className="navDiv">
            {NavElements.N_Home && <Link to="/jmhome">Home</Link> }
            {NavElements.N_NewJob && <button onClick={prop.openpopUp_nj}>Create new Job</button> }
            {NavElements.N_Logout && <button onClick={logout}>Logout</button> }
            {NavElements.N_ToS&& <button className="button-17" onClick={ToS}>Are you a Student</button> }
            
        </div>
        </nav>
        
    )
}
export default NavbarJm;

