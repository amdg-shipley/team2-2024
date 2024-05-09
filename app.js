const express = require('express') 
const path = require('path') 
const app = express() 
const JSONdb=require('simple-json-db');
const db= new JSONdb('db.json');
var favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, '/images','favicon.ico')))
  
// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", (req, res)=>{
    const drinkList= db.get('drinkList') || [];

    res.render('Demo',{
        data:drinkList
    })

});

app.get('/Add', function(req, res){ 
    res.render('Create');

});

app.post('/drink', function(req, res){ 
      const {flavor, size,price}=req.body;
    const carList= db.get('drinkList') || [];
    carList.push({flavor,size,price});
    db.set('drinkList', carList)
    res.redirect('/Add');

        
    });
    app.get('/delete/:id', (req,res, next) => {

        const id = req.params.id;
        const drinkList =db.get('drinkList') || [];
        drinkList.splice(id,1);
        db.set("drinkList", drinkList);

        res.redirect('/');

    });
    app.get('/update/:id', (req,res, next) => {

        const id = req.params.id;
        const drinkList =db.get('drinkList') || [];
        const drink= drinkList[id];


        res.render('Edit',{
            id,
            drink
        });

    });

    app.post('/edit/:id', (req,res)=>{
        const id = req.params.id;
        const {name,subject,block}=req.body;

        const drinkList =db.get('drinkList') || [];
        drinkList[id]= {name,subject,block};
        db.set('drinkList', drinkList);
       
        res.redirect('/update/'+id);

    })

  
app.listen(3000, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
}); 
