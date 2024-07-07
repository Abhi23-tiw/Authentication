import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const CheckEmail = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/password-reset", {
            email,
        }).then(response => {
            if (response.data.status) {
                alert("Check your email ");
                navigate('/login');
            }
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', padding: '20px' }}>
            <img src="https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_640.png" style={{ width: '100px', marginBottom: '20px' }} alt="Email" />
            <form className="form" style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
                <div className="title"><h2>Enter your email</h2></div>
                <p className="message">We will send a password reset link to the provided email</p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: '100%',               
                        padding: '0.5rem',           
                        fontSize: '1rem',            
                        border: '1px solid #ccc',    
                        borderRadius: '0.25rem',     
                        marginBottom: '1rem',        
                        boxSizing: 'border-box',     
                        outline: 'none',             
                        transition: 'border-color 0.3s', 
                    }}
                />
                <br />
                <div className="inputs">
                    <button className="btn btn-primary btn-block mb-4" type="submit" style={{ display: 'block', margin: '10px auto', width: '50%' ,backgroundColor: 'blue', color: 'white', borderRadius: '10px', width: '180px', border: 'none', height: '46px',fontSize: '1.2rem'}}>Send</button>
                </div>
                <div className='resend' style={{ marginTop: '20px' }}>
                    <p>Didn't receive the email? <a href="#">Click to resend</a></p>
                    <Link to='/login' style={{ color: 'black', textDecoration: 'none' }}><p>Back to log in</p></Link>
                </div>
            </form>
        </div>
        </>
    );
};

export default CheckEmail;
