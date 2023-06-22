import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Job_Card.module.css'
import axios from 'axios';
import GetUserId from '../Common/GetUserId';

function JMjobcards(prop) {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([])
    useEffect(function () {
        async function fetchJobs() {
            const userId=GetUserId("jm_userId");
            const response = await axios.get(`http://localhost:3002/jmhome?userId=${userId}`);
            console.log(response);
            if(response.data.message!== "Server not connceted")
                setJobs(response.data);
        }
        fetchJobs();
    }, []);

    function handleShowApplicaions(index){
        const pjid=jobs[index]._id;
        prop.openpopUp_apl(true,pjid);
    }

    return (
        <div className={styles.center_section}>
            <h1>My Jobs</h1>
            {jobs.map((job, index) => (
                <div className={styles.job_card} key={index}>
                    <h2>{job.title}</h2>
                    <p>this is some job </p>
                    <div className={styles.job_footer}>
                        <div className={styles.job_eligibility}>Eligibility</div>
                        <button className={styles.registration_button} onClick={function (){
                            handleShowApplicaions(index);
                        }}>See Applications</button>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default JMjobcards;