const config  = require('../configs/database');
const baseurl = require('../configs/baseurl');
let mysql     = require('mysql');
const crypto  = require("crypto");
const request = require("request");
const lz = require('lz-string');
let pool = mysql.createConnection(config);
const vclaim_get = ((req, res) => {
	pool.query(`SELECT consid,secretkey,kode_rs from setup_rs where koders = ?`, [req.session.koders],function (err, results) {
		if (err) {
				return res.status(500).json({ message: 'Ada kesalahan', error: err });
		}
		const timestamp = Math.round(Date.now() / 1000);
		const url = `${baseurl.urlvclaim}${req.body.url}`;
		const message = `${results[0].consid}&${timestamp}`;
		const consid = results[0].consid;
		const userkey = results[0].userkey;
		const secretkey = results[0].secretkey;
		const signature = crypto.createHmac('SHA256', secretkey).update(message).digest('base64');
		const headers = {
				'X-cons-id' : consid,
				'X-signature' : signature,
				'X-timestamp' : timestamp,
				'user_key' : userkey,
				'Content-Type' : 'Application/x-www-form-urlencoded'
			};
		var options = {
			method: 'GET',
			url: url,
			headers: headers
		};
		request(options, function (error, response) {
			if (error) throw new Error(error);
			const json = JSON.parse(response.body);
			if (json.response) {
				const keyPlain = `${consid}${secretkey}${timestamp}`;
				const key = crypto.createHash('sha256').update(keyPlain, 'utf8').digest();
				const iv = Uint8Array.from(key.subarray(0, 16));
				const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
				let dec = decipher.update(json.response, 'base64', 'utf8');
				dec += decipher.final('utf8');
				const decrypted = lz.decompressFromEncodedURIComponent(String(dec), timestamp);
				const response = JSON.parse(decrypted);
				res.status(200).json({ status: "success",data:response});
			}
		});
	});
});

const antrean_get = ((req, res) => {
	pool.query(`SELECT consid,secretkey,kode_rs from setup_rs where koders = ?`, [req.session.koders],function (err, results) {
		if (err) {
				return res.status(500).json({ message: 'Ada kesalahan', error: err });
		}
		const timestamp = Math.round(Date.now() / 1000);
		const url = `${baseurl.urlantrean}${req.body.url}`;
		const message = `${results[0].consid}&${timestamp}`;
		const consid = results[0].consid;
		const userkey = results[0].userkeyws;
		const secretkey = results[0].secretkey;
		const signature = crypto.createHmac('SHA256', secretkey).update(message).digest('base64');
		const headers = {
				'X-cons-id' : consid,
				'X-signature' : signature,
				'X-timestamp' : timestamp,
				'user_key' : userkey,
				'Content-Type' : 'Application/x-www-form-urlencoded'
			};
		var options = {
			method: 'GET',
			url: url,
			headers: headers
		};
		request(options, function (error, response) {
			if (error) throw new Error(error);
			const json = JSON.parse(response.body);
			if (json.response) {
				const keyPlain = `${consid}${secretkey}${timestamp}`;
				const key = crypto.createHash('sha256').update(keyPlain, 'utf8').digest();
				const iv = Uint8Array.from(key.subarray(0, 16));
				const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
				let dec = decipher.update(json.response, 'base64', 'utf8');
				dec += decipher.final('utf8');
				const decrypted = lz.decompressFromEncodedURIComponent(String(dec), timestamp);
				const response = JSON.parse(decrypted);
				res.status(200).json({ status: "success",data:response});
			}
		});
	});
});

const antrean_post = ((req, res) => {
	pool.query(`SELECT consid,secretkey,kode_rs from setup_rs where koders = ?`, [req.session.koders],function (err, results) {
		if (err) {
				return res.status(500).json({ message: 'Ada kesalahan', error: err });
		}
		const timestamp = Math.round(Date.now() / 1000);

		const url = `${baseurl.urlantrean}${req.body.url}`;
		const message = `${results[0].consid}&${timestamp}`;
		const consid = results[0].consid;
		const userkey = results[0].userkeyws;
		const secretkey = results[0].secretkey;
		const signature = crypto.createHmac('SHA256', secretkey).update(message).digest('base64');
		const headers = {
				'X-cons-id' : consid,
				'X-signature' : signature,
				'X-timestamp' : timestamp,
				'user_key' : userkey,
				'Content-Type' : 'Application/x-www-form-urlencoded'
			};
		var body = {"kodebooking" : req.body.no_reg};
		var options = {
			method: 'POST',
			url: url,
			headers: headers,
			body: JSON.stringify(body)
		};
		request(options, function (error, response) {
			if (error) throw new Error(error);
			const json = JSON.parse(response.body);
			if (json.response) {
				const keyPlain = `${consid}${secretkey}${timestamp}`;
				const key = crypto.createHash('sha256').update(keyPlain, 'utf8').digest();
				const iv = Uint8Array.from(key.subarray(0, 16));
				const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
				let dec = decipher.update(json.response, 'base64', 'utf8');
				dec += decipher.final('utf8');
				const decrypted = lz.decompressFromEncodedURIComponent(String(dec), timestamp);
				const response = JSON.parse(decrypted);
				res.status(200).json({ status: "success",data:response,jml:response.length});
			}
		});
	});
});
module.exports = {
	vclaim_get,
	antrean_get,
	antrean_post
}
