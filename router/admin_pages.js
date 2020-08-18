var express = require('express');
var router = express.Router();

//Get Pages Index

router.get('/', function(req, res){
    res.send('<a href="/admin/add-page" class="btn btn-danger">ADD PAGES</a>')
})

//Get ADD PAGE
router.get('/add-page', function(req, res){
        var title = "";
        var plug = "";
        var content = "";
        res.render('admin/add_page', {
             title : title,
             plug : plug,
             content : content,
        });
        

})

//exports
module.exports = router;