exports.signOut = (req,res)=>{
    res.json({
        message : "User Signed Out",
        Time : Date.now()
    });
}