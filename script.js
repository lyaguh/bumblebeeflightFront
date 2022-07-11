
const applicationForm = document.forms.application;

function sendForm() {
    const urlToBack = 'https://c202-178-205-10-52.eu.ngrok.io/api/probation'
    // prompt('Введите URL до эндпоинта');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', urlToBack);

    // xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onload = () => {
      if (xhr.status !== 200) {
        return;
      }}
    xhr.onerror = () => {
        if (xhr.status >= 300){
            document.getElementById('formLabel').innerText = `Не сработало(${xhr.status}`
        }
    }
    let formData = new FormData(applicationForm);
    // var object = {};
    // formData.forEach(function(value, key){
    //     object[key] = value;
    // });
    // var json = JSON.stringify(object);

    const response = xhr.response
    console.log(response)
    xhr.send(formData);
    document.getElementById('formLabel').innerText = `Cработало)`
  }
  // при отправке формы
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  });


  // Прикрепление файлов



var fileInput = document.querySelector('input[type="file"]')

fileInput.onchange = function() {
  if (this.value){
    console.log('функция onchange',this.files)
    while (listOfFiles.firstChild) {
      listOfFiles.removeChild(listOfFiles.firstChild);
    } 
  
    for (var currentFile of this.files){
      let liNew = document.createElement('li');
      liNew.innerHTML = currentFile.name;  
      listOfFiles.append(liNew)
    }
  }
  else {
    document.getElementById('labelCv').innerHTML='Или выберите их здесь'
  }
}


var dropZone = document.getElementById('dropZone');
var maxFileSize = 1000000;

if (typeof(window.FileReader) == 'undefined') {
  dropZone.text('Не поддерживается браузером!');
  dropZone.addClass('error');
}

dropZone.ondragover = function() {
  dropZone.classList.add('hover');
  return false;
};
  
dropZone.ondragleave = function() {
  dropZone.classList.remove('hover');
  return false;
};

var listOfFiles = document.getElementById('listOfFiles')

dropZone.ondrop = function(event) {
  event.preventDefault();
  dropZone.classList.remove('hover');
  dropZone.classList.add('drop');


  while (listOfFiles.firstChild) {
    listOfFiles.removeChild(listOfFiles.firstChild);
  } 
  console.log('event',event.dataTransfer)
  console.log('files',event.dataTransfer.files)

  fileInput.files = event.dataTransfer.files

  for (var currentFile of fileInput.files){
    let liNew = document.createElement('li');
    liNew.innerHTML = currentFile.name;  
    listOfFiles.append(liNew)
  }

  console.log(fileInput.files)
        
  if (file.size > maxFileSize) {
      dropZone.innerText = ('Файл слишком большой!');
      dropZone.classList.add('error');
      return false;
  }
};