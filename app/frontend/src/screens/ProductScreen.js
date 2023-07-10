import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetail, reviewProduct } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import './ProductScreen.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Appbutton from '../pieces/Button/Appbutton';
import { LinkContainer } from 'react-router-bootstrap';
const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [review, setReview] = useState(false);
    const params = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetail;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productReview = useSelector((state) => state.productReview);
    const { success: successReview, error: errorReview } = productReview;

    useEffect(() => {
        if (successReview) {
            alert('Thank for your review!');
            setRating(0);
            setComment('');
            dispatch({
                type: PRODUCT_REVIEW_RESET,
            });
        }
        dispatch(listProductDetail(params.id));
    }, [dispatch, params, successReview]);

    const addToCartHandler = () => {
        history(`/cart/${params.id}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        // setReview(false)
        dispatch(
            reviewProduct(params.id, {
                rating,
                comment,
            }),
        );
    };
    const imgrow = (
        <>
            <SideBySideMagnifier
                alwaysInPlace={true}
                imageSrc={product.imageLink}
                interactionSettings={{ tapDurationInMs: 300 }}
            />
            <img src={product.imageLink} alt=""></img>
        </>
    );
    return (
        <>
            {typeof loading === 'undefined' ? (
                <Loader />
            ) : loading ? (
                <Loader />
            ) : (
                <div className="grid">
                    <div className="product_breadcrumbs">
                        <LinkContainer to={`/`} style={{ cursor: 'pointer' }}>
                            <span>Home / </span>
                        </LinkContainer>
                        <LinkContainer
                            to={`/shop`}
                            style={{ cursor: 'pointer' }}
                        >
                            <span>Product List / </span>
                        </LinkContainer>
                        <span className="product_breadcrumbs_name">
                            {product.name}
                        </span>
                    </div>
                    <div className="productcontainer">
                        <div className="productpage">
                            <div className="productinfo">
                                <div className="productpageimg">
                                    <div className="imgwrapper">
                                        <Carousel
                                            infiniteLoop
                                            swipeable={false}
                                        >
                                            {imgrow}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="productcontparent">
                                    <div className="productpagecont">
                                        <div className="producttitle">
                                            <h2>{product.name}</h2>
                                            <h3>${product.price}</h3>
                                        </div>
                                        <div className="productrating">
                                            <Rating
                                                value={product.rating}
                                                text={`${product.numReviews} reviews`}
                                            />
                                        </div>
                                        <div className="productdescription">
                                            {product.description}
                                        </div>
                                        <div className="productbox">
                                            <div className="product_status">
                                                <span>Status</span>
                                                {product.countInStock > 0 ? (
                                                    <span>In stock</span>
                                                ) : (
                                                    <span>Out of stock</span>
                                                )}
                                            </div>
                                            <div className="product_quantity">
                                                <span>Quantity</span>
                                                {product.countInStock > 0 && (
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock,
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {' '}
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                )}
                                            </div>
                                            <div className="product_button flex_display">
                                                <Appbutton
                                                    clickEvent={
                                                        addToCartHandler
                                                    }
                                                    className="btn-lock"
                                                    disabled={
                                                        product.countInStock ===
                                                        0
                                                    }
                                                    text="Add To Cart"
                                                    icon="fa-solid fa-cart-plus"
                                                />
                                                <Appbutton
                                                    clickEvent={
                                                        addToCartHandler
                                                    }
                                                    icon="fas fa-heart"
                                                />
                                            </div>
                                            {/* <Card>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Status:</Col>
                                                            <Col>
                                                                {product.countInStock >
                                                                0
                                                                    ? 'In stock'
                                                                    : 'Out of stock'}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    {product.countInStock >
                                                        0 && (
                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>
                                                                    Quantity:
                                                                </Col>
                                                                <Col>
                                                                    {
                                                                        <Form.Control
                                                                            as="select"
                                                                            value={
                                                                                qty
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                setQty(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                        >
                                                                            {[
                                                                                ...Array(
                                                                                    product.countInStock,
                                                                                ).keys(),
                                                                            ].map(
                                                                                (
                                                                                    x,
                                                                                ) => (
                                                                                    <option
                                                                                        key={
                                                                                            x +
                                                                                            1
                                                                                        }
                                                                                        value={
                                                                                            x +
                                                                                            1
                                                                                        }
                                                                                    >
                                                                                        {' '}
                                                                                        {x +
                                                                                            1}
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </Form.Control>
                                                                    }
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    )}
                                                    <ListGroup.Item>
                                                        <Appbutton
                                                            clickEvent={
                                                                addToCartHandler
                                                            }
                                                            className="btn-lock"
                                                            disabled={
                                                                product.countInStock ===
                                                                0
                                                            }
                                                            text="Add To Cart"
                                                        />
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="productreviews">
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && (
                                    <h6>Be the first one reviews this product</h6>
                                )}
                                {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating
                                                    value={review.rating}
                                                ></Rating>
                                                <p>
                                                    {review.createdAt.substring(
                                                        0,
                                                        10,
                                                    )}
                                                </p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                <Button onClick={()=>{setReview(true)}}>Preview this Product</Button>
                                {review && (
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h6>Preview This Product</h6>
                                            {errorReview && (
                                                <Message variant="danger">{errorReview}</Message>
                                            )}
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId="rating">
                                                        <Form.Label>
                                                            Rating
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={rating}
                                                            onChange={(e) =>
                                                                setRating(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                Select...
                                                            </option>
                                                            <option value="1">
                                                                Poor
                                                            </option>
                                                            <option value="2">
                                                                Below Average
                                                            </option>
                                                            <option value="3">
                                                                Average
                                                            </option>
                                                            <option value="4">
                                                                Good
                                                            </option>
                                                            <option value="5">
                                                                Very Good
                                                            </option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>
                                                            Comment
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            row="12"
                                                            value={comment}
                                                            onChange={(e) =>
                                                                setComment(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        type="submit"
                                                        variant="primary"
                                                    >
                                                        Done with my review
                                                    </Button>
                                                </Form>
                                            ) : (
                                                <Message>
                                                    Please{' '}
                                                    <Link to="/login">
                                                        Sign In
                                                    </Link>{' '}
                                                    To Review
                                                </Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <Link className='btn btn-primary my-3' to='/'>
                        BACK TO HOMEPAGE
                    </Link>
                    {typeof loading === 'undefined'
                    ? <Loader />
                    : loading
                    ? <Loader />
                    : error
                    ? <Message variant='danger'>{error}</Message>
                    :(
                    <>
                    <Row>
                        <Col md={6}>
                            <Image src={`${product.image}`} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating 
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {`Price: ${product.price}`}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {`Description: ${product.description}`}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0
                                                ? 'In stock'
                                                : 'Out of stock'
                                                }
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                        <Row>
                                            <Col>
                                            Quantity:
                                            </Col>
                                            <Col>
                                            { <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange = {(e) => setQty(e.target.value)}>
                                                {([...Array(product.countInStock).keys()].map( x =>
                                                <option key={x+1} value={x + 1}> {x + 1}</option>
                                            ))}
                                            </Form.Control>}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                        onClick={addToCartHandler} 
                                        className='btn-lock' 
                                        type='button'
                                        disabled={product.countInStock === 0}
                                        >
                                                ADD TO CART
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <h6>No Reviews</h6>}
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h6>Preview This Product</h6>
                                    {errorReview && <Message variant='danger'></Message>}
                                    {userInfo 
                                    ? (<Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control 
                                            as='select' 
                                            value={rating}
                                            onChange={e => setRating(e.target.value)}>
                                                <option value =''>Select...</option>
                                                <option value ='1'>Poor</option>
                                                <option value ='2'>Below Average</option>
                                                <option value ='3'>Average</option>
                                                <option value ='4'>Good</option>
                                                <option value ='5'>Very Good</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Comment
                                            </Form.Label>
                                            <Form.Control
                                            as='textarea'
                                            row='6'
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}>

                                            </Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='primary'>
                                            Done with my review
                                        </Button>
                                    </Form>)
                                    : <Message>Please <Link to='/login'>Sign In</Link> To Review</Message>}
                                </ListGroup.Item>
                                {product.reviews.map(review =>(
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}></Rating>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                    </>
                    )
                    } */}
                </div>
            )}
        </>
    );
};

export default ProductScreen;
