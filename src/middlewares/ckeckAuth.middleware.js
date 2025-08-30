import { verifyToken } from '../controllers/user.controller.js';
import User from '../db/user.js';

function checkForAuthentication(tokenName) {
    return (req, res, next) => {
        const tokenCookiesValue = req.cookies[tokenName];
        res.locals.isLoggedIn = false;
        res.locals.current_user = null;
        if (!tokenCookiesValue) {
            
        }

        try {
            const userPayload = verifyToken(tokenCookiesValue);
            req.user = userPayload;

            const user = User.find(u => u.id === userPayload.id);            
            res.locals.isLoggedIn = true;
            res.locals.current_user = user;
        } catch (error) {
            
        }
        next();
    }
}

const isAuthentication = (req, res, next) => {
    if (res.locals.isLoggedIn) {
        next();
    }
    res.redirect('/login');
}

export {
    checkForAuthentication,
    isAuthentication
};