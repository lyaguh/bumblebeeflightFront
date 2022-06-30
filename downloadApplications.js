let serverURL='https://01d7-85-249-26-99.eu.ngrok.io'
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
    if (id=='/api/UniversityForm/csv') {
        var fName='Корпоративный университет'
    }
    else {
        if (id=='/api/Practice/csv') {
            var fName='Практика'
        }
        else {
            if (id=='/api/Probation/csv') {
                var fName='Стажировка'
            }
            else {
                if (id=='/api/Grant/csv') {
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
    console.log(fName, 'sddd')
    downloadAsFile(responseObj, fName)
    };
    xhr.send();
} 

function downloadAsFile(data, fName) {
    let a = document.createElement("a");
    let file = new Blob(["\uFEFF"+data], {type: "text/csv;charset=UTF-8"});
    a.href = URL.createObjectURL(file);
    console.log(fName)
    var currentDate = new Date()
    a.download = currentDate.toJSON().substring(0,10) + "_" + fName+".csv";
    a.click();
}