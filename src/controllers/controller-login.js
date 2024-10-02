const config = require('../configs/database');
const baseurl = require('../configs/baseurl');
let mysql      = require('mysql');
let pool       = mysql.createConnection(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Render tampilan untuk login yang ada didalam folder 'src/views/login.ejs'
    login(req,res){
        res.render("login",{
            url : baseurl.url,
            // Kirim juga library flash yang telah di set
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    // Post / kirim data yang diinput user
    loginAuth(req,res){
        let email = req.body.email;
        let password = req.body.pass;
        if (email && password) {
            pool.query(`SELECT u.* FROM user u WHERE user_email = ? AND user_password = SHA2(?,512)`, [email, password],function (error, results) {
                    if (results.length > 0) {
                        // Jika data ditemukan, set sesi user tersebut menjadi true
                        req.session.loggedin = true;
                        req.session.userid = results[0].user_id;
                        req.session.username = results[0].user_name;
                        res.redirect('/');
                    } else {
                        // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                        req.flash('color', 'danger');
                        req.flash('status', 'Oops..');
                        req.flash('message', 'Akun tidak ditemukan');
                        res.redirect('/login');
                    }
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    },
    // Fungsi untuk logout | Cara memanggilnya menggunakan url/rute 'http://localhost:5050/login/logout'
    logout(req,res){
        // Hapus sesi user dari broser
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}
