const { body, validationResult } = require('express-validator');
const express= require('express');
const User= require('../models/User');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser');

// -->  CREATE A USER WITH VALIDATION AND GENERATE JWT TOKEN

router.post('/createuser',
[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
],async (req,res)=>{
    
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user= await User.findOne({email:req.body.email});

    if(user)
    {
        return res.json({error:"Sorry a user with this email already exists"});
    }

    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });

    const data={
        user:{
            id:user.id
        }
    }
    const JwT_SECRET="alliswell"
    const authToken= jwt.sign(data, JwT_SECRET);

    res.json({"success": true, "authToken": authToken});
});


// --> AUTHENTICATE USER FOR LOGIN "API/AUTH/LOGIN". 

router.post('/login',
[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async(req,res)=>{

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                error: "Please try to login with correct credentisls"
            })
        }

        const passwordComapre=await bcrypt.compare(password,user.password);

        if(!passwordComapre)
        {
            return res.status(400).json({
                error: "Please try to login with correct credentials"
            })
        }

        const data={
            user:{
                id: user.id
            }
        }
        const JwT_SECRET="alliswell";
        const authToken=jwt.sign(data,JwT_SECRET);

        res.json({"success": true, "authtoken": authToken})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// <-- authenticate login done



// ROUTE 3: Get logged in user details using :POST "/api/auth/getuser". No login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(400).json({ error: "User not found in DB" });
      }
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error!");
    }
  });

module.exports=router;
