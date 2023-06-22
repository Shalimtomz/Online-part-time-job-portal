// import Navbar from "../Components/Navbar.jsx";
import { useState } from 'react';
import '../../styles/StudentAuth.css';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function StudentLogin(props) {
    const [data, setData] = useState({ userName: "", passWord: "" });
    const [Cookies, setCookies] = useCookies(["access_token_s"]);
    const navigate = useNavigate();
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
            const response = await axios.post("http://localhost:3002/studentauth/login",
                {
                    userName: data.userName,
                    passWord: data.passWord
                });
            console.log(response);
            if (response.data.message === "User does not exist")
                alert("Incorrect Username");
            else if (response.data.message === "Incorrect Password")
                alert("Incoorect Password");
            else if (response.data.message === "You are successfully logined in"){
                alert("You have been logined")
                setCookies("access_token_s", response.data.token);
                window.localStorage.setItem("s_userId", response.data.userId);
            }
                
        }
        catch (err) {
            console.log(err);
        }
        navigate("/shome")
    }
    return (
      
        <div className='authCentreDiv'>
            <div className="about-section">
                <h2>Student authentication</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, sapien nec eleifend aliquam, ex nibh lacinia justo, et volutpat lorem massa ac urna.</p>
                <p>Pellentesque at magna at arcu vehicula euismod sed a nunc. In et sem ut elit pharetra fringilla ut vitae libero.</p>
            </div>
            <div className="signup-section">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      
                        <input placeholder='email id' type="text" id="name" name="userName" value={data.userName} onChange={handleChange} required></input>
                    </div>
                    <div className="form-group">
                    
                        <input placeholder='password' type="password" id="password" name="passWord" value={data.passWord} onChange={handleChange} required></input>
                    </div>
                    <div className="form-group">
                        <button type="Submit">Submit</button>
                        <button onClick={props.RegOrLog}>No account? create one</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export { StudentLogin };