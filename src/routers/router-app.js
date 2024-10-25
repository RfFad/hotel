const router = require("express").Router();
const homeController = require("../controllers").home;
const masterController = require("../controllers").master;
const verifyUser = require("../configs/verify");
const checkinController = require("../controllers/controller-checkin")

router.get("/", verifyUser.isLogin, homeController.home, );
router.get("/setup", verifyUser.isLogin, homeController.setup);
router.get("/menumaster", verifyUser.isLogin, homeController.menumaster);
router.get("/menucheckin", verifyUser.isLogin, homeController.menucheckin);

router.get("/roomfloor", masterController.roomfloor);
router.get("/detailfloor", masterController.detailfloor);
router.post("/listfloor", masterController.listfloor);
router.post("/simpanfloor", masterController.simpanfloor);
router.post("/editfloor", masterController.editfloor);
router.post("/hapusfloor", masterController.hapusfloor);

router.get("/roomtype", masterController.roomtype);
router.post("/listtype", masterController.listtype);
router.get("/detailtype", masterController.detailtype);
router.post("/simpantype", masterController.simpantype);
router.post("/edittype", masterController.edittype);

router.get("/room", masterController.room);
router.get("/detailroom", masterController.detailroom);
router.post("/listroom", masterController.listroom);
router.post("/simpanroom", masterController.simpanroom);
router.post("/editroom", masterController.editroom);
router.post("/hapusroom", masterController.hapusroom);

router.get("/sessions", masterController.sessions);
router.get("/detailsessions", masterController.detailsessions);
router.post("/listsessions", masterController.listsessions);
router.post("/simpansessions", masterController.simpansessions);
router.post("/editsessions", masterController.editsessions);
router.post("/hapussessions", masterController.hapussessions);

router.get("/roomplan", masterController.roomplan);
router.get("/detailroomplan", masterController.detailroomplan);
router.post("/listroomplan", masterController.listroomplan);
router.post("/simpanroomplan", masterController.simpanroomplan);
router.post("/editroomplan", masterController.editroomplan);
router.post("/hapusroomplan", masterController.hapusroomplan);

router.get("/ratetype", masterController.ratetype);
router.post("/editratetype", masterController.editratetype);
router.get("/listratetype", masterController.listratetype);

router.post("/listsetup", homeController.listsetup);
router.post("/edit", homeController.edit);
//room rates
router.get("/roomrates", masterController.roomrates);
router.post("/listrates", masterController.listrates);
router.post("/simpanrates", masterController.simpanrates);
router.get("/detailrates", masterController.detailroomrates);
router.post("/hapusrates", masterController.hapusrates);
router.post("/editroomrates", masterController.editrates);
//room status
router.get("/roomstatus", masterController.roomstatus);
router.post("/listroomstatus", masterController.listroomstatus);
router.post("/simpanroomstatus", masterController.simpanroomstatus);
router.get("/detailroomstatus", masterController.detailroomstatus);
router.post("/hapusroomstatus", masterController.hapusroomstatus);
router.post("/editroomstatus", masterController.editroomstatus);
//extracharge_group
router.get("/extracharge_group", masterController.extracharge_group)
router.post("/simpancharge_group", masterController.simpan_extragroup)
router.post("/editcharge_group", masterController.edit_extragroup)
router.post("/listcharge_group", masterController.listextracharge_group)
router.post("/hapuscharge_group", masterController.hapusextracharge_group)
router.get("/detailcharge_group", masterController.detailextracharge_group);
//extracharge
router.get("/extracharge", masterController.extracharge)
router.post("/simpancharge", masterController.simpan_extracharge)
router.post("/editcharge", masterController.edit_extracharge)
router.post("/listcharge", masterController.listextracharge)
router.post("/hapuscharge", masterController.hapusextracharge)
router.get("/detailcharge", masterController.detailextracharge);
//
router.get("/roombreakdown", masterController.roombreakdown);
router.post("/listbreakdown", masterController.listbreakdown);
router.post("/simpanbreakdown", masterController.simpanbreakdown);
router.get("/detailbreakdown", masterController.detailbreakdown);
router.post("/hapusbreakdown", masterController.hapusbreakdown);
router.post("/editbreakdown", masterController.editbreakdown);
//employee status
router.post("/simpanemployee_status", masterController.simpanemployee_status);
router.get("/employee_status", masterController.employee_status);
router.post("/listemployee_status", masterController.listemploye_status);
router.get("/detailemployee_status", masterController.detailemployee_status);
router.post("/editemployee_status", masterController.editemployee_status)
router.post("/hapusemployee_status", masterController.hapusemployee_status)
//employee shifts
router.post("/simpanemployee_shifts", masterController.simpanemployee_shifts);
router.get("/employee_shifts", masterController.employee_shifts);
router.post("/listemployee_shifts", masterController.listemploye_shifts);
router.get("/detailemployee_shifts", masterController.detailemployee_shifts);
router.post("/editemployee_shifts", masterController.editemployee_shifts)
router.post("/hapusemployee_shifts", masterController.hapusemployee_shifts)
//employee type
router.post("/simpanemployee_type", masterController.simpanemployee_type);
router.get("/employee_type", masterController.employee_type);
router.post("/listemployee_type", masterController.listemploye_type);
router.get("/detailemployee_type", masterController.detailemployee_type);
router.post("/editemployee_type", masterController.editemployee_type)
router.post("/hapusemployee_type", masterController.hapusemployee_type)
//employee list
router.post("/simpanemployee_list", masterController.simpanemployee_list);
router.get("/employee_list", masterController.employee_list);
router.post("/listemployee_list", masterController.listemployee_list);
router.get("/detailemployee_list", masterController.detailemployee_list);
router.post("/editemployee_list", masterController.editemployee_list)
router.post("/hapusemployee_list", masterController.hapusemployee_list)
//employee list
router.post("/simpanbanquet_time", masterController.simpanbanquet_time);
router.get("/banquet_time", masterController.banquet_time);
router.post("/listbanquet_time", masterController.listbanquet_time);
router.get("/detailbanquet_time", masterController.detailbanquet_time);
router.post("/editbanquet_time", masterController.editbanquet_time)
router.post("/hapusbanquet_time", masterController.hapusbanquet_time)
//checkin
router.get("/checkin", checkinController.checkin);
router.get("/data_checkin", checkinController.data_tamu);
router.post("/simpan/checkin", checkinController.simpancheckin)
router.post("/listcheckin", checkinController.listcheckin)

module.exports = router;
