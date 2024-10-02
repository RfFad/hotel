$(".tmenu a, .treeview-menu a").click(function(){
	var page = $(this).attr("href");
	localStorage.setItem('page',page);
    $(".konten").load(page);
    location.reload();
    $("body").removeClass("sidebar-open");
    return false;
});
$("a.menu").click(function(){
	var page = $(this).attr("href");
	localStorage.setItem('page',page);
    $(".konten").load(page);
    location.reload();
    return false;
});
function tgl_indo(tgl,tipe=1){
    var date = tgl.substring(tgl.length,tgl.length-2);
    if (tipe==1)
        var bln = tgl.substring(5,7);
    else
        var bln = tgl.substring(4,6);
    var thn = tgl.substring(0,4);
    return date+"-"+bln+"-"+thn;
}
$(document).ajaxStart(function () {
    $('.loading').show();
}).ajaxStop(function () {
    $('.loading').hide();
});
function number_format(number, decimals, dec_point, thousands_point) {
    if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
    }
    if (!decimals) {
        var len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }
    if (!dec_point) {
        dec_point = '.';
    }
    if (!thousands_point) {
        thousands_point = ',';
    }
    number = parseFloat(number).toFixed(decimals);
    number = number.replace(".", dec_point);
    var splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);
    return number;
}