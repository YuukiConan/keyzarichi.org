// Rave 1.5
// Revision Date: Thursday, 20 November 2025
// © 2025 Keyza Medina Richi Sherlya Fanda, licensed under the Yuuki and Yuika Project

// NOTE:
// Use this framework correctly and in a structured manner for it to function properly! Otherwise, elements will appear disorganized, display incorrectly, and overlap with other elements!

// Elements that still under development or improvement will be placed in separate CSS/JS.

/**
 * @summary Rave is a lightweight JavaScript framework for building modern, responsive, and interactive web with ease. Note that it will replace our beloved framework, AirUI.
 */
class Rave {
    constructor(version, author) {
        this.version = version;
        this.author = author;
    }
    
    /**
     * @param {"script" | "stylesheet" | "icon" | "preload" | "lite"} type - Type of head tag to set.
     * @param {Array} paths - Path to the resource file (JS, CSS, icon, etc.), depending on the type. Throw error if the path isn't valid for the specified type.
     * @version 1.2
     */
    setHeadTagType(type, paths = []) {
        const head = document.head;
        if (!Array.isArray(paths)) paths = [paths];

        paths.forEach(path => {
            if (type === "script") {
                const script = document.createElement("script"); 
                script.defer = false;
                script.src = path; 
                head.appendChild(script); 
            } 
            else if (type === "stylesheet") {
                const style = document.createElement("link"); 
                style.rel = "stylesheet"; 
                style.href = path; 
                head.appendChild(style); 
            }
            else if (type === "icon") {
                const icon = document.createElement("link"); 
                icon.rel = "icon"; 
                icon.href = path; 
                head.appendChild(icon); 
            }
            else if (type === "preload") {
                const preload = document.createElement("link"); 
                preload.rel = "preload"; 
                preload.href = path; 
                preload.as = detectPath(path);

                if (preload.as === 'font') {
                    preload.crossOrigin = 'anonymous';
                }
                head.appendChild(preload); 
            } else if (type === "lite") {
                const lite = document.createElement("link");
                lite.rel = 'stylesheet';
                lite.href = path;
                lite.media = 'print';
                lite.onload = () => {
                    lite.media = 'all';
                }
            }
            
            else {
                throw new CustomError(`Unknown type: ${type}`);
            }
        })

        function detectPath(path) {
            const str = path.split('.').pop().split('?')[0].toLowerCase();

            if (str === 'css' || path.includes('fonts.googleapis.com')) return 'style';
            if (str === 'js') return 'script';
            if (['woff', 'woff2', 'ttf', 'otf'].includes(str)) return 'font';
            if (['jpg', 'jpeg', 'png', 'tiff', 'webp', 'gif', 'svg'].includes(str)) return 'image';
            if (['mp4', '.webm', '.ogg'].includes(str)) return 'video';

            return 'fetch';
        }
    }

    /**
     * @param {string} elemTarget - Target element selector such as header, footer, div, etc.
     * @param {string} url - URL of the HTML file to fetch and insert it into the target element.
     * @summary Fetch an external HTML file and insert its content into a target page element.
     * @version 1.0
     */
    fetchElement(elemTarget, url) {
        try { fetch(url).then(response => { if (response.ok) { response => response.text(); } else { throw new Error("Can't fetch the response."); } }).finally(data => { document.querySelector(elemTarget).innerHTML = data; }); } catch (err) { console.error("Error:", err) }
    }

    /**
     * @summary Add parallax effect to each section in scrollable element (usually body). "section" and "scrollableELement" parameters must be filled with HTML tag name with lowercase.
     * @param {any} section - List of sections to apply parallax effect
     * @param {HTMLElement} scrollableElement - Scrollable element selector such as div, body, main, etc.
     * @param {string[]} optionalElem - List of optional elements inside each section to apply parallax effect (such as h1, p, button, etc.)
     * @version 1.0
     */
    addParallaxEffect(scrollableElement, sections, ...optionalElem) {
        const secs = document.querySelectorAll(sections);
        const elem = document.querySelector(scrollableElement);

        window.addEventListener('scroll', () => {
            secs.forEach(section => {
                const rect = section.getBoundingClientRect();
                const viewHeight = window.innerHeight;
                
                const distance = Math.min(1, Math.max(0, 1 - (rect.bottom / (rect.height + viewHeight))));

                const eased = distance ** 1.25;
                section.style.opacity = 1 - Math.abs(0.5 - eased) * 0.4;
                section.style.transform = `translateY(${(0.5 - eased) * 220}px)`

                const optionals = section.querySelectorAll(...optionalElem);
                optionals.forEach(optional => {
                    optional.style.opacity = Math.max(0, distance + 20.0);
                    optional.style.transform = `translateY(${(1 - distance)}px)`;
                })
            })
        })
    }

