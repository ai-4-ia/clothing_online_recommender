import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Appbutton from '../pieces/Button/Appbutton';
import './CategoryShop.css';
import Loader from './Loader';
import Message from './Message';
import ProductCard from './ProductCard';
import Scroll from './Scroll/Scroll';
const CategoryShop = (props) => {
    const { img, title, subtitle, category, products } = props;
    // props.category = 'shirt'
    const productslide = products.map((product) => (
        <ProductCard product={product} />
    ));
    return (
        <>
            <div className={`${category} containertype`}>
                <div className="frame">
                    <div className="framecont">
                        <h2>{title}</h2>
                        <h4>{subtitle}</h4>
                        <Link to={`./category/${category}`}>
                            <Appbutton
                                text={'View All'}
                                icon="fas fa-chevron-right"
                                className="reverse"
                            ></Appbutton>
                        </Link>
                    </div>
                    <img src={img} alt=""></img>
                </div>
            </div>
            {/* {products.map(product =>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductCard product={product} />
                </Col>
            ))} */}
            {/* {productslide} */}
            <Scroll productData={productslide}></Scroll>
        </>
    );
};

export default CategoryShop;
