
const applicationForm = document.forms.application;

function sendForm() {
    const urlToBack = prompt('Введите URL до эндпоинта');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', urlToBack);

    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
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
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);

    const response = xhr.response
    console.log(response)
    xhr.send(json);
    document.getElementById('formLabel').innerText = `Cработало)`
  }
  // при отправке формы
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  });


var fileName = document.getElementById('cv').onchange = function() {
  if (this.value){
    document.getElementById('labelCv').innerHTML=(this.value.split(/(\\|\/)/g).pop())}
  else {
    document.getElementById('labelCv').innerHTML='Файл резюме (.docx,.doc,.pdf)'
  }
}
