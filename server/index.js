const express = require('express');
const cors = require('cors');
require('./config')
const user = require('./user');
const Product = require('./product');
const Address = require('./address');





const Jwt = require('jsonwebtoken');
const JwtKey = 'e-comm';
const corsOptions = {
    origin: ["https://amazon-clone-front.vercel.app","http://localhost:5173" ],
    methods: "POST,GET,PUT,DELETE,HEAD,PATCH",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization','authentication']
  };

const app =express();
app.use(express.json());
app.use(cors(corsOptions));

app.post('/add-address', verifyToken ,async(req,res)=>{
    let address = new Address(req.body);
    let result = await address.save();
    res.send(result);
})


app.get("/",async(req,res)=>{
    res.send("Home")
})
app.post("/register",async(req,res)=>{
    let User = new user(req.body);
    let result = await User.save();
    result = result.toObject(); 
    delete result.password;
    Jwt.sign({result},JwtKey,{expiresIn:"30d"},(err,token)=>{
        if(err){
            res.send({result:"Something went wrong"})
        }
        res.send({result,auth:token})
    })
})
app.post("/login",async(req,res)=>{
    let User = await user.findOne(req.body).select('-password');
    if(req.body.password && req.body.email){
        if(User){
            Jwt.sign({User},JwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"Something went wrong"})
                }
                res.send({User,auth:token})
            res.send(User);
            })
           
        }else{
            res.send({result:"No user found"})
        }

    }else{
        res.send({result:"No user found"})
    }
   
   

})

app.post('/add-product', verifyToken ,async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/product",async(req,res)=>{
    let products =await Product.find();
    console.log(products);
    if(products.length>0){
        res.send(products);
       
    }else{
        res.send({result:"No products found"})
    }


})
app.get("/users",async(req,res)=>{
    let User =await user.find();
    console.log(User);
    if(User.length>0){
        res.send(User);
       
    }else{
        res.send({result:"No products found"})
    }
})
app.get("/userupdate/:id" ,async(req,res)=>{
    let User =await user.findOne({_id:req.params.id});
    console.log(User);

        res.send(User);
       
   
})

app.delete('/product/:id',async(req,res)=>{
    // res.send(req.params.id);
    const result =await Product.deleteOne({_id:req.params.id})
    res.send(result);

})

app.get('/product/:id',async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    
    if(result){
        res.send(result);
    }else{
        res.send({result:"No record found"})

    }

})
app.get('/address/:id',async(req,res)=>{
    let result = await Address.findOne({_id:req.params.id});
    
    if(result){
        res.send(result);
    }else{
        res.send({result:"No record found"})

    }

})
app.put('/product/:id',async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result);

})


app.put('/userupdate/:id' ,async(req,res)=>{
    let result = await user.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result);

})
app.get('/search/:key',async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
            

        ]

    });
    res.send(result)

})

function verifyToken(req,res,next){
    let token =req.headers['authentication'];
    if(token){
        token = token.split(' ')[1];
        console.warn('middleware called',token[1]);
        Jwt.verify(token,JwtKey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"Please provide valid token"})
            }else{
                next();
            }

        })

    }else{
        res.status(403).send({result:"Please add token with header"})

    }

    
   

}
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});