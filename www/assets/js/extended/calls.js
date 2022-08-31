const call_icon = document.querySelector('#doc-conversation .fa-phone')
console.log(call_icon)
let caller_id;
let reciever_info;
let sender_info;

const callerID = (caller,reciever) => {

    caller_id = +caller.id;
    reciever_info = reciever;
    sender_info = caller;
    
}

let call_reciever_name = document.querySelector('#calling #info').children[0];
let call_status = document.querySelector('#calling #info').children[1]
let call_reciever_img = document.querySelector('#calling img')

const display_call_receiver = data => {

    if(data.messages == "Incoming Call"){

        call_status.textContent = data.messages;
        call_reciever_img.src = data.pic;
        call_reciever_name.textContent = data.name;
        document.getElementById('ans_or_cancel').style.display = 'flex'
        hideElement('#call-bottom')
        
    }else{

        call_status.textContent = calling;
        call_reciever_img.src = data.pic;
        call_reciever_name.textContent = data.name;
        document.getElementById('call-bottom').style.display = 'flex';
        hideElement('#ans_or_cancel')

    }


}

let calling = 'Calling...'
let callEnd = 'Call End'


call_icon.addEventListener('click', ev => {
    makeAPIPostRequest(`${URL}/api/unique_user`, {unique_userID: caller_id})
    .then(data => {
        let subscription = data[0][0];
        if(subscription == undefined)console.log('not here')

        if(subscription === 'Inactive'){
            Swal.fire({
                icon: 'error',
                title: `<span style="font-size: large;">You do not have a subscription to call.
                For more infomation, please contact this number.
                0777777777</span>`,
                confirmButtonText: "Close"
            })
            return;
        }
        display_call_receiver(reciever_info)
        // hideElement('#doc-conversation')
        showElement('#calling')

        make_audio_calls(sender_info,reciever_info)
        
    })
    
})



const end_call = document.getElementById('end-callBtn');
end_call.addEventListener('click' , ev => {
    call_status.textContent = callEnd;

    setTimeout(() => {
        hideElement('#calling')
        // showElement('#doc-conversation')
    }, 2000);

})

const make_audio_calls = (caller,reciever) => {
    console.log("caller:",caller)
    console.log("reciever:",reciever)
    
    const call_info = {
        callerName: caller.name,
        from_user: caller_id,
        to: +reciever.id,
        message: 'Incoming Call',
        pic: caller.pic
    }
    console.log(call_info)

    makeAPIPostRequest(`${URL}/api/makeCall`, call_info)
    // .then(data => console.log(data))

}

const incoming_call = call =>{
    console.log(call)
    let id = +userID;
    if(call.toUser === id){

        // console.log(call)
        showElement('#calling')
        // let pic = call.profile_pic
        call.pic = call.profile_pic
        display_call_receiver(call);


    }

}
