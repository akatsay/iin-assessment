// in case image is unavailable, replace it with an anonymous image placeholder
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.faculty-image');
    images.forEach(img => {
        img.onerror = () => {
            img.src = './assets/anonymous.jpg';
        };
    });
});