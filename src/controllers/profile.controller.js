import User from '../models/user.model';

export const getByUsername = async (req, res) => {
    let username = req.params.username.toLowerCase();
    let user = await User.findOne({username});

    if (user == null) {
        return res.status(404).json({
            success: true,
            profile: null
        });
    }

    let { displayName, createdAt, bio, avatar, followers, following, courses, comments, location } = user;

    return res.status(200).json({
        success: true,
        profile: {
            username, 
            displayName, 
            createdAt,
            bio,
            avatar,
            followers,
            following,
            courses,
            comments,
            location
        }
    })
}