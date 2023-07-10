import React, {useState, useEffect } from 'react'; 
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    useEffect (()=>{
        if (userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }
        else{
            history('/login')
        }
    }, [dispatch, userInfo, history])
  return (
    <div className='grid'>
        <h1>Orders</h1>
        {loading
        ?<Loader />
        : error
        ? <Message variant='danger'>{error}</Message>
        :(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Delevered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{
                                order.createdAt.substring(0, 10)
                            }</td>
                            <td>{
                            order.isPaid
                            ?(
                                order.paidAt.substring(0, 10)
                            ):(
                                <i className='fas fa-times'></i>
                            )
                            }
                            </td>
                            <td>{
                            order.isDelivered
                            ?(
                                order.deliveredAt.substring(0, 10)
                            ):(
                                <i className='fas fa-times'></i>
                            )
                            }
                            </td>
                            <td>${order.totalPrice}</td>
                            <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                    <Button variant='primary' className='btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
  )
}

export default OrderListScreen