import React from 'react';

import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../shared/BasePage';

const namespace = 'http://localhost:3000';

export default function(role){
        
    return function(Component) {

        return class withAuth extends React.Component {


            static async getInitialProps(args){
                const pageProps = await Component.getInitialProps && Component.getInitialProps(args)

                return { ...pageProps }
            }

            renderPage  = () => {
                const {isAuthenticated, user} = this.props.auth;
                const userRole = user && user[`${namespace}/role`];

                let isAuthorized = false;

                if(role){
                    if(userRole && userRole === role) { isAuthorized = true};
                }else {
                    //This means that no roles provided in HOC, thus do not need authorization
                    isAuthorized = true;
                }

                if(!isAuthenticated){
                    return(
                        <BaseLayout {...this.props.auth} >
                        <BasePage>
                            <h1> You are <b>Not Authenticated</b> . Please Login </h1>
                        </BasePage>
                        </BaseLayout>
                    )

                }else if(!isAuthorized){

                    return(
                        <BaseLayout {...this.props.auth} >
                        <BasePage>
                            <h1> You are <b>Not Authorized</b> to view this page. Please Login with authorized user </h1>
                        </BasePage>
                        </BaseLayout>
                    )

                }else {

                    return ( <Component {...this.props} /> )
                }
            }


            render(){
                return this.renderPage()
            }
        }


    }
}

