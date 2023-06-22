import { useEffect, useState } from 'react';
import NavbarJm from '../../Components/JobManager/NavbarJm.jsx'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import '../../styles/JmHome.css'
import Footer from '../../Components/Common/Footer.jsx';
import GetUserId from '../../Components/Common/GetUserId.jsx';
import { PostJobForm } from '../../Components/JobManager/PostJobForm.jsx';
import JMleft_section from '../../Components/JobManager/JMleft_section.jsx';
import JMjobcards from '../../Components/JobManager/JMjobcards.jsx';
import JMright_section from '../../Components/JobManager/JMright_section.jsx';
import { ShowApplications } from '../../Components/JobManager/ShowApplications.jsx';


function JmHome() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([])
    const [cookie, setCookie] = useCookies("access_token_jm");
    useEffect(function () {
        if (!cookie.access_token_jm) {
            console.log("No cookie")
            navigate("/jmauth")
        }
    }, [])
    const [popUp_nj, setpopUp_nj] = useState(false);
    const [popUp_apl, setpopUp_apl] = useState({ toggle: false, pjid: "645cd9471399ba7c481c6709" });
    function handlepopUp_nj() {
        setpopUp_nj(!popUp_nj);
    }
    function handlepopUp_apl(toggle,pjid) {
        setpopUp_apl({toggle:toggle,pjid:pjid});
    }

    function refreshJobs(){

    }

    return (
        <div>
            <NavbarJm openpopUp_nj={handlepopUp_nj} N_Home={true} N_Logout={true} N_NewJob
            ={true} />
            <div className="main-content">
                <JMleft_section />
                <JMjobcards openpopUp_apl={handlepopUp_apl} />
                <JMright_section />
            </div>
            {popUp_nj && <PostJobForm openpopUp_nj={handlepopUp_nj} refreshJobs={refreshJobs}/>}
            {popUp_apl.toggle && <ShowApplications pjid={popUp_apl.pjid} openpopUp_apl={handlepopUp_apl} />}


            <Footer />
        </div>
    )


}
export default JmHome;