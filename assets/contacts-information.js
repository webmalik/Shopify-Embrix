const copyBlocks = document.querySelectorAll('.contacts-information__copy');
const copyLabel = document.querySelector('.copy__label');

copyBlocks.forEach((block) => {
    block.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            return;
        }
        copyToClipboard(block);
    });
});

function copyToClipboard(block) {
    const copyText = block.getAttribute('data-copy');

    const tempInput = document.createElement('input');
    tempInput.type = 'text';
    tempInput.value = copyText;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        console.log('Copied to clipboard: ', copyText);
        copyLabel.style.opacity = 1;

        setTimeout(() => {
            copyLabel.style.opacity = 0;
        }, 1500);
    } catch (err) {
        console.error('Error copying to clipboard: ', err);
    }

    document.body.removeChild(tempInput);
}
