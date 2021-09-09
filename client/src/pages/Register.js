import Wrapper from '../components/registerComponents/Wrapper';
import RegisterForm from '../components/registerComponents/RegisterFrom';
const Register = () => {
    return (
        <Wrapper>
            <div className='d-flex justify-content-center align-items-center' style={{'height': '100vh'}}>
                <RegisterForm/>
            </div>
        </Wrapper>
    );
};

export default Register;