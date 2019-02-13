import auth0 from 'auth0-js';
import axios from 'axios';

import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

import {getCookieFromRequest} from '../helpers/utils';


class Auth {
 
    constructor(){
        this.auth0 = new auth0.WebAuth({
            domain: 'parinas.au.auth0.com',
            clientID: 'xsH4HP9mFp91I0xbuPoxGUtS2AlUgh28',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token id_token',
            scope: 'openid profile'
          });

          this.login = this.login.bind(this);
          this.handleAuthentication = this.handleAuthentication.bind(this);
          this.setSession = this.setSession.bind(this);
          this.isAuthenticated = this.isAuthenticated.bind(this);
          this.logout = this.logout.bind(this);
          this.clientAuth = this.clientAuth.bind(this);
          this.serverAuth = this.serverAuth.bind(this);
          this.verifyToken = this.verifyToken.bind(this);
          this.getJWKS = this.getJWKS.bind(this);
    }

    handleAuthentication() {

        return new Promise((resolve, reject) => {

            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    resolve();
                } else if (err) {
                    reject(err);
                    console.log(err);
                }
            });

        })
    }
    
    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        // localStorage.setItem('isLoggedIn', 'true');
    
        // Set the time that the access token will expire at
        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        // this.accessToken = authResult.accessToken;
        // this.idToken = authResult.idToken;
        // this.expiresAt = expiresAt;
        Cookie.set('user', authResult.idTokenPayload );
        Cookie.set('jwt',authResult.idToken );
        Cookie.set('expiresAt', expiresAt);
    
        // navigate to the home route
    }


    login() {
        this.auth0.authorize();
    }


    logout() {
        // Remove tokens and expiry time
        Cookie.remove('user');
        Cookie.remove('jwt');
        Cookie.remove('expiresAt');
    
        // Remove isLoggedIn flag from localStorage
        

        this.auth0.logout({
            returnTo: '',
            clientID: 'xsH4HP9mFp91I0xbuPoxGUtS2AlUgh28'
        })
    
    }

    async getJWKS(){
        const response = await axios.get('https://parinas.au.auth0.com/.well-known/jwks.json');

        const jwks = response.data

        return jwks;

    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = Cookie.getJSON('expiresAt');

        return new Date().getTime() < expiresAt;
    }

    async verifyToken(token){
        
        if(token){
            const decodedToken = jwt.decode(token, {complete: true});

            if(!decodedToken) { return undefined}
            
            const jwks = await this.getJWKS()
            const jwk = jwks.keys[0];

            let cert = jwk.x5c[0];
            cert = cert.match(/.{1,64}/g).join('\n');
            cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

            // console.log(cert);
            // console.log(jwk.kid === decodedToken.header.kid)

            if(jwk.kid === decodedToken.header.kid){

                try{

                    const verifiedToken = jwt.verify(token, cert);
                    const expiresAt = verifiedToken.exp * 1000;

                    // console.log('VerifiedToken', verifiedToken)

                    return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;

                }catch(err){

                    return undefined;

                }

            }
        }

        return undefined;


    }


    async clientAuth() {
        const token = Cookie.getJSON('jwt');
        const verifiedToken = await this.verifyToken(token);

        console.log(verifiedToken);

        return verifiedToken;
    }

    async serverAuth(req){
        if(req.headers.cookie){
            // const tokenCookie = req.headers.cookie.split(';').find( c=> c.trim().startsWith('jwt='))

            // if(!tokenCookie){
            //     return undefined;
            // }

            // const token = tokenCookie.split('=')[1];
            const token = getCookieFromRequest(req, 'jwt')
            const verifedToken = await this.verifyToken(token);

            return verifedToken;
        }

        return undefined;
    }
}

const auth0Client = new Auth();

export default auth0Client;