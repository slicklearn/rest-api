import User from '../models/user.model';

export const injectSession = async (req, res, next) => {
    let id = req.session.sid;

    if (id != null) {
        let user = await User.findById(id);
        if (user == null) {
            req.session.destroy();
        } else {
            req.session.user = user;
        }
    }

    next();
}

export const needLogged = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.json({
            success: false,
            error: "UNAUTHORIZED"
        })
    }
}

export const needGuest = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.json({
            success: false,
            error: "ALREADY_LOGGED"
        })
    }
}