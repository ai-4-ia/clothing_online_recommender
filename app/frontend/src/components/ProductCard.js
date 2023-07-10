import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Appbutton from '../pieces/Button/Appbutton'
import Rating from './Rating'
import './ProductCard.css'
const ProductCard = (props) => {
  const {product} = props
  return (
    <>
      <div className='product'>
        <div className='top'>
          <Link to={`/product/${product._id}`}>
            <img src={product.info[0].imageLink} alt='' />
          </Link>
          <div className='controls'>
            {
              <Appbutton clickEvent={()=>{

              }} text='View' className='big'>

              </Appbutton>
            }
          </div>
        </div>
        <div className='bottom'> 
            <div className='name'>
              <span>{product.info[0].name}</span>
              <Rating 
                    value={product.info[0].rating} 
                    text={`${product.info[0].numReviews} reviews`} 
                />
                <h3 className='price'>${product.info[0].price}</h3>
            </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard