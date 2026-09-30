import { IVideoHelper } from "./interfaces.util";


let duration: string = '0:00';

const playVideo = (id: string) => {
    const elem = document.getElementById(id) as HTMLVideoElement;
    if(elem){
        elem.play();
    }
}

const pauseVideo = (id: string) => {
    const elem = document.getElementById(id) as HTMLVideoElement;
    if(elem){
        elem.pause();
    }
}

const muteVideo = (id: string) => {
    const elem = document.getElementById(id) as HTMLVideoElement;
    if(elem){

        if(elem.muted){
            elem.muted = false;
        }else{
            elem.muted = true;
        }
        
    }
}

const unmuteVideo = (id: string) => {
    const elem = document.getElementById(id) as HTMLVideoElement;
    if(elem){
        elem.muted = false;
    }
}

const changeView = (id: string) => {
    const elem = document.getElementById(id) as any;
    if(elem){
        
        if(elem.requestFullScreen){
            elem.requestFullScreen();
        }else if(elem.webkitRequestFullScreen){
            elem.webkitRequestFullScreen()
        }else if(elem.mozRequestFullScreen){
            elem.mozRequestFullScreen()
        }

    }
}

const seekVideo = (id: string, barId: string, timeId: string) => {

    const elem = document.getElementById(id) as HTMLVideoElement;
    const bar = document.getElementById(barId) as HTMLElement;
    const time = document.getElementById(timeId) as HTMLElement;

    if(elem && bar && time){

        const perce =  (elem.currentTime / elem.duration) * 100;
        bar.style.width = `${perce}%`;

        duration = convertTime(elem.duration);

        let tm = convertTime(elem.currentTime);
        time.innerHTML = tm;

    }

}

const seekProgress = (id: string, barId: string, seekId: string) => {

    const elem = document.getElementById(id) as HTMLVideoElement;
    const bar = document.getElementById(barId) as HTMLElement;
    const seek = document.getElementById(seekId) as HTMLElement;

    if(elem && bar && seek){

        bar.addEventListener('click', (e) => {

            const width = bar.clientWidth;
            const offset = e.offsetX;

            elem.currentTime = (offset / width) * elem.duration;

        })

    }

}

const formatTime = (time: any): { hours: number, minutes: number, seconds: number } => {
    
    var seconds: any = Math.floor(parseInt(time.toString()) % 60);
    var foo = parseInt(time.toString()) - seconds;
    var min: any = foo / 60;
    var minutes: any = Math.floor(min % 60);
    var hours: any = Math.floor(min / 60);

    return { hours, minutes, seconds } ;

}

const convertTime = (time: any): string => {

    let timeResult: string = '00:00';
    
    var seconds: any = Math.floor(parseInt(time.toString()) % 60);
    var foo = parseInt(time.toString()) - seconds;
    var min: any = foo / 60;
    var minutes: any = Math.floor(min % 60);
    var hours: any = Math.floor(min / 60);

    if(seconds < 10){
        seconds = "0" + seconds.toString();
    }

    if(hours > 0){
        timeResult = `${hours}:${minutes}:${seconds}`;
    } else {
        timeResult = `${minutes}:${seconds}`;
    }

    return timeResult;

}

const timeUpdate = (id: string, barId: string, timeId: string) => {

    const elem = document.getElementById(id) as HTMLVideoElement;

    if(elem){
        seekVideo(id, barId, timeId)
    }

}

const getDuration = (id: string, timeId: string): string => {

    const elem = document.getElementById(id) as HTMLVideoElement;
    const time = document.getElementById(timeId) as HTMLElement;

    if(elem && time){
        setTimeout(() => {
            duration = convertTime(elem.duration);
            time.innerHTML = convertTime(elem.currentTime)
            
        },150)
    }

    return duration
}

const setVolume = (id: string, rid: string) => {

    const elem = document.getElementById(id) as HTMLVideoElement;
    const range = document.getElementById(rid) as any;

    if(elem && range){
        elem.volume = range.value / 100;
    }

}

const video: IVideoHelper = {
    duration: duration,
    playVideo: playVideo,
    pauseVideo: pauseVideo,
    muteVideo: muteVideo,
    unmuteVideo: unmuteVideo,
    changeView: changeView,
    seekVideo: seekVideo,
    timeUpdate: timeUpdate,
    getDuration: getDuration,
    setVolume: setVolume,
    seekProgress: seekProgress,
    convertTime: convertTime,
    formatTime: formatTime
}

export default video;