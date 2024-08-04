const editingElements = document.querySelectorAll('[contentEditable]');
const downloadButton = document.querySelector('.downloadButton');

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

downloadButton.addEventListener('click', () => {
  const CV = document.querySelector('.wrapper');
  const opt = {
    margin: 0.5,
    filename: 'CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 1
     },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
   }
  }

  html2pdf().set(opt).from(CV).save();
})