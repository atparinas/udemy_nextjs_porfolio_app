import React, {Fragment} from 'react';

import Header from '../shared/Header';

const BaseLayout = props => {

    const {children, className} = props;

    return(
        <div className='layout-container'>
            <Header isAuthenticated={props.isAuthenticated} />
            <main className={`cover ${className}`}>
                <div className='wrapper'>
                    { children }
                </div>
            </main>
        </div>
    )
}

export default BaseLayout;