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
    },
    simpancheckin(req,res){
        pool.query(`insert into checkin (id, no_telp, id_rp, id_ms, arrival_date, departure_date, total_adult, total_child, banquet, jml_kmr, nomor_kamar, nama_check, id_number, guest_type, tgl_lahir, jk, agama, judul, pekerjaan, alamat, email) values (uuid(), ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[req.body.no_telp, req.body.id_rp, req.body.id_ms, req.body.arrival_date, req.body.departure_date, req.body.total_adult, req.body.total_child, req.body.banquet, req.body.jml_kmr, req.body.nomor_kamar, req.body.nama_check, req.body.id_number, req.body.guest_type, req.body.tgl_lahir, req.body.jk, req.body.agama, req.body.judul, req.body.pekerjaan, req.body.alamat, req.body.email],function (err, results) {
          if (err) {
              console.log(err)
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.redirect("/")
          //.json({ success: true, data: results, jml: results.length, message : "Berhasil Checkin"});
          

        })
    },
    listcheckin(req,res){
        var query  = `SELECT c.*, rp.nama_plan AS nama_plan
FROM checkin c `;
            query += `INNER JOIN room_plan rp ON c.id_rp = rp.id`;
            query += ` ORDER BY c.id`
        pool.query(query,function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results, jml: results.length});
        })
    },
    data_tamu(req, res){
        res.render("checkin/tamu",{
            url : baseurl.url,
            userName: req.session.username,
            userid: req.session.userid
        });
    },
}