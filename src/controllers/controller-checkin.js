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
       // SELECT c.*, rp.nama_plan AS nama_plan, GROUP_CONCAT(rm.room_number ORDER BY rm.id ASC SEPARATOR ', ') AS room_number FROM checkin c INNER JOIN room_plan rp ON c.id_rp = rp.id LEFT JOIN room rm ON FIND_IN_SET(rm.id, c.nomor_kamar) > 0 -- Memeriksa apakah ID `room` ada dalam `nomor_kamar` GROUP BY c.id ORDER BY c.id;
        var query  = `SELECT c.*, r.id AS id_room, r.room_number,r.status,f.nama_floor as nama_floor,rt.id AS id_ratetype, rt.price, rt.charges_adult, rt.charges_child, rt.nama_type, rt.status_type, rt.keterangan, rt.nama_sessions, rt.nama_plan from checkin c `;
            query += `INNER JOIN room r ON c.nomor_kamar = r.id `;
            query += `inner join room_ratetype rt on (rt.id=r.id_type)`;
            query += `inner join floor f on (f.id=r.id_floor)`;
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
    detaitamu(req,res){
        // SELECT c.nama_check, c.no_telp, c.id_number, c.tgl_lahir, c.id_ms, r.room_number,f.nama_floor as nama_floor,rt.price, rt.charges_adult,rt.charges_child,rt.nama_type,rt.status_type,rt.keterangan,rt.nama_sessions,rt.nama_plan from checkin c INNER JOIN room r ON c.nomor_kamar = r.id inner join room_ratetype rt on (rt.id=r.id_type) inner join floor f on (f.id=r.id_floor) ORDER BY f.nama_floor;
        // SELECT c.*, r.*,f.nama_floor as nama_floor,rt.* from checkin c INNER JOIN room r ON c.nomor_kamar = r.id  inner join room_ratetype rt on (rt.id=r.id_type) inner join floor f on (f.id=r.id_floor) ORDER BY f.nama_floor
        pool.query(`SELECT c.*, r.id AS id_room, r.room_number,r.status,f.nama_floor as nama_floor,rt.id AS id_ratetype, rt.price, rt.charges_adult, rt.charges_child, rt.nama_type, rt.status_type, rt.keterangan, rt.nama_sessions, rt.nama_plan from checkin c INNER JOIN room r ON c.nomor_kamar = r.id inner join room_ratetype rt on (rt.id=r.id_type) inner join floor f on (f.id=r.id_floor) WHERE c.id = ?`,[req.query.id],function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results, jml: results.length});
        })
    },
    detail_room(req,res){
        pool.query(`SELECT r.id AS id_room, r.id_floor, r.id_type, r.room_number, r.status,f.nama_floor as nama_floor,rt.* from room r inner join room_ratetype rt on (rt.id=r.id_type) inner join floor f on (f.id=r.id_floor) WHERE rt.id_plan = ? ORDER BY f.nama_floor`,[req.query.id_plan],function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results, jml: results.length});
        })
    },
    edit_identitas(req,res){
        pool.query(`update checkin set nama_check = ?, judul = ?, tgl_lahir = ?, agama = ?, alamat = ?, email = ?, id_number = ?, jk = ?, pekerjaan = ?, no_telp = ? where id = ?`,[req.body.nama_check, req.body.judul, req.body.tgl_lahir, req.body.agama, req.body.alamat, req.body.email, req.body.id_number, req.body.jk, req.body.pekerjaan, req.body.no_telp, req.body.id],function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results, jml: results.length});
        })
    },
    listprice(req,res){
        var query  = `SELECT 
        room_rates.*, room_type.nama_type AS nama_type,
        room_type.status AS status_type,  
        ratetype.keterangan AS keterangan, 
        sessions.nama_sessions AS nama_sessions, 
        room_plan.nama_plan AS nama_plan 
    FROM 
        room_rates `;
            query += `INNER JOIN room_type ON room_rates.id_roomtype = room_type.id `;
            query += `INNER JOIN ratetype ON room_rates.id_ratetype = ratetype.id `;
            query += `INNER JOIN sessions ON room_rates.id_sessions = sessions.id `;
            query += `INNER JOIN room_plan ON room_rates.id_plan = room_plan.id `;
            query += `WHERE room_plan.nama_plan = "RARE RATE" AND room_type.nama_type = "DELUXE ROOM";`
        pool.query(query,function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results, jml: results.length});
        })
    },
    listroom(req,res){
        var query  = `SELECT r.*,f.nama_floor as nama_floor,rt.nama_type as nama_type from room r `;
            query += `inner join room_ratetype rt on (rt.id=r.id_type) `;
            query += `inner join floor f on (f.id=r.id_floor) `;
            query += `WHERE nama_type = ?`
            query += `ORDER BY f.nama_floor`
        pool.query(query,function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results, jml: results.length});
        })
    },
}