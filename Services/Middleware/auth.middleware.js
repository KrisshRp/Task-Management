const jwt = require("jsonwebtoken");
const switchModel = require("../modules/model.switch");

const modelObj = switchModel("Users");
const configJWT = require("../../Bin/config/jwt.json");

exports.createToken = async (userId, role, name) => { 
    return(jwt.sign({
        expiresIn: configJWT.expiresIn,
        data: {
            userId: userId,
            role: role,
            name: name
        },
        algorithm: configJWT.algorithm,
    },
        configJWT.jwtToken
    ))
}

exports.decodeToken = async (token, configToken = configJWT.jwtToken) => { 
    try {
        const decodedToken = await jwt.verify(token, configJWT.jwtToken);
        const userId = decodedToken.data.userId;
        const role = decodedToken.data.role;
        const name = decodedToken.data.name;
        return {
            status: true,
            data: {
                userId: userId,
                role: role,
                name: name
            }
        }
    } catch (error) {
        return {
            status: false,
            data: null
        }
    }
}

exports.refreshToken = async (req, res, next) => { 
    if (req.headers.authorization) { 
        const decodedToken = await this.decodeToken(req.headers.authorization);
        if (decodedToken.status) { 
            const newToken = await this.createToken(decodedToken.data.userId, decodedToken.data.role, decodedToken.data.name);
            res.status(201).json({ token: newToken });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

exports.verifyToken = async (req, res, next) => { 
    if (req.headers.authorization) { 
        const decodedToken = await this.decodeToken(req.headers.authorization);
        if (decodedToken.status) {
            req.decodedToken = decodedToken.data;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

exports.login = async (req, res) => { 
    const { email, password } = req.body;
    const user = await modelObj.findOne({ email: email, is_delete: false });
    if (user) { 
        if (user.password == password) { 
            var token = await this.createToken(
                user.collection_id,
                user.role,
                user.name
            );
            res.status(201).json({
                token: token,
                name: user.name,
                role: user.role,
                userId: user.collection_id,
                avatar: user.avatar
            });
        }
        else {
            res.status(401).json({
                status: false,
                message: "Password doesnot match"
            });
        }
    } else {
        res.status(401).json({
            status: false,
            message: "No usser found with this email"
        });
    }
}
