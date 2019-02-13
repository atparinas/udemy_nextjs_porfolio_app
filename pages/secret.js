import React from 'react';

import {getSecretData} from '../actions';

import withAuth from '../components/hoc/withAuth';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Secretpage extends React.Component{


    state = {
        secretServerData: []
    }

    static async getInitialProps({req}){ 

        const anotherSecretData = await getSecretData(req);

        console.log('Secret Data', anotherSecretData)
        return {
            anotherSecretData
        }
    }

    async componentDidMount(){

        const secretServerData = await getSecretData();

        this.setState({
            secretServerData
        })
    }

    render(){

        const secrets = this.state.secretServerData.map(data => {
            return <li>  {data.description} </li>
        })

        return(
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> This is a secret page</h1>
                    <p> This is a secret content</p>
                    <p>
                        {this.props.secretData}
                    </p>
                    <ul>
                        { secrets }
                    </ul>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth()(Secretpage);