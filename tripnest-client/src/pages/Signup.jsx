import { Link } from "react-router-dom";
import {useState} from "react";
import api from "./../services/api.js";
import {useNavigate} from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const [formData, setFormdata] = useState({
        name:'',
        email: '',
        password: '',
        confirmPassword:''
    });

    const handleChange = (e) => {
        const {id,value} = e.target;
        setFormdata((prev)=>({
            ...prev,
            [id]:value
        }));
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log("Submitted Form:",formData);
        try{
            const res = await api.post('/users/',
                {
                    name:formData.name,
                    email:formData.email,
                    password:formData.password,
                    confirmPassword:formData.confirmPassword
                }
            )
            console.log("Account created",res);
            if(res.data.status==='success'){
                alert('Account created successfully');
                navigate('/login');
            }
        }catch(err){
            console.log("Account was not created",err.response?.data);
        }
    }
    return (
        <div className="singuppage">
            <div className="signup-container">
                <h2>Create Your Account</h2>
                <form className="signup-form" onSubmit={handleSubmit}>

                    <div className="input-group1">
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={formData.name ? 'has-text' : ''}
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="name">Full Name</label>
                    </div>

                    <div className="input-group1">
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={formData.email ? 'has-text' : ''}
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="email">Email Address</label>
                    </div>

                    <div className="input-group1">
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={formData.password ? 'has-text' : ''}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="input-group1">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={formData.confirmPassword ? 'has-text' : ''}
                            required
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>

                    <button type="submit" className="signup-btn">Register</button>
                </form>

                <div className="logininsignup">
                    <h2>Already have an account?⬇️</h2>
                    <div className="logindiv">
                        <Link to="/login" className="logininsignupbutton">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup