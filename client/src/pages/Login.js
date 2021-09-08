import { Container, Row, Col } from 'react-bootstrap';

import LoginForm from '../components/LoginComponents/LoginForm';
import Panel from '../components/LoginComponents/Panel';
import Footer from '../components/LoginComponents/Footer';

const Login = () => {
    return <div>
        <Container>
            <Row style={{'height': '75vh'}}>
                <Col className='sm-6 md-6'>
                    <Panel/>      
                </Col>
                <Col className='sm-6 md-6'>
                    <LoginForm/>
                </Col>
            </Row>             
        </Container>
        <Footer/>      
    </div>
};

export default Login;