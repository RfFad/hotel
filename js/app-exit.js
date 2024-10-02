var lastTimeBackPress=0;
var timePeriodToExit=2000;
function onBackKeyDown(e){
    e.preventDefault();
    e.stopPropagation();
    if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
        navigator.app.exitApp();
    }else{
        alert("Press again to exit.");
        
        lastTimeBackPress=new Date().getTime();
    }
};
document.addEventListener("backbutton", onBackKeyDown, false);