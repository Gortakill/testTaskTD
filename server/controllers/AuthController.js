import AuthService from "../services/AuthService.js";

class AuthController {
    async signUp(req, res){
        try{
            const log = await AuthService.signUp(req.body)
            res.json(log)
        }catch(err){
            res.status(400).json({
                message: err.message
            })
        }
    }

    async signIn(req, res){
        try{
            const log = await AuthService.signIn(req.body)
            res.json(log)
        }catch(err){
            res.status(401).json({
                message: 'Invalid password or email'
            })
        }
    }
}

export default new AuthController()