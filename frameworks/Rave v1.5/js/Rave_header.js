let url = '/elements/header.html';
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    url = '/elements/header_new.html';
}

fetch(url).then(response => response.text()).then(html => {
    document.querySelector('header').innerHTML = html;

    const elem = document.querySelector('.header-container'); 
    const styles = getComputedStyle(document.documentElement);

    if (elem.classList.contains('scrolled')) {
        const background = styles.getPropertyValue('--background-color').trim();
        if (background.startsWith('rgb')) {
            const [r, g, b] = background.replace('rgb(', '').replace(')', '').split(',').map(c => c.trim());
            document.documentElement.style.setProperty('--backdrop-color', `rgba(${r}, ${g}, ${b}, 0.95)`)
            return;
        }
    }
    
    let floatBtns = document.querySelectorAll(".float-button");
        let backToTop = document.getElementById("float-button");

        backToTop.addEventListener('click', (e) => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
        floatBtns.forEach(floatBtn => {
            window.addEventListener('scroll', () => {
                document.documentElement.scrollTop >= 80 || document.body.scrollTop >= 80 ? floatBtn.classList.remove('hidden') : floatBtn.classList.add('hidden');
            });
        });


    // function switchToDarkMode(checkbox) {
    //     const cbx = document.querySelector(checkbox);
    //     const sun = document.querySelector('.sun');
    //     const moon = document.querySelector('.moon');
    //     const darkMode = localStorage.getItem('darkMode') === 'true';
    //     const toggleState = localStorage.getItem('toggleActive') === "true";

    //     if (toggleState) { cbx.checked = true; sun.classList.remove('active');
    //         moon.classList.add('active') }

    //     if (darkMode) { 
    //         document.body.classList.add('dark-mode'); 
    //         document.documentElement.classList.add("dark-mode");
            
    //     }

    //     cbx.addEventListener('change', () => {
    //         const checkIfBodyHasDarkMode = document.body.classList.contains('dark-mode');
    //         document.body.classList.toggle("dark-mode");
    //         document.documentElement.classList.toggle("dark-mode");
            
    //         if (!checkIfBodyHasDarkMode) {
    //             if (cbx.checked) {
    //                 localStorage.setItem("darkMode", "true");
    //                 localStorage.setItem("toggleActive", "true");
    //                 sun.classList.remove('active');
    //                 moon.classList.add('active')
    //             } else {
    //                 localStorage.setItem("darkMode", "false");
    //                 localStorage.setItem("toggleActive", "false");
    //                 sun.classList.add('active');
    //                 moon.classList.remove('active')
    //             }
    //         } else { localStorage.setItem("darkMode", "false"); localStorage.setItem("toggleActive", "false"); sun.classList.add('active');
    //                 moon.classList.remove('active') }
            
    //     })
    // }
    //     const cbx = '#cbx';
    
    //     switchToDarkMode(cbx)

    function switchToDarkMode(toggleElement, checkbox) {
        const toggle = document.querySelector(toggleElement);
        const cbx = document.querySelector(checkbox);
        const darkMode = localStorage.getItem('darkMode') === "true";

        if (darkMode) { 
            document.body.classList.add('dark-mode'); document.documentElement.classList.add("dark-mode"); 
            toggle.innerHTML = `<i class='uil uil-moon'></i>`;
        } else {
            document.body.classList.remove('dark-mode'); document.documentElement.classList.remove("dark-mode"); 
            toggle.innerHTML = `<i class='uil uil-sun'></i>`;
        }

        toggle.addEventListener('click', () => {
            const checkIfBodyHasDarkMode = document.body.classList.contains('dark-mode');
            document.body.classList.toggle("dark-mode");
            document.documentElement.classList.toggle("dark-mode");
            
            cbx.checked = true;
            if (!checkIfBodyHasDarkMode) {
                if (cbx.checked) {
                    localStorage.setItem("darkMode", "true");
                    toggle.innerHTML = `<i class='uil uil-moon'></i>`;
                } else {
                    localStorage.setItem("darkMode", "false");
                    toggle.innerHTML = `<i class='uil uil-sun'></i>`;
                }
            } else { localStorage.setItem("darkMode", "false"); toggle.innerHTML = `<i class='uil uil-sun'></i>`}
        })
    }

    const cbx = '#cbx';
    const toggleTheme = '#toggleTheme'

    switchToDarkMode(toggleTheme, cbx)

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


    
    function mainScrollProg() {
        const scrollProgress = document.querySelector('.scroll-progress');
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollHeight = (winScroll / height) * 100;
        scrollProgress.style.width = scrollHeight + '%';
    }

    window.addEventListener('scroll', () => {
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
    const navPaneBtn = document.querySelectorAll('.hamburger');
    const overlay = document.querySelector('.overlay');
    const close_btn = document.querySelector('.nav-pane .close-btn');
    const elements = document.querySelectorAll('.header-container, main, footer');
    let isAnimating = false;
    
    function openNavPane() {
        if (isAnimating) return;
        isAnimating = true;
        
        requestAnimationFrame(() => { 
            if (window.innerWidth > 600) {
                navpane.style.animation = 'fadeInRight .7s cubic-bezier(0.075, 0.82, 0.165, 1)';
                overlay.classList.add('showOverlay');
                navpane.classList.remove('hidden');
                elements.forEach(el => {
                    el.style.transform = 'translateX(-370px)';
                })
                for (const btn of navPaneBtn) {
                    btn.classList.add('active');
                }
                navpane.addEventListener('animationend', () => {
                   if (navpane.style.animation.includes('fadeInRight')) {
                       isAnimating = false;
                   }
               }, {once: true});
            }
            else {
                navpane.style.animation = 'fadeInLeft .7s cubic-bezier(0.075, 0.82, 0.165, 1)';
                overlay.classList.add('showOverlay');
                navpane.classList.remove('hidden');
                elements.forEach(el => {
                    el.style.transform = 'translateX(0px)';
                })
               navpane.addEventListener('animationend', () => {
                   if (navpane.style.animation.includes('fadeInLeft')) {
                       isAnimating = false;
                       for (const btn of navPaneBtn) {
                           btn.classList.add('active');
                       }
                   }
               }, {once: true});
            }
        });
    }

    function closeNavPane() {
        if (isAnimating) return;
        isAnimating = true;

        overlay.classList.remove('showOverlay');

        if (window.innerWidth > 600) {
            requestAnimationFrame(() => {
                navpane.style.animation = 'fadeOutRight .3s cubic-bezier(0.075, 0.82, 0.165, 1)';
                
                navpane.addEventListener('animationend', () => {
                    if (navpane.style.animation.includes('fadeOutRight')) {
                        isAnimating = false;
                        navpane.classList.add('hidden');
                        for (const btn of navPaneBtn) {
                           btn.classList.remove('active');
                       }
                        elements.forEach(el => {
                            el.style.transform = 'translateX(0px)';
                        })
                        
                    }
                }, {once: true});
            });
        } else {
            requestAnimationFrame(() => {
                navpane.style.animation = 'fadeOutLeft .3s cubic-bezier(0.075, 0.82, 0.165, 1)';
                
                navpane.addEventListener('animationend', () => {
                    if (navpane.style.animation.includes('fadeOutLeft')) {
                        isAnimating = false;
                        navpane.classList.add('hidden');
                        for (const btn of navPaneBtn) {
                           btn.classList.remove('active');
                       }
                        elements.forEach(el => {
                            el.style.transform = 'translateX(0px)';
                        })
                        
                    }
                }, {once: true});
            });
        }
        
    }

    function toggleNavPane() {
        if (navpane.classList.contains('hidden')) {
            openNavPane();
        } else {
            closeNavPane();
        }
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 600 && !navpane.classList.contains('hidden')) {
            elements.forEach(el => {
                el.style.transform = 'translateX(-370px)';
            });
        } else if (window.innerWidth <= 600 && !navpane.classList.contains('hidden')) {
            elements.forEach(el => {
                el.style.transform = 'translateX(370px)';
            });
        } else {
            elements.forEach(el => {
                el.style.transform = 'translateX(0px)';
            })
        }
    })

    // document.querySelector('.not-logged').addEventListener('click', () => {
    //     window.location.href = './login.html'
    // });
    navPaneBtn.forEach(btn => {
        btn.addEventListener('click', toggleNavPane);
    })
    close_btn.addEventListener('click', closeNavPane);
    overlay.addEventListener('click', closeNavPane);

    

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

    const body = document.body;

    window.addEventListener('scroll', () => {
        body.scrollTop > 100 || document.documentElement.scrollTop > 100 ? document.querySelector('.header-container').classList.add('scrolled') : document.querySelector('.header-container').classList.remove('scrolled')
    })

    const cart = header.querySelector('#cart');
    const dialogCart = document.getElementById('cart-dialog');
    const dialogClose= document.getElementById('close1');

    cart.addEventListener('click', () => {
        dialogCart.showModal();
    })
    
    dialogClose.addEventListener('click', () => {
        requestAnimationFrame(() => {
            dialogCart.style.animation = 'fadeOut .8s cubic-bezier(0.075, 0.82, 0.165, 1)';
            dialogCart.addEventListener('animationend', () => {
                dialogCart.close();
                dialogCart.style.animation = '';
            }, {once: true});
        })
    })

    function disableAnimation(checkbox) {
    let isAnimating = true;
    const cbx = document.querySelector(checkbox);
    const navpane  = document.querySelector('header').querySelector('.nav-pane');
    const isAnimEnabled = localStorage.getItem('anim-mode') === 'enabled';
    

    if (isAnimEnabled) {
        document.body.classList.add('anim-disabled');
        cbx.checked = true;
        
    }
    else {
        document.body.classList.remove('anim-disabled');
        cbx.checked = false;
        localStorage.setItem("anim-mode", "disabled");
    }
    
    cbx.addEventListener('change', () => {
        if (cbx.checked) {
            document.body.classList.add('anim-disabled');
            cbx.checked = true;
            localStorage.setItem("anim-mode", "enabled");
        }
        else {
            document.body.classList.remove('anim-disabled');
            cbx.checked = false;
            localStorage.setItem("anim-mode", "disabled");
        }
    })
}

const dsbAnim = '#dsbAnimCbx';
disableAnimation(dsbAnim);

    const floatMenu = header.querySelector('#richi-ai-button');
    const centerCardCbx = document.getElementById('centerCardCbx');
    const dialogAI = document.getElementById('float-menu');
    const dialogClose1 = document.getElementById('close2');

    floatMenu.addEventListener('click', () => {
        dialogAI.showModal();
    })

    dialogClose1.addEventListener('click', () => {
        requestAnimationFrame(() => {
            dialogAI.style.animation = 'fadeOut .8s cubic-bezier(0.075, 0.82, 0.165, 1)';
            dialogAI.addEventListener('animationend', () => {
                dialogAI.close();
                dialogAI.style.animation = '';
            }, {once: true});
        })
    })

    const centeredState = localStorage.getItem('centered-people') === 'true';
    const peopleContainer = document.querySelectorAll('.people-container');

    peopleContainer.forEach(container => {
        if (centeredState) {
            container.classList.add('centered');
            centerCardCbx.checked = true;
        } else {
            container.classList.remove('centered');
            centerCardCbx.checked = false;
        }

        if (centerCardCbx) {
            centerCardCbx.addEventListener('change', () => {
                if (centerCardCbx.checked) {
                    container.classList.add('centered');
                    localStorage.setItem('centered-people', 'true');
                    centerCardCbx.checked = true;
                } else {
                    container.classList.remove('centered');
                    localStorage.setItem('centered-people', 'false');
                    centerCardCbx.checked = false;
                }
            })
        }
    });

    const newPeopleCbx = document.getElementById('newCardCbx');
    const newPeopleState = localStorage.getItem('newPeople') === 'true';
    const peoples = document.querySelectorAll('.people');
    let url = '/json/peopleBio.json';

    peoples.forEach(card => {
        if (newPeopleState) {
            newPeopleCbx.checked = true;
            card.classList.add('new');
            url ='/json/peopleBio_simple.json';
            centerCardCbx.disabled = true;
        } else {
            newPeopleCbx.checked = false;
            card.classList.remove('new');
            url ='/json/peopleBio.json';
            centerCardCbx.disabled = false;
        }

        if (newPeopleCbx) {
            newPeopleCbx.addEventListener('change', () => {
                if (newPeopleCbx.checked) {
                    document.getElementById('newPeopleWarn').classList.remove('hidden');
                    localStorage.setItem('newPeople', 'true');
                    card.classList.add('new');
                    url ='/json/peopleBio_simple.json';
                    centerCardCbx.disabled = true;
                    newPeopleCbx.checked = true;
                } else {
                    localStorage.setItem('newPeople', 'false');
                    card.classList.remove('new');
                    url ='/json/peopleBio.json';
                    centerCardCbx.disabled = false;
                    newPeopleCbx.checked = false;
                }
            })
        }
    })

    const highContrastCbx = document.getElementById('contrastCbx');
    const highContrastState = localStorage.getItem('high-contrast') === 'true';

    if (highContrastState) {
        document.body.classList.add('high-contrast');
        highContrastCbx.checked = true;
    } else {
        document.body.classList.remove('high-contrast');
        highContrastCbx.checked = false;
    }

    if (highContrastCbx) {
        highContrastCbx.addEventListener('change', () => {
            if (highContrastCbx.checked) {
                document.body.classList.add('high-contrast');
                localStorage.setItem('high-contrast', 'true');
                highContrastCbx.checked = true;
            } else {
                document.body.classList.remove('high-contrast');
                localStorage.setItem('high-contrast', 'false');
                highContrastCbx.checked = false;
            }
        })
    }

    const dyslexiaCbx = document.getElementById('dyslexiaCbx');
    const dyslexiaState = localStorage.getItem('dyslexia') === 'true';

    if (dyslexiaState) {
        document.body.classList.add('dyslexia');
        dyslexiaCbx.checked = true;
    } else {
        document.body.classList.remove('dyslexia');
        dyslexiaCbx.checked = false;
    }

    if (dyslexiaCbx) {
        dyslexiaCbx.addEventListener('change', () => {
            if (dyslexiaCbx.checked) {
                document.body.classList.add('dyslexia');
                dyslexiaCbx.checked = true;
                localStorage.setItem('dyslexia', 'true');
            } else {
                document.body.classList.remove('dyslexia');
                localStorage.setItem('dyslexia', 'false');
                dyslexiaCbx.checked = false;
            }
        })
    }

    const btnRange = document.getElementById('btnRadius');
    const buttons = document.querySelectorAll('.btn, .tab-buttons, .tab-button, input[type="search"]');

    btnRange.addEventListener('input', () => {
        buttons.forEach(btn => {
            if (btnRange.value == 0) {
                btn.style.borderRadius = '0px';
            } else if (btnRange.value == 1) {
                btn.style.borderRadius = '8px';
            } else if (btnRange.value == 2) {
                btn.style.borderRadius = '16px';
            } else if (btnRange.value == 3) {
                btn.style.borderRadius = '50px';
            } else {
                btn.style.borderRadius = '16px';
            }
        })
    })


})
