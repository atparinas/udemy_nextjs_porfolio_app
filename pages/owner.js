import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';
import withAuth from '../components/hoc/withAuth';

class OwnerPage extends React.Component{


    render(){
        return(
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> This is an owner only page</h1>
                </BasePage>
            </BaseLayout>
        )
    }

}

export default withAuth('siteOwner')(OwnerPage);