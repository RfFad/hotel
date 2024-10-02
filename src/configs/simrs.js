const config  = require('../configs/database');
const baseurl = require('../configs/baseurl');
let mysql     = require('mysql');
const pasien = ((req, res) => {
	let simrs = mysql.createConnection(req.session.confdb);
	simrs.query("SELECT no_reg,nama_pasien,"+(req.session.username=="rsparu" ? "taskid as task" : "task")+" from pasien_ralan where date(tanggal) = ? ", [req.body.tgl],function (err, results) {
		if (err) {
				return res.status(500).json({ message: 'Ada kesalahan', error: err });
		}
		res.status(200).json(results);
	});
});
const pasienkontrol = ((req, res) => {
	let simrs = mysql.createConnection(req.session.confdb);
	var query  = "select "+(req.session.username=="rsparu" ? "pr.taskid as task" : "pr.task")+",pr.errorskdp,pr.no_sjp,pr.skdp,pr.noreferensi,p.no_bpjs,pr.parameterantrian,pr.no_reg_asal,pr.status_kontrol,p.nama_pasien,p.no_bpjs,pr.no_reg,pr.no_pasien,pk.briging,pr.tujuan_poli,pk.keterangan as namapoli,pk.briging,pr.layan ";
		  query += "from pasien_ralan pr ";
			query += "inner join pasien p on p.no_pasien=pr.no_pasien ";
			query += "inner join poliklinik pk on pk.kode=pr.tujuan_poli ";
			query += "where pr.gol_pasien!=11 ";
			query += "and pr.gol_pasien!=12 ";
			query += "and pr.gol_pasien!=13 ";
			query += "and pr.gol_pasien!=14 ";
			query += "and pr.gol_pasien!=3133 ";
			query += "and pr.layan!=2 and date(pr.tanggal)= ? ";
	simrs.query(query, [req.body.tgl],function (err, results) {
		if (err) {
				return res.status(500).json({ message: 'Ada kesalahan', error: err });
		}
		res.status(200).json(results);
	});
});
const listklaim = ((req, res) => {
		let simrs = mysql.createConnection(req.session.confdb);
		var ptd = req.body.status=="rajal" ? 2 : 1;
		var query  = "select KAMAR_AKOMODASI as kamar,month(ADMISSION_DATE) as bulan,STATUS as status,SUM(TARIF_INACBG) as tarif_bpjs,SUM(TARIF_RS) as tarif_rs,NO as no,NOFPK as nofpk,FPK as fpk,TGL as tgl,TGLFPK as tglfpk,count(*) as jml ";
				query += "from rekap_klaim ";
				query += "where PTD = ? and year(ADMISSION_DATE)= ? and FPK= ? group by month(ADMISSION_DATE),STATUS";
		simrs.query(query, [ptd,req.body.thn,req.body.fpk],function (err, results) {
			if (err) {
					return res.status(500).json({ message: 'Ada kesalahan', error: err });
			}
			res.status(200).json({ success: true, data: results, jml: results.length});
		})
});
module.exports = {
	pasien,
	pasienkontrol,
	listklaim
}
