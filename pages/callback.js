import React from 'react';
import {withRouter} from 'next/router';

import auth0Client from '../services/auth0';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Callback extends React.Component {

    async componentDidMount(){

        await auth0Client.handleAuthentication();

        this.props.router.push('/');
    }
   

   render(){
      

        return(
            <BaseLayout>
                <BasePage>
                    <h1>  This is Callback Page</h1>
                </BasePage>
            </BaseLayout>
        )
   }
}

export default withRouter(Callback);