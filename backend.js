const express = require('express');
const app = express();
const port = 80;
const cookieParser = require('cookie-parser')

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.post('/api/tasksend', (req, res) =>{
    console.log(req.body);
    console.log(req.cookies.friendCode);
    if(!req.cookies.friendCode){
        res.sendStatus(403)
    }
    else{
        res.sendStatus(200);
    }
})

app.listen(port, '0.0.0.0', () => {
    const localIP = require('ip').address();
    console.log('Server is running on http://'+localIP+":"+port)
})