const {Router} = require('express')
const router = Router()
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
router.route('/')
    .get(function(req, res) {
        res.sendFile(__dirname+'/student.html') 
    })


async function getInfo(res) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'https://0ae1-178-207-91-7.eu.ngrok.io/api/user');
    // тело ответа {"сообщение": "Привет, мир!"}
    xhr.onload = function() {
    let responseObj = JSON.parse(xhr.responseText);

    console.log('5555', responseObj) // Привет, мир!
    res= responseObj
    };
    xhr.send();
    /*
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onload = () => {
        if (xhr.status !== 200) {
        return;
        }}
    xhr.onerror = () => {
        if (xhr.status >= 300){
            document.getElementById('formLabel').innerText = `Не сработало(${xhr.status}`
        }
    }
    let formData = new FormData(practiceForm
        );
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    */
    
    }
/*
router.route('/applications')
.get(function(req, res) {
    res.sendFile(__dirname+'/practice.html')
    const xhr = new XMLHttpRequest();
        xhr.open('get', 'https://0ae1-178-207-91-7.eu.ngrok.io/api/user');
        // тело ответа {"сообщение": "Привет, мир!"}
        xhr.onload = function() {
        let responseObj = JSON.parse(xhr.responseText);
    
        console.log('5555', responseObj) // Привет, мир!
      
        };
        xhr.send();
})*/

router.route('/practice')
    .get(function(req, res) {
        res.sendFile(__dirname+'/practice.html') 
    })

router.route('/university')
    .get(function(req, res) {
        res.sendFile(__dirname+'/university.html') 
    })

router.route('/grant')
    .get(function(req, res) {
        res.sendFile(__dirname+'/grant.html') 
    })

router.route('/probation')
    .get(function(req, res) {
        res.sendFile(__dirname+'/probation.html') 
    })

router.route('/applications')
    .get(function(req, res) {
        res.sendFile(__dirname+'/applications.html') 
    })
module.exports = router