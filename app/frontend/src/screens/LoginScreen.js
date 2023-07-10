import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import './LoginScreen.css';

const LoginScreen = () => {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [securityCode, setSecurityCode] = useState();
    const [securityKey, setSecurityKey] = useState(getRandomInt(1000, 9999));
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const redirect = location.search ? location.search.split('=')[1] : '/';
    useEffect(() => {
        if (userInfo) {
            history(redirect);
        }
    }, [history, userInfo, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (securityCode == securityKey){
            dispatch(login(email, password));
        }
        else{
            setMessage('Wrong security code');
        }
    };
    return (
        <>
            <div className="authorize">
                <div className="wrapper">
                    <div className="authorize--input">
                        <div className="heading">
                            <h2>Login</h2>
                            {error && (
                                <Message variant="danger">{error}</Message>
                            )}
                            {loading && <Loader />}
                            {message && (
                                <Message variant="danger">{message}</Message>
                            )}
                            <span>
                                Don't have an account?{' '}
                                <Link
                                    to={
                                        redirect
                                            ? `/register?redirect=${redirect}`
                                            : '/register'
                                    }
                                >
                                    Create here
                                </Link>
                            </span>
                        </div>
                        <div className="authorize--form">
                            <form onSubmit={submitHandler} className="form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <input
                                            type="text"
                                            placeholder="Username or Email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="security">
                                    <input
                                        type="text"
                                        placeholder="Security code"
                                        value={securityCode}
                                        onChange={(e) => {
                                            setSecurityCode(e.target.value);
                                        }}
                                    />
                                    <span>
                                        <b className="text1">
                                            {(securityKey -
                                                (securityKey % 1000)) /
                                                1000}
                                        </b>
                                        <b className="text2">
                                            {((securityKey -
                                                (securityKey % 100)) /
                                                100) %
                                                10}
                                        </b>
                                        <b className="text3">
                                            {(((securityKey -
                                                (securityKey % 10)) /
                                                10) %
                                                100) %
                                                10}
                                        </b>
                                        <b className="text4">
                                            {securityKey % 10}
                                        </b>
                                    </span>
                                </div>
                                <div className="right--footer">
                                    <div className="remember">
                                        <input type="checkbox" />
                                        <span>Remember me</span>
                                    </div>
                                    <a href="../page/forgotpassword.html">
                                        Forgot password
                                    </a>
                                </div>
                                <div className="button">
                                    <button className="btn">
                                        <span>Log in</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <FormContainer>
                <h1>Sign In</h1>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="abc@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password123"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group> */}
            {/* {/* <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer?{' '}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : '/register'
                            }
                        >
                            Register
                        </Link>
                    </Col>
                </Row>
            </FormContainer> */}
        </>
    );
};

export default LoginScreen;
