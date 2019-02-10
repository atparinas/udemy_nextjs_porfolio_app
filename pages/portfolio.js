import Rect from 'react';
import {withRouter} from 'next/router';
import axios from 'axios';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Portfolio extends React.Component{

    static async getInitialProps({query}){

        console.log(query);
       
        let post = null;

        try{
            const postId = query.id;
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            post = response.data;

        }catch(error){
            console.log(error)
        }

        return {post: post};


    }

    render(){

        const {post} = this.props;

        return(
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1>Post Detail</h1>
                    <h1>{post? post.title : ''} </h1>
                    <div>
                        <p>
                            {post? post.body: ''}
                        </p>
                    </div>
                </BasePage>
            </BaseLayout>
        )
    }

}

export default withRouter(Portfolio);