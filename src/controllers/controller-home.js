const config = require('../configs/database');
const baseurl = require('../configs/baseurl');
const jkn = require('../configs/jkn');
let mysql      = require('mysql');
const fs      = require('fs');
const crypto = require("crypto");
const request = require("request");
const lz = require('lz-string');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const reader = require('xlsx');
let pool = mysql.createConnection(config);

const upload = multer({
  dest: 'src/upload' ,
}).single('importexcel');

const excelData = async function (req, res) {
    let path = req.file.path;
    const file = reader.readFile(path);
    const data = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
    try {
        const columns = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]],{header:1});
        const field = columns[0];
        const array = data.map(v => ({...v, FPK : req.body.fpk}));
        const newArr = array.map(v => ({...v, STATUS : "layak"}));
        var string_field = "";
        var string_value = "";
        var koma = "";
        field.push("FPK","STATUS");
        for (let i = 0; i < field.length; i++) {
          string_field += koma+""+field[i];
          string_value += koma+"?";
          koma = ", ";
        }
        var query = "INSERT INTO rekap_klaim ("+string_field+") values ? ";
        let simrs = mysql.createConnection(req.session.confdb);
        var rows = newArr.map(item => [item[field[0]],item[field[1]],item[field[2]],item[field[3]],item[field[4]],item[field[5]],item[field[6]],item[field[7]],item[field[8]],item[field[9]]]);
        simrs.query(query,[rows],function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          fs.unlink(req.file.path, err => {
            if (err) {
              console.log('error in deleting a file from uploads')
            } else {
              console.log('succesfully deleted from the uploads folder')
            }
          })
          res.status(200).json({ message: 'Data inserted successfully!', data:query});
        });

    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data into the database.' });
    }
};
module.exports ={
    upload,
    excelData,
    home(req,res){
        res.render("home",{
            url: baseurl.url,
            userName: req.session.username,
        });
    },
    setup(req,res){
        res.render("setup",{
            url: baseurl.url,
            userName: req.session.username,
            userid: req.session.userid,
        });
    },
    menumaster(req,res){
        res.render("master/menumaster",{
            url: baseurl.url,
            userName: req.session.username,
            userid: req.session.userid,
        });
    },
    menucheckin(req,res){
        res.render("checkin/menucheckin",{
            url: baseurl.url,
            userName: req.session.username,
            userid: req.session.userid,
        });
    },
    listskdp(req,res){
        res.render("listskdp",{
            url: baseurl.url,
            userName: req.session.username,
            koders: req.session.koders,
        });
    },
    listantrian(req,res){
        res.render("listantrian",{
            url: baseurl.url,
            userName: req.session.username,
            koders: req.session.koders,
        });
    },
    listsep(req,res){
        res.render("listsep",{
            url: baseurl.url,
            userName: req.session.username,
            koders: req.session.koders,
        });
    },
    rekapklaim(req,res){
        res.render("rekapklaim",{
            url: baseurl.url,
            userName: req.session.username,
            koders: req.session.koders,
        });
    },
    detailpasien(req,res){
        pool.query(`SELECT nama_pasien,taskid from pasien_ralan where no_reg = ?`, [req.body.no_reg],function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results[0], jml: results.length});
        })
    },
    listsetup(req,res){
        pool.query(`SELECT * from user where user_id = ?`, [req.session.userid],function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', error: err });
          }
          res.status(200).json({ success: true, data: results, jml: results.length});
        })
    },
    edit(req,res){
        pool.query("update user set user_name = ? , user_email = ? , alamat = ? where user_id = ?", [req.body.user_name, req.body.user_email, req.body.alamat, req.body.user_id],function (err, results) {
          if (err) {
              return res.status(500).json({ message: 'Ada kesalahan', status: "error", error: err });
          }
          if (req.body.password!=""){
            pool.query("update user set user_password = SHA2(?,512) where user_id = ?", [req.body.password, req.body.user_id],function (err, results) {});
          }
          res.status(200).json({ status: "success"});
        })
    },
}
