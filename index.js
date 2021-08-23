let btn = document.getElementById("btn");
let portal = document.getElementById("portal");
let clip = document.getElementById("inside");
let dest = document.getElementById("destination");
let time;
let interval;
let end;

const destURL = ["https://images.unsplash.com/photo-1553315871-e2fe4a2e1387?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80", "https://images.unsplash.com/photo-1517928260182-5688aead3066?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"];

function init() {
    dest.style.backgroundImage = "url(" + destURL[(Math.floor(Math.random() * destURL.length))] + ")"
    time = 4;
    clearInterval(interval);
    interval = setInterval(function() {
        btn.textContent = "LOADING..." + time + "s";
        if (time > 0) {
            time--;
        } else {
            clearInterval(interval);
        }
    }, 1000);

    portal.classList.add("spin");
}

init();

btn.onclick = function start() {
    if (btn.textContent === "START") {
        portal.classList.add("open");
        clip.classList.add("open");
        btn.textContent = "STOP";
    } else if (btn.textContent === "STOP") {
        portal.style.animationPlayState = "paused";
        clip.style.animationPlayState = "paused";
        btn.textContent = "RESUME";
    } else if (btn.textContent === "RESUME") {
        portal.style.animationPlayState = "running";
        clip.style.animationPlayState = "running";
        btn.textContent = "STOP";
    } else if (end) {
        portal.classList.remove("open");
        clip.classList.remove("open");
        clip.classList.remove("spin");
        init();
    }
}

portal.addEventListener('animationend', () => {
    if (btn.textContent.includes("LOAD")) {
        btn.textContent = "START";
        portal.classList.remove("open");
        clip.classList.remove("open");
        clearInterval(interval);
    } else if (btn.textContent == "STOP" || btn.textContent == "RESUME") {
        end = true;
        btn.textContent = "LOAD";
        portal.classList.remove("spin");
    }
});