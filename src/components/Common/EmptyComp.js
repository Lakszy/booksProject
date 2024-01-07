import React from 'react'
import Bookshop from '../../assets/Bookshop.gif'
import { Container } from '@material-ui/core'

const EmptyComp = ({text}) => {

    return (
        <Container fluid >
            <div className='empty-comp' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop :100}} >
            <img src={Bookshop} alt="Bookshop" style={{ width: '50%', height: '50vh' }} />
            </div>
            <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>{text || "Not Found"}</h1>
        </Container>
    )
}

export default EmptyComp