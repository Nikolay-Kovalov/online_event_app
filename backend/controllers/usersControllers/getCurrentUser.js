
const getCurrentUser = async (req, res) => {
const {username, email, avatarUrl} = req.user;
res.json({
    status: "Success",
    code: 200,
    data: {
        username, email, avatarUrl
    }
})
}

module.exports = getCurrentUser;