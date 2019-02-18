import React from 'react';
import axios from 'axios';
// import Link from 'next/link';
import {Link} from '../routes';

import {Card, CardTitle, CardBody, CardHeader, CardText, Col, Row} from 'reactstrap';


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
            posts: posts.splice(0, 10)
        }
    }

   render(){
        const posts = this.props.posts.map((post, index) => {
            return (
                <Col md="4">
                    <React.Fragment key={index}>
                        <span>
                        <Card className="portfolio-card">
                            <CardHeader className="portfolio-card-header">Some Position {index}</CardHeader>
                            <CardBody>
                            <p className="portfolio-card-city"> Some Location {index} </p>
                            <CardTitle className="portfolio-card-title">Some Company {index}</CardTitle>
                            <CardText className="portfolio-card-text">Some Description {index}</CardText>
                            <div className="readMore"> </div>
                            </CardBody>
                        </Card>
                        </span>
                    </React.Fragment>
                </Col>
            )
        })

        return(
            <BaseLayout {...this.props.auth} >
                 <BasePage className='portfolio-page' title='Portfolios' >
                    <Row>
                        {posts}
                    </Row>
                 </BasePage>
            </BaseLayout>
        )
   }
}

export default Portfolios;


{/* <li key={post.id} >
<Link route={`/portfolio/${post.id}`} >
    <a> {post.title} </a>
</Link>
</li> */}