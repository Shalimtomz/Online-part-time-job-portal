import { useState } from 'react';
import '../../styles/PostJobForm.css'
import GetUserId from '../Common/GetUserId';
import axios from 'axios';
function PostJobForm(prop) {
    const isPopupOpen = true
    const [Data,setData]=useState({title:"",date:'',no_stud:0})
    const userId=GetUserId("jm_userId");
    function handleChange(event){
        const name=event.target.name;
        const value=event.target.value;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event){
        event.preventDefault();
        console.log(Data);
        try{
            const res=await axios.post("http://localhost:3002/newjob",{
                jmid:userId,
                title:Data.title,
                date:Data.date,
                no_stud:Data.no_stud

            });
            console.log(res);
            prop.openpopUp_nj();
            alert(res.data.message);

        }catch(err){
            console.log(err);
        }
        
    }
    return (

        <div className={`popup-container ${isPopupOpen ? 'active' : ''}`}>
            <div className="popup-content">
            <h1>Create New Job</h1>
            <form onSubmit={handleSubmit} >
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={Data.title} onChange={handleChange} required></input>
              </div>

              <div className="form-group">
                <label htmlFor="datetime">Date and Time:</label>
                <input type="date" id="date" name="date" value={Data.date} onChange={handleChange} required></input>
              </div>

              
              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp Group Link:</label>
                <input type="text" id="whatsapp" name="whatsapp" required></input>
              </div>
              
             
              
              <div className="form-group">
                <label htmlFor="students">Number of Students Needed:</label>
                <input type="number" id="no_stud" name="no_stud" value={Data.no_stud} onChange={handleChange} required></input>
              </div>

              <div className="form-group">
                <input type="submit" value="Submit"></input>
              </div>

              <div className="form-group">
                <button onClick={prop.openpopUp_nj}>CANCEL</button>
              </div>
            </form>
            </div>
        </div>
    )
}

export { PostJobForm };