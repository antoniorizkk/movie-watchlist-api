import dbClass from "../config/db.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

const register =async (req,res)=>{
    const body = req.body;
    const {name, email, password} = body;

    // if user already exists

    const userExists = await dbClass.prisma.user.findUnique({
        where: {
            email: email
        },
    });

    if(userExists){
        return res.status(400).json({error:"User already exists with this email"});
    }

    // hash password
    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await dbClass.prisma.user.create({
        data:{
            name, 
            email, 
            password: hashedPassword
        }
    })

    const token = generateToken(user.id, res);

    res.status(201).json({
        status:"success",
        data:{
            user:{
                id:user.id,
                name:name,
                email:email
            },
            token,
        }
    })
};

const login = async (req, res) => {
    const body = req.body;
    const { email, password} = body;

    // check if user email exit
    const user = await dbClass.prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(!user){
        return res.status(401).json({message:"Invalid Email or password"});
    }

    //verify password

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid Email or password"});
    }

    // Generate JWT Token
    const token = generateToken(user.id,res);
    res.status(201).json({
        status:"success",
        data:{
            user:{
                id:user.id,
                email:email
            },
            token
        }
    })

}

const logout = async (req, res) => {
    res.cookie("jwt","",{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        status:"success",
        message: "Logged out successfully"
    });
};

export default { register, login, logout};