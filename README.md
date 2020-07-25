# drum-machine
A project that I made when I was learning to play drums. I wrote my whole notebook into my program. So it plays all the music that was in that notebook.

## Warning
I made this project very long ago, and I made the sounds play by calling the `setInterval()` function, and so the music sounds a bit gibberish due to it, 
so if I'll work further on this project, I'll change the 

```javascript
function playTrack(track){
  // Some code...
  let i = 0;
   setInterval(() => {
    if (i < 16) {
      playTact(i, track);
      i++;
     }
   }, 500);
  // And some more code...
}

function playTact(number, track){
  // Playing the drums...
}
``` 

to something like:

```javascript
let playing = false;
let currentTrack;
let currentTact;
let startTime = new Date().getTime();

function playTrack(track){
  // Some code...
  playing = true;
  currentTrack = track;
  currentTact = 0;
  // And some more code...
}

function process(){
  let timePassed = new Date().getTime() - startTime();
  if (timePassed % 500 == 0 && playing){
    playTact(currentTact, currentTact);
  }
}

function playTact(number, track){
  // Playing the drums...
}

process();
```
