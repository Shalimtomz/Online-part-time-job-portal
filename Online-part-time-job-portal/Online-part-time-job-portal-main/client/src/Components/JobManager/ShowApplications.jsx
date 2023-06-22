import { useEffect, useState } from 'react';
import '../../styles/ShowApplications.css'
import axios from 'axios';
function ShowApplications(prop) { // need postedjob id and a functioon to close this popup
  console.log(prop.pjid);
  const [Appls, setAppls] = useState([]);
  async function fetchAppl(pjid) {
    const response = await axios.get(`http://localhost:3002/getappl?pjid=${pjid}`)
    setAppls(response.data);
    console.log("here is the application data")
    console.log(response.data)
  }
  useEffect((function () {
    fetchAppl(prop.pjid);
  }), []);
  const isPopupOpen = true
  async function handleDecision(index, event) {
    const name = event.target.name;
    let status = "Pending"
    const aid = Appls[index]._id
    console.log(aid);
    if (name === "Accept") {
      status = "Accepted";
    }
    else if (name === "Reject") {
      status = "Rejected"
    }
    const res = axios.post("http://localhost:3002/approve", {
      aid: aid,
      status: status
    })
    alert("The application has been " + status);


  }
  return (

    <div className={`popup-container ${isPopupOpen ? 'active' : ''}`}>
      <div className="popup-content">
        <h1>Applications</h1>
        <table>
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Student Name</th>
              <th>Eligibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Appls.map((Appl, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{Appl.sid.fullName}</td>
                <td>Eligible</td>
                <td className="button-container">
                  <button className="button" name='Accept' onClick={(event) => handleDecision(index, event)}>Accept</button>
                  <button className="button reject" name='Reject' onClick={(event) => handleDecision(index, event)}>Reject</button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
        <button onClick={() => prop.openpopUp_apl(false, "645cd9471399ba7c481c6709")}>CANCEL</button>
      </div>
    </div>
  )
}

export { ShowApplications };