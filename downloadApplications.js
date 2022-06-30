let serverURL='https://9aee-85-26-234-110.eu.ngrok.io'
const downloadbtns=document.getElementsByName('downloadbtn')

var downloadList = Array.prototype.slice.call(downloadbtns);
for(i = 0;i < downloadList.length; i++)
{
    downloadbtns[i].addEventListener('click',(event)=>{
        var csvName=fileName(event.currentTarget.id)
        getFile(serverURL+event.currentTarget.id, csvName)
        
    })
}
 
function fileName(id) {
    if (id=='/api/universityForm/create-csv') {
        var fName='Корпоративный университет'
    }
    else {
        if (id=='/api/practiceForm/create-csv') {
            var fName='Практика'
        }
        else {
            if (id=='/api/probationForm/create-csv') {
                var fName='Стажировка'
            }
            else {
                if (id=='/api/grantForm/create-csv') {
                    var fName='Именная стипендия Ак Барс Банка'
                }
            }
        }
    }
    return fName
}

async function getFile(serverURL, fName) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', serverURL);
    xhr.onload = function() {
    let responseObj = xhr.response;
        downloadAsFile(responseObj, fName)
    };
    xhr.send();
} 

function downloadAsFile(data, fName) {
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/csv'});
    a.href = URL.createObjectURL(file);
    a.download = fName+".csv";
    a.click();
}