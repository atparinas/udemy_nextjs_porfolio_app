import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

import {Button} from 'reactstrap';
import BasePage from '../components/shared/BasePage';

class Blogs extends React.Component {

   

   render(){
      

        return(
            <BaseLayout {...this.props.auth} >
                <BasePage>
                    <h1> This is a list of Blog Post</h1>
                    <Button color='danger'>Danger</Button>
                </BasePage>
            </BaseLayout>
        )
   }
}

export default Blogs;