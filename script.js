let trackIndex = 0;
let tickIndex = 0;

let vacant = true;
let isOn = true;

let canDo = {
    start: true,
    play: false,
    stop: false,
    pause: false
}

let sounds = {
    'bass.mp3': 'Бочка',
    'hi-hat.mp3': 'Хэт',
    'snare.aif.mp3': 'Малый барабан',
    'plate.wav': 'Тарелка (акцент)',
    'click.mp3': 'Рим-клик',
    'alt.aif.mp3': 'Альт',
    'plate-hat.mp3': 'Тарелка (чашечка)',
    'doNothing': 'Пауза',
    'tenor.wav': 'Тенор'
};

let ticks = {
    'b': 'bass.mp3',
    'h': 'hi-hat.mp3',
    's': 'snare.aif.mp3',
    'p': 'plate.wav',
    'c': 'click.mp3',
    'a': 'alt.aif.mp3',
    'w': 'doNothing',
    'g': 'plate-hat.mp3',
    't': 'tenor.wav'
};

const audioSounds = {};
Object.keys(sounds).forEach(t => audioSounds[t] = `sound/${t}`);

let tracks = [
    'bh h sh h bh h sh h bh h sh h bh h sh h',
    'bh h sh bh h h sh h bh h sh bh h h sh h',
    'bh h sh bh bh h sh h bh h sh bh bh h sh h',
    'bh h sh h h bh sh h bh h sh h h bh sh h',
    'bh h sh bh h bh sh h bh h sh bh h bh sh h',
    'bh h ch h bh h ch ch bh h ch h bh h ch ch',
    'bh h ch bh h h a a bh h ch bh h h a a',
    'cbh h ch bh cbh h ch h cbh h ch bh cbh h ch h',
    'bh h ch h h bh ch ch cbh h ch h h bh a a',
    'cbh h ch bh ch bh ch h bh h ch bh h bh a a',
    'pb h hc h hb h hs h pb h hc h hb h hs h',
    'pb h hs pb h h hs h pb h hs pb h h hs h',
    'gb g gs gb gb g gs g gb g gs gb gb g gs g',
    'bh h sh bh bh h sh h bh h sh bh bh h sh sh',
    'pb h sh bh bh h sh h bh h sh bh bh s s pb h h sh bh bh h sh h',
    'bh h sh bh bh h sh sh pb h sh bh bh s s pb s s s s ba a bt t',
    'pb bh sh bh bh h sh h bh bh sh h bh bh sh h pb bh sh bh bh h sh h',
    'tsb ts tsb ts tsb ts sp bh bh h sh bh bh h sh sh bh bh h bh bh s s pb',
    'a a b b s s t t a a b b s s t t',
    'a a t t b b s s a a t t b b s s',
    'b b s a ht w w w b b s a ht w w w',
    'a a t t s s b b a a t t s s b b',
    's b s b a a t t s b s b a a t t',
    's s a a t t pb w s s a a t t pb w',
    'sh b sh b ta ta ta ta sh b sh b ta ta ta ta',
    'b sh b sp s a t t b sh b sp s a t t'
];

let parts = {
    0: 'Базовые навыки',
    1: 'Базовые навыки',
    5: 'Рим-клик',
    6: 'Альт',
    10: 'Тарелка',
    13: 'Открытый хэт',
    16: 'Тенор и паузы'
};

async function play(sound, bruteForce=false){
    if(sound == 'doNothing') 
        return;
    let audio = new Audio(`sound/${sound}`);
    //audioSounds[sound];
    if(!bruteForce){
        if(document.getElementById('playing').innerHTML == '')
            document.getElementById('playing').innerHTML = sounds[sound];
        else
            document.getElementById('playing').innerHTML += (' и ' + sounds[sound]);
    }
    audio.play();
    setTimeout(() => {
        document.getElementById('playing').innerHTML = '';
    }, 450);
}

function playMul(sound, bruteForce=false){
    if(isOn && !vacant || bruteForce){
        if(!bruteForce)
            tickIndex++;
        document.getElementById('tick').innerHTML = tickIndex;
        for(let soundie of sound){
            requestAnimationFrame(() => {play(ticks[soundie], bruteForce)});
        }
    } else {
        setTimeout(() => {playMul(sound)}, 30);
    }
}

function playButton(){
    isOn = true;
    if(vacant)
        playMusic();
}

function playTrack(track){
    track = track.split(' ');
    let index = 0;
    let interval;
    interval = setInterval(() => {
        if(vacant)
            clearInterval(interval);
        playMul(track[index].split(''));
        if(track[index + 1]){
            index++;
        } else {
            vacant = true;
            if(trackIndex < tracks.length - 1){
                trackIndex++;
                playMusic();
            } else {
                setTimeout(() => {
                    document.getElementById('playing').innerHTML = 'Начнём...';
                    setDos(true, false, false, false);
                    refreshDos();
                    trackIndex = 0;
                    tickIndex = 0;
                    document.getElementById('track').innerHTML = trackIndex + 1;
                }, 500);
            }
            part(parts[trackIndex]);
            clearInterval(interval);
        }
    }, 500);
}

function part(str){
    if(!str) return;
    document.getElementById('part').innerHTML = str;
}

function playMusic(){
    if(vacant){
        setDos(false, true, false, true);
        refreshDos();
        document.getElementById('playing').innerHTML = '';
        vacant = false;
        playTrack(tracks[trackIndex]);
        document.getElementById('track').innerHTML = trackIndex + 1;
    }
}

function pauseButton(){
    isOn = false;
    vacant = true;
    setDos(false, true, true, false);
    refreshDos();
}

function stopButton(){
    isOn = false;
    vacant = true;
    setDos(true, false, false, false);
    refreshDos();
    trackIndex = 0;
    tickIndex = -1;
    document.getElementById('tick').innderHTML = 0;
    document.getElementById('track').innderHTML = 0;
}

function refreshDos(){
    let func = (can) => {return can ? '' : 'nodisp'};
    document.getElementById('play').className = func(canDo.play);
    document.getElementById('pause').className = func(canDo.pause);
    document.getElementById('stop').className = func(canDo.stop);
    document.getElementById('start').className = func(canDo.start);
}

function setDos(start, stop, play, pause){
    canDo.start = start;
    canDo.stop = stop;
    canDo.play = play;
    canDo.pause = pause;
}

playMul('atbhpcsg', true);
setTimeout(() => {document.getElementById("playing").innerHTML = "Начнём...";}, 530);