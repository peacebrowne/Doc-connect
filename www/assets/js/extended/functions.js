const URL = "https://docconnect2022.herokuapp.com";
let userID = localStorage.getItem('userID')

const docs_div = document.getElementById('ladning-page-friends');
const patienceMessage_div = document.getElementById('doc-landing-page');
let is_loggedin = false;
// const profile = document.getElementById("profile_img")

function textDecoration() {
	// getting and displaying user image profile image from database
	makeAPIPostRequest(`${URL}/api/getProfileImage`, {userId:localStorage.getItem('userID')})
	.then(data => {
		// document.getElementById("profile_img").src = data[0][0].profile_pic
		let img = localStorage.getItem('profile-pic')
		let profile_pic = document.getElementById("profile_img");
		profile_pic.src = img

		// sidebarProfileImg
		document.getElementById("sidebarProfileImg").src = img
		document.getElementById("icons").style = "color:rgba(201,0,40,255)";
		// doctor or patience view
		// location.replace("index.html");
		display_patientView();
	
	});
	
   
}

function textDecorationForStudent() {
	// getting and displaying user image profile image from database
	makeAPIPostRequest(`${URL}/api/getProfileImages`, {userId:localStorage.getItem('userID')})
	.then(data => {
		document.getElementById("profile_img").src = data[0][0].profile_pic
		// sidebarProfileImg
		document.getElementById("sidebarProfileImg").src = data[0][0].profile_pic
		document.getElementById("icons").style = "color:rgba(201,0,40,255)";
		// doctor or patience view
		// location.replace("index.html");
		display_patientView();
	
	});
	
   
}

// On load of the doctor.html file
function textDecoration2() {
	// getting and displaying user image profile image from database
	makeAPIPostRequest(`${URL}/api/getProfileImage`, {userId:localStorage.getItem('userID')})
	.then(data => {
		document.getElementById("profile_img").src = data[0][0].profile_pic
		// sidebarProfileImg
		document.getElementById("sidebarProfileImg").src = data[0][0].profile_pic
		document.getElementById("icons").style = "color:rgba(201,0,40,255)";
		// doctor or patience view
		// location.replace("index.html");
	
		// display_doctorView();
	
	});
	
}
const redirectUser = (status) => {
    let file_name = window.location.pathname.split('/');
    is_loggedin = status;

    if (!is_loggedin && !file_name.includes('login.html')) {
        window.location.href = "login.html";
    } else if (is_loggedin && file_name.includes('login.html')) {
        window.location.href = "index.html";
    }
}

const hideLoader = (ele) => {
    document.querySelector(ele).style = "display: none";
}

const showLoader = (ele) => {
    document.querySelector(ele).style = "display: block";
}

const makeAPIPostRequest = async(url, data_to_send) => {
    return await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data_to_send)
        })
        .then(response => response.json())
        .then(data => data)
       
		.catch(err => err.message)
}

const makeAPIGetRequest = async(url) => {
    return await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err.message)
}

const makeAPIPostRequestForLogin = async(url, data_to_send) => {
    return await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data_to_send)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err.message)
}



const changeNetworkStatusIcon = () => {
    // let check_network_interval = setInterval(() => changeNetworkStatusIcon(), 5000);

    let file_name = window.location.pathname.split('/');

    if (!file_name.includes('login.html')) {
        if (checkNetworkStatus()) {
            hideElement('#offline-wifi-icon');
            showElement('#online-wifi-icon');
        } else {
            hideElement('#online-wifi-icon');
            showElement('#offline-wifi-icon');
        }

        // clearInterval(check_network_interval);
    }
    changeNetworkStatusIcon();
}

const checkNetworkStatus = () => navigator.onLine ? true : false;

// changeNetworkStatusIcon();

const goBack = () => {
    alert(previous_section);

    if (previous_section) {
        hideElement(current_section);
        showElement(previous_section);
        previous_section = "";
    } else {
        navigator.app.exitApp();
    }
}

