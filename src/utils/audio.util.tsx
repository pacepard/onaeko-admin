import { IAudioHelper } from "./interfaces.util";


let progressBar: any, audioPlayer: any, progressCont: any;
let audioDuration: number | string = 0;
let audioCurrentTime: number | string = 0;
let index: number = 0;
let audioId: string = ''

const playAudio = (id: string) => {

    const ap = document.getElementById(id) as HTMLAudioElement;

    if(ap){
       ap.play();
    }

}

const pauseAudio = (id: string) => {

    const ap = document.getElementById(id) as HTMLAudioElement;

    if(ap){
       ap.pause();
    }

}

const muteAudio = (id: string) => {

    const ap = document.getElementById(id) as HTMLAudioElement;

    if(ap){
       ap.muted = true;
    }

}

const unmuteAudio = (id: string) => {

    const ap = document.getElementById(id) as HTMLAudioElement;

    if(ap){
       ap.muted = false;
    }

}

const getSeek = (id: string) => {

    const pb = document.getElementById(id);

    if(pb){
        progressBar = pb;
    }

}

const getSeekBar = (id: string) => {

    const pc = document.getElementById(id);

    if(pc){
        progressCont = pc;
    }

}

const getAudio = (id: string, index: number) => {

    const ap = document.getElementById(id);

    if(ap){
        audioPlayer = ap;
        index = index;
    }

}

const updateProgress = (e: any) => {

    const seek = document.getElementById('seek-progress') as HTMLElement;

    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    
    progressBar.style.width = `${progressPercent}%`;

    const adTm = document.querySelectorAll(`#auxtime-${index}`);

    if(seek){
        seek.style.width = `${progressPercent}%`;
    }

    if(adTm && adTm.length > 0){

        let dur = convertDuration(duration);
        let time = convertTime(currentTime);
        adTm.forEach((elem) => {
            elem.innerHTML = `${time.toString()} / ${dur.toString()}`
        })

    }
    
}

const setProgress = (e: any) => {

    const width = progressCont.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
}

const initProgress = (audioId: string) => {

    if(audioPlayer){
        audioPlayer.addEventListener('timeupdate', updateProgress);
    }

    if(progressCont){
        progressCont.addEventListener('click', setProgress);
    }

    const seek = document.getElementById('seek-progress') as HTMLElement;
    const bar = document.getElementById('seek-bar') as HTMLElement;

    if(bar && seek){

        bar.addEventListener('click', (e) => {

            const width = bar.clientWidth;
            const offset = e.offsetX;
    
            audioPlayer.currentTime = (offset / width) * audioPlayer.duration;
    
        })

    }

}

const getDuration = (meta: any) => {
    
    const {duration, currentTime} = meta.target;
    const tm = duration;
    audioCurrentTime = currentTime;
    
    const adTm = document.querySelectorAll(`#auxtime-${index}`);

    if(adTm && adTm.length > 0){
        let dur = convertDuration(tm);
        let time = convertTime(currentTime);
        adTm.forEach((elem) => {
            elem.innerHTML = `${time.toString()} / ${dur.toString()}`
        })
    }

    return audioDuration;

}

const convertDuration = (tm: any) => {
    
    var seconds: any = Math.floor(parseInt(tm.toString()) % 60);
    var foo = parseInt(tm.toString()) - seconds;
    var min: any = foo / 60;
    var minutes: any = Math.floor(min % 60);
    var hours: any = Math.floor(min / 60);

    if(seconds < 10){
        seconds = "0" + seconds.toString();
    }

    if(hours > 0){
        audioDuration = hours + ":" + minutes + ":" + seconds;
    } else {
        audioDuration = minutes + ":" + seconds;
    }

    return audioDuration;

} 

const formatTime = (time: any): { hours: number, minutes: number, seconds: number } => {
    
    var seconds: any = Math.floor(parseInt(time.toString()) % 60);
    var foo = parseInt(time.toString()) - seconds;
    var min: any = foo / 60;
    var minutes: any = Math.floor(min % 60);
    var hours: any = Math.floor(min / 60);

    return { hours, minutes, seconds } ;

}

const convertTime = (tm: any) => {
    
    var seconds: any = Math.floor(parseInt(tm.toString()) % 60);
    var foo = parseInt(tm.toString()) - seconds;
    var min: any = foo / 60;
    var minutes: any = Math.floor(min % 60);
    var hours: any = Math.floor(min / 60);

    if(seconds < 10){
        seconds = "0" + seconds.toString();
    }

    if(hours > 0){
        audioCurrentTime = hours + ":" + minutes + ":" + seconds;
    } else {
        audioCurrentTime = minutes + ":" + seconds;
    }

    return audioCurrentTime;

} 

const audio: IAudioHelper = {
    progressBar: progressBar,
    audioPlayer: audioPlayer,
    progressCont: progressCont,
    audioDuration: audioDuration,
    audioCurrentTime: audioCurrentTime,
    audioId: audioId,
    playAudio: playAudio,
    pauseAudio: pauseAudio,
    getSeek: getSeek,
    getSeekBar: getSeekBar,
    getAudio: getAudio,
    updateProgress: updateProgress,
    setProgress: setProgress,
    initProgress: initProgress,
    getDuration: getDuration,
    convertDuration: convertDuration,
    convertTime: convertTime,
    muteAudio: muteAudio,
    unmuteAudio: unmuteAudio,
    formatTime: formatTime
}

export default audio;