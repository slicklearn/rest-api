import User from '../models/user.model';
import Role from '../models/role.model';
import { sanitizeLogin, sanitizeRegister } from '../utils/bodySanitizer';

var defaultRole = null;

export const register = async (req, res) => {
    let {username, email, password, success, error, displayName} = sanitizeRegister(req.body);

    if (!success) {
        return res.status(400).json({success, error});
    }

    if (defaultRole == null) {
        defaultRole = await Role.findOne({name: "User"});
    }

    // Check if username is already registered
    let foundedUserByUsername = await User.findOne({username});
    if (foundedUserByUsername != null) {
        return res.status(400).json({success: false, error: "USERNAME_ALREADY_USED"});
    }

    // Check if email is already registered
    let foundedUserByEmail = await User.findOne({email});
    if (foundedUserByEmail != null) {
        return res.status(400).json({success: false, error: "EMAIL_ALREADY_USED"});
    }

    let user = new User({
        username,
        email,
        displayName,
        roles: [defaultRole._id],
        password: await User.encryptPassword(password)
    });

    await user.save();

    user.password = null;

    req.session.sid = user._id;
    req.session.user = user;

    res.json({success: true, user})
}

export const login = async (req, res) => {
    let { email, password, success, error } = sanitizeLogin(req.body);

    if (!success) {
        return res.status(400).json({success, error});
    }

    let user = await User.findOne({email}).populate("roles");
    if (!user) return res.status(400).json({success: false, error: "INVALID_CREDENTIALS"});

    let matchPassword = await User.comparePassword(password, user.password)
    
    if (!matchPassword) return res.status(400).json({success: false, error: "INVALID_CREDENTIALS"});

    user.password = null;

    req.session.sid = user._id;
    req.session.user = user;

    res.json({success: true, user})
}

export const logout = async (req, res) => {
    req.session.destroy();
    res.json({
        success: true
    })
}
export const checkSession = async (req, res) => {
    let id = req.session.sid;
    if (id == null) {
        return res.json({
            success: true,
            logged: false
        })
    } else {
        let user = await User.findById(id).populate("roles");
        user.password = null;
        return res.json({
            success: true,
            logged: true,
            user
        })
    }
}