const {Router} = require('express')
const router = Router()

router.route('/')
    .get(function(req, res) {
        res.sendFile(__dirname+'/practice.html')
      
    })


module.exports = router