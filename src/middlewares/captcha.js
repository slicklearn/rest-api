import axios from 'axios';

export const needVerify = async (req, res, next) => {
    let { captcha } = req.body;

    if (captcha == null) {
        return res.status(400).json({success: false, error: "CAPTCHA_REQUIRED"});
    }

    try {
        let response = await axios.post("https://www.google.com/recaptcha/api/siteverify?secret=6Ld2wrAZAAAAAALy6A84ojK1bXWfJ9Q16MIi5R7F&response=" + captcha);
        let body = response.data;
        let { success } = body;
        
        if (success) {
            next();
        } else {
            res.status(400).json({
                success, error: "CAPTCHA_BAD_CHALLENGE"
            })
        }
    } 
    
    catch (err) {
        console.error(err);
        res.json({
            success: false, error: "CAPTCHA_INTERNAL_SERVER_ERROR"
        })
    }
}