export const sendToken = (user,statusCode,res,message)=>{
    const token = user.getJWTToken();
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE,10) || 7
    const options = {

        expires: new Date(Date.now()+cookieExpireDays *24*60*60*100),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token",token,options).json({
        suces:true,
        user,
        message,
        token,
    });
};
