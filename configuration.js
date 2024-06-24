const principalVideo = document.querySelector('#mainVideo');
const playList = document.getElementById('playList');
const All__videos = document.querySelector('.All__videos');
const videoTitulo = document.querySelector('.titulo');
const video_players = document.querySelectorAll(".videoPlayer");
const captureImageButton = document.getElementById('captureImage');
const prevVideoButton = document.getElementById('prevVideo');
const nextVideoButton = document.getElementById('nextVideo');

const ulTag = document.querySelector("ul");
All__videos.innerHTML = `Lista de Reproducción`


let videoIndice = 1;
window.addEventListener('load',()=>{
   cargarVideo(videoIndice);
   reproducirNow();
})


for(let i = 0; i < allVideos.length; i++){
   let liTag = `<li li-index="${i + 1}">
      <div class="row">
         <span>${i + 1}. ${allVideos[i].name}</span>
      </div>
      <video class="${allVideos[i].id}" src="${allVideos[i].src}.mp4" style="display: none;" title="${allVideos[i].name}"></video>
      <span id="${allVideos[i].id}" class="duration"></span>
   </li>`;
   playList.insertAdjacentHTML('beforeend',liTag); 

   let liVideoDuration = ulTag.querySelector(`#${allVideos[i].id}`)
   let liVideoTag = ulTag.querySelector(`.${allVideos[i].id}`);
   

   liVideoTag.addEventListener("loadeddata", ()=>{
      let videoDuration = liVideoTag.duration;
      let totalMin = Math.floor(videoDuration / 60);
      let totalSec = Math.floor(videoDuration % 60);
      totalSec < 10 ? totalSec = "0"+ totalSec : totalSec
      liVideoDuration.innerText = `${totalMin}:${totalSec}`;
      liVideoDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
   })  
}
const allLiTags = playList.querySelectorAll('li');

function playVideo(){
    principalVideo.play();
    playList.classList.add('active')
 }

 function cargarVideo(indexNumb){
    principalVideo.src = `${allVideos[indexNumb - 1].src}.mp4`;
    let trackElement = principalVideo.querySelector('track');
    trackElement.src = allVideos[indexNumb - 1].subtitles;
    videoTitulo.innerHTML = `${allVideos[indexNumb - 1].name}`
    
 }

function reproducirNow(){
   for(let j = 0; j<allVideos.length; j++){
      if(allLiTags[j].classList.contains('playing')){
         allLiTags[j].classList.remove("playing")
      }
      if(allLiTags[j].getAttribute('li-index')==videoIndice){
         allLiTags[j].classList.add('playing')
      }
      allLiTags[j].setAttribute("onclick", "clicked(this)")
   }
}

prevVideoButton.addEventListener('click', () => {
   videoIndice--;
   if(videoIndice < 1) { 
       videoIndice = allVideos.length;
   }
   cargarVideo(videoIndice);
   playVideo();
   reproducirNow();
});

nextVideoButton.addEventListener('click', () => {
   videoIndice++;
   if(videoIndice > allVideos.length) {
       videoIndice = 1;
   }
   cargarVideo(videoIndice);
   playVideo();
   reproducirNow();
});


captureImageButton.addEventListener('click', (event) => {
   event.preventDefault();
   let canvas = document.createElement('canvas');
   canvas.width = principalVideo.videoWidth;
   canvas.height = principalVideo.videoHeight;
   let ctx = canvas.getContext('2d');
   ctx.drawImage(principalVideo, 0, 0, canvas.width, canvas.height);
   let imageUrl = canvas.toDataURL();
   let link = document.createElement('a');
   link.href = imageUrl;
   link.download = 'captura.png';
   link.click();
});


function clicked(element){
   let getIndex = element.getAttribute("li-index");
   videoIndice = getIndex;
   cargarVideo(videoIndice);
   playVideo();
   reproducirNow();
}


let customControls = document.getElementById('customControls');

principalVideo.addEventListener('mouseenter', () => {
   if (!principalVideo.paused) {
       customControls.style.display = 'block';
   }
});

principalVideo.addEventListener('mouseleave', () => {
   if (!principalVideo.paused) {
       customControls.style.display = 'none';
   }
});

principalVideo.addEventListener('play', () => {
   if (!principalVideo.parentElement.querySelector(':hover')) {
       customControls.style.display = 'none';
   }
});

principalVideo.addEventListener('pause', () => {
   customControls.style.display = 'block';
});

customControls.addEventListener('mouseenter', (event) => {
   event.stopPropagation();
   customControls.style.display = 'block';
});

customControls.addEventListener('mouseleave', (event) => {
   event.stopPropagation();
   if (!principalVideo.paused) {
       customControls.style.display = 'none';
   }
});
