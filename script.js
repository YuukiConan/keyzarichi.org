// Initialize Rave framework
import {Rave, Security, CustomError} from "frameworks/Rave v1.5/js/Rave.js";

const richi = Rave ? new Rave("Next 0.5 beta", "keyzarichi.org") : null;
const security = Rave ? new Security("1.1", "Keyza Richi and Jessica Noleen Alka") : null;
const customError = Rave ? new CustomError() : null;

if (window.location.href === 'settings.html') {
richi.setHeadTagType('script', [
    "settings.js",
    "js/lang.js",
    "frameworks/Rave v1.5/js/Rave_header.js",
    "frameworks/Rave v1.5/js/Rave_footer.js",
]);
}
else {
richi.setHeadTagType('script', [
    "js/lang.js",
    "frameworks/Rave v1.5/js/Rave_header.js",
    "frameworks/Rave v1.5/js/Rave_footer.js",
]);
}

const body = document.body;
const root = document.documentElement;

const isAnimEnabled = localStorage.getItem('anim-mode') === 'enabled';
if (isAnimEnabled) {- 
    document.body.classList.add('anim-disabled');
}

const netralizeState = localStorage.getItem('netralize') === 'true';
if (netralizeState) {
    document.body.classList.add('netralize');
} else {
    document.body.classList.remove('netralize');
}

let intervalId;

