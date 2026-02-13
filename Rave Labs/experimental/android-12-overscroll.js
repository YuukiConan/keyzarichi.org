const container = document.querySelector('main');
const content = document.querySelector('section');

let startY = 0;
let currentY = 0;
let isDragging = false;
let isBouncing = false;

container.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    currentY = container.scrollTop;
    isDragging = true;
});

container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    const scrollHeight = container.scrollHeight - container.clientHeight;

    if (container.scrollTop === 0 && deltaY > 0) {
        isBouncing = true;
        content.style.transform = `translateY(${deltaY * 0.5}px)`;
    } else if (container.scrollTop === scrollHeight && deltaY < 0) {
        isBouncing = true;
        content.style.transform = `translateY(${deltaY * 0.5}px)`;
    } else if (!isBouncing) {
        container.scrollTop -= deltaY;
    }
})

container.addEventListener('touchend', (e) => {
    if (isDragging) {
        isDragging = false;
        if (isBouncing) {
            content.style.transition = 'transform 0.3s ease-out';
            content.style.transform = 'translateY(0)';
            setTimeout(() => {
                content.style.transition = '';
                isBouncing = false;
            })
        }
    }
});