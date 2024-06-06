import SubmitButton from "./components/SubmitButton";
import {useState} from "react";
import UsernameInput from "./components/UsernameInput";
import {setUsername} from "../store/actions/dashboardActions";
import {connect} from "react-redux";
import { useNavigate } from 'react-router-dom';
import logo from '../resources/logo.png';
import './LoginPage.css';

const LoginPage = ({ saveUsername }) => {
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const handleSubmitButtonPressed = () => {
        registerNewUser(username);
        saveUsername(username);
        navigate('/dashboard');
    };

    return (
        <div className='login-page_container background_main_color'>
            <div className='login-page_login_box background_secondary_color'>
                <div className='login-page_logo_container'>
                    <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
                </div>
                <div className='login-page_title_container'>
                    <h2>Get on Board</h2>
                </div>
                <UsernameInput username={username} setUsername={setUsername}/>
                <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed}/>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUsername: username => dispatch(setUsername(username))
    };
};

export default connect(null, mapDispatchToProps)(LoginPage);