import React from 'react';
import { Link } from 'react-router-dom';
import Appbutton from '../../pieces/Button/Appbutton';
import Rating from '../Rating/Rating';
import './ProductCard.css';
const ProductCard = (props) => {
    const { product } = props;
    const getDiscount = () => {
        const discount =
            typeof product.info !== 'undefined'
                ? (
                      ((product.info[0].price_org -
                          product.info[0].price_sale) /
                          product.info[0].price_org) *
                      100
                  ).toFixed(0)
                : (
                      ((product.price_org - product.price_sale) /
                          product.price_org) *
                      100
                  ).toFixed(0);
        return discount;
    };
    const discountNum = getDiscount();
    return (
        <>
            <div className="productCard">
                <div className="productLogo">
                    <div className="productDiscount">
                        {discountNum != 0 ? `${discountNum}% OFF` : <></>}
                    </div>
                    <i className="productFavorite fas fa-heart"></i>
                </div>
                <div className="productImage">
                    <Link to={`/product/${product._id}`}>
                        <img
                            src={
                                typeof product.info !== 'undefined'
                                    ? product.info[0].imageLink
                                    : product.imageLink
                            }
                        />
                    </Link>
                    <div className="controls">
                        {
                            <Appbutton
                                clickEvent={() => {}}
                                text="View"
                                className="big"
                            ></Appbutton>
                        }
                    </div>
                </div>
                <div className="productDetail">
                    <span className="productName">
                        {typeof product.info !== 'undefined'
                            ? product.info[0].name
                            : product.name}
                    </span>
                    <span className="productBrand">
                        {typeof product.info !== 'undefined'
                            ? product.info[0].brand
                            : product.brand}
                    </span>
                    <Rating
                        value={
                            typeof product.info !== 'undefined'
                                ? product.info[0].rating
                                : product.rating
                        }
                        text={`${
                            typeof product.info !== 'undefined'
                                ? product.info[0].numReviews
                                : product.numReviews
                        } reviews`}
                        textShow="no"
                    />
                </div>
                <div className="productPrice">
                    <div className="productPriceSale">
                        $
                        {typeof product.info !== 'undefined'
                            ? product.info[0].price_sale
                            : product.price_sale}
                    </div>
                    {discountNum != 0 ? (
                        <div className="productPriceOrg">
                            $
                            {typeof product.info !== 'undefined'
                                ? product.info[0].price_org
                                : product.price_org}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductCard;
