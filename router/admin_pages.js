var express = require('express');
var router = express.Router();

//get page model
var Page = require('../model/page');
const { plugin } = require('mongoose');


//Get Pages Index
router.get('/', function(req, res){
    Page.find({}).sort({sorting : 1}).exec(function (err, pages){
        res.render('admin/pages',{
            pages: pages
        })
    })
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
//POST ADD PAGE
router.post('/add-page', function(req, res){
    
    req.checkBody('title', 'Cần Nhập Tiêu Đề ( Title) Cho Trang').notEmpty();
    req.checkBody('content', 'Cần Nhập Nội Dung Cho Trang').notEmpty();

    var title = req.body.title;
    var plug = req.body.plug.replace(/\s+/g, '-').toLowerCase();
    

    if (plug == "") 
        plug = title.replace(/\s+/g, '-').toLowerCase();
        
    var content = req.body.content;

    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/add_page', {
            errors : errors,
            title : title,
            plug : plug,
            content : content,
        });
    } else {
        Page.findOne({plug: plug}, function(err, page){
            if (page) {
                reg.flash('danger','Page plug exists, choose another');
                res.render('admin/add_page',{
                    errors : errors,
                    title : title,
                    plug : plug,
                    content : content,
                })
            } else{
                var page =new Page({
                    title: title,
                    plug : plug,
                    content : content,
                    sorting : 100
                })
                page.save(function(error){
                    if (err)
                    return console.log(err);
                    req.flash('sussess', 'Oage added!');
                    res.redirect('/admin/pages')
                });

            }
        })
    }

})
//exports
module.exports = router;