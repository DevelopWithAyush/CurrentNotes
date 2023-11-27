const jwt = require("jsonwebtoken")
const JWT_SECRET = 'AYUSHDUBEYKYAHO'


const fetchuser = (req,res,next)=>{
    const token = req.header("authtoken")
    if(!token){
        res.status(401)
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
    } catch (error) {
        res.status(401).send("some internal server problem")
    }
    next()
}

module.exports = fetchuser