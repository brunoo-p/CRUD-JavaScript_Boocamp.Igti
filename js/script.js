let globalNames = ['Bruno','Dona Maria','João Sem Braço','Astolfo'];
let inputName = null; 
let isEditing = false;
let currentIndex = null;

/* INICIO */
window.addEventListener('load', () =>{
  console.log(globalNames);
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
});
  

/* INCIAR SOMENTE QUANDO TOTALMENTE CARREGADO */
const preventFormSubmit = () => {
  const handleFormSubmit = (event) => event.preventDefault();
  let form = document. querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}


/* ATIVA INPUT */
const activateInput = () => {
  const insertName = (newName) => globalNames = [...globalNames, newName];
    //globalNames.push(newName);
    
  const updateName = (newName) => globalNames[currentIndex] = newName;

  const handleTyping = (event) => {
    if(event.key === 'Enter' && event.target.value.trim() !== '')
    {
      if(isEditing)
      {
        updateName(event.target.value)
      }
      else
      {
        insertName(event.target.value)
      }

      render();
      isEditing= false;
      clearInput();
    }
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}


/* EXCLUSÃO/REMOÇÃO/RENDERIZAÇÃO */
const render = () => {

  /* REMOÇÃO */
  const createDeleteButton = (index) => {

    const deleteName = () =>{
      //globalNames.splice(index, 1);
      globalNames = globalNames.filter((_, i)=> i !== index);
      render();
    }

    let button = document.createElement('button');
    button.classList.add('removeButton');
    button.textContext = 'Remove';
    button.addEventListener('click', deleteName)
    return button;
  }


  /* EDIÇÃO */
  const createSpan = (name, index) => {

    const editItem = () => {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click',editItem)
    return span;
  }


/* RENDERIZAÇÃO DE LISTA */
  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  let ul = document.createElement('ul');
  
  for (let i=0;i<globalNames.length;i++)
  {
    let currentName = globalNames[i];

    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);
    

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}


/* LIMPAR E VOLTAR FOCO */
const clearInput = () =>{
  inputName.value= '';
  inputName.focus();
}