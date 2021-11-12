let tl = gsap.timeline();

let allLines = document.querySelector('.line');

tl.to('.line1', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3"})
tl.to('.line2', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line3', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line4', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line5', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line6', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line7', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line8', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line9', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line10', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line11', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})



// Animation text

const text = document.querySelector('h1');

const strText = text.textContent;

const splitText  = strText.split("");

text.textContent = ""
for(let i = 0; i<splitText.length; i++){
    text.innerHTML += "<span>"+splitText[i]+"</span>"
}

let char = 0;
let timer
setTimeout(()=>{
    timer = setInterval(onTick, 200);
},2500)


function onTick(){
    const span = text.querySelectorAll('span')[char];

    span.classList.add('fade');
    char++
    if(char === splitText.length){
        complete()
        return
    }
}

function complete(){
    clearInterval(timer);
    timer = null
}