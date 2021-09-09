import { Container, Row, Col} from 'react-bootstrap';

import './Wrapper.css';

const Wrapper = ({ children }) => {
    return (
        <div className='wrapper'>
            <Container>
                <Row>
                    <Col className='sm-6 md-4'>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Wrapper;