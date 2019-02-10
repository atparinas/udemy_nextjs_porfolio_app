import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

const About = (props) => {

    return(
        <BaseLayout {...props.auth} >
            <BasePage>
                <div> I am about page</div>
            </BasePage>
        </BaseLayout>
    )
}

export default About;