import React, {useState, useEffect} from 'react'
import Carousel from '../components/Carousel'
import './LandingPage.css'
import CategoryShop from '../components/CategoryShop'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, listTopCategoryProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import { benefits } from '../constants/appConstant'
const LandingScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productTopCategory)
    const { loading, error, products, page, pages } = productList
    const benefitslide = benefits.map(benefit => {
      return (
        <div className='benefit'>
          <div className='icon'>
            <i className={benefit.icon}></i>
          </div>
          <div className='info'>
            <h3>{benefit.title}</h3>
            <span className='subtitle'>
              {benefit.text}
            </span>
          </div>
        </div>
      )
    })
    useEffect(() => {
        // dispatch(listProducts('', '', category, limit))
        dispatch(listTopCategoryProducts())
    }, [dispatch])
    console.log(products)
  return (
    <>
    { typeof loading === 'undefined'
      ?<Loader/>
      :loading
      ? <Loader/>
      :(
        <div className='landingpage'>
          <Carousel/>
          <div className='category grid'>
            <h2>Shop By Categories</h2>
            <div className='types'>
              <CategoryShop key ='shirt' img='https://i.imgur.com/h0EVY1R.jpg' title='Shirt' category='shirt' subtitle='Products' products={products.filter(product => product.info[0].category === 'shirt')}/>
              <CategoryShop key ='outwear' img='https://i.imgur.com/h0EVY1R.jpg' title='Outwear' category='outwear' subtitle='Products' products={products.filter(product => product.info[0].category === 'outwear')}/>
              <CategoryShop key ='dress' img='https://i.imgur.com/h0EVY1R.jpg' title='Dress' category='dress' subtitle='Products' products={products.filter(product => product.info[0].category === 'dress')}/>
              <CategoryShop key ='trouser' img='https://i.imgur.com/h0EVY1R.jpg' title='Trousers' category='trouser' subtitle='Products' products={products.filter(product => product.info[0].category === 'trouser')}/>
              <CategoryShop key ='short' img='https://i.imgur.com/h0EVY1R.jpg' title='Shorts' category='short' subtitle='Products' products={products.filter(product => product.info[0].category === 'short')}/>
              <CategoryShop key ='skirt' img='https://i.imgur.com/h0EVY1R.jpg' title='Skirt' category='skirt' subtitle='Products' products={products.filter(product => product.info[0].category === 'skirt')}/>
            </div>
          </div>
          <div className='benefits'>
            <div className='grid benefits__container'>
            {benefitslide}
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}

export default LandingScreen