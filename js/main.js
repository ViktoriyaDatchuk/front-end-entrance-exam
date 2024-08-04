const editingElements = document.querySelectorAll('[contentEditable]');
const downloadButton = document.querySelector('.downloadButton');

editingElements.forEach((elem) => {
  elem.addEventListener('input', (e) => {
    e.target.classList.add('animation');

    e.target.addEventListener('animationend', (animationEvent) => {
      if (animationEvent.animationName === 'text-animation') {
        e.target.classList.remove('animation');
      }
    });
  });
});

downloadButton.addEventListener('click', () => {
  const CV = document.querySelector('.wrapper');
  const opt = {
    margin: 0.5,
    filename: 'CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 1,
      windowHeight: '822px'
     },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait',
   }
  };

  html2pdf().set(opt).from(CV).save();
});

const saveToLocalStorage = () => {
  editingElements.forEach((elem) => {
    const id = elem.id;
    if (id) {
      localStorage.setItem(id, elem.innerHTML);
    }
  });
};

const getFromLocalStorage = () => {
  editingElements.forEach((elem) => {
    const id = elem.id;
    if (id) {
      const value = localStorage.getItem(id);
      if (value) {
        elem.innerHTML = value;
      }
    }
  })
}

window.addEventListener('beforeunload', saveToLocalStorage);

document.addEventListener('DOMContentLoaded', getFromLocalStorage);