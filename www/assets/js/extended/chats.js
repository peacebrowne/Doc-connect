let send_message_btn = document.querySelector('#footer #send-message button');
const sending_message = document.querySelector('#footer #type-message input');


let sender;
let receiver;
let userid = localStorage.getItem('userID');
// let studentid = localStorage.getItem('studentID');
let pic;
let frdName;

// let openChat = []

// fnx is getting both current user and friend ID.
function getUsersId(receiverId,senderId,picture,name){
    sender = senderId;
    receiver = receiverId;
    pic = picture
    frdName = name
}

send_message_btn.addEventListener('click',ev =>{
    ev.preventDefault()
    sendMessage(receiver,sender,sending_message.value)
})


// after getting their ID's this fnx is transferring messages between the two users.
function sendMessage(receiverId,senderId,message){
    let saveMessage = {
        from_user: senderId,
        to: receiverId,
        message: message,
        user_Id: senderId,
        name: frdName,
        profile_pic: pic,
        seen: false
    }

    fetch("https://docconnect2022.herokuapp.com/api/saveMessage",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(saveMessage)
    })  
    .then(response => response.json())
    .then(data =>{
       
        let conversations = document.getElementById('charts')
        let receivedDiv = document.createElement('div')
        receivedDiv.classList.add('user-response')
        
        if(saveMessage.message == ''){
            receivedDiv.innerHTML = `
            <div class="response" style="padding: 7px 10px; width: 50px; height: 30px;"
                
            </div>`
        }
        else{
            receivedDiv.innerHTML = `
            <div class="response">
                <span>
                    ${saveMessage.message}
                 </span>
            </div>`
        }
        conversations.appendChild(receivedDiv)
    })
    sending_message.value = ''
}



function instant_messsage(data){

    let conversations = document.getElementById('charts')

    if(data.from_user === String(receiver) && data.toUser == userid){
        
        let sendDiv = document.createElement('div')
                sendDiv.classList.add('user-text')

        if(data.messages === ''){
            sendDiv.innerHTML = `<div class="incoming-img">
                <img src="${pic}" width="50px" height="50px" style="border-radius: 50px;"  alt="">
            </div>
            <div class="message" style="padding: 7px 10px; width: 50px; height: 30px;">
                <span>
                    ${data.messages}
                </span>
            </div>`
        }else{
            sendDiv.innerHTML = `<div class="incoming-img">
            <img src="${pic}" width="50px" height="50px" style="border-radius: 50px;"  alt="">
            </div>
            <div class="message">
                <span>
                    ${data.messages}
                </span>
            </div>`
        }
        conversations.appendChild(sendDiv)
    }

}

// This btn open chatBox between user and doc
const chatBtn = document.getElementById('chatBtn');
chatBtn.addEventListener('click', ev =>{
    // ev.preventDefault()

    let senderId = localStorage.getItem("userID")
	let receiver_name = document.getElementById('receiver-name').textContent

    hideElement('#doc-profile')
    showElement('#doc-conversation')

    let doc_img = document.getElementById('doc-img').lastElementChild.firstElementChild;
	doc_img.src = pic

    let doc_name = document.querySelector('#header #name #doc-name')
	doc_name.textContent = reduce_name(receiver_name)
	displayPreviousConversation(receiver,sender,pic)

})

let reduce_name = n =>{
    
     // convert name to an array
     let name = Array.of(n);
     let reduceName = name.flatMap(nam => nam.split(' '))
     // check if name length is greater the 2
     if(reduceName.length > 2){
 
         return reduceName[0] +' '+reduceName[1];
 
     }else{
         return n;
     }
}