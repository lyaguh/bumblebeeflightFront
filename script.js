
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
		dropdownCssClass : 'bigdrop',
		containerCssClass: 'bigselect',
        ajax: {
          url: 'https://08d6-178-207-91-7.eu.ngrok.io/api/College',
          processResults: function (data) {
            return {
				tags:true,
              results: data
            };
          }
        }
      });
});




const applicationForm = document.forms.application;

var title = document.getElementsByTagName("title")[0].innerHTML

if (title == 'Стажировка' ||title=='Старт карьеры') {
	var fileInput = document.querySelector('input[type="file"]')
	var dropZone = document.getElementById('applicationForm');
	var maxFileSize = 3000000;
	var listOfFiles = document.getElementById('listOfFiles')
	var existedFiles = []
}

console.log('https://29ba-178-207-91-7.eu.ngrok.io'+applicationForm.action.slice(6))
function sendForm() {
	const urlToBack = 'https://08d6-178-207-91-7.eu.ngrok.io'
	// prompt('Введите URL до эндпоинта');
	
	const xhr = new XMLHttpRequest();
	xhr.open('POST', urlToBack + applicationForm.action.slice(6));

	// xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	xhr.onload = () => {
		if (xhr.status == 200) {
			//document.getElementById('formLabel').innerText = `Cработало)`;
			alert('Заявка отправлена')
		}
	}
	xhr.onerror = () => {
		if (xhr.status >= 300) {
			//document.getElementById('formLabel').innerText = `Не сработало(${xhr.status}`
			alert('Произошла ошибка!')
		}
	}

	let formData = new FormData(applicationForm);
	xhr.send(formData);

}

// при отправке формы
applicationForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (title == 'Стажировка' ||title=='Старт карьеры') {
		if(fileInput.files.length < 5){

		
		var forgottenFiles = []
		for (var forgottenFile of nameOfFile) {
			var checkingName = false
			for (var attachedFile of fileInput.files) {
				if (attachedFile.name.toLowerCase().includes(forgottenFile.toLowerCase())) {
					checkingName = true

				}
			}
			if (checkingName == false) {
				forgottenFiles.push(forgottenFile)
			}
		}

		alert(`Вы забыли прикрепить следующие файлы: ${forgottenFiles.join(', ')}.`)

	}
		else{
			sendForm();
			applicationForm.reset();
			existedFiles=[]
			while (listOfFiles.firstChild) {
				listOfFiles.removeChild(listOfFiles.firstChild);
			}
		}
		
	
	} else {
		sendForm();
		applicationForm.reset();		
	}


});




if (title == 'Стажировка' ||title=='Старт карьеры') {
		// Прикрепление файлов

	fileInput.onchange = function () {
		if (this.value) {
			attachingFiles(this.files)
		} else {
			document.getElementById('labelCv').innerHTML = 'Или выберите их здесь'
		}
	}

	if (typeof (window.FileReader) == 'undefined') {
		dropZone.text('Не поддерживается браузером!');
		dropZone.addClass('error');
	}
		dropZone.ondragover = function (e) {
		dropZone.classList.add('hover');
		return false;
	};

	dropZone.ondragleave = function () {
		dropZone.classList.remove('hover');
		return false;
	};


	dropZone.ondrop = function (event) {
		event.preventDefault();
		dropZone.classList.remove('hover');
		dropZone.classList.add('drop');
		attachingFiles(event.dataTransfer.files)

	};
	if (title == 'Стажировка') 
		{var nameOfFile = ['ИНН', 'Паспорт', 'СНИЛС', 'Анкета', 'Резюме']}
	else
		{var nameOfFile = ['ИНН', 'Паспорт', 'СНИЛС', 'Анкета', 'Соглашение']}

}


function attachingFiles(attachedFilesDT) {
	var attachedFiles = Array.from(attachedFilesDT);
	while (listOfFiles.firstChild) {
		listOfFiles.removeChild(listOfFiles.firstChild);
	}

	var typeOfFile = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/pdf', 'application/msword'
	]

	var correctAttachedFiles = []
	for (var i = 0; i < attachedFiles.length; ++i) {
		if ((typeOfFile.includes(attachedFiles[i].type) == true) & (attachedFiles[i].size < maxFileSize)) {
			correctAttachedFiles.push(attachedFiles[i])
		} else {
			if (attachedFiles[i].size > maxFileSize) {
				alert('Файл ' + attachedFiles[i].name + ' слишком большой!');
				//dropZone.classList.add('error');
				return false;
			}
		}

	}
	attachedFiles = correctAttachedFiles

	var newFilesArray = existedFiles.concat(attachedFiles).unique();;
	var newFilesDT = new DataTransfer()
	for (i = 0; i < Math.min(newFilesArray.length, 5); i++) {
		newFilesDT.items.add(newFilesArray[i])
	}
	fileInput.files = newFilesDT.files
	for (var currentFile of fileInput.files) {
		let liNew = document.createElement('li');
		liNew.innerHTML += `<div style="display:flex;margin: 0"><p style="width:90%;margin: 0">${currentFile.name}</p>
    <svg style="width:20px;height:20px; cursor:pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
</div>`
		listOfFiles.append(liNew)

	}

	for (var li of listOfFiles.querySelectorAll('svg')) {
		li.addEventListener('click', (event) => {
			event.currentTarget.parentElement.parentElement.remove()
			var attachedFilesForLi = Array.from(fileInput.files);
			var newFilesDTForLi = new DataTransfer()
			for (i = 0; i < attachedFilesForLi.length; i++) {
				if (event.currentTarget.parentElement.firstChild.textContent != attachedFilesForLi[i].name) {
					newFilesDTForLi.items.add(attachedFilesForLi[i])
				}
			}
			fileInput.files = newFilesDTForLi.files
			existedFiles = Array.from(fileInput.files)
		})

	}
	existedFiles = Array.from(fileInput.files)
}


Array.prototype.unique = function () {
	var a = this.concat();
	for (var i = 0; i < a.length; ++i) {

		var currentFileName = ''
		for (var k = 0; k < nameOfFile.length; ++k) {
			if (a[i].name.toLowerCase().includes(nameOfFile[k].toLowerCase())) {
				currentFileName = nameOfFile[k]
			}
		}
		if (currentFileName != '') {
			for (var j = i + 1; j < a.length; ++j) {
				if (a[j].name.toLowerCase().includes(currentFileName.toLowerCase())) {
					a.splice(j--, 1);
				}
			}
		} else {
			a.splice(i--, 1)
		}
	}

	return a;
};


$(document).ready(function() {
	$('#courseDirection').select2({
		placeholder: "Направление учебных курсов",
		maximumSelectionLength: 5,
		language: "ru"
	});
});

