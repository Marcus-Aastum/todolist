const express = require('express');
const app = express();
const port = 80;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, '0.0.0.0', () => {
    const localIP = require('ip').address();
    console.log('Server is running on http://'+localIP+":"+port)
})