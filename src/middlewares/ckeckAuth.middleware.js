import { verifyToken } from '../controllers/user.controller.js';

function checkForAuthentication(tokenName) {
    return (req, res, next) => {
        const tokenCookiesValue = req.cookies[tokenName];
        if (!tokenCookiesValue) {
            
        }

        try {
            const userPayload = verifyToken(tokenCookiesValue);
            req.user = userPayload;
        } catch (error) {
            
        }
        next();
    }
}

export { checkForAuthentication };