const db = require("../routes/database");
const bcrypt = require("bcryptjs");

const register = async(req,res) =>{
    const {user, password:Npassword} = req.body; 
    if(!user || !Npassword) return res.json({status: "error", error: "Please Enter your user name and password"});
    else{
        console.log(user);
        db.query('SELECT user FROM registrations WHERE user = ?', [user], async(res,req) => {
            if(err) throw err;
            if(result[0])return res.json({status: "error", error: "User name is already registered"})
            else{
                const password = await bcrypt.hash(Npassword, 8);
                console.log(password);
                db.query('INSERT INTO registrations SET ?', {user:user,password:password}, (error, results) => {
                    if(error) throw error;
                    return res.json({status: "success", success: "User has been registered"})
                })
            }
        })
    }
}
module.exports = register;