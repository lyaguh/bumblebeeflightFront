
const applicationForm = document.forms.application;

function sendForm() {
    const urlToBack = 'https://0b9c-178-207-91-7.eu.ngrok.io/api/probation'
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


var dropZone = document.getElementById('applicationForm');
var maxFileSize = 1000000;

if (typeof(window.FileReader) == 'undefined') {
  dropZone.text('Не поддерживается браузером!');
  dropZone.addClass('error');
}

dropZone.ondragover = function(e) {
  console.log(e.currentTarget.id)
  dropZone.classList.add('hover');
  return false;
};
  
dropZone.ondragleave = function() {
  dropZone.classList.remove('hover');
  return false;
};

var listOfFiles = document.getElementById('listOfFiles')
var dataFile
dropZone.ondrop = function(event) {
  event.preventDefault();
  dropZone.classList.remove('hover');
  dropZone.classList.add('drop');


  while (listOfFiles.firstChild) {
    listOfFiles.removeChild(listOfFiles.firstChild);
  } 

 // fileInput.files = event.dataTransfer.files
  var dropedFiles = Array.from(event.dataTransfer.files);

  var existedFiles = Array.from(fileInput.files)

  var newFilesArray = arrayUnique(dropedFiles.concat(existedFiles)); 
  console.log('new',newFilesArray)
  var pseudoArray = {}

  var dt = new DataTransfer()
  for (i=0;i<newFilesArray.length;i++){
    pseudoArray[i]=newFilesArray[i]
    dt.items.add(newFilesArray[i])
  }

  pseudoArray['length']=newFilesArray.length
  

  fileInput.files = dt.files
  console.log(fileInput.files)
  



  // if (fileInput.files.length == 0){
  //   fileInput.files = event.dataTransfer.files
  // } else{
  //   dataFile = event.dataTransfer.files
  //   console.log(dataFile)
  //   for (i=0;i<dataFile.length;i++){
  //     fileInput.files[fileInput.files.length]=dataFile[i]
  //     //var newFile={ dataFile.files, fileInput.files}
  //     console.log('new',newFile)
  //     console.log(dataFile[i])
  //   }
  //   fileInput.files[3]='dndjdjdjjj'
  //   console.log(fileInput.files)  
  // }
  

  for (var currentFile of fileInput.files){
    let liNew = document.createElement('li');
    liNew.innerHTML = currentFile.name;  
    listOfFiles.append(liNew)
  }

  console.log(fileInput.files)
        
  // if (file.size > maxFileSize) {
  //     dropZone.innerText = ('Файл слишком большой!');
  //     dropZone.classList.add('error');
  //     return false;
  // }
};

function arrayUnique(array) {
  var a = array
  var c=[a[0]]
  console.log('a',a)
  for (i=0; i<a.length; i++) {
    for (j=0;j<c.length; i++){
      if (c.indexOf(a[i])!=-1)
      {
      c.push(a[i])
        console.log(i, j, a.length, c.length)
      }
    }
    
    console.log(i, a.slice(i+1).indexOf(a[i]), a.slice(0, i-1).indexOf(a[i]))
  }
 
  console.log(c)
  return c;
}