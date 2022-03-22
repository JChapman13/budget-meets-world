const UserModel = require('../../models/User.js');

module.exports = {
    login,
    signup,
    getAll,
}

async function login(req, res) {
    try {
        const user = await UserModel.findOne({name: req.body.name})
        if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
        const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})
        res.status(200).json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}


async function signup(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS))
        const user = await UserModel.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const token = jwt.sign({user}, process.env.SECRET, { expiresIn: '24h' })
        res.status(200).json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}


async function getAll(req,res){
    try {
        const users = await UserModel.find({}).select('email');
        res.status(200).json(users)
    } catch(err) {
        res.status(400).json(err)
    }
}