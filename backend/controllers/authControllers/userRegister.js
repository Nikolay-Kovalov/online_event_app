const {User} = require('../../models/User');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../../helpers/sendEmail');

const userRegister = async (req, res, next) => {
try{
  const {username, email, password} = req.body;
    const user = await User.findOne({email})
    if(user){
        res.status(409).json({
            message: 'This email is already exist'
        })}
    const verificationToken = uuidv4();  
    const avatarUrl = gravatar.url(email)
    const newUser = new User({username, email, verificationToken, avatarUrl})

    if(password){
        newUser.setPassword(password);  
    }
    await newUser.save();
    const mail = {
        to: email,
        subject: 'Email verification',
        html: `<a target="_blank" href="http://localhost:8888/api/users/verify/${verificationToken}">Confirm your email</a>`,
        // html: `<a target="_blank" href="http://localhost:8888/api/users/verify/${verificationToken}">Confirm your email</a>`
    }
    await sendEmail(mail);

    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
           username,
           email,
           verificationToken, 
           avatarUrl
        }
    })    
}
  
   catch(error){
    next(error)
   } 
    }



module.exports = userRegister;