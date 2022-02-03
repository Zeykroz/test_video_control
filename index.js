const ctrlTimeVideo = document.getElementById('ctrlTimeVideo');
const video = document.getElementById('video');
const btn_play = document.getElementById('btn_play');
const btn_step = document.getElementById('btn_step');
const timer = document.getElementById('timer');

btn_play.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        btn_play.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        btn_play.innerHTML = '<i class="fas fa-play"></i>';
    }
});
//Funcion para establecer el tiempo de reproduccion
function setTimer(currentTime) {
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime - minutes * 60);
    let time = `${minutes<10 ? '0'+minutes:minutes}:${seconds<10 ? '0'+seconds:seconds}`;
    return timer.innerHTML = time;
}
//Evento de reproducción del video
video.addEventListener('timeupdate', () => {
    if (video.currentTime >= video.duration) {
        video.pause();
        btn_play.innerHTML = '<i class="fas fa-play"></i>';
    }
    ctrlTimeVideo.value = video.currentTime / video.duration * 1;
    timer.innerHTML = setTimer(video.currentTime);
});
//Evento de cambio de tiempo mientras se manipula el slider
ctrlTimeVideo.addEventListener('input', () => {
    if (!video.paused) {
        video.pause();
        video.attributes.preselected = true;
        btn_play.innerHTML = '<i class="fas fa-play"></i>';
    }
    video.currentTime = ctrlTimeVideo.value * video.duration;
});
//Evento para confirmar el cambio de tiempo
ctrlTimeVideo.addEventListener('change', function (e) {
    if(video.attributes.preselected){
        video.play()
        btn_play.innerHTML = '<i class="fas fa-pause"></i>'
    }
});
//Evento para pasar al siguiente frame
btn_step.addEventListener('click', () => {
    video.currentTime += video.duration*0.10;
    timer.innerHTML = setTimer(video.currentTime);
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