// loging user in base on various state
function loggingUser(data){
	// user skip profile upload
	if(data === "skip"){
		makeAPIPostRequest(`${URL}/api/saveImagePath`, { pictureUrl: "https://doc-connect.s3.us-east-2.amazonaws.com/avater.png", userid:localStorage.getItem('userID')})
		.then(data => {
			// document.getElementById("profile_img").src = "https://doc-connect.s3.us-east-2.amazonaws.com/avater.png"; 
			// doctor or patience view
		
            if (localStorage.getItem('role') === "Doctor") {
                location.replace("doctor.html")
                
            }else {
                // display_patientView()
                location.replace("index.html")
            }
    
			
		});
						
	}else if(data === "true"){
		// get user profile image
		makeAPIPostRequest(`${URL}/api/getProfileImage`, {userid:localStorage.getItem('userID')})
		.then(data => {
			
			if (localStorage.getItem('role') === "Doctor") {
				location.replace("doctor.html")
				
			}else {
				location.replace("index.html")
			}
		});
		
		
	}
	
}


let doc_friends = document.getElementById('friends')
let last_msg = [];
let friends;
let messages;
let profile_pic;
let all_friends; 

function getFriends(){

    // get all users 
    makeAPIGetRequest(`${URL}/api/get_users`)
    .then(data => {
         
        friends = data[0];
        // then get all messages
         makeAPIGetRequest(`${URL}/api/getMessage`)
         .then(msg => {
             
            // then reverse messages from last to first
             messages = msg[0].reverse()

             // get all student from the database.
             makeAPIGetRequest(`${URL}/api/getStudents`)
             .then(std => {

                all_friends = [...friends,std[0]].flat()
                get_users_messages(all_friends,messages)
                 
             })
             
         })
    })

}

getFriends()


// Getting all doc friends from friend list
function get_users_messages (friends,messages){
    

    // get doc ID.
    let userID = localStorage.getItem('userID')

    // iterate through friend list for only current user friends
    for(const friend of friends){

        // get either patient ID / student ID
        let friendID = friend.ID || friend.studentID;
		
        // return only the conversation between current user and friends 
        let message = messages.find(msg => msg.to_user == userID && msg.userId == friendID || msg.to_user == friendID && msg.from_user == userID)

        // if message is not undefined then message is for doctor
        if(message != undefined){

           if(friend.roles === 'ordinary' || friend.roles == 'Doctor'){

                message.profile_pic = friend.profile_pic
                message.name = `${friend.first_Name} ${friend.last_Name}`
                last_msg.push(message)

           }
           else{

                message.profile_pic = friend.image
                message.name = `${friend.first_name} ${friend.last_name}`
                last_msg.push(message)

           }
        }
    }
    
    // pass all doc friends for sortting
    sort_messages(last_msg)
    let all_Doc_friends = document.querySelectorAll('.frd')
    chatBox(all_Doc_friends)
}


// sort messages based on message ID
let sort_messages = msg =>{

    // sort messages by highest message ID.
    let sortedMsg = msg.sort((msg1,msg2) => msg2.messageID - msg1.messageID)

    // pass messages for validating long message and getting message time
    validate_message_and_time(sortedMsg)

}


let validate_message_and_time = messages =>{

    messages.forEach(msg => {
        
        // validate if a message is very long
        let reducedMsg = reduced_message(msg.message)

        // validate to get message time
        let messageTime = message_time(msg.sendDate)

        msg.message = reducedMsg;
        msg.time = messageTime;
        display_user_message(msg)

    })

}

