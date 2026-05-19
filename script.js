let localStream;

window.onload = function(){

showNotification("User Joined Meeting 👋");

}

async function startCall(){

let videoBoxes = document.querySelectorAll(".video-box");

try{

localStream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

let video = document.createElement("video");

video.srcObject = localStream;

video.autoplay = true;

video.style.width = "100%";
video.style.height = "100%";

videoBoxes[0].innerHTML = "";

videoBoxes[0].appendChild(video);

showNotification("Live Camera Started 📹");

}
catch(error){

alert("Camera Permission Denied");

}

}

async function shareScreen(){

try{

const screenStream = await navigator.mediaDevices.getDisplayMedia({
video:true
});

let videoBoxes = document.querySelectorAll(".video-box");

let screenVideo = document.createElement("video");

screenVideo.srcObject = screenStream;

screenVideo.autoplay = true;

screenVideo.style.width = "100%";
screenVideo.style.height = "100%";

videoBoxes[1].innerHTML = "";

videoBoxes[1].appendChild(screenVideo);

showNotification("Screen Sharing Started 🖥️");

}
catch(error){

alert("Screen Share Failed");

}

}

function sendMessage(){

let input = document.getElementById("message");

if(input.value === ""){
alert("Enter Message");
return;
}

let msg = document.createElement("div");

msg.classList.add("message");

msg.innerText = input.value;

document.getElementById("messages").appendChild(msg);

showNotification("New Message Sent 💬");

input.value = "";

}

function toggleMode(){

document.body.classList.toggle("dark");

}

function fileUploaded(){

showNotification("File Uploaded Successfully 📁");

}

function showNotification(text){

let notify = document.createElement("div");

notify.innerText = text;

notify.style.position = "fixed";
notify.style.top = "20px";
notify.style.right = "20px";
notify.style.background = "green";
notify.style.color = "white";
notify.style.padding = "15px";
notify.style.borderRadius = "10px";

document.body.appendChild(notify);

setTimeout(()=>{
notify.remove();
},3000);

}

function muteAudio(){

let audioTrack = localStream.getAudioTracks()[0];

audioTrack.enabled = !audioTrack.enabled;

showNotification("Audio Toggled 🎤");

}

function toggleCamera(){

let videoTrack = localStream.getVideoTracks()[0];

videoTrack.enabled = !videoTrack.enabled;

showNotification("Camera Toggled 📷");

}

function downloadChat(){

let chats = document.getElementById("messages").innerText;

let blob = new Blob([chats], {type:"text/plain"});

let link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "chat.txt";

link.click();

showNotification("Chat Downloaded 📄");

}

let seconds = 0;

setInterval(()=>{

seconds++;

let mins = Math.floor(seconds / 60);

let secs = seconds % 60;

document.getElementById("timer").innerText =
`${mins}:${secs < 10 ? '0' : ''}${secs}`;

},1000);

function addEmoji(emoji){

document.getElementById("message").value += emoji;

}

function endMeeting(){

location.reload();

}

function raiseHand(){

showNotification("Hand Raised ✋");

}

function copyMeetingLink(){

navigator.clipboard.writeText(window.location.href);

showNotification("Meeting Link Copied 🔗");

}

function fullScreen(){

document.documentElement.requestFullscreen();

}

document.getElementById("message").addEventListener("keypress", ()=>{

document.getElementById("typing").innerText =
"Typing...";

setTimeout(()=>{

document.getElementById("typing").innerText = "";

},1000);

});

function clearChat(){

document.getElementById("messages").innerHTML = "";

showNotification("Chat Cleared 🗑️");

}

setInterval(()=>{

let now = new Date();

document.getElementById("dateTime").innerText =
now.toLocaleString();

},1000);

function recordMeeting(){

showNotification("Recording Started ⏺️");

}