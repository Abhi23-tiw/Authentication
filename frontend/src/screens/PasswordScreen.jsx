import React, { useState } from 'react';
import '../assets/PasswordReset.css'
import { Link, Navigate, useParams } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from "yup"
import { toast } from 'react-toastify';
import { axios } from 'axios';
import { response } from 'express';

const PasswordResetForm = () => {
  const [password,setConfirmPassword] = useState("");
  const {token} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/resetPassword/"+token,{
      password,
    }).then(response=>{
      if(response.data.status){
        Navigate('/login')
      }
      console.log(response.data)
    }).catch(err=>{
      console.log(err); 
    })
  };

  return (
    <div className="password-reset-container">
      <form className="password-reset-form" onSubmit={handleSubmit}>
        <h2>Set new password</h2>
        <p>Your new password must be different from previously used passwords.</p>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
          <small>Must be at least 8 characters.</small>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Link to='/emailscreen'><button type="submit" className="reset-button">Reset password</button></Link>
        <Link to='/login'><button type="button" className="back-button">Back to log in</button></Link>
      </form>
    </div>
  );
};

export default PasswordResetForm;
