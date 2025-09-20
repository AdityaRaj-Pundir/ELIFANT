/* Place your JavaScript in this file */
// Handle opening and closing of popups
document.querySelectorAll('.hotspot').forEach(spot => {
    spot.addEventListener('click', () => {
        const id = spot.id.replace('spot', 'popup');
        document.getElementById(id).style.display = 'block';
    });
});

document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-close');
        document.getElementById(target).style.display = 'none';
    });
});

// Close popup on background click
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
