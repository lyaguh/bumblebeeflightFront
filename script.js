const applicationForm = document.forms.application;

function sendForm() {
	const urlToBack = 'https://0b9c-178-207-91-7.eu.ngrok.io/api/probation'
	// prompt('Введите URL до эндпоинта');
	const xhr = new XMLHttpRequest();
	xhr.open('POST', urlToBack + applicationForm.action);

	// xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	xhr.onload = () => {
		if (xhr.status == 200) {
			document.getElementById('formLabel').innerText = `Cработало)`;
		}
	}
	xhr.onerror = () => {
		if (xhr.status >= 300) {
			document.getElementById('formLabel').innerText = `Не сработало(${xhr.status}`
		}
	}

	let formData = new FormData(applicationForm);


	const response = xhr.response
	console.log(response)
	xhr.send(formData);
	
}

// при отправке формы
applicationForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (fileInput.files.length<5){
		alert(`Прикреплено файлов: ${fileInput.files.length}, а нужно 5(`)
	}
	sendForm();
});


// Прикрепление файлов



var fileInput = document.querySelector('input[type="file"]')

fileInput.onchange = function () {
	if (this.value) {
		console.log(this.files)
		attachingFiles(this.files)
	} else {
		document.getElementById('labelCv').innerHTML = 'Или выберите их здесь'
	}
}


var dropZone = document.getElementById('applicationForm');
var maxFileSize = 1000000;

if (typeof (window.FileReader) == 'undefined') {
	dropZone.text('Не поддерживается браузером!');
	dropZone.addClass('error');
}

dropZone.ondragover = function (e) {
	console.log(e.currentTarget.id)
	dropZone.classList.add('hover');
	return false;
};

dropZone.ondragleave = function () {
	dropZone.classList.remove('hover');
	return false;
};

var listOfFiles = document.getElementById('listOfFiles')
dropZone.ondrop = function (event) {
	event.preventDefault();
	dropZone.classList.remove('hover');
	dropZone.classList.add('drop');

	attachingFiles(event.dataTransfer.files)

};

function attachingFiles(attachedFilesDT) {
	console.log('attach',attachedFilesDT)
	var attachedFiles = Array.from(attachedFilesDT);
	console.log('files',attachedFiles)

	while (listOfFiles.firstChild) {
		listOfFiles.removeChild(listOfFiles.firstChild);
	}

	var typeOfFile = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/pdf', 'application/msword'
	]




	var correctAttachedFiles=[]
	for (var i = 0; i < attachedFiles.length; ++i) {
		if ((typeOfFile.includes(attachedFiles[i].type) == true) & (attachedFiles[i].size < maxFileSize)) {
			correctAttachedFiles.push(attachedFiles[i])
		} else {
			console.log(attachedFiles[i].type)
			if (attachedFiles[i].size > maxFileSize) {
			dropZone.innerText = ('Файл '+attachedFiles[i].name+' слишком большой!');
			dropZone.classList.add('error');
			return false;
		}
		}
		
	}
	attachedFiles=correctAttachedFiles

	var newFilesArray = existedFiles.concat(attachedFiles).unique();;
	var newFilesDT = new DataTransfer()
	for (i = 0; i < Math.min(newFilesArray.length, 5); i++) {
		newFilesDT.items.add(newFilesArray[i])
	}
	fileInput.files = newFilesDT.files
	console.log('input',fileInput.files)

	for (var currentFile of fileInput.files) {
		let liNew = document.createElement('li');
		//liNew.innerHTML = ;
		liNew.innerHTML += `<div style="display:flex;margin: 0"><p style="width:90%;margin: 0">${currentFile.name}</p>
		<img src="./img/w0kcCuCiO7c.png" alt="deleteFile" title="Открепить файл" style="width:40px;height:40px; cursor:pointer">  </div>`
		listOfFiles.append(liNew)
		
	}

	for (var li of listOfFiles.querySelectorAll('img')){
		li.addEventListener('click',(event)=>{
			event.currentTarget.parentElement.parentElement.remove()
			var attachedFilesForLi = Array.from(fileInput.files);
			var newFilesDTForLi = new DataTransfer()
			for (i = 0; i < attachedFilesForLi.length; i++) {
				console.log(event.currentTarget.parentElement.firstChild.textContent, attachedFilesForLi[i])
				if(event.currentTarget.parentElement.firstChild.textContent!=attachedFilesForLi[i].name)
				{newFilesDTForLi.items.add(attachedFilesForLi[i])}
			}
			fileInput.files = newFilesDTForLi.files
			console.log('шмель, блять',fileInput.files)
		})

	}

	existedFiles = Array.from(fileInput.files)
}
var existedFiles = Array.from(fileInput.files)

var nameOfFile=['инн','паспорт','снилс','анкета','соглашение','резюме']


Array.prototype.unique = function () {
	var a = this.concat();
	for (var i = 0; i < a.length; ++i) {
		
		var currentFileName=''
		for (var k=0;  k<nameOfFile.length; ++k)
		{
			console.log('ыыыыыыыыыыыыыыыыы',a[i].name.toLowerCase())
			if (a[i].name.toLowerCase().includes(nameOfFile[k])){
				
				currentFileName=nameOfFile[k]
			}
		
	}
	if (currentFileName!='') {
		for (var j = i + 1; j < a.length; ++j) {
			if (a[j].name.toLowerCase().includes(currentFileName)) {
				a.splice(j--, 1);
			}
		}
	}
	else {
		a.splice(i--, 1)
	}
	}

	return a;
};