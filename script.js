const pixelsTag = document.querySelector('div.pixels');
const bodyTag = document.querySelector('body');
const progressTag = document.querySelector('div.progress');
const menuTag = document.querySelector('menu');
const quoteTag = document.getElementById('quote-wobble');
console.log(quoteTag);

let ToggleImg = true;

document.addEventListener('scroll', function () {
  const pixels = Math.floor(window.pageYOffset);
  pixelsTag.innerHTML = pixels;

  const pageHeight = bodyTag.getBoundingClientRect().height;
  const totalScrollableDistance = pageHeight - window.innerHeight;
  const percentage = pixels / totalScrollableDistance * 100;

  progressTag.style.width = percentage +"%";
  console.log(percentage * 100);

  if (percentage > 7 && percentage < 15) {
    quoteTag.classList.remove('hide');
    quoteTag.classList.add('show');
  }

  else {
    quoteTag.classList.remove('show');
    quoteTag.classList.add('hide');
  }


});
//dark mode
const sunTag = document.getElementById("sun").onclick;
const moonTag = document.getElementById("moon").onclick = function toggleDarkmode() {
  bodyTag.classList.toggle("dark-mode");
  progressTag.classList.toggle("dark-mode");
  menuTag.classList.toggle("dark-mode");
};


// TRESHOLD mit .offsetTop

const bands = document.querySelectorAll("figure");
console.log(bands);
const bandTag = document.querySelector("div.band");

document.addEventListener('scroll', function () {
  const pixel = window.pageYOffset;

  bands.forEach( function (band) {
    if (band.offsetTop <= pixel) {
      bandTag.innerHTML = band.getAttribute("data-band");
    }
  /*
  bands.forEach( band => {
    if (band.offsetTop <= pixel) {
      bandTag.innerHTML = band.getAttribute("data-band");
    }
    */


  })

document.ready(function(){
(".menu-button").click(function(){
(".menu-bar").toggleClass( "open" );
})
});

});


//audio player by Alex Katz

var music = document.getElementById('music'); // id for audio element
var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
var pButton = document.getElementById('pButton'); // play button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline

// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// play button event listenter
pButton.addEventListener("click", play);

// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

// makes timeline clickable
timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

// makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = false;

// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
}

//Play and Pause
function play() {
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
    }
}

// Gets audio file duration
music.addEventListener("canplaythrough", function() {
    duration = music.duration;
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}
