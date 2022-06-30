const downloadbtn= document.getElementById('downloadProbation')
let text = JSON.stringify({hello:'example'});

downloadbtn.addEventListener('click',()=>{
    getInfo()
   // downloadAsFile(text);
  })
 
  async function getInfo(res) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'https://9aee-85-26-234-110.eu.ngrok.io/api/universityForm/create-csv');
    xhr.onload = function() {
    let responseObj = xhr.response;
        downloadAsFile(responseObj)
    console.log('5555', responseObj)
    res= responseObj
    };
    xhr.send();
} 
  function downloadAsFile(data) {
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/csv'});
    console.log(file)
    a.href = URL.createObjectURL(file);
    a.download = "ex.csv";
    a.click();
  }