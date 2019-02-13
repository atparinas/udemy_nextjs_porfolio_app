

export const getCookieFromRequest = (req, cookie) => {

    const reqCookie = req.headers.cookie.split(';').find( c=> c.trim().startsWith(`${cookie}=`))

    if(!reqCookie){ return undefined; }

    return reqCookie.split('=')[1];

}