//var ADDR_IP_CAM = "140.113.169.231";  // MIRC311
var ADDR_IP_CAM = "140.113.124.220";  // IoT Farm //140.113.124.220/v2,  140.113.124.221
var PORT_IP_CAM_API = "8080";
var PORT_IP_CAM_RTSP = "554";
var ADDR_KURENTO_SERVER = "video.iottalk.tw";  // MIRC311   video.iottalk.tw
//var ADDR_KURENTO_SERVER = "bao.iottalk.tw";  // IoT Farm
var PORT_KURENTO_SERVER = "8433";
//var ADDR_REMOTE_CONTROL = "http://140.113.199.246:9999/da/Remote_control";  // MIRC311 Remote Control
//var ADDR_REMOTE_CONTROL = "https://farm.iottalk.tw/da/Remote_control";  // IoT Farm Remote Control


/* set url for IP cam and start automatically */
window.addEventListener('load', function(){

	// document.getElementById("address").value="rtsp://admin:5131339@140.113.124.220/v2";
  // document.getElementById("address").value="rtsp://admin:5131339@140.113.124.221/live1.sdp";
  document.getElementById("address").value = parent.cam_src;
  console.log('*******************************' + document.getElementById("address").value);
	document.getElementById('start').click();
	console.log("start");
})

/* auto click the stop button when unload the page */

window.addEventListener('unload', function(){  // not working
	document.getElementById('stop').click();
	console.log("stop");
})

function bodyOnUnload() {  // working
        document.getElementById('stop').click();
        console.log("stop");
}

window.addEventListener('load', function(){
  document.getElementById("videoOutput").addEventListener('click', function(){
	  toggleFullScreen();
	  });  //toggleFullScreen when click the video 
  args.ws_uri = 'wss://' + ADDR_KURENTO_SERVER + ':' + PORT_KURENTO_SERVER + '/kurento'; //set the kurento server address 
})

function toggleFullScreen() {
  var doc = window.document;
  var elem = document.getElementById("videoFSContainer"); //the element you want to make fullscreen

  var requestFullScreen = elem.requestFullscreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen|| doc.msExitFullscreen;

  if(!(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement)) {
      requestFullScreen.call(elem);
	  elem.style.backgroundColor = "black";
  }
  else {
    cancelFullScreen.call(doc);
	elem.style.backgroundColor = "";
  }
}
