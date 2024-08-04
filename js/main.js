const editingElements = document.querySelectorAll('[contentEditable]');

editingElements.forEach((elem) => {
    elem.addEventListener('input', (e) => {
        e.target.classList.add('animation');

        e.target.addEventListener('animationend', (animationEvent) => {
            if (animationEvent.animationName === 'text-animation') {
                e.target.classList.remove('animation')
            }
        })
    })
})

