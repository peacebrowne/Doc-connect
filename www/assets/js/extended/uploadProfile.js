var upload = document.querySelector('#drop_zone')

let result = document.querySelector('.result')

var save = document.querySelector('.save')
var skip = document.querySelector('.skip')
var skipingSection = document.querySelector('.skipingSection')
var img_w = document.querySelector('.img-w')
var options = document.querySelector('.options')
var cropper = '';
var cropped = document.querySelector('.cropped');


const fileInput = document.getElementById('drop_zone');
const inputKey = fileInput.getAttribute('name')

// skip the uploading image section

document.getElementById('skipIt').addEventListener('click', e => {
	// loggingUser("skip");
	localStorage.setItem('user-first-login','skip')
	location.replace("intro.html")
	
});

upload.addEventListener('change', (e) => {
	if (e.target.files.length) {
		  // start file reader
	  const reader = new FileReader();
	  reader.onload = (e)=> {
		if(e.target.result){
				  // create new image
				  let img = document.createElement('img');
				  img.id = 'image';
				  img.src = e.target.result
				  console.log(img)
				 
				  // clean result before
				  result.innerHTML = '';
				  // append new image
		  		result.appendChild(img);
				  // show save btn and options
				//  skipingSection.classList.add('hide')
				  save.classList.remove('hide');
				  skip.classList.remove('hide');
				//   options.classList.remove('hide');
				  skipingSection.classList.add('hide');
				  // init cropper
				//   cropper = new Cropper(img);

				
		}
	  };
	  reader.readAsDataURL(e.target.files[0]);
	}
  });

const userIDs =localStorage.getItem('userID');


//  On click of save Profile picture button
document.getElementById('saveProfilePic').addEventListener('click', e => {
const imageUploaded = document.getElementById('drop_zone').files;
const file = imageUploaded[0];
		// console.log(imageUploaded)
		if(file == null){
			return alert('No file selected.');
		  }
		//   console.log(file)

		  getSignedRequest(file);
});


function getSignedRequest(file){
	showLoader("#loader-cover");
    showLoader(".loader2");

	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://docconnect2022.herokuapp.com/api/uploadImage?file-name=${file.name}&file-type=${file.type}`);
	xhr.onreadystatechange = () => {
	  if(xhr.readyState === 4){
		if(xhr.status === 200){
		  const response = JSON.parse(xhr.responseText);	  
		//   console.log(xhr);
		//   console.log(file);
		  uploadFile(file, response.signedRequest, response.url);
		}
		else{
		  alert('Could not get signed URL.');
		}
	  }
	};
	xhr.send();
  }
  
  function uploadFile(file, signedRequest, url){
	const xhr = new XMLHttpRequest();
	xhr.open('PUT', signedRequest);
	xhr.onreadystatechange = () => {
	  if(xhr.readyState === 4){
		console.log(xhr)
		if(xhr.status === 200){
		  console.log(url)
		  document.getElementById('image').src = url;
		  hideLoader("#loader-cover");
		  hideLoader(".loader2");
		  console.log("it's done");
		//   add user image path to the database
		makeAPIPostRequest(`${URL}/api/saveImagePath`, { pictureUrl: url, userid:localStorage.getItem('userID')})
		.then(data => {
			localStorage.setItem('user-first-login','true')
			location.replace("intro.html")
			loggingUser("true");
				
		});
		//   document.getElementById('avatar-url').value = url;
		}
		else{
		  alert('Could not upload file.');
		}
	  }
	};
	xhr.send(file);
  }
		
			
