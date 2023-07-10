import React from 'react'
import { Link } from 'react-router-dom'
import { footercontent } from '../constants/appConstant'
import './PageFooter.css'
import PageFooterColumn from './PageFooterColumn'
const PageFooter = () => {
    const footerColumn = footercontent?.map((content, i) =>{
        return(
            <PageFooterColumn key={i} data={content}></PageFooterColumn>
        )
    })
    return (
    <div className='footer'>
        <div className='grid'>
        <div className='columns'>
            <PageFooterColumn firstcolumn></PageFooterColumn>
            {footerColumn}
        </div>
        </div>
    </div>
    )
}

export default PageFooter