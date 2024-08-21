const {User} = require('../../models/User');
const path = require('path');
const fs = require('fs/promises');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) =>{
    // console.log(req.file)
    const {path: tempUpload, originalName} = req.file;
    const {_id: id} = req.user;
    const imageName = `${id}_${originalName}`
    try{
        const resultUpload = path.join(avatarDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarUrl = path.join('public', 'avatars', imageName)
        console.log(avatarUrl)
        await User.findByIdAndUpdate(id, {avatarUrl});
        res.json(avatarUrl) 
    }
    catch(error){
        fs.unlink(tempUpload);
        next(error)
     
    }
}

module.exports = updateAvatar;