import React from 'react';

import withAuth from '../components/hoc/withAuth';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

const Secretpage = props => {

    return(
        <BaseLayout {...props.auth} >
            <BasePage>
                <h1> This is a secret page</h1>
                <p> This is a secret content</p>
            </BasePage>
        </BaseLayout>
    )
}

export default withAuth(Secretpage);