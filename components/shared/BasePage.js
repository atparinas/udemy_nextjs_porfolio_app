import React from 'react';
import {Container} from 'reactstrap';


const BasePage = props => {

    const className = props.className || '';
    const title = props.title;

    return(
        <div className={`base-page ${className}`} >
            <Container>          
                { title && <div className='page-header' > <h1 className='page-header-title' >{title}</h1> </div>}
                {props.children}
            </Container>
        </div>
    )
}

export default BasePage;