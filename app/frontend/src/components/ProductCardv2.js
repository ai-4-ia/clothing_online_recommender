import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Appbutton from '../pieces/Button/Appbutton'
import Rating from './Rating'
import './ProductCardv2.css'
const ProductCardv2 = (props) => {
  const {product} = props
  return (
    <>
      <div className='product'>
        <div className='top'>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt='' />
          </Link>
          <div className='controls'>
            {
              <Appbutton clickEvent={()=>{

              }} text='Quick View' className='big'>

              </Appbutton>
            }
          </div>
        </div>
        <div className='bottom'> 
            <div className='name'>
              <span>{product.name}</span>
              <Rating 
                    value={product.rating} 
                    text={`${product.numReviews} reviews`} 
                />
                <h3 className='price'>${product.price}</h3>
            </div>
        </div>
      </div>
    </>
  )
}

export default ProductCardv2