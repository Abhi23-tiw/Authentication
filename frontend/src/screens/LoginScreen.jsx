import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <label className="form-label" for="form2Example1">Email address</label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Link to="/emailScreen" style={{
          display: 'block',
          marginTop: '10px',
          textAlign: 'left',
          textDecoration: 'none',
          color: 'blue',
        }}
          onMouseOver={e => e.currentTarget.style.color = '#0056b3'}
          onMouseOut={e => e.currentTarget.style.color = '#007bff'}>Forgot Password?</Link>
        <Button
          disabled={isLoading}
          type='submit'
          className="btn btn-primary btn-block mb-4"
          style={{ display: 'block', margin: '40px auto', width: '50%' }}
        >
          Login
        </Button>
      </Form>

      {isLoading && <Loader />}
      <div className="text-center">
        <p>Not a member?  <Link to='/password' style={{ color: 'blue', textDecoration: 'none' }}>Sign up </Link></p>
        <button className="button" style={{
                maxWidth: '320px',
                margin: '40px auto',
                display: 'flex',
                padding: '0.5rem 1.4rem',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                fontWeight: '700',
                textAlign: 'center',
                textTransform: 'uppercase',
                verticalAlign: 'middle',
                alignItems: 'center',
                borderRadius: '0.5rem',
                border: '1px solid rgba(0, 0, 0, 0.25)',
                gap: '0.75rem',
                color: 'rgb(65, 63, 63)',
                backgroundColor: '#fff',
                cursor: 'pointer',
                transition: 'all 0.6s ease',
            }}>
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" style={{height: '24px'}}>
  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
</svg>
  Continue with Google
</button>
      </div>

    </FormContainer>
  );
};

export default LoginScreen;
