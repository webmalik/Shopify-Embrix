document.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq__answer');

        document.querySelectorAll('.faq__item').forEach(item => item.classList.remove('active'));
        
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            
        } else {
            document.querySelectorAll('.faq__answer').forEach(item => item.style.maxHeight = null);
            item.classList.toggle('active')

            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});