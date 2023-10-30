const express = require('express');
const app = express();
const port = 80;
const cookieParser = require('cookie-parser');
const fs = require('fs');

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.post('/api/tasksend', (req, res) =>{
    console.log(req.cookies.friendCode);
    if(!req.cookies.friendCode){
        res.sendStatus(403)
    }
    else{
        console.log(req.body);
        try {
            tasklist = JSON.parse(fs.readFileSync('data/'+req.cookies.friendCode+'.json'));
        } catch (error) {
            fs.writeFileSync('data/'+req.cookies.friendCode+'.json', JSON.stringify([]))
            tasklist = JSON.parse(fs.readFileSync('data/'+req.cookies.friendCode+'.json'));
        }
        tasklist.push(req.body);
        for (let index = 0; index < tasklist.length; index++) {
            tasklist[index].id = index;
        }
        fs.writeFileSync('data/'+req.cookies.friendCode+'.json', JSON.stringify(tasklist));
        console.log(tasklist);
        res.sendStatus(200);
    }
})
app.get('/api/tasklist', (req, res) =>{
    dataToSend = JSON.parse(fs.readFileSync('data/'+req.cookies.friendCode+'.json'));
    res.json(JSON.stringify(dataToSend));
})

app.listen(port, '0.0.0.0', () => {
    const localIP = require('ip').address();
    console.log('Server is running on http://'+localIP+":"+port)
})