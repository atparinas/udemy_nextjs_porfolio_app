import React from 'react';

import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../shared/BasePage';

export default function(Component) {

    return class withAuth extends React.Component {

        renderPage  = () => {

            console.log(isAuthenticated)

            const {isAuthenticated} = this.props.auth;
            
            if(isAuthenticated){
                return ( <Component {...this.props} /> )
            }else {
               return(
                <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> You are not authorized to view this page. Please Login </h1>
                </BasePage>
                </BaseLayout>
               )
            }
        }


        render(){
            return this.renderPage()
        }
    }


}