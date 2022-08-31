const doc_sendMg_btn = document.querySelector('#footer #send-message button');
const doc_message = document.querySelector('#footer #type-message input');

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
    hideElement('#improvise')
    showElement('#doctorSearchBox')
    hideElement('#hospitalSearchBox')
    showElement('#doctorSearchBox')
})

document.querySelector("#tab-head-posts").addEventListener('click', () => {
    let name = 'Hospital'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
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
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#calls";
    current_weigh_tab_head = "#tab-head-calls i";
    document.getElementById("footerCallText").style.color = "#000";
    // document.getElementById('nav_logo').style.marginTop = '2%'
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')
    showElement('#improvise')
    hideElement('#doctorSearchBox')
})

document.querySelector("#tab-head-other-doctors").addEventListener('click', () => {
    let name = 'Other Doctors'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#Other-doctors";
    current_weigh_tab_head = "#tab-head-other-doctors";
    document.querySelector("#tab-head-other-doctors #footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')
    hideElement('#improvise')
    showElement('#doctorSearchBox')
    showElement('#hospitalSearchBox')
    hideElement('#doctorSearchBox')
})

document.querySelector("#tab-head-notification").addEventListener('click', () => {
    let name = 'Notification'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#notification";
    current_weigh_tab_head = "#tab-head-notification i";
    document.querySelector("#tab-head-notification #footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')
    hideElement('#improvise')
    showElement('#doctorSearchBox')
    hideElement('#hospitalSearchBox')
    showElement('#doctorSearchBox')
})

function removeUserFromSession() {
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    redirectUser(false)
}


const doctor_search = document.querySelector('#hospitalSearchBox input')
doctor_search.addEventListener('keyup', ev => {
    let term = ev.target.value.toLowerCase();
    // searching for anything only on the chat section

    let friends = document.querySelectorAll('.other-doc')
    friends.forEach((friend)=>{

        let text = friend.textContent.toLowerCase();
        let display = friend.parentElement.parentElement.parentElement;
        
        if(text.indexOf(term) != -1){
            display.style.display = 'flex'
        }else{
            display.style.display = 'none'
        }

    })
})

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
										<strong class="doc-name other-doc">${datum.first_Name} ${datum.last_Name}</strong>
										
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


