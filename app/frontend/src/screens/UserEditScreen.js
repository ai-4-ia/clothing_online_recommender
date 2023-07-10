import React, {useState, useEffect } from 'react'; 
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getuserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstant';

const UserEditScreen = () => {   
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const location = useLocation();
    const params = useParams()
    const dispatch = useDispatch();
    const history = useNavigate()
    const userId = params.id
    const userDetail = useSelector( (state) => state.userDetails);
    const { loading, error, user } = userDetail;
    const userUpdate = useSelector( (state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;
    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_ADMIN_RESET })
            history('/admin/userlist')
        }
        else{
            if(!user.name || user._id !== userId){
                dispatch(getuserDetails(userId))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[user, dispatch, userId, successUpdate, history])

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }

    return (
        <div className='grid'>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <FormContainer>
                <h1>Edit User</h1>
                {loading
                ?<Loader />
                :error
                ?<Message variant='danger'>{error}</Message>
                :(
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Katherine Notid'
                            value={name}
                            onChange={(e) =>{
                                setName(e.target.value)
                            }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>
                                Email Address
                            </Form.Label>
                            <Form.Control
                            type='email'
                            placeholder='abc@example.com'
                            value={email}
                            onChange={(e) =>{
                                setEmail(e.target.value)
                            }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin'>
                            <Form.Check
                            type='checkbox'
                            label='Is Admin?'
                            checked={isAdmin}
                            onChange={(e) =>{
                                setIsAdmin(e.target.checked)
                            }}>
                            </Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )
            }
            </FormContainer>      
        </div>
    )
}

export default UserEditScreen