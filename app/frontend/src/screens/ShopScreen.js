import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import {Slider, TablePagination, TableContainer, Table, Paper} from '@material-ui/core'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Col, Row } from 'react-bootstrap'
import Paginate from '../components/Paginate'
import './ShopScreen.css'
import Appbutton from '../pieces/Button/Appbutton'
import ProductCardv2 from '../components/ProductCardv2'
const ShopScreen = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState([0, Infinity])
    const [filterorder, setFilterorder] = useState('cheapest')
    const [currentPage, setCurrentPage] = useState(1) 
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    const limit = 8
    const sortoptions = [{text: 'Price: Low-High', order: 'cheapest'}, {text: 'Price: High-Low', order: 'expensive'}, {text: 'Customer Rating', order: 'rating'}, {text: 'Name A-Z', order: 'ascending'}, {text: 'Name Z-A', order: 'decending'}]
    const categoryoptions = [{text: 'Shirt', order: 'shirt'}, {text: 'Outwear', order: 'outwear'}, {text: 'Dress', order: 'dress'}, {text: 'Shorts', order: 'short'}, {text: 'Trousers', order: 'trouser'}, {text: 'Skirt', order: 'skirt'}]
    const marks = [
        {
          value: 0,
          label: '$0',
        },
        {
          value: 500,
          label: '$250'
        },
        {
          value: 1000,
          label: '$500'
        },
        {
          value: 1500,
          label: '$1500'
        },
        {
            value: 2000,
            label: '$2000'
        },
    ]
  useEffect(() =>{
    dispatch(listProducts(keyword, pageNumber, category, limit))
    // dispatch(listProducts(keyword, '', '', limit))
  }, [dispatch, keyword, pageNumber, price, filterorder, category])
  const onPriceChange = (e, newValue) =>{
      setPrice(newValue)
  }

  const clickEventHandler = () =>{
      setPrice([0, Infinity])
      setCategory('shirt')
      setFilterorder('cheapest')
  }
  return (
      <>
      <div className='grid'>

        <div className='shop'>
                <div className='filterbanner'>
                    <div className='filtercol'>
                        <h4>Price</h4>
                        <span className='slider'>
                            <Slider
                            marks={marks}
                            style={{ color: '#000' }}
                            step={5}
                            onChange={onPriceChange}
                            value={price}
                            max={marks[marks.length-1]?.value}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'>
                            </Slider>
                        </span>
                    </div>
                    <div className='filtercol'>
                        <h4>Sort By</h4>
                        <select value={filterorder}
                        onChange={(e)=>{
                            setFilterorder(e.target.value)
                        }}>
                            {
                                sortoptions?.map(option =>{
                                    return(
                                        <option
                                        value={option.order}
                                        key={option.order}
                                        >{option.text}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='filtercol'>
                        <h4>Filter By</h4>
                        <select value={category}
                        onChange={(e)=>{
                            setCategory(e.target.value)
                        }}>
                            {
                                categoryoptions?.map(option =>{
                                    return(
                                        <option
                                        value={option.order}
                                        key={option.order}>{option.text}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='filtercol'>
                        <Appbutton
                        text='Reset Filters'
                        clickEvent={clickEventHandler}
                        ></Appbutton>
                    </div>
                </div>
        </div>
        {typeof loading === 'undefined'
        ? <Loader />
        : loading
        ? <Loader />
        : error
        ? <Message variant='danger'>{error}</Message>
        : (
            <>
                <div className='sidebbannerproducts'>
                    <Row>
                        {products.map(product =>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCardv2 product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate> */
                    {/* <Row>
                    {products.map(product =>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate> */}
                </div>
            </>
            )
        }
      </div>
      </>
  )}
export default ShopScreen