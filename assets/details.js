document.querySelectorAll('.details__item').forEach(item => {
    const title = item.querySelector('.details__title')
    title.addEventListener('click', () => {
        const text = title.nextElementSibling;

        document.querySelectorAll('.details__item').forEach(item => item.classList.remove('active'));
        
        if (text.style.maxHeight) {
            text.style.maxHeight = null;
            
        } else {
            document.querySelectorAll('.details__text').forEach(item => item.style.maxHeight = null);
            item.classList.toggle('active')

            text.style.maxHeight = text.scrollHeight + 'px';
        }
    });
});