import React from 'react';
import axios from 'axios';
// import Link from 'next/link';
import {Link} from '../routes';


import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

class Portfolios extends React.Component {

    static async getInitialProps(){
        let posts = [];
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts = response.data
        }catch(error) {
            console.log(error);
        }

        return {
            posts: posts
        }
    }

   render(){
        const posts = this.props.posts.map(post => {
            return (
                <li key={post.id} >
                    <Link route={`/portfolio/${post.id}`} >
                        <a> {post.title} </a>
                    </Link>
                </li>
            )
        })
        return(
            <BaseLayout {...this.props.auth} >
                 <BasePage>
                    <ul>
                        {posts}
                    </ul>
                 </BasePage>
            </BaseLayout>
        )
   }
}

export default Portfolios;