'use strict';
const express = require('express');
const app = express();

//以下是产生泄漏的代码
let theThing = null;
let replaceThing = function () {
    let leak = theThing;
    let unused = function () {
        if (leak)
            console.log("hi")
    };
    
    // 不断修改theThing的引用
    
};
// 
app.get('/leak', function closureLeak(req, res, next) {
    replaceThing();
    res.send('Hllo Node');
});

app.listen(8082);