// display lastest incoming doc messages from friends
let display_user_message = friend =>{
    let friend_div = document.createElement('div')
    friend_div.classList.add('friend')
    friend_div.classList.add('frd')
    let info;

    if(friend.from_user === userID){
        info = `
        <img src="${friend.profile_pic}" />
        <div class="doc-flow">
            <div class="doc-flow-items doc-names">
                <strong class="doc-name">${friend.name}</strong>
            <strong class="doc-specs" style="font-weight: light; color: gray;">${friend.message}</strong> 
            </div>
        </div>
        <span id="docId" style="display:none">${friend.to_user}</span>
        <span class="messageID" style="display:none">${friend.messageID}</span>
        <div class="message-time">${friend.time}</div>
        `
    }else{

        info = `
        <img src="${friend.profile_pic}" />
        <div class="doc-flow">
            <div class="doc-flow-items doc-names">
                <strong class="doc-name">${friend.name}</strong>
            <strong class="doc-specs" style="font-weight: light; color: gray;">${friend.message}</strong> 
            </div>
        </div>
        <span id="docId" style="display:none">${friend.from_user}</span>
        <span class="messageID" style="display:none">${friend.messageID}</span>
        <div class="message-time">${friend.time}</div>
        `
    }

    setTimeout(()=>{
          
        friend_div.innerHTML = info;
        doc_friends.appendChild(friend_div)
        
    },1000)
 
}


// reducing message if words are longer than 10.
let reduced_message = mg =>{

    // convert message to an array
    let message = Array.of(mg);
    let reducedMessage = message.flatMap(msg => msg.split(' '))

    // check if message length is greater the 10
    if(reducedMessage.length > 10){

        return `${reducedMessage.slice(0, 10).join(' ')}...`

    }else{
        return mg;
    }

}


// getting message time
let message_time = time =>{

    let date = time.substring(14,19)
    return date

}

let chat_friend_id;
let chat_friend_pic;
let chat_friend_name;
let user_Id;

let picture = document.querySelector('#doc-img img')
let friend_name = document.querySelector('#name #doc-name')

// opening chat box between doctor and friend
let chatBox = doc_friends =>{

    doc_friends.forEach(friend => {

        friend.addEventListener('click', () => {

            chat_friend_id = friend.children[2].textContent;
            chat_friend_pic = friend.children[0].src;
            chat_friend_name = friend.children[1].children[0].children[0].textContent
            user_Id = localStorage.getItem('userID')

            hideElement('#landing-page-header')
            hideElement('#landing-page-main')
            hideElement('#landing-page-footer')
            showElement('#doc-conversation')

            friend_name.textContent = chat_friend_name;
            picture.src = chat_friend_pic;
            
            getUsersId(chat_friend_id,user_Id,chat_friend_pic,localStorage.getItem('user-name'))
            displayPreviousConversation(chat_friend_id,user_Id,chat_friend_pic)
        })


    })

}



// displaying lastest message to the top of the screen.

function insertNewMessageBefor(data){
    let new_msg = data;

    // check if new message from db is for user
    if(new_msg.to_user === userID){

        // if true, get all doctor friends that've sent message
        let allFriends = document.querySelectorAll('.friend #docId')
        let doc_id = Array.from(allFriends).find(id => id.textContent === new_msg.from_user)

        if(doc_id != undefined){
            
            let parentDiv = doc_id.parentElement;
            let resetMsg = parentDiv.children[1].lastElementChild.children[1];
            resetMsg.textContent = new_msg.message;
            let first_friend = parentDiv.parentElement.children[0]
            parentDiv.parentElement.insertBefore(parentDiv,first_friend)
    
        }else{
            add_new_friend(data)
        }
        
    }
    
}


let add_new_friend = friend =>{
    let friend_div = document.createElement('div')
    friend_div.classList.add('friend')
    friend_div.classList.add('frd')
    let info;
    let time = friend.time.substring(3,8)

    if(friend.from_user === userID){
        info = `
        <img src="${friend.profile_pic}" />
        <div class="doc-flow">
            <div class="doc-flow-items doc-names">
                <strong class="doc-name">${friend.name}</strong>
            <strong class="doc-specs" style="font-weight: light; color: gray;">${friend.message}</strong> 
            </div>
        </div>
        <span id="docId" style="display:none">${friend.to_user}</span>
        <span class="messageID" style="display:none"></span>
        <div class="message-time">${time}</div>
        `
    }else{

        info = `
        <img src="${friend.profile_pic}" />
        <div class="doc-flow">
            <div class="doc-flow-items doc-names">
                <strong class="doc-name">${friend.name}</strong>
            <strong class="doc-specs" style="font-weight: light; color: gray;">${friend.message}</strong> 
            </div>
        </div>
        <span id="docId" style="display:none">${friend.from_user}</span>
        <span class="messageID" style="display:none"></span>
        <div class="message-time">${time}</div>
        `
    }

    setTimeout(()=>{

        friend_div.innerHTML = info;
        doc_friends.insertAdjacentElement('afterbegin',friend_div)
        
    },1000)

}



