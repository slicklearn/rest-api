import User from '../models/user.model';
import { sanitizeUsername, sanitizePasswords } from '../utils/bodySanitizer';

export const updatePassword = async (req, res) => {
    let id = req.session.sid;
    let { oldPassword, newPassword, success, error } = sanitizePasswords(req.body);

    if (!success) {
        return res.status(400).json(error);
    }

    let user = await User.findById(id);
    let isVerified = await User.comparePassword(oldPassword, user.password);

    if (!isVerified) return res.json({success: false, error:"PASSWORD_DOESNT_CONFIRMED"});

    await User.findByIdAndUpdate(id, {password: await User.encryptPassword(newPassword)}, { new:  true, runValidators:  true, useFindAndModify: false });

    res.json({
        success: true
    })
}

export const updateUsername = async (req, res) => {
    let id = req.session.sid;
    let { username, displayName, success, error } = sanitizeUsername(req.body);

    if (!success) {
        return res.status(400).json({success, error});
    }

    let foundedUser = await User.findOne({username});

    if (foundedUser != null && foundedUser._id != id) return res.json({success: false, error: "USERNAME_ALREADY_USED"});
    
    await User.findByIdAndUpdate(id, {username, displayName}, { new:  true, runValidators:  true, useFindAndModify: false });

    res.json({
        success: true
    })
}