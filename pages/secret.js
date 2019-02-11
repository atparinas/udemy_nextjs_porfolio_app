import React from 'react';

import withAuth from '../components/hoc/withAuth';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Secretpage extends React.Component{


    static getInitialProps(){
        const secretData = 'This is a secret data'

        return {
            secretData
        }
    }

    render(){
        return(
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> This is a secret page</h1>
                    <p> This is a secret content</p>
                    <p>
                        {this.props.secretData}
                    </p>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth(Secretpage);