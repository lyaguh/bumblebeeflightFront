
const practiceForm = document.forms.practice;


function sendForm() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://0ae1-178-207-91-7.eu.ngrok.io/api/user');

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
    let formData = new FormData(practiceForm
      );
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
  practiceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  });


  let text = JSON.stringify({hello:'example'});
  document.getElementById('downloadFile').addEventListener('click',()=>{
    downloadAsFile(text);
  })
 
  
  function downloadAsFile(data) {
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = "example.txt";
    a.click();
  }
     
   
    
    



