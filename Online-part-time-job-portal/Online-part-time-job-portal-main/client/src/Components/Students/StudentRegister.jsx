// import Navbar from "../Components/Navbar.jsx";
import { useState } from 'react';
import '../../styles/StudentAuth.css';
import axios from 'axios';
function StudentRegister(props) {
    const [data, setData] = useState({ fullName:"",userName: "", passWord: "" });
    function handleChange(event) {
        const { value, name } = event.target;

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/studentauth/register",
                {
                    fullName:data.fullName,
                    userName: data.userName,
                    passWord: data.passWord
                });
            if (response.data.message === "User registered successfully")
                alert("Registration completed")
            else {
                alert("Username already exist")
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='authCentreDiv'>
            <div className="about-section">
                <h2>Student authentication</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, sapien nec eleifend aliquam, ex nibh lacinia justo, et volutpat lorem massa ac urna.</p>
                <p>Pellentesque at magna at arcu vehicula euismod sed a nunc. In et sem ut elit pharetra fringilla ut vitae libero.</p>
            </div>
            <div className="signup-section">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input placeholder='Full Name' type="text" id="fullName" name="fullName" value={data.fullName} onChange={handleChange} required></input>
                    </div>

                    <div className="form-group">
                        <input placeholder='email id' type="email" id="userName" name="userName" value={data.userName} onChange={handleChange} required></input>
                    </div>

                    <div className="form-group">
                        <input placeholder='Password' type="password" id="password" name="passWord" value={data.passWord} onChange={handleChange} required></input>
                    </div>

                    <div className="form-group">
                        <button type="Submit">Submit</button>
                        <button onClick={props.RegOrLog}>Alredy have an account</button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export { StudentRegister };