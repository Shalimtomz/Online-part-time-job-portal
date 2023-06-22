import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
//import '../../styles/StudentHome.css'
import styles from '../../styles/Job_Card.module.css'
import axios from 'axios';
import GetUserId from '../Common/GetUserId';
import { CiCalendarDate } from "react-icons/ci";
import { IoMdPeople } from "react-icons/io";

import moment from 'moment'

function SHjobcards() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([])
    async function fetchJobs() {
        const response = await axios.get(`http://localhost:3002/studenthome?sid=${GetUserId("s_userId")}`);
        console.log(response);
        setJobs(response.data);
    }
    useEffect(function () {
        fetchJobs();
    }, []);

    async function handleJobRegister(index) {
        const pjid = jobs[index]._id;
        await axios.post("http://localhost:3002/applyjob", { pjid: pjid, sid: GetUserId("s_userId"), action: "register" });
        alert("Job registered successfully");
        fetchJobs();
    }

    function dateFormatter(date) {
        const formattedDate = moment.utc(date).utcOffset(0).format('DD MMMM YYYY');

        console.log(formattedDate); // Output: "24 May 2023"
        return(
            <p>{formattedDate}</p>
        )
    }
    return (
        <div className={styles.center_section}>
            {jobs.map((job, index) => (
                <div className={styles.job_card} key={index}>
                    <h2>{job.title}</h2>
                    <p>this is some job </p>
                    <div className={styles.job_eligibility}>Eligibility</div>
                    <div className={styles.job_footer}>
                        <span className={styles.dateSpan}><CiCalendarDate size={'1.5em'}/>{dateFormatter(job.date)}</span>
                        <span className={styles.dateSpan}><IoMdPeople size={'1.5em'} /><p>{job.no_stud_applied}/{job.no_stud}</p></span>
                        <button className={styles.registration_button} onClick={function () {
                            handleJobRegister(index);
                        }}>Register</button>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default SHjobcards;