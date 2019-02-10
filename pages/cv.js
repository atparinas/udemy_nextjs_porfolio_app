import React from 'react';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/shared/BasePage';

const CVPage = props => {

    return(
        <BaseLayout {...props.auth} >
            <BasePage>
                <div> I am CV Page</div>
            </BasePage>
        </BaseLayout>
    )
}

export default CVPage;