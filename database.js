const mysql = require('mysql');
const koneksi = mysql.createConnection({
	host     : 'localhost',
	user     : 'faizabot',
	password : 'F41z4b0t',
	database : 'bukukas'
});

koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;
