let serverURL='https://917c-178-204-72-23.eu.ngrok.io'
if (!window.jQuery) {
	document.write('<script src="https://yastatic.net/jquery/3.3.1/jquery.min.js"></script>')
  }

$(document).ready(function() {
	$('#courseDirection').select2({
		placeholder: "Направление учебных курсов",
		maximumSelectionLength: 2,
		language: "ru"
	});
    $('#college').select2({
        ajax: {
          url: 'https://917c-178-204-72-23.eu.ngrok.io/api/College',
          processResults: function (data) {
            return {
              results: data
            };
          }
        }
      });
});



const downloadbtns=document.getElementsByName('downloadbtn')

const isCheckedFilter=document.getElementById('uncheckedFilter')
const isCheckedChoice=document.getElementById('uncheckedChoice')
isCheckedFilter.addEventListener('click', ()=>{
    if (isCheckedChoice.checked==true)
    {
        isCheckedChoice.checked=false
    }
    else
    {
        isCheckedChoice.checked=true
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
var courseDirectionList = document.getElementById('courseDirection')
for(i = 0;i < downloadList.length; i++)
{
    downloadbtns[i].addEventListener('click',(event)=>{
        var filters=readFilters()
        var id=event.currentTarget.id
        var start=filters['startInterval']
        var finish=filters['finishInterval']
        var condition=(new Date(finish)>new Date(start))||(finish=='')||(start=='')
        if (condition){  
            var infFilters=influenceFilters(filters, id)
            if (confirm(createConfirmText(infFilters[0], infFilters[1])))
                {
                    console.log('Скачиваю')
                    sendRequest(serverURL+id, fileName(id, infFilters[0]), infFilters[0], id)
                }
            else
                {
                    console.log('Я передумал')
                } 
        }
        else {
            alert('Начало подачи заявок не может быть позже её окончания!\nПроверьте правильность заполнения дат выгрузки.')
        }
    })
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
    var isChecked=isCheckedChoice.checked

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
    var college =document.getElementById('college').value
    var course = Number(document.getElementById('course').value)
    if (course==-1){
        course=null
    } 
    var courseDirection = Number(courseDirectionList.value)
    if (courseDirection==-1){
        courseDirection=null
    } 
    var filters={'isChecked':isChecked, 'startInterval':startInterval, 'finishInterval':finishInterval,
                 'college':college, 'course':course,'courseDirection':courseDirection}
    console.log('filters',filters)
    return filters
}

function influenceFilters(filters, category){
    var influencingFilters=filters
    var nonInfluencingFilters=[]
    if (category.includes('Probation')){
        if (influencingFilters['college']!=''){
            influencingFilters['college']=''
            nonInfluencingFilters.push("учебное заведение")
        }
        if (influencingFilters['course']!=null){
            influencingFilters['course']=null
            nonInfluencingFilters.push("курс")
        }
        if (influencingFilters['courseDirection']!=null){
            influencingFilters['courseDirection']=null
            nonInfluencingFilters.push("выбранное направление курсов")
        } 
    }
    if (category.includes('Practice')){
        if (influencingFilters['courseDirection']!=null){
            influencingFilters['courseDirection']=null
            nonInfluencingFilters.push("выбранное направление курсов")
        } 
    }
    if (category.includes('Grant')){
        if (influencingFilters['courseDirection']!=null){
            influencingFilters['courseDirection']=null
            nonInfluencingFilters.push("выбранное направление курсов")
        } 
    }

    return [influencingFilters, nonInfluencingFilters]
}

function createConfirmText(influencingFilters, nonInfluencingFilters){
    var response='Будет сформирован документ, соответствующий фильтрам: '
    var responseInfluencingFilters=''
    var nameFilters={'isChecked':'только новые', 'startInterval':'с ', 'finishInterval':'по ',
    'college':'учебное заведение', 'course':'курс',
    'courseDirection':'выбранное направление курсов'}
    for (i = 0;i < Object.keys(influencingFilters).length; i++){
        var key=Object.keys(influencingFilters)[i]
        var value=Object.values(influencingFilters)[i]
        if (key=='isChecked' & value==true){
            responseInfluencingFilters+='\n* '+nameFilters[key]
        }
        else {
            if (value!=null & value!=''){
                responseInfluencingFilters+='\n* '+ nameFilters[key] + ' '
                if (key.includes('Interval')!=true){
                    responseInfluencingFilters+='- '
                }
                if (key!='courseDirection'){
                    responseInfluencingFilters+=value
                }
                else {
                    responseInfluencingFilters+=courseDirectionList[Number(value)+1].textContent
                }
            }   
        }   
    }
    if (responseInfluencingFilters=='') {
        response='Вы не выбрали фильтры влияющие на результат.'
    }
    else {
        response+=responseInfluencingFilters
    }
    if (nonInfluencingFilters.length!=0){
        response+='\n\nСледующие выбранные фильтры НЕ повлияют на результат выборки: ' + nonInfluencingFilters
    }
    response+='\n\nЕсли всё верно, нажмите ОК'
    return response
}

function fileName(id, filters) {
    var currentDate = new Date()
    var fName=currentDate.toJSON().substring(0,10) + "_"
    if (id.includes('/api/University')) {
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
    var nameFilters={'isChecked':'_толькоНовые', 'startInterval':'_с_', 'finishInterval':'_по_',
    'college':'_', 'course':'_курс','courseDirection':'_ВыбранноеНаправлениеКурсов_'}
    for (i = 0;i < Object.values(filters).length; i++){
        var key=Object.keys(filters)[i]
        var value=Object.values(filters)[i]
        if (value!=null & value!=false) {
            fName+=nameFilters[key]
            if (key!='isChecked' & key!='courseDirection'){
                fName+=value
            }
            if (key=='courseDirection'){
                fName+=courseDirectionList[Number(value)+1].textContent
            }

        }
    }
    return fName
}

async function sendRequest(serverURL, fName, filters, id) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('get', serverURL);
    console.log(filters)
    for (i = 0;i < Object.values(filters).length; i++){
        var key=Object.keys(filters)[i]
        var value=Object.values(filters)[i]
        console.log(key, value)
        xhr.setRequestHeader(key, encodeURIComponent(value) )
        
    }
    xhr.setRequestHeader('fileName', encodeURIComponent(fName) )
    xhr.responseType='blob'
    xhr.onload = function() {
        let responseObj = this.response;
        if (id.includes('download')){
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

async function downloadAsFile(data, fName) {
    let a = document.createElement("a");
    a.href = URL.createObjectURL(data);
    a.download = fName;
    a.click(); 
}

