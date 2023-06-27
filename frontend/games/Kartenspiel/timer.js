
var gestoppteZeit = 0;
var finish = false;
var lastGo = new Date();

function aktuZeit(){
    if(finish===false){
        gestoppteZeit += new Date()-lastGo;
        show();
    }
    lastGo= new Date;
    setTimeout(aktuZeit,1000);
}
function show(){
    let sec = Math.floor(gestoppteZeit/1000)%60
    let min = Math.floor(gestoppteZeit/60000);

    sec = sec <10 ? "0" + sec : sec;
    min = min <10 ? "0" + min : min;
    $("#timerdiv").html(min + ":" + sec);
}

aktuZeit()