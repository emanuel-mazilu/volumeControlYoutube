function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
waitForElm('.html5-main-video').then((elm) => {
    var video = elm;
    var newVolume = video.volume

    video.addEventListener('wheel', (event) => {
    if (event.deltaY < 0)
    { 
        newVolume += .10
    }
    else if (event.deltaY > 0)
    {
        newVolume -= .10
    }
    if (newVolume >= 0 && newVolume <= 1) {
        video.volume = newVolume;
    } else {
        video.volume = (newVolume < 0) ? 0 : 1;
        newVolume = video.volume                       
    }
    console.log("Volume: " + newVolume * 10)
    event.preventDefault();
    });
});
