import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

import withAuth from '../components/hoc/withAuth'

class About extends React.Component {

    render(){
        return(
            <BaseLayout {...this.props.auth} >
                <BasePage title='I am About Page' >
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth()(About);