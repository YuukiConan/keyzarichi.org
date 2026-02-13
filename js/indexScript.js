import {Rave} from "/frameworks/Rave v1.5/js/Rave.js";
const richi = Rave ? new Rave("1.2-beta", "richi.com") : null; 

if (window.location.pathname.endsWith('index.html')) {
    const target = window.location.origin + window.location.pathname.replace('index.html', '');
    if (window.location.href !== target) {
        history.replaceState({}, document.title, target)
    }
}

const dialogBetaWarning = document.getElementById('myDialog');
const disableMsg = document.getElementById('disable-early-message');
const isDisabled = localStorage.getItem('disable-warning') === 'true';
const dialogClose = document.getElementById('close');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (isDisabled) {
            dialogBetaWarning.close();
        } else {
            dialogBetaWarning.showModal();
        }
    }, 1000)
})
disableMsg.addEventListener('change', () => {
    if (disableMsg.checked) {
        localStorage.setItem('disable-warning', 'true')
    } else {
        localStorage.setItem('disable-warning', 'false')
    }
});
dialogClose.addEventListener('click', ()  => {
    requestAnimationFrame(() => {
        dialogBetaWarning.style.animation = 'fadeOut .8s cubic-bezier(0.075, 0.82, 0.165, 1)';
        dialogBetaWarning.addEventListener('animationend', () => {
            dialogBetaWarning.close();
            if (dialogBetaWarning.style.animation.includes('windows8ScaleOut')) {
                
            }
        })
    })

    disableMsg.addEventListener('change', () => {
        if (disableMsg.checked) {
            localStorage.setItem('disable-warning', 'true')
        } else {
            localStorage.setItem('disable-warning', 'false')
        }
    })

})

const labelTags = document.querySelectorAll('.people .labelTag');
const now = new Date();
const DATE_IN_MS = 1000 * 60 * 60 * 24;
const EXPIRE_DAYS = 7;

labelTags.forEach(tag => {
    if (!tag.textContent.trim() === 'Baru' || !tag.textContent.trim() === 'New') return;
    const addedAt = new Date(tag.dataset.added) 
    const DIFF_DAYS = (now - addedAt) / DATE_IN_MS;
    if (DIFF_DAYS > EXPIRE_DAYS) {
        tag.classList.add('hidden');
    }
})

function switchMoodBeta() {
    const cbxs = document.querySelectorAll('.toggleCheckbox');

    cbxs.forEach(cbx => {
        const classes = Array.from(cbx.classList).filter(c => c !== 'toggleCheckbox')
        const group = classes[0];
        const label = cbx.closest(`.flex`);
        const leftOption = label.querySelector(`.leftOption`);
        const rightOption = label.querySelector(`.rightOption`);
        const pageOne = document.querySelector(`.${group}.pageOne`);
        const pageTwo = document.querySelector(`.${group}.pageTwo`);
        if (!pageOne || !pageTwo) return

        // change state function for toggles with checkbox
        const applyState = isChecked => {
            if (isChecked) {
                requestAnimationFrame(() => {
                    pageOne.classList.add('hidden');
                    pageTwo.classList.remove('hidden');
                    pageTwo.style.animation = 'fadeInRight .6s cubic-bezier(0.68, -0.15, 0.165, 2)';
                    pageTwo.addEventListener('animationend', () => {
                        pageOne.style.animation = '';
                        pageTwo.style.animation = '';
                    })
                });
            } else {
                requestAnimationFrame(() => {
                    pageTwo.classList.add('hidden');
                    pageOne.classList.remove('hidden');
                    pageOne.style.animation = 'fadeInLeft .6s cubic-bezier(0.68, -0.15, 0.165, 2)';
                    pageOne.addEventListener('animationend', () => {
                        pageOne.style.animation = '';
                        pageTwo.style.animation = '';
                    })
                })
            }

            
        }

        cbx.addEventListener('change', () => {
            applyState(cbx.checked);
        })

        // change state function when clicking on the label
        leftOption.addEventListener('click', () => {
            leftOption.classList.add('active');
            rightOption.classList.remove('active');
            cbx.checked = false;
            applyState(false);
            
        })
        rightOption.addEventListener('click', () => {
            leftOption.classList.remove('active');
            rightOption.classList.add('active');
            cbx.checked = true;
            applyState(true)
        })

        applyState(cbx.checked)
        
    })

}
const checkbox = '.pageType';
richi.switchToggle(checkbox, () => switchMoodBeta());

let url = '/json/peopleBio.json';
const peoples = document.querySelectorAll('.people');

document.querySelectorAll('.people.legacy').forEach(el => {
    if (url === '/json/peopleBio.json' || url === '/json/peopleBio_simple.json') {
        el.style.display = 'inline-block';
    } else {
        el.style.display = 'none';
    }
})

const newPeopleState = localStorage.getItem('newPeople') === 'true';

peoples.forEach(card => {
    if (newPeopleState) {
        url ='/json/peopleBio_simple.json';
    } else {
        url ='/json/peopleBio.json';
    }
})

fetch(url).then(response => response.json())
.then(data => {
        data.forEach(people => {
            const filter = document.querySelectorAll(`.people-bio[data-people="${people.id}"]`);
            filter.forEach(personDiv => {
                if (personDiv) {
                    const names = personDiv.querySelectorAll('.people-bio .name h2');
                    const nicknames = personDiv.querySelectorAll('.people-bio .name span');
                    const bios = personDiv.querySelectorAll('.people-bio p');
                    const aliases = personDiv.querySelectorAll('.people span .alias');
    
                    names.forEach(name => name.textContent = people.name);
                    nicknames.forEach(nickname =>  {
                        nickname.innerHTML = people.nickname
                        const space = `\xa0\xa0`;
                        if (people.aliases && people.aliases.trim() !== "") {
                            nickname.innerHTML = `Alias: ${people.aliases} ${space} | ${space} ${people.nickname}`;

                        }
                        if (people.other_name && people.other_name.trim() !== "") {
                            nickname.innerHTML = `Nama lain: ${people.other_name} <br> ${people.nickname}`;

                        }
                    });
                    bios.forEach(bio => {
                        if (bio.textContent == ' ' || people.description == "" ){
                            bio.textContent = 'Tidak ada biografi';
                            bio.classList.add('empty');
                        } else {
                            bio.innerHTML = people.description
                        }
                    });
                }
            })
        })
    }).catch(error => console.error('Error loading peopleBio.json:', error))

const cards = document.querySelectorAll('.people');
cards.forEach((card, i) => {
    const delay = 500 * i;
    
    setTimeout(() => {
        card.classList.add('show');
    }, delay)
})