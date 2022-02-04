const ctrlTimeVideo = document.getElementById('ctrlTimeVideo');
const ctrlTimeVideoJQ = $('#ctrlTimeVideo');
const video = document.getElementById('video');
const btn_play = document.getElementById('btn_play');
const btn_step = document.getElementById('btn_step');
const timer = document.getElementById('timer');
const preview_video = document.getElementById('preview_video');
const canvas = document.getElementById('canvas_preview');
const video_duration = document.getElementById('video_duration');
const video_duration_seconds = () => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    let time = `${minutes<10 ? '0'+minutes:minutes}:${seconds<10 ? '0'+seconds:seconds}`;
    video_duration.innerHTML = time;
};

//Funcion para establecer el tiempo de reproduccion
function setTimer(currentTime) {
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime - minutes * 60);
    let time = `${minutes<10 ? '0'+minutes:minutes}:${seconds<10 ? '0'+seconds:seconds}`;
    return timer.innerHTML = time;
}
function setCanvasPreview(posX) {
    let ctx = canvas.getContext('2d');
    let video = document.getElementById('video');
    preview_video.style.left = (parseInt(posX)+(canvas.width*0.5)) + 'px';
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    /* Para lograr la función completa de previsualización es necesario 
    una API o algun algoritmo que sea capaz de descomponer los video frame a frame en imagenes.
    En esta función es donde se setearian esos frames*/
}

window.onload = function () {
    video_duration_seconds();
};

btn_play.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        btn_play.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        btn_play.innerHTML = '<i class="fas fa-play"></i>';
    }
});
//Evento para pasar al siguiente frame
btn_step.addEventListener('click', () => {
    video.currentTime += video.duration*0.10;
    timer.innerHTML = setTimer(video.currentTime);
});

//Evento de reproducción del video
video.addEventListener('timeupdate', () => {
    if (video.currentTime >= video.duration) {
        video.pause();
        btn_play.innerHTML = '<i class="fas fa-play"></i>';
    }
    ctrlTimeVideo.value = video.currentTime / video.duration * 1;
    timer.innerHTML = setTimer(video.currentTime);
});

/* Evento de preview en el video segun la 
posición del mouse en el slider */
ctrlTimeVideo.addEventListener('mousemove', (e) => {
    setCanvasPreview(e.offsetX);
});
ctrlTimeVideoJQ.hover(function () {
    preview_video.style.display = 'block';
}, function () {
    preview_video.style.display = 'none';
});
//Evento de cambio de tiempo mientras se manipula el slider
ctrlTimeVideo.addEventListener('input', (e) => {
    if (!video.paused) {
        video.pause();
        video.attributes.preselected = true;
        btn_play.innerHTML = '<i class="fas fa-play"></i>';
    }
    video.currentTime = ctrlTimeVideo.value * video.duration;
    preview_video.style.display = 'block';
    setCanvasPreview(e.offsetX);
});
//Evento para confirmar el cambio de tiempo
ctrlTimeVideo.addEventListener('change', function (e) {
    if(video.attributes.preselected){
        video.play()
        btn_play.innerHTML = '<i class="fas fa-pause"></i>'
        video.attributes.preselected = false;
    }
});

//Evento para las flechas del teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Space') {
        if (video.paused) {
            video.play();
            btn_play.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            btn_play.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    if (e.key  === 'ArrowLeft') {
        video.currentTime -= video.duration*0.10;
        timer.innerHTML = setTimer(video.currentTime);
    } else if (e.key === 'ArrowRight') {
        video.currentTime += video.duration*0.10;
        timer.innerHTML = setTimer(video.currentTime);
    }
});
