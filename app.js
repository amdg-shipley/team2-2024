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
    const testList= db.get('testList') || [];

    res.render('Demo',{
        data:testList
    })

});

app.get('/Add', function(req, res){ 
    res.render('Create');

});

app.post('/test', function(req, res){ 
      const {name,subject,block,assesment,type,date,section}=req.body;
    const testsList= db.get('testList') || [];
    testsList.push({name,subject,block,assesment,type,date,section});
    db.set('testList', testsList)
    res.redirect('/Add');

        
    });
    app.get('/delete/:id', (req,res, next) => {

        const id = req.params.id;
        const testList =db.get('testList') || [];
        testList.splice(id,1);
        db.set("testList", testList);

        res.redirect('/');

    });
    app.get('/update/:id', (req,res, next) => {

        const id = req.params.id;
        const testList =db.get('testList') || [];
        const test= testList[id];


        res.render('Edit',{
            id,
            test
        });

    });

    app.post('/edit/:id', (req,res)=>{
        const id = req.params.id;
        const {name,subject,block,assesment,type,date,section}=req.body;

        const testList =db.get('testList') || [];
        testList[id]= {name,subject,block,assesment,type,date,section};
        db.set('testList', testList);
       
        res.redirect('/update/'+id);

    })


app.listen(3000, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
}); 