    /**
     * 
     * @param {*} elements - list of elements to apply Windows 10-style tilt effect
     * @summary Add Windows 10-style tilt effect to specified elements when clicked and dragged.
     * @version 1.1 - Fixed incorrect rotate direction. 
     */
    addTiltEffect(elements) { const elems = document.querySelectorAll(elements); elems.forEach(elem => { elem.style.transformStyle = 'preserve-3d'; elem.addEventListener('mousedown', (e) => { const rect = elem.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; const centerX = rect.width / 2; const centerY = rect.height / 2; const rotateX = -(y - centerY) / 10; const rotateY = (x - centerX) / 10; elem.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.97)`; elem.style.transition = 'transform .1s cubic-bezier(0.075, 0.82, 0.165, 1)'; }); elem.addEventListener('mouseleave', () => { elem.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; }); elem.addEventListener('mouseup', () => { elem.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; }); }); }

    /**
     * @param {*} scrollableElement - Scrollable element selector such as div, body, main, etc.
     * @param {*} floatButtonId - ID of the floating button element
     * @summary Add "scroll to top" functionality to a scrollable element with a floating button in bottom corner of the screen.
     * @version 1.0
     */
    scrollToTop(scrollableElement, floatButtonId) {
        let elem = document.querySelector(scrollableElement);
        let floatBtn = document.getElementById(floatButtonId);
        elem.addEventListener('scroll', () => {
            elem.scrollTop >= 80 ? floatBtn.classList.remove('hidden') : floatBtn.classList.add('hidden');
        });
        floatBtn.addEventListener('click', () => {
            elem.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    /**
     * @summary A simple function to check if the framework is working.
     */
    callKeyza() { console.log("Hello, Richi!") }
    
    /**
     * @deprecated This function is deprecated. Use Rave.setHeadTagType() instead.
     * @summary Set the website icon (favicon) dynamically.
     */
    setWebIcon(iconUrl) { let link = document.querySelector("link[rel~='icon']"); if (!link) { link = document.createElement("link"); link.rel = "icon"; head.appendChild(link); } link.href = iconUrl; }

    /**
     * @param {*} toggleElement - Toggle element selector such as button, checkbox, and radio.
     * @param {*} checkbox - ID of the checkbox element
     * @summary Switch web theme to dark mode.
     * @version 1.0
     */
    switchToDarkMode(toggleElement, checkbox) {
        const darkMode = localStorage.getItem('darkMode') === "true";
        if (darkMode) { document.body.classList.add('dark-mode'); }
        
        const toggle = document.querySelector(toggleElement);
        const cbx = document.querySelector(checkbox);
        
        toggle.addEventListener('click', () => {
            const checkIfBodyHasDarkMode = document.body.classList.contains('dark-mode');
            document.body.classList.toggle("dark-mode");
            document.documentElement.classList.toggle("dark-mode");
            
            cbx.checked = true;
            if (!checkIfBodyHasDarkMode) {
                if (cbx.checked) {
                    localStorage.setItem("darkMode", "true");
                } else {
                    localStorage.setItem("darkMode", "false");
                }
            } else { localStorage.setItem("darkMode", "false"); }
        })
    }

    loadElementSequentially(elements) {
        const elems = document.querySelectorAll(elements);
        elems.forEach((el, index) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'opacity .6s ease, transform .6s';
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }, index * 200);
        })
    }

    /**
     * Set platform compatibility for specific features on affected elements.
     * @param {'windows' | 'android' | 'ios' | 'all'} platform
     * @param {'tilt' | 'parallax' | 'blur' | 'animation' | 'all' } includeFeatures
     * @param {string} affectedElements 
     */
    setPlatformCompatibility(platform, includeFeatures, affectedElements) {
        const userAgent = navigator.userAgent.toLowerCase();
        const elements = document.querySelectorAll(affectedElements);
        elements.forEach(el => {
            if (platform === "windows" || platform === "win" || userAgent.indexOf("windows") !== -1) {
                switch (includeFeatures) {
                    case 'blur':
                        el.style.backdropFilter = 'blur(10px)';
                        break;
                    case 'tilt':
                        el.style.transformStyle = 'preserve-3d';
                        break;
                }
            }
            if (platform === "android" || platform === "ios" || userAgent.indexOf("android") !== -1) {
                switch (includeFeatures) {
                    case 'blur':
                        el.style.backdropFilter = 'none';
                        break;
                    case 'tilt':
                        el.style.transformStyle = 'flat';
                        break;
                }
            }
        })
    }

    switchToggle(checkbox, actions) {
        const cbxs = document.querySelectorAll(checkbox);
        const leftOptions = document.querySelectorAll('.leftOption');
        const rightOptions = document.querySelectorAll('.rightOption');
        cbxs.forEach((cbx, index) => {
            const leftOption = leftOptions[index];
            const rightOption = rightOptions[index];
            cbx.addEventListener('change', () => {
                const isChecked = cbx.checked;
                // leftOptions.forEach(leftOption => leftOption.classList.toggle('active', !isChecked));
                // rightOptions.forEach(rightOption => rightOption.classList.toggle('active', isChecked));
                if (isChecked) {
                    leftOption?.classList.remove('active');
                    rightOption?.classList.add('active');
                } else {
                    leftOption?.classList.add('active');
                    rightOption?.classList.remove('active');
                }
                
                actions();
            })
        })
    }

    observeCards(parentContainer, cardSelector, delay = 200) {
        const cards = document.querySelectorAll(cardSelector);
        cards.forEach(card => {
            card.style.pointerEvents = 'none';
        })
        const parent = document.querySelectorAll(parentContainer);
        
        const allFlexCard = [...cards, ...parent];
        
        const all = allFlexCard.sort((a,b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                setTimeout(() => {
                    if (document.body.classList.contains('anim-disabled')) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'scale(1) translateY(0)';
                        entry.target.style.visibility = 'visible';
                        entry.target.style.pointerEvents = 'auto';
                    } else {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'scale(1) translateY(0)';
                        entry.target.style.visibility = 'visible';
                        entry.target.style.pointerEvents = 'auto';
                    }
                    observer.unobserve(entry.target); // Stop observing after it fades in
                }, delay);
        
                delay += 50;

            });

            if (delay > 1000) {
                console.warn('Warning: Card animation delay exceeds 1 second, this may cause performance issues on low-end devices.');
            }
        });

        all.forEach(card => observer.observe(card));
    }

    createCarousel(carousel, items, carouselPrev, carouselNext, title, subtitle, indicators, duration = 4000) {
        const crsl = document.querySelector(carousel);
        const item = document.querySelectorAll(items);
        const prev = document.querySelector(carouselPrev);
        const next = document.querySelector(carouselNext);
        const allIndicators = document.querySelector(indicators);
        const titleEl = document.getElementById(title);
        const subtitleEl = document.getElementById(subtitle);
        let currentIndex = 0;
        let interval;

        item.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.dataset.index = index;
            if (index === 0) {
                indicator.classList.add('active');
            }
            allIndicators.appendChild(indicator);
        });

        const divIndicators = document.querySelectorAll(`${indicators} div`);

        function goToItem(index, direction = 'left') {
            const outIndex = item[currentIndex];
            const inIndex = item[index];

            divIndicators[currentIndex].classList.remove('active');

            outIndex.classList.add(direction === 'left' ? 'fadeOutLeft' : 'fadeOutRight')
            inIndex.classList.add(direction === 'left' ? 'fadeInLeft' : 'fadeInRight');
            
            setTimeout(() => {
                outIndex.classList.remove('active', 'fadeOutLeft', 'fadeOutRight')
                inIndex.classList.add('active');
                inIndex.classList.remove('fadeInLeft', 'fadeInRight');
                
                currentIndex = index;
                divIndicators[currentIndex].classList.add('active');
                updateCaptions();
            }, duration)

        }

        function updateCaptions() {
            const currentItem = item[currentIndex];
            const dataTitle = currentItem.dataset.title;
            const dataSubtitle = currentItem.dataset.subtitle;
            titleEl.textContent = dataTitle;
            subtitleEl.textContent = dataSubtitle;
        }

        prev.addEventListener('click', (event) => {
            event.preventDefault();
            const newIndex = (currentIndex - 1 + item.length) % item.length;
            goToItem(newIndex, 'right');
        });

        next.addEventListener('click', (event) => {
            event.preventDefault();
            const newIndex = (currentIndex + 1) % item.length;
            goToItem(newIndex, 'left');
            
        });

        divIndicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const newIndex = Number(indicator.dataset.index);
                if (newIndex !== currentIndex) {
                    const direction = newIndex > currentIndex ? 'left' : 'right';
                    goToItem(newIndex, direction);
                }
            });
        });

        function enableAutoSlide() {
            interval = setInterval(() => {
                goToItem((currentIndex + 1) % item.length);
            }, duration);
        }
        
        function disableAutoSlide() {
            clearInterval(interval);
        }

        crsl.addEventListener('mouseenter', disableAutoSlide);
        crsl.addEventListener('mouseleave', enableAutoSlide);
        
        enableAutoSlide();
    }

}
class CustomError extends Error {
    setErrorMessage(errorType, message) {
        this.name = errorType;
        this.message = message;
        return `${this.name}: ${this.message}`;
    }
}

class Security {
    constructor(version, author) {
        this.version = version;
        this.author = author;

        console.log(`Rave Security v${this.version} by ${this.author} initialized.`)
    }

    /**
     * @param {string} userName 
     */
    getRoleBasedAccessControl(fullName) {
        const usernames = ['Keyza Richi', 'Yuuki Conan', 'Nathania Anneta', 'Angelina Petra'];
        const allowRoles = ['view', 'sourcecode', 'dark', 'fullaccess'];

        if (!usernames.includes(fullName)) {
            throw new Error('Access denied: Unauthorized or unknown user.')
        } else {
            if (fullName === usernames[0]) {
                const setTheirRole = allowRoles[3];
                console.log(`Access granted to Richi with role ${setTheirRole}.`);
                return;
            } else if (fullName === usernames[1]) {
                const setTheirRole = allowRoles[2];
                console.log(`Access granted to Yuuki Conan with role ${setTheirRole}.`);
                return;
            } else if (fullName === usernames[2] || fullName === usernames[3]) {
                const setTheirRole = allowRoles[1];
                console.log(`Access granted to Nia with role ${setTheirRole}.`);
            } else if (fullName === usernames[4]) {
                 const setTheirRole = allowRoles[2];
                console.log(`Access granted to Angelina with role ${setTheirRole}.`);
                return;
            } else {
                throw new Error('Access denied: Unauthorized or unknown user.')
            }
        }
    }

    /**
     * @version 1.1
     * @summary Format: YYYY-MM-DDTHH:MM:SSZ (UTC time)
     * @param {*} expirationDate 
     */
    setTimebomb(expirationDate) {
        const now = new Date(Date.now());
        expirationDate = new Date(expirationDate);

        if (now > expirationDate.getTime()) {
            window.location.reload();
            window.location.href = "/expired.html";
            throw new Error('This version has expired. Please update to the latest version.');
        } else {
            console.log(`Expiration: ${expirationDate.toUTCString()}`);
        }
    }

    /**
     * @param {*} container Element for image container that need be blurred
     */
    blurContent(container) {
        const containers = document.querySelectorAll(container);
        
        containers.forEach(el => {
            const warning = document.createElement('div');
            warning.classList.add('content-blurred');

            const warningIcon = document.createElement('i');
            warningIcon.className = 'uil uil-eye-slash';
            warning.appendChild(warningIcon)

            const warningTitle = document.createElement('h1');
            warningTitle.textContent = 'Konten sensitif';
            warning.appendChild(warningTitle)

            const warningDesc = document.createElement('p');
            warningDesc.textContent = 'Konten ini mungkin mengandung konten sensitif yang mungkin dianggap mengganggu oleh sebagian orang.';
            warning.appendChild(warningDesc);

            const warningButton = document.createElement('button');
            warningButton.className = 'btn large accent';
            warningButton.textContent = 'Tampilkan';
            warningButton.addEventListener('click', () => {
                warning.style.opacity = 0;
                warning.style.visibility = 'hidden'
                el.style.pointerEvents = 'auto'
            })
            warning.appendChild(warningButton)
            
        
            el.appendChild(warning);
        })
    }

}
export { Rave, CustomError, Security };

// Rave Element Handler
document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', () => {
        const content = detail.querySelector('.accordion-content');
        if (!content) return;

        if (detail.open) {
            content.classList.remove('closing');
            content.classList.add('opening');

            content.style.height = '0px';
           
            content.style.height = 'auto';

            content.addEventListener('transitionend', function handler() {
                content.classList.remove('opening');
                content.style.height = 'auto';
                content.removeEventListener('transitionend', handler);
            })
        } else {
            content.style.height = content.scrollHeight + 'px';
            content.classList.remove('opening');
            content.classList.add('closing');
            
            content.style.height = '0px';
            
            content.addEventListener('transitionend', function handler() {
                content.classList.remove('closing');
                content.style.height = '0px';
                content.removeEventListener('transitionend', handler);
            })

        }
    })
})
