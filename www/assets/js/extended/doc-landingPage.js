const doc_sendMg_btn = document.querySelector('#footer #send-message button');
const doc_message = document.querySelector('#footer #type-message input');
// let userID = localStorage.getItem('userID')

// let search_anything = document.querySelector('#allSearch input')

document.querySelector("#tab-head-chat").addEventListener('click', (e) => {
    let name = 'Chat'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#home-page";
    current_weigh_tab_head = "#tab-head-chat";
    document.getElementById("footerChatText").style.color = "#000";
    showElement(current_weigh_section);
    showElement("#filter-search")
    showElement('#landing-page-header')
    setAsActive(current_weigh_tab_head);
    showElement('#schedule-appointment')
})

document.querySelector("#tab-head-posts").addEventListener('click', () => {
    let name = 'Hospital'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
    hideElement("#filter-search")
    hideElement("#landing-page-header")
    document.getElementById("icons").style.color = null;
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#hospitals";
    current_weigh_tab_head = "#tab-head-posts";
    document.getElementById("footerHospitalText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
})

document.querySelector("#tab-head-calls").addEventListener('click', () => {
    let name = 'Order Medicine'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    hideElement("#filter-search")
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#calls";
    current_weigh_tab_head = "#tab-head-calls";
    document.getElementById("footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')
    showElement('#schedule-appointment')
})

document.querySelector("#tab-head-other-doctors").addEventListener('click', () => {
    let name = 'Other Doctors'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    showElement("#filter-search")
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#Other-doctors";
    current_weigh_tab_head = "#tab-head-other-doctors";
    document.querySelector("#tab-head-other-doctors #footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')
})

document.querySelector("#tab-head-notification").addEventListener('click', () => {
    let name = 'Notification'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    showElement("#filter-search")
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#notification";
    current_weigh_tab_head = "#tab-head-notification";
    document.querySelector("#tab-head-notification #footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')
})

function removeUserFromSession() {
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    redirectUser(false)
}

// let doc_friends = document.getElementById('friends')
// let last_msg = [];
// let friends;
// let messages;
// let profile_pic;
// let all_friends; 

// function getDocData(){

//     // get all users 
//     makeAPIGetRequest(`${URL}/api/get_users`)
//     .then(data => {
         
//         friends = data[0];
//         // then get all messages
//          makeAPIGetRequest(`${URL}/api/getMessage`)
//          .then(msg => {
             
//             // then reverse messages from last to first
//              messages = msg[0].reverse()

//              // get all student from the database.
//              makeAPIGetRequest(`${URL}/api/getStudents`)
//              .then(std => {

//                 all_friends = [...friends,std[0]].flat()
//                 get_users_messages(all_friends,messages)
                 
//              })
             
//          })
//     })

// }

// getDocData()


// // Getting all doc friends from friend list
// function get_users_messages (friends,messages){
    

//     // get doc ID.
//     let userID = localStorage.getItem('userID')

//     // iterate through friend list for only doc friends
//     for(const friend of friends){

//         // get either patient ID / student ID
//         let friendID = friend.ID || friend.studentID;

//         // return only the conversation between the doctor and current friend
//         let message = messages.find(msg => msg.to_user == userID && msg.userId == friendID || msg.to_user == friendID && msg.from_user == userID)

//         // if message is not undefined then message is for doctor
//         if(message != undefined){

//            if(friend.roles === 'ordinary' || friend.roles == 'Doctor'){

//                 message.profile_pic = friend.profile_pic
//                 message.name = `${friend.first_Name} ${friend.last_Name}`
//                 last_msg.push(message)

//            }
//            else{

//                 message.profile_pic = friend.image
//                 message.name = `${friend.first_name} ${friend.last_name}`
//                 last_msg.push(message)

//            }
//         }
//     }
    
//     // pass all doc friends for sortting
//     sort_msg(last_msg)
//     let all_Doc_friends = document.querySelectorAll('.frd')
//     chatBox(all_Doc_friends)
// }


// // sort messages based on message ID
// let sort_msg = msg =>{

//     // sort messages by highest message ID.
//     let sortedMsg = msg.sort((msg1,msg2) => msg2.messageID - msg1.messageID)

//     // pass messages for validating long message and getting message time
//     validate_message_and_time(sortedMsg)

// }


// let validate_message_and_time = messages =>{

//     messages.forEach(msg => {
        
//         // validate if a message is very long
//         let reducedMsg = reduced_message(msg.message)

//         // validate to get message time
//         let messageTime = message_time(msg.sendDate)

//         msg.message = reducedMsg;
//         msg.time = messageTime;
//         display_user_message(msg)

//     })

// }

// // display lastest incoming doc messages
// let display_user_message = friend =>{
//     console.log(friend)

//     let friend_div = document.createElement('div')
//     friend_div.classList.add('friend')
//     friend_div.classList.add('frd')
//     let info;

//     if(friend.from_user === userID){
//         info = `
//         <img src="${friend.profile_pic}" />
//         <div class="doc-flow">
//             <div class="doc-flow-items doc-names">
//                 <strong class="doc-name">${friend.name}</strong>
//             <strong class="doc-specs">${friend.message}</strong> 
//             </div>
//         </div>
//         <span id="docId" style="display:none">${friend.to_user}</span>
//         <span class="messageID" style="display:none">${friend.messageID}</span>
//         <div class="message-time">${friend.time}</div>
//         `
//     }else{

//         info = `
//         <img src="${friend.profile_pic}" />
//         <div class="doc-flow">
//             <div class="doc-flow-items doc-names">
//                 <strong class="doc-name">${friend.name}</strong>
//             <strong class="doc-specs">${friend.message}</strong> 
//             </div>
//         </div>
//         <span id="docId" style="display:none">${friend.from_user}</span>
//         <span class="messageID" style="display:none">${friend.messageID}</span>
//         <div class="message-time">${friend.time}</div>
//         `
//     }

    
//     friend_div.innerHTML = info;
//     doc_friends.appendChild(friend_div)

    
    
// }


// // reducing message if words are longer than 10.
// let reduced_message = mg =>{

//     // convert message to an array
//     let message = Array.of(mg);
//     let reducedMessage = message.flatMap(msg => msg.split(' '))

//     // check if message length is greater the 10
//     if(reducedMessage.length > 10){

//         return `${reducedMessage.slice(0, 10).join(' ')}...`

//     }else{
//         return mg;
//     }

// }


// // getting message time
// let message_time = time =>{

//     let date = time.substring(14,19)
//     return date

// }

// let chat_friend_id;
// let chat_friend_pic;
// let chat_friend_name;
// let user_Id;

// let picture = document.querySelector('#doc-img img')
// let friend_name = document.querySelector('#name #doc-name')

// // opening chat box between doctor and friend
// let chatBox = doc_friends =>{

//     doc_friends.forEach(friend => {

//         friend.addEventListener('click', () => {

//             chat_friend_id = friend.children[2].textContent;
//             chat_friend_pic = friend.children[0].src;
//             chat_friend_name = friend.children[1].children[0].children[0].textContent
//             user_Id = localStorage.getItem('userID')

//             hideElement('#landing-page-header')
//             hideElement('#landing-page-main')
//             hideElement('#landing-page-footer')
//             showElement('#doc-conversation')

//             friend_name.textContent = chat_friend_name;
//             picture.src = chat_friend_pic;
            
//             getUsersId(chat_friend_id,user_Id,chat_friend_pic)
//             displayPreviousConversation(chat_friend_id,user_Id,chat_friend_pic)
//         })


//     })

// }



// // displaying lastest message to the top of the screen.

// function insertNewMessageBefor(data){

//     let new_msg = data;

//     // check if new message from db is for user
//     if(new_msg.toUser === userID){

//         // if true, get all doctor friends that've sent message
//         let allFriends = document.querySelectorAll('.friend #docId')
//         let doc_id = Array.from(allFriends).find(id => id.textContent === new_msg.fromUser)

//         if(doc_id != undefined){
            
//             let parentDiv = doc_id.parentElement;
//             let resetMsg = parentDiv.children[1].lastElementChild.children[1];
//             resetMsg.textContent = new_msg.messages;
//             let first_friend = parentDiv.parentElement.children[0]
//             parentDiv.parentElement.insertBefore(parentDiv,first_friend)
    
//         }else{
//             console.log(allFriends)
//             console.log(new_msg)
//         }
        
//     }
    
// }

// let addFriend = friend =>{
//     let friend_id = friend.userId;

//     makeAPIGetRequest(`${URL}/api/get_users`)
//     .then(data => {
//         let frd = data[0].find(d => d.ID === friend_id)
//         frd = frd

//         friend.profile_pic = frd.profile_pic
//         friend.name = `${frd.first_Name} ${frd.last_Name}`
//         friend.message = reduced_message(friend.message)
//         friend.time = message_time(friend.sendDate)

//         // display_user_message(friend)
//     })

    
// }


// function insertNewMessageBefor(){
    
    //     // get all messages from db
    //     makeAPIGetRequest(`${URL}/api/getMessage`)
    //     .then(data => {

//         // reverse messages to get the last message in db
//         let msg = data[0].reverse()
//         let new_msg = msg[0];
//         let friendsID = [];

//         // check if new message from db is for user
//         if(new_msg.to_user === userID){

//             // if true, get all doctor friends that've sent message
//             let allFriends = Array.from(doc_friends.children)
            
//             // iterate through doctor friends to get the ID of the new message sender
//             allFriends.forEach(ele => {
//                 let parentDiv = ele;
//                 let doc_id = parentDiv.children[2].textContent;
//                 friendsID.push(doc_id)
//                 // if that friend has already sent a message, change old message with new message
//                 if(new_msg.from_user === doc_id){

//                     let firstEle = parentDiv.parentElement.children[0]
//                     let resetMsg = parentDiv.children[1].lastElementChild.children[1];
//                     // let seenMessage = seen_message(msg)

//                     // if

//                     resetMsg.textContent = new_msg.message
//                     parentDiv.parentElement.insertBefore(parentDiv,firstEle)

//                 }
                   
//             })

//             if(!friendsID.includes(new_msg.from_user)){
//                 // display_user_message(new_msg)
//                  addFriend(new_msg)
//                 // console.log(new_friend)
//             }

            
//         }


//     })
// }


// let newFriend = friend =>{
//     let friend_div = document.createElement('div')
//     friend_div.classList.add('friend')
//     friend_div.classList.add('frd')
//     let info;
// }

let profile_picture = () =>{

    document.querySelectorAll('#profile_img').forEach( img => img.src = localStorage.getItem('profile-pic'))
    
}
profile_picture()

let other_doctors = document.querySelector('#Other-doctors div')

function otherDoc(){
    makeAPIGetRequest(`${URL}/api/get_users`)

	.then(data => {
		for(let i = 0; i < data[0].length; i++){

			let datum = data[0][i];
			
			if(datum.roles === 'Doctor'){

				// landing page Doctors
				let showDocs = document.createElement('div')
				showDocs.classList.add("friend")
				showDocs.setAttribute('id',`doc-${i}`)
				let print = `
								<img src="${datum.profile_pic}" />
								
								<div class="doc-flow">
									<div class="doc-flow-items doc-names">
										<strong class="doc-name">${datum.first_Name} ${datum.last_Name}</strong>
										
									  <strong class="doc-specs">${datum.specialization}</strong> 
									</div>
									<div class="doc-flow-items">
										<strong class="doc-followers">Followers</strong>
										<strong>1200</strong>
									</div>
								</div>
								<span id="docId" style="display:none">${datum.ID}</span>

										`
				showDocs.innerHTML = print;
				other_doctors.appendChild(showDocs)
			}
			
		}
	})
}
otherDoc()


