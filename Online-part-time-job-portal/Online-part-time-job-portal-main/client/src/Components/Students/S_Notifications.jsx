import { useEffect, useState } from 'react';
import '../../styles/S_Notifications.css'
import axios from 'axios';
import GetUserId from '../Common/GetUserId';
function S_Notifications(prop) { // need  a function to close this popup
    const [Notis, setNotis] = useState([]);

    useEffect((function () {
        async function fetchNotis() {
            const sid=GetUserId('s_userId');
            const response = await axios.get(`http://localhost:3002/getnoti?sid=${sid}`)
            console.log(response);
            setNotis(response.data);
        }
        fetchNotis();
    }), []);
    const isPopupOpen = true
    async function handleDecision(index, event) { }


    return (

        <div className={`popup-container ${isPopupOpen ? 'active' : ''}`}>
            <div className="popup-content">
                <h1>Notifications</h1>

                {Notis.map((Noti,index)=>{
                        const status=Noti.status;
                        const title=Noti.aid.pjid.title;
                        return (
                        <div className="notification new">
                        <h2 className="title">About Your Job Application</h2>
                        <p className="details">Your Job Application for {title} has been {status}</p>
                    </div>
                    );
                }
                    )}
              




                <button onClick={() => prop.toggle_noti()}>CLOSE</button>
            </div>
        </div>
    )
}

export { S_Notifications };