const config = require('../configs/database');
const baseurl = require('../configs/baseurl');
let mysql      = require('mysql');
let pool = mysql.createConnection(config);
module.exports = {
  roomfloor(req,res){
      res.render("master/roomfloor",{
          url: baseurl.url,
          userName: req.session.username,
          userid: req.session.userid,
      });
  },
  listfloor(req,res){
      pool.query(`SELECT * from floor`,function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  simpanfloor(req,res){
      pool.query(`insert into floor (id, nama_floor) values (uuid(), ?)`,[req.body.nama_floor],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  editfloor(req,res){
      pool.query(`update floor set nama_floor= ? , status = ? where id = ?`,[req.body.nama_floor,req.body.status, req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  detailfloor(req,res){
      pool.query(`select * from floor where id = ?`,[req.query.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  hapusfloor(req,res){
      pool.query(`delete from floor where id = ?`,[req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  roomtype(req,res){
      res.render("master/roomtype",{
          url: baseurl.url,
          userName: req.session.username,
          userid: req.session.userid,
      });
  },
  listtype(req,res){
      pool.query(`SELECT * from room_type`,function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  simpantype(req,res){
      pool.query(`insert into room_type (id, nama_type, base_adult, base_child, max_adult, max_child) values (uuid(), ? , ? , ? , ? , ?)`,[req.body.nama_type, req.body.base_adult, req.body.base_child, req.body.max_adult, req.body.max_child],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  edittype(req,res){
      pool.query(`update room_type set nama_type = ?, base_adult = ?, base_child = ?, max_adult = ?, max_child = ?, status = ? where id = ?`,[req.body.nama_type, req.body.base_adult, req.body.base_child, req.body.max_adult, req.body.max_child, req.body.status, req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  detailtype(req,res){
      pool.query(`select * from room_type where id = ?`,[req.query.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  room(req,res){
      res.render("master/room",{
          url: baseurl.url,
          userName: req.session.username,
          userid: req.session.userid,
      });
  },
  listroom(req,res){
      var query  = `SELECT r.*,f.nama_floor as nama_floor,rt.nama_type as nama_type from room r `;
          query += `inner join room_type rt on (rt.id=r.id_type) `;
          query += `inner join floor f on (f.id=r.id_floor) `;
      pool.query(query,function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  detailroom(req,res){
      pool.query(`select * from room where id = ?`,[req.query.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  simpanroom(req,res){
      pool.query(`insert into room (id, room_number, id_floor, id_type, status) values (uuid(), ? , ? , ?, ?)`,[req.body.room_number, req.body.id_floor, req.body.id_type, req.body.status],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  editroom(req,res){
      pool.query(`update room set room_number = ?, id_floor = ?, id_type = ?, status = ? where id = ?`,[req.body.room_number, req.body.id_floor, req.body.id_type, req.body.status, req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  hapusroom(req,res){
      pool.query(`delete from room where id = ?`,[req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  sessions(req,res){
      res.render("master/sessions",{
          url: baseurl.url,
          userName: req.session.username,
          userid: req.session.userid,
      });
  },
  listsessions(req,res){
      var query  = `SELECT id,nama_sessions,date_format(start_tgl,'%Y-%m-%d') as start_tgl,date_format(end_tgl,'%Y-%m-%d') as end_tgl, status from sessions `;
      pool.query(query,function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  detailsessions(req,res){
      pool.query(`select id,nama_sessions,date_format(start_tgl,'%Y-%m-%d') as start_tgl,date_format(end_tgl,'%Y-%m-%d') as end_tgl, status from sessions where id = ?`,[req.query.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  simpansessions(req,res){
      pool.query(`insert into sessions (id, nama_sessions, start_tgl, end_tgl, status) values (uuid(), ? , ? , ? , ?)`,[req.body.nama_sessions, req.body.start_tgl, req.body.end_tgl, req.body.status],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  editsessions(req,res){
      pool.query(`update sessions set nama_sessions = ?, start_tgl = ?, end_tgl = ?, status = ? where id = ?`,[req.body.nama_sessions, req.body.start_tgl, req.body.end_tgl, req.body.status, req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  hapussessions(req,res){
      pool.query(`delete from sessions where id = ?`,[req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  roomplan(req,res){
      res.render("master/roomplan",{
          url: baseurl.url,
          userName: req.session.username,
          userid: req.session.userid,
      });
  },
  listroomplan(req,res){
      var query  = `SELECT * from room_plan `;
      pool.query(query,function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  detailroomplan(req,res){
      pool.query(`select * from room_plan where id = ?`,[req.query.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  simpanroomplan(req,res){
      pool.query(`insert into room_plan (id, nama_plan, jml, jenis, status) values (uuid(), ? , ? , ? , ?)`,[req.body.nama_plan, req.body.jml, req.body.jenis, req.body.status],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  editroomplan(req,res){
      pool.query(`update room_plan set nama_plan = ?, jml = ?, jenis = ?, status = ? where id = ?`,[req.body.nama_plan, req.body.jml, req.body.jenis, req.body.status, req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  hapusroomplan(req,res){
      pool.query(`delete from room_plan where id = ?`,[req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  ratetype(req,res){
      res.render("master/ratetype",{
          url: baseurl.url,
          userName: req.session.username,
          userid: req.session.userid,
      });
  },
  listratetype(req,res){
      pool.query(`select * from ratetype`,function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  editratetype(req,res){
      pool.query(`update ratetype set hari = ? where id = 'weekday'`,[req.body.weekday],function (err, results){});
      pool.query(`update ratetype set hari = ? where id = 'weekend'`,[req.body.weekend],function (err, results){});
      res.status(200).json({ success: true});
  },
  roomrates(req,res){
    res.render("master/roomrates",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
listrates(req,res){
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
    pool.query(query,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
simpanrates(req, res) {
    pool.query(
        `INSERT INTO room_rates (id, id_roomtype, id_ratetype, id_sessions, id_plan, price, charges_adult, charges_child, status) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            req.body.id_roomtype,
            req.body.id_ratetype,
            req.body.id_sessions,
            req.body.id_plan,
            req.body.price,
            req.body.charges_adult,
            req.body.charges_child,
            req.body.status
        ],
        function (err, results) {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }
            res.status(200).json({ success: true, data: results, jml: results.affectedRows });
        }
    );
},

detailroomrates(req,res){
    pool.query(`select * from room_rates where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusrates(req,res){
    pool.query(`delete from room_rates where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
editrates(req, res) {
    pool.query(
        `UPDATE room_rates SET id_roomtype = ?, id_ratetype = ?, id_sessions = ?, id_plan = ?, price = ?, charges_adult = ?, charges_child = ?, status = ? WHERE id = ?`,[  req.body.id_roomtype, req.body.id_ratetype, req.body.id_sessions, req.body.id_plan, req.body.price, req.body.charges_adult, req.body.charges_child, req.body.status, req.body.id],
        function (err, results) {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'No records updated, ID not found.' });
            }
            res.status(200).json({success: true, message: 'Data successfully updated', affectedRows: results.affectedRows});
        }
    );
},
roomstatus(req,res){
      res.render("master/roomstatus",{
          url: baseurl.url,
          userName: req.session.username,
          userid: req.session.userid,
      });
  },
  listroomstatus(req,res){
      pool.query(`SELECT * from room_status`,function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  simpanroomstatus(req,res){
      pool.query(`insert into room_status (id, nama_status, keterangan, status) values (uuid(), ?, ?, ?)`,[req.body.nama_status, req.body.keterangan, req.body.status],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  editroomstatus(req,res){
      pool.query(`update room_status set nama_status= ? ,keterangan= ? , status = ? where id = ?`,[req.body.nama_status, req.body.keterangan, req.body.status, req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  detailroomstatus(req,res){
      pool.query(`select * from room_status where id = ?`,[req.query.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  hapusroomstatus(req,res){
      pool.query(`delete from room_status where id = ?`,[req.body.id],function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length});
      })
  },
  extracharge_group(req,res){
    res.render("master/extracharge_group",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
simpan_extragroup(req,res){
    pool.query(`insert into extracharge_group (id, extracharge_group, outlet_posting, income_group, parameter_qty, pos_mobile, pajak, status) values (uuid(), ?, ?, ?, ?, ?, ?, ?)`,[req.body.extracharge_group, req.body.outlet_posting, req.body.income_group, req.body.parameter_qty, req.body.pos_mobile, req.body.pajak, req.body.status],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
listextracharge_group(req,res){
    var query  = `SELECT * from extracharge_group `;
    pool.query(query,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusextracharge_group(req,res){
    pool.query(`delete from extracharge_group where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
detailextracharge_group(req,res){
    pool.query(`select * from extracharge_group where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
edit_extragroup(req, res) {
    const { id, extracharge_group, outlet_posting, income_group, parameter_qty, pos_mobile, pajak, status } = req.body;

    pool.query(
        `UPDATE extracharge_group 
         SET extracharge_group = ?, outlet_posting = ?, income_group = ?, parameter_qty = ?, pos_mobile = ?, pajak = ?, status = ? 
         WHERE id = ?`,
        [extracharge_group, outlet_posting, income_group, parameter_qty, pos_mobile, pajak, status, id],
        function (err, results) {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }
            res.status(200).json({ success: true, message: 'Data berhasil diperbarui', data: results });
        }
    );
},
 //room rate breakdown
 roombreakdown(req,res){
    res.render("master/roombreakdown",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
listbreakdown(req,res){
    pool.query(`SELECT * from rate_breakdown`,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
simpanbreakdown(req,res){
    pool.query(`insert into rate_breakdown (id, nama_b, kategori_p) values (uuid(), ?, ?, ?)`,[req.body.nama_b, req.body.kategori_p],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
editbreakdown(req,res){
    pool.query(`update rate_breakdown set nama_b= ? ,kategori_p= ?  where id = ?`,[req.body.nama_b, req.body.kategori_p, req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
detailbreakdown(req,res){
    pool.query(`select * from rate_breakdown where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusbreakdown(req,res){
    pool.query(`delete from rate_breakdown where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
employee_status(req,res){
    res.render("master/employee_status",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
listemploye_status(req,res){
    pool.query(`SELECT * from employee_status`,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
simpanemployee_status(req,res){
    pool.query(`insert into employee_status (id, nama_status, status) values (uuid(), ?, ? )`,[req.body.nama_status, req.body.status],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
editemployee_status(req,res){
    pool.query(`update employee_status set nama_status= ? , status = ? where id = ?`,[req.body.nama_status,req.body.status, req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
detailemployee_status(req,res){
    pool.query(`select * from employee_status where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusemployee_status(req,res){
    pool.query(`delete from employee_status where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
extracharge(req,res){
    res.render("master/extracharge",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
simpan_extracharge(req,res){
    pool.query(`insert into extracharge(id, id_extragroup, extracharge_type, nama_extracharge, is_persen, price, status) values (uuid(), ?, ?, ?, ?, ?, ?)`,[req.body.id_extragroup, req.body.extracharge_type, req.body.nama_extracharge, req.body.is_persen, req.body.price, req.body.status],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
listextracharge(req,res){
    var query  = `SELECT extracharge.*, extracharge_group.extracharge_group AS nama_extragroup from extracharge INNER JOIN extracharge_group ON extracharge.id_extragroup = extracharge_group.id; `;
    pool.query(query,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusextracharge(req,res){
    pool.query(`delete from extracharge where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
detailextracharge(req,res){
    pool.query(`select * from extracharge where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
edit_extracharge(req, res) {
    const { id, id_extragroup, extracharge_type, nama_extracharge, is_persen, price, status } = req.body;

    pool.query(
        `UPDATE extracharge 
         SET id_extragroup = ?, extracharge_type = ?, nama_extracharge = ?, is_persen = ?, price = ?, status = ? 
         WHERE id = ?`,
        [id_extragroup, extracharge_type, nama_extracharge, is_persen, price, status, id],
        function (err, results) {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }
            res.status(200).json({ success: true, message: 'Data berhasil diperbarui', data: results });
        }
    );
},
employee_shifts(req,res){
    res.render("master/employee_shifts",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
listemploye_shifts(req,res){
    pool.query(`SELECT * from employee_shifts`,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
simpanemployee_shifts(req,res){
    pool.query(`insert into employee_shifts (id, nama_shifts, jam_awal, jam_akhir, status) values (uuid(), ?, ?, ?, ? )`,[req.body.nama_shifts, req.body.jam_awal, req.body.jam_akhir, req.body.status],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
editemployee_shifts(req,res){
    pool.query(`update employee_shifts set nama_shifts= ? , jam_awal= ?,jam_akhir= ?, status = ? where id = ?`,[req.body.nama_shifts, req.body.jam_awal, req.body.jam_akhir, req.body.status, req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
detailemployee_shifts(req,res){
    pool.query(`select * from employee_shifts where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusemployee_shifts(req,res){
    pool.query(`delete from employee_shifts where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
//employee type
employee_type(req,res){
    res.render("master/employee_type",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
listemploye_type(req,res){
    pool.query(`SELECT * from employee_type`,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
simpanemployee_type(req,res){
    pool.query(`insert into employee_type (id, nama_type, status) values (uuid(), ?, ? )`,[req.body.nama_type, req.body.status],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
editemployee_type(req,res){
    pool.query(`update employee_type set nama_type= ? , status = ? where id = ?`,[req.body.nama_type,req.body.status, req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
detailemployee_type(req,res){
    pool.query(`select * from employee_type where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusemployee_type(req,res){
    pool.query(`delete from employee_type where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
employee_list(req,res){
    res.render("master/employee_list",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
listemployee_list(req, res) {
    var query = `SELECT d.*, es.nama_status as nama_status, ef.nama_type as nama_type FROM data_e d `;
    query += `INNER JOIN employee_status es ON es.id = d.id_emplo_status `;
    query += `INNER JOIN employee_type ef ON ef.id = d.id_emplo_type `;

    // Eksekusi query
    pool.query(query, function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, jml: results.length });
    });
},
detailemployee_list(req,res){
    pool.query(`select * from data_e where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
simpanemployee_list(req, res) {
    pool.query(`INSERT INTO data_e (
        id, nik, nama_e, no_ktp, tempat_lahir, tgl_lahir, jk, agama, alamat, no_telp, no_hp, email, departement, id_emplo_status, id_emplo_type, join_date, npwp, nama_bank, no_rek, atas_nama, status
    ) VALUES (
        uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )`, [
        req.body.nik, 
        req.body.nama_e, 
        req.body.no_ktp, 
        req.body.tempat_lahir, 
        req.body.tgl_lahir, 
        req.body.jk, 
        req.body.agama, 
        req.body.alamat, 
        req.body.no_telp, 
        req.body.no_hp, 
        req.body.email, 
        req.body.departement, 
        req.body.id_emplo_status, 
        req.body.id_emplo_type, 
        req.body.join_date, 
        req.body.npwp, 
        req.body.nama_bank, 
        req.body.no_rek, 
        req.body.atas_nama, 
        req.body.status
    ], function (err, results) {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }
        res.status(200).json({ success: true, data: results, affectedRows: results.affectedRows });
    });
},

editemployee_list(req,res){
    pool.query(`update data_e set nik = ? , nama_e = ? , no_ktp = ? , tempat_lahir = ? , tgl_lahir = ? , jk = ? , agama = ? , alamat = ? , no_telp = ? , no_hp = ? , email = ? , departement = ? , id_emplo_status = ? , id_emplo_type = ? , join_date = ? , npwp = ?, nama_bank = ? , no_rek = ? , atas_nama = ? , status = ? where id = ?`,[req.body.nik, req.body.nama_e, req.body.no_ktp, req.body.tempat_lahir, req.body.tgl_lahir, req.body.jk, req.body.agama, req.body.alamat, req.body.no_telp, req.body.no_hp, req.body.email, req.body.departement, req.body.id_emplo_status, req.body.id_emplo_type, req.body.join_date, req.body.npwp, req.body.nama_bank, req.body.no_rek, req.body.atas_nama, req.body.status, req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusemployee_list(req,res){
    pool.query(`delete from data_e where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
banquet_time(req,res){
    res.render("master/banquet_time",{
        url: baseurl.url,
        userName: req.session.username,
        userid: req.session.userid,
    });
},
listbanquet_time(req,res){
    pool.query(`SELECT * from banquet_time`,function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
simpanbanquet_time(req,res){
    pool.query(`insert into banquet_time (id, nama_banquet, time_start, time_end) values (uuid(), ?, ?, ?)`,[req.body.nama_banquet, req.body.time_start, req.body.time_end],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
editbanquet_time(req,res){
    pool.query(`update banquet_time set nama_banquet = ? , time_start = ? , time_end = ? where id = ?`,[req.body.nama_banquet, req.body.time_start, req.body.time_end, req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
detailbanquet_time(req,res){
    pool.query(`select * from banquet_time where id = ?`,[req.query.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},
hapusbanquet_time(req,res){
    pool.query(`delete from banquet_time where id = ?`,[req.body.id],function (err, results) {
      if (err) {
          return res.status(500).json({ message: 'Ada kesalahan', error: err });
      }
      res.status(200).json({ success: true, data: results, jml: results.length});
    })
},


}
