import { response } from "express";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import { forgetPassword } from "../../../backend/helper/ForgotPassword";

const ForgetPassword = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },  
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid Email Address ").required("Required "),

        }),
        onSubmit: (values) => {
            axios
                .post("users/forgetPassword", values)
                .then((response) => {
                    toast.success("Email sent successfully ");
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        toast.error.status("Email not found ");
                    } else {
                        toast.error("Server error ");
                    }
                });
        },
    });
    return (
        <>
            <div className="password-reset-container">
                <form onSubmit={handleSubmit}>
                    <h2>Enter your email </h2>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                        />
                    </div>
                    <Link to='/emailscreen'><button type="submit" className="send">Send </button></Link>
                </form>
            </div>
        </>
    );
};

export default ForgetPassword;