function checkArray(datas, sender_id){
	for(let a = 0; a < createdSender.length; a++){
		if (createdSender[a] === datas){
		}else{
		
			makeAPIPostRequestForLogin(`${URL}/api/unique_user`, { unique_userID: sender_id})
			.then(data => {
			
			let showDocs = document.createElement('div')
			showDocs.classList.add("friend")
	
			let print = `
				<img src="${data[0][0].profile_pic}" />
				
				<div class="doc-flow">
					<div class="doc-flow-items doc-names">
						<strong class="doc-name">${data[0][0].first_Name} ${data[0][0].last_Name}</strong>
						<strong class="doc-specs" style="color:#000;"><b>You have a New Message</b></strong> 
					</div>
					
				</div>
				<span style="display:none">${data[0][0].ID}</span>
							
			`
		
			showDocs.innerHTML = print;
			docs_div.insertBefore(docs_div.children[0],showDocs)
			
			})	
			
		}
		
	}
}

let user_profile

// fnx opens chats transaction between
// user and friend

var openChat =[];

let profile_img ;
// fnx that display previous conversation between user and friends
const conversations = document.getElementById('charts')
function displayPreviousConversation(receiverId,senderId,profilePic, ){
	conversations.replaceChildren()

	// checking if there's a previous conversation between the user and friend

	makeAPIGetRequest(`${URL}/api/getMessage`)
	.then(data => {
		let messages = data[0];
		// iterating through the messages to get user and current friend message
		
		messages.forEach((message)=>{

		// checking if the current message from friend to user
			if(message.from_user === senderId && message.to_user === receiverId){
				let receivedDiv = document.createElement('div')
				receivedDiv.classList.add('user-response')

                if(message.message == ''){
                    receivedDiv.innerHTML = `<div class="response" style="padding: 7px 10px; width: 50px; height: 30px;">
                    <span>
                    </span>
                    </div>`
                }else{
                    receivedDiv.innerHTML = `<div class="response">
                    <span>
                        ${message.message}
                    </span>
                    </div>`
                }

			    conversations.appendChild(receivedDiv)

			}

		// else, check if current message is from user to friend
			else if (message.to_user === senderId & message.from_user === receiverId){
				let sendDiv = document.createElement('div')
					sendDiv.classList.add('user-text')

					if(message.message == ''){
						sendDiv.innerHTML = `<div class="incoming-img">
						<img src="${profilePic}" width="50px" height="50px" style="border-radius: 50px;"  alt="">
						</div>
						<div class="message" style="padding: 7px 10px; width: 50px; height: 30px;">
							<span>
								
							</span>
						</div>`
					}else{
						sendDiv.innerHTML = `<div class="incoming-img">
						<img src="${profilePic}" width="50px" height="50px" style="border-radius: 50px;"  alt="">
						</div>
						<div class="message">
							<span>
								${message.message}
							</span>
						</div>`
					}

				conversations.appendChild(sendDiv)
			}
			
		})
	})
   
}

function removeUserFromSession() {
    localStorage.removeItem('userID');
	localStorage.removeItem('roles');
    localStorage.removeItem('username');
    redirectUser(false)
}

function home(){
	openChat = []
	location.replace("index.html");
}

function doctorHome(){
	openChat = []
	location.replace("doctor.html");
}