function checkUpdateMode() {
    const time =  new Date();
    let hour = time.getHours();
    const isNight = hour >= 18 || hour < 7;

    if (isNight) {
        document.body.classList.add('dark-mode');    
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Function to precise the theme change interval
function preciseInterval() {
    const now = new Date();
    const secToNextMin = 60 - now.getSeconds();

    setTimeout(() => {
        checkUpdateMode();
        intervalId = setInterval(checkUpdateMode, 50 * 60);
    }, secToNextMin * 10)
}

const daylight = localStorage.getItem("dayLightChecked") === 'true';
if (daylight) {
    document.documentElement.classList.add('dark-mode');
    if (!intervalId) {
            preciseInterval();
        }

        checkUpdateMode();
}  else {
    document.documentElement.classList.remove('dark-mode')
    if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        checkUpdateMode();
} 

checkUpdateMode();

function getContrastColors(hexColor) {
    const hex = hexColor.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminances = [r, g, b].map(c => {
        const channel = c / 255;
        return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    })

    const L = 0.2126 * luminances[0] + 0.7152 * luminances[1] + 0.0722 * luminances[2];

    return L > 0.179 ? `#000000` : '#ffffff';
}

const hero = document.querySelector('.centered-hero')

const currentBg = getComputedStyle(document.body).getPropertyValue('background').trim();

const match = currentBg.match(/(rgb[a]?\([^)]+\)|#[0-9a-fA-F]{6})/);

let baseColor = match ? match[0] : "#ffffff";

if (baseColor.startsWith('rgb')) {
    const nums = baseColor.match(/\d+/g);
    baseColor = '#' + nums.slice(0, 3).map(n => Number(n).toString(16).padStart(2, '0')).join('');
}

const contrastColor = getContrastColors(baseColor);

const luminanceState = localStorage.getItem('luminance') === 'true';

document.documentElement.style.setProperty('--text-color', luminanceState ? contrastColor : '')

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('beforeunload', () => {
        history.scrollRestoration = 'manual';
        window.location.reload();
        document.body.scrollTo(0, 0);
    })

    window.showTab = showTab;

    function showTab(tab) {
        const tabEl = document.getElementById(tab);
        if (!tabEl) return;

        const group = tabEl.closest('.tab-container');
        if (!group) return;
        

        const tabs =  group.querySelectorAll(`.tab-content`);
        const buttons = group.querySelectorAll(`.tab-button`);

        tabs.forEach(tab => tab.classList.remove('active'));
        buttons.forEach(button => button.classList.remove('active'));

        tabEl.classList.add('active');
        const targetEl = group.querySelector(`#${tab}-tab`);
        if (targetEl) {
            targetEl.classList.add('active');
        }
    }

    const body = document.querySelector('body');
    const themes = ["default", "mono", "amber-red", "nature-green", "crystal-blue", "yellow-gold", "purple-ruby", "choco-milk", "sarah-olive", "nia-charm"];

    const savedTheme = localStorage.getItem('theme-color');
    if (savedTheme && themes.includes(savedTheme)) {
        body.classList.add(savedTheme);

    }

    richi.setHeadTagType("icon", "assets/logo/richi.com_scriptsimple.webp");
    richi.setHeadTagType('stylesheet', [
        '/styles_new.css',
        'https://cdn.lineicons.com/5.0/lineicons.css'
    ]);
    
    security.setTimebomb('2026-02-20T08:00:00Z')
    const peopleContainer = '.people-container';
    const peopleCard = '.people';
    richi.observeCards(peopleContainer, peopleCard, 200);


    // Initialize the elements on the page.
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('draggable', 'false')
    })

    const blurred = '.blurred-content';
    security.blurContent(blurred)

    const section = '.section'
    const mainElem = 'body';
    const h1 = '.section-title';

    richi.addParallaxEffect(mainElem, section, h1)


    let sections = document.querySelectorAll('.section, footer');
    sections.forEach((section) => {
        setTimeout(() => {
            section.style.display = "block";
            section.style.opacity = 1;
        }, 800)
    })

    const flexs = document.querySelectorAll('.flex');
    for (const flex of flexs) {
        setTimeout(() => {
            flex.classList.remove('hidden');
        }, 1000)
    }

    const flex = document.querySelector('.flex-grids');
    const containers = document.querySelectorAll('.hideAndSeek');
    const inlineCaption = document.querySelector('.inline-caption');
    const inlineCaptionItems = document.querySelectorAll('.inline-caption-item');
    let currentIndex = Array.from(containers).findIndex(el => el.classList.contains('selected'));
    let currentInlineCaptionIndex = Array.from(inlineCaptionItems).findIndex(el => el.classList.contains('active'));

    function scrollToPosition(element, to, duration = 600, easingFn) {
        const start = element.scrollLeft;
        const change = to - start;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = easingFn(progress);
            element.scrollLeft = start + change * easing;

            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    function bezier(x0, y0, x1, y1) {
        return t => {
            const cx = 3 * x0;
            const bx = 3 * (x1 - x0) - cx;
            const ax = 1 - cx - bx;

            const cy = 3 * y0;
            const by = 3 * (y1 - y0) - cy;
            const ay = 1 - cy - by;

            const bezierX = t => ((ax * t + bx) * t + cx) * t;
            const bezierY = t => ((ay * t + by) * t + cy) * t;

            let x = t, iterate = 5;
            for (let i = 0; i < iterate; i++) {
                let f = bezierX(x) - t;
                let fPrime = (3 * ax * x + 2 * bx) * x + cx;
                if (fPrime === 0) break;
                x -= f / fPrime;
            }

            return bezierY(x);
        };
    }

    function updateSelectedContainer(newIndex) {
        if (newIndex >= 0 && newIndex < containers.length) {
            containers[currentIndex].classList.remove('selected');
            containers[newIndex].classList.add('selected');
            currentIndex = newIndex;

            const target = containers[currentIndex];
            const centerScrollOffset = target.offsetLeft - flex.offsetLeft - 198;

            scrollToPosition(flex, centerScrollOffset, 1000, bezier(0.075, 0.82, 0.165, 1));
        }
    }
    function updateSelectedContainer1(newIndex) {
        if (newIndex >= 0 && newIndex < inlineCaptionItems.length) {
            inlineCaptionItems[currentInlineCaptionIndex].classList.remove('active');
            inlineCaptionItems[newIndex].classList.add('active');
            currentInlineCaptionIndex = newIndex;

            const target = inlineCaptionItems[currentInlineCaptionIndex];
            const centerScrollOffset = target.offsetLeft - inlineCaption.offsetLeft - 80;

            scrollToPosition(inlineCaption, centerScrollOffset, 1500, bezier(0.075, 0.82, 0.165, 1));

        }
    }

    document.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "ArrowLeft") {
            updateSelectedContainer(currentIndex - 1)
        } else if (e.key === "ArrowRight") {
            updateSelectedContainer(currentIndex + 1)
            
        }
    })

    inlineCaptionItems.forEach(item => {
        item.addEventListener('click', () => {
            updateSelectedContainer1(Array.from(inlineCaptionItems).indexOf(item));
        })
    })

    const inlineCaptionLeft = document.querySelectorAll('.inline-caption-left');
    const inlineCaptionRight = document.querySelectorAll('.inline-caption-right');
    inlineCaptionLeft.forEach(btnLeft => {
        btnLeft.addEventListener('click', (e) => {
            e.stopPropagation();
            updateSelectedContainer1(currentInlineCaptionIndex - 1);
        })
    })
    inlineCaptionRight.forEach(btnRight => {
        btnRight.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            updateSelectedContainer1(currentInlineCaptionIndex + 1);
        })
    })

    containers.forEach(box => {
        box.addEventListener('click', () => {
            updateSelectedContainer(Array.from(containers).indexOf(box));
        });
    })

    if (navigator.userAgentData) {
        navigator.userAgentData.getHighEntropyValues(["platform"]);
        console.log(navigator.userAgentData.platform);
        if (navigator.userAgentData.platform === "Android" || navigator.userAgentData.platform === "iOS") {
            document.querySelector('*').style.backdropFilter = 'none';
        }

    }

    const dataTitle = document.body.getAttribute('data-title');
    if (dataTitle) {
        document.title = dataTitle + ' - keyzarichi.org';
    }

    
})

