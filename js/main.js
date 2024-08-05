const editingElements = document.querySelectorAll('[contentEditable]');
const downloadButton = document.querySelector('.downloadButton');

const animationHandler = () => {
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
}

const downloadButtonClickHandler = () => {
  downloadButton.addEventListener('click', () => {
    const CV = document.querySelector('.wrapper');
    const opt = {
      margin: 0.5,
      filename: 'CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 1,
       },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
     }
    };
  
    html2pdf().set(opt).from(CV).save();
  });
}

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

const createRipple = (event) => {
  const element = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (element.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (element.offsetTop + radius)}px`;
  circle.classList.add('ripple');
  element.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

const elementsClickHandler = () => {
  editingElements.forEach((elem) => {
    elem.classList.add('ripple_area');
    elem.addEventListener('click', createRipple);
  })
}

window.addEventListener('beforeunload', saveToLocalStorage);

document.addEventListener('DOMContentLoaded', () => {
  getFromLocalStorage();
  animationHandler();
  downloadButtonClickHandler();
  elementsClickHandler();
});