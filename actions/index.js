import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookieFromRequest } from '../helpers/utils';

const setAuthHeader = (req) => {
    // let token = undefined;

    const token = req ? getCookieFromRequest(req, 'jwt') : Cookies.getJSON('jwt');

    if(token){
        return  {headers: {Authorization: `Bearer ${token}`}}
    }

    return undefined
}

export const getSecretData = async (req) => {
    return await axios.get('http://localhost:3000/api/v1/secret', setAuthHeader(req)).then(response => response.data);
}