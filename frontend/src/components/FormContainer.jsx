import { Container, Row, Col } from 'react-bootstrap';
import '../index.css';

const FormContainer = ({ children }) => {
  return (
  <>
    <div className="form-container">{children}</div>;
    </>
  );
};

export default FormContainer;
