$(document).ready(function(){

    $('#startStopBtn').on('click', function(){
        startStop();
    })
})

function I(id){return document.getElementById(id);}

var w=null; //speedtest worker
var parameters={ //custom test parameters. See doc.md for a complete list
	time_dl: 10, //download test lasts 10 seconds
	time_ul: 10, //upload test lasts 10 seconds
	count_ping: 20, //ping+jitter test does 20 pings
    getIp_ispInfo: false //will only get IP address without ISP info
};
function startStop(){
	if(w!=null){
		//speedtest is running, abort
		w.postMessage('abort');
        w=null;
		
        $("#startStopBtn").text('Проверка');

		initUI();
	}else{
		//test is not running, begin
		w=new Worker('speedtest_worker.min.js');
		w.postMessage('start '+JSON.stringify(parameters)); //run the test with custom parameters

        $("#startStopBtn").addClass('speedtest__running');
        $("#startStopBtn").text('Отменить');
		w.onmessage=function(e){
			var data=e.data.split(';');
			var status=Number(data[0]);
			if(status>=4){
				//test completed
                $("#startStopBtn").removeClass('speedtest__running');
                $("#startStopBtn").text('Проверить');
				w=null;
			}
            I("ip").textContent=data[4];
            console.log(data[4]);
			I("dlText").textContent=(status==1&&data[1]==0)?"...":data[1];
			I("ulText").textContent=(status==3&&data[2]==0)?"...":data[2];
			I("pingText").textContent=data[3];
            I("jitText").textContent=data[5];
            var prog=(Number(data[6])*2+Number(data[7])*2+Number(data[8]))/5;
			I("progress").style.width=(100*prog)+"%";
		};
	}
}
//poll the status from the worker every 200ms (this will also update the UI)
setInterval(function(){
	if(w) w.postMessage('status');
},200);
//function to (re)initialize UI
function initUI(){
	I("dlText").textContent="";
	I("ulText").textContent="";
	I("pingText").textContent="";
	I("jitText").textContent="";
    I("ip").textContent="";
    I("progress").style.width="";
}

