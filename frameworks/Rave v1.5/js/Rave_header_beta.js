fetch('/elements/header_new.html').then(response => response.text()).then(html => {
    document.querySelector('header').innerHTML = html;

    function switchToDarkMode(checkbox) {
        const cbx = document.querySelector(checkbox);
        const sun = document.querySelector('.sun');
        const moon = document.querySelector('.moon');
        const darkMode = localStorage.getItem('darkMode') === 'true';
        const toggleState = localStorage.getItem('toggleActive') === "true";

        if (toggleState) { cbx.checked = true; sun.classList.remove('active');
            moon.classList.add('active') }

        if (darkMode) { 
            document.body.classList.add('dark-mode'); 
            document.documentElement.classList.add("dark-mode");
            
        }

        cbx.addEventListener('change', () => {
            const checkIfBodyHasDarkMode = document.body.classList.contains('dark-mode');
            document.body.classList.toggle("dark-mode");
            document.documentElement.classList.toggle("dark-mode");
            
            if (!checkIfBodyHasDarkMode) {
                if (cbx.checked) {
                    localStorage.setItem("darkMode", "true");
                    localStorage.setItem("toggleActive", "true");
                    sun.classList.remove('active');
                    moon.classList.add('active')
                } else {
                    localStorage.setItem("darkMode", "false");
                    localStorage.setItem("toggleActive", "false");
                    sun.classList.add('active');
                    moon.classList.remove('active')
                }
            } else { localStorage.setItem("darkMode", "false"); localStorage.setItem("toggleActive", "false"); sun.classList.add('active');
                    moon.classList.remove('active') }
            
        })
    }
        const cbx = '#cbx';
    
        switchToDarkMode(cbx)

}).finally(() => {
    let element = document.querySelectorAll('[data-tooltip]');
    console.log(`found elements tooltip: ${element.length}`)

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);
    
    element.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            tooltip.textContent = elem.dataset.tooltip || 'No tooltip text';
            tooltip.style.display = 'block';
            tooltip.style.left = '-9999px';
            tooltip.style.top = '-9999px';
            
            requestAnimationFrame(() => {
                const rect = elem.getBoundingClientRect();
                let left = rect.left + window.scrollX;
                let top = rect.top + window.scrollY - tooltip.offsetHeight - 12;
                left += (rect.width - tooltip.offsetWidth) / 2;
                
                if (top < window.scrollY) {
                    top = rect.bottom + window.scrollY + 15;
                }

                if (left < window.scrollX) {
                    left += rect.left + window.scrollX + 15;
                } 
    
                const maxRight = window.scrollX + window.innerWidth;
                const rightEdge = left + tooltip.offsetWidth;
                
                if (rightEdge > maxRight) {
                    left = maxRight - tooltip.offsetWidth - 35;
                }
                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`

            })


        })

        elem.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
        
    })

    const popover = document.querySelector('[popover]');
    const trigger = document.querySelector('[popovertarget]');

    trigger.addEventListener('click', () => {
        // const t = trigger.getBoundingClientRect();
        // const rect = popover.getBoundingClientRect();
        // let left = t.left + window.scrollX;
        // let top = t.bottom = window.scrollY + 8;
        // const overflowRight = left  + rect.width >= window.scrollX + window.innerWidth;

        // if (overflowRight) {
        //     left = t.right - rect.width + window.scrollX;
        // } 

        // left = Math.max(8 + window.scrollX, left);

        // popover.style.position = 'absolute';
        // popover.style.left = `${left}px`;
        // popover.style.top = `${top}px`;

        const rect = popover.getBoundingClientRect();
        const overflow = rect.right - window.innerWidth;

        popover.style.translate =
            overflow > 0 ? `${-overflow - 8}px 0` : '0 0';
    })

    const mainElem = document.querySelector('main');
    function mainScrollProg() {
        const scrollProgress = document.querySelector('.scroll-progress');
        const winScroll = mainElem.scrollTop;
        const height = main.scrollHeight - main.clientHeight;
        const scrollHeight = (winScroll / height) * 100;
        scrollProgress.style.width = scrollHeight + '%';
    }

    mainElem.addEventListener('scroll', () => {
        mainScrollProg();
    })

    const btns = document.querySelectorAll('.navBtn');
    const pops = document.querySelectorAll('.drop-down');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const rect = btn.getBoundingClientRect();
    
            pops.forEach(pop => {
                pop.style.left = rect.left + 'px';
                pop.style.top = rect.bottom + 'px';

                const popRect = pop.getBoundingClientRect();
                if (popRect.right > window.innerWidth) {
                    const right = rect.right - popRect.width;
                    pop.style.left = right + 'px';
                }
            })
        })

    })

    const searchBtns = document.querySelectorAll('.searchBtn');
    let inputs = document.querySelectorAll('.search-text');
    const prevText = document.querySelector('.prev-search-text');

    searchBtns.forEach((searchBtn) => {
        searchBtn.addEventListener('click', (event) => { 
            event.preventDefault();

            const hasEmpty = Array.from(inputs).filter(input => input.offsetParent !== null && !input.disabled && !input.classList.contains('disabled'))
            const query = hasEmpty[0]?.value.trim() || '';

            if (!query) {
                alert('Please enter a search term');
                return;
            } 
            window.location.href = `/result.html?search=${encodeURIComponent(query)}`;
            prevText.innerHTML = query;
            

        });
    })
    const header = document.querySelector('header');
    const navpane = document.querySelector('.nav-pane');
    const navPaneBtn = document.getElementById('hamburger');
    const overlay = document.querySelector('.overlay');
    const themeContainer = document.querySelector('.theme-container');
    const footerAlt = document.querySelector('.nav-pane .footer-alt');
    const paneHeader = document.querySelector('.nav-pane .pane-header');
    const close_btn = document.querySelector('.nav-pane .close-btn');
    const circle = document.querySelector('.circle');
    const navPopOver = document.getElementById('navigation');
    const navTrigger = document.querySelector('[popovertarget="navigation"]')
    let isAnimating = false;

    const handleNavPopover = () => {
        if (window.innerWidth < 600) {
            if (navPopOver.matches(':popover-open')) {
                navPopOver.hidePopover();
            }

            navTrigger.setAttribute('disabled', '');
        } else {
            navTrigger.removeAttribute('disabled');
        }
    }
    
    function openNavPane() {
        if (isAnimating) return;
        isAnimating = true;
        
        circle.style.animation = 'floaty 1.8s cubic-bezier(0.075, 0.82, 0.165, 1)';

        requestAnimationFrame(() => { 
            setTimeout(() => {
                overlay.classList.add('showOverlay');
                navpane.classList.remove('hidden');
            }, 1200)
            circle.addEventListener('animationend', () => {
                if (circle.style.animation.includes('floaty')) {
                    circle.style.animation = '';
                }
            }, {once: true});
            if (window.innerWidth > 600) {
                navpane.style.animation = 'fadeInRight .7s cubic-bezier(0.075, 0.82, 0.165, 1)';
                navpane.addEventListener('animationend', () => {

                    if (navpane.style.animation.includes('fadeInRight')) {
                        isAnimating = false;
                        navPaneBtn.classList.add('active');
                        
                    }
                }, {once: true});
            } else {
                 handleNavPopover();
                navpane.style.animation = 'fadeIn .4s cubic-bezier(0.47, 0, 0.745, 0.715)';
                footerAlt.appendChild(themeContainer);
                navpane.addEventListener('animationend', () => {
                    header.style.zIndex = '101';
                    if (navpane.style.animation.includes('fadeIn')) {
                        isAnimating = false;
                        navPaneBtn.classList.add('active');
                        overlay.classList.add('showOverlay');
                    navpane.classList.remove('hidden');
                    }

                }, {once: true});
            } 
        });
    }

    function closeNavPane() {
        if (isAnimating) return;
        isAnimating = true;

        overlay.classList.remove('showOverlay');
        
        requestAnimationFrame(() => {
            if (window.innerWidth > 600) {
                navpane.style.animation = 'fadeOutLeft .3s cubic-bezier(0.075, 0.82, 0.165, 1)';
                
                navpane.addEventListener('animationend', () => {
                    if (navpane.style.animation.includes('fadeOutLeft')) {
                        isAnimating = false;
                        navpane.classList.add('hidden');
                        navPaneBtn.classList.remove('active');
                        
                    }
                }, {once: true});
            } else {
                handleNavPopover();
                navpane.style.animation = 'fadeOut .3s cubic-bezier(0.47, 0, 0.745, 0.715)';
                navpane.addEventListener('animationend', () => {
                    if (navpane.style.animation.includes('fadeOut')) {
                        
                        isAnimating = false;
                        navpane.classList.add('hidden');
                        navPaneBtn.classList.remove('active');
                    }
                }, {once: true});

                
            }
            // navpane.querySelector('.index').scrollTo(0, 0);
        });
    }

    function moveThemeContainer() {
        if (window.innerWidth > 600) {
            if (themeContainer && paneHeader) {
                if (themeContainer.parentElement !== paneHeader) {
                    paneHeader.appendChild(themeContainer);
                }
            }
        } else {
            if (themeContainer && footerAlt) {
                if (themeContainer.parentElement !== footerAlt) {
                    footerAlt.appendChild(themeContainer);
                }
            }
        }
    }

    function toggleNavPane() {
        if (navpane.classList.contains('hidden')) {
            openNavPane();
        } else {
            closeNavPane();
        }
    }

    if (window.innerWidth < 600) {
        navPaneBtn.addEventListener('click', toggleNavPane);
        close_btn.addEventListener('click', closeNavPane);
        overlay.addEventListener('click', closeNavPane);
        window.addEventListener('resize', () => {
            moveThemeContainer();
            handleNavPopover();
        })
    }

    

    const sidebar = document.querySelector('.sidebar');
    const sideBarItems = document.querySelectorAll('.sidebar-item');
    const sideSearch = document.querySelector('.side-search-btn');
    const expander = document.getElementById('expand');
    expander.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');

        
    })
    document.querySelector('main').addEventListener('click', () => {
        sidebar.classList.remove('expanded');
        
    })
    sideSearch.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
        
        document.querySelector('.sidebar .search-text').focus();
    })

    const currentPath = window.location.pathname;
    sideBarItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath === href) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })

    function updateClock() {
        let clock = document.getElementById('sidebar-clock');
        let suasana = document.getElementById('time-condition');
        let date = new Date();
        let hours = String(date.getHours()).padStart(2, '0');
        let min = String(date.getMinutes()).padStart(2, '0');
        clock.innerText = `${hours}:${min}`;

        const t=(new Date).getHours();suasana.innerHTML=t>=0&&t<11?"Selamat pagi":t>=11&&t<15?"Selamat siang":t>=15&&t<18?"Selamat sore":"Selamat malam"
    }

    setInterval(updateClock, 1000);
    
    const main = document.querySelector('main');

    main.addEventListener('scroll', () => {
        main.scrollTop > 100 ? document.querySelector('.header-container').classList.add('scrolled') : document.querySelector('.header-container').classList.remove('scrolled')
    })

})
