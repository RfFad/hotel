const config = require('../configs/database');
const baseurl = require('../configs/baseurl');
let mysql      = require('mysql');
let pool = mysql.createConnection(config);
module.exports = {
    checkin(req, res){
        res.render("checkin/checkin", {
            url : baseurl.url,
            userName: req.session.username,
            userid: req.session.userid
        });
    }
}