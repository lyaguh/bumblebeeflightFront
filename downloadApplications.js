let serverURL='https://01d7-85-249-26-99.eu.ngrok.io'
const downloadbtns=document.getElementsByName('downloadbtn')

const uncheckedFilter=document.getElementById('uncheckedFilter')
const uncheckedChoice=document.getElementById('uncheckedChoice')
uncheckedFilter.addEventListener('click', ()=>{
    if (uncheckedChoice.checked==true)
    {
        uncheckedChoice.checked=false
    }
    else
    {
        uncheckedChoice.checked=true
    }
})

const dateFormat=document.getElementsByName('dateFormat')
var dateFormatList = Array.prototype.slice.call(dateFormat);
for(i = 0;i < dateFormatList.length; i++)
{
    dateFormat[i].addEventListener('click',(event)=>{
        event.currentTarget.getElementsByTagName('input')[0].checked='true'
        event.currentTarget.className='activeFormatDate'
        for(k = 0;k < dateFormatList.length; k++)
        {
            if (dateFormat[k].id!=event.currentTarget.id)
            {dateFormat[k].className='inactiveFormatDate'}
        }
    })
}

var downloadList = Array.prototype.slice.call(downloadbtns);
for(i = 0;i < downloadList.length; i++)
{
    downloadbtns[i].addEventListener('click',(event)=>{
        var filters=readFilters()
        console.log(filters['finishInterval'])
        console.log(filters['startInterval'])
     
            if (confirm(createConfirmText(filters)))
                {
                    console.log('Скачиваю', filters)
                    getFile(serverURL+event.currentTarget.id.substring(5), fileName(event.currentTarget.id, filters[0]), filters, event.currentTarget.id)
                }
            else
                {
                    console.log('Я передумал')
                } 
            }
       
            
    )
}

function getDateIntervalFromQuarter(quarter){
    var dateInterval={'startDate':'', 'finishDate':''}
    if (quarter==1) {
        dateInterval['startDate']='-01-01'
        dateInterval['finishDate']='-03-31'
    }
    if (quarter==2) {
        dateInterval['startDate']='-04-01'
        dateInterval['finishDate']='-06-30'
    }
    if (quarter==3) {
        dateInterval['startDate']='-07-01'
        dateInterval['finishDate']='-09-30'
    }
    if (quarter==4) {
        dateInterval['startDate']='-10-01'
        dateInterval['finishDate']='-12-31'
    }
    return dateInterval
}

function readFilters(){
    var unchecked=uncheckedChoice.checked

    var startInterval=''
    var finishInterval=''  
    for(i = 0;i < dateFormatList.length; i++)
    {
        if (dateFormat[i].getElementsByTagName('input')[0].checked==true){
            if (dateFormat[i].id=="firstDateFormat"){
                startInterval=dateFormat[i].getElementsByTagName('input')[1].value
                finishInterval=dateFormat[i].getElementsByTagName('input')[2].value
            }
            else {
                if (dateFormat[i].id=="secondDateFormat"){
                    startInterval=dateFormat[i].getElementsByTagName('input')[1].value+getDateIntervalFromQuarter(dateFormat[i].getElementsByTagName('select')[0].value)['startDate']
                    finishInterval= dateFormat[i].getElementsByTagName('input')[2].value+getDateIntervalFromQuarter(dateFormat[i].getElementsByTagName('select')[1].value)['finishDate']
                }
                else {
                    if (dateFormat[i].id=="thirdDateFormat"){
                        var dateInterval=getDateIntervalFromQuarter(dateFormat[i].getElementsByTagName('select')[0].value)
                        var year=dateFormat[i].getElementsByTagName('input')[1].value
                        startInterval=year+dateInterval['startDate']
                        finishInterval=year+dateInterval['finishDate']
                    }
                }
            }
        }
    }
    if (startInterval.length<10){
        startInterval=''
    }
    if (finishInterval.length<10){
        finishInterval=''
    }
    if (finishInterval<startInterval){
        
    }

    var city = document.getElementById('city').value
    var college = document.getElementById('college').value
    var educationLevel = document.getElementById('EducationLevel').value
    var course = document.getElementById('course').value
    var courseDirection = document.getElementById('courseDirection').value

    var filters={'unchecked':unchecked, 'startInterval':startInterval, 'finishInterval':finishInterval,
                'city':city, 'college':college, 'educationLevel':educationLevel, 'course':course,
            'courseDirection':courseDirection}
    return filters
}

function onlyInfluenceFilters(filters, category){
    if (category==''){

    }
}

function selectedFilters(filters){

    //первый элемент массива - фильтры, влияющие на результат
    //второй - не влияющие
    var c=[{'id':['название', 'value']}, {'id1':['название1', 'value']}]
    return c
}

function createConfirmText(selectedFilters){
    return 'Будет сформирован документ, соответствующий фильтрам: '+selectedFilters+'Следующие выбранные фильтры НЕ повлияют на результат выборки'
}


function fileName(id, filters) {
    var currentDate = new Date()
    var fName=currentDate.toJSON().substring(0,10) + "_"
    if (id.includes('/api/UniversityForm')) {
        fName +='Корпоративный_университет'
    }
    else {
        if (id.includes('/api/Practice')) {
            fName +='Практика'
        }
        else {
            if (id.includes('/api/Probation')) {
                fName +='Стажировка'
            }
            else {
                if (id.includes('/api/Grant')) {
                    fName +='Именная_стипендия_Ак_Барс_Банка'
                }
            }
        }
    }
    return fName
}

async function getFile(serverURL, fName, filters, id) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', serverURL);
    xhr.setRequestHeader('filters', filters )
    xhr.setRequestHeader('fileName', fName )
    xhr.setRequestHeader('downloadTo', id.substring(0,5))
    xhr.onload = function() {
        let responseObj = xhr.response;
        if (id.includes('local')){
            downloadAsFile(responseObj, fName)
            alert('Файл успешно скачан!')
        }
        else {
            if (responseObj=='200') {
                alert('Файл отправлен Вам на почту!')
            }        
        }
    };
    xhr.send();
} 

function downloadAsFile(data, fName) {
    let a = document.createElement("a");
    let file = new Blob(["\uFEFF"+data], {type: "text/csv;charset=UTF-8"});
    a.href = URL.createObjectURL(file);
    a.download = fName+".csv";
    a.click();
}