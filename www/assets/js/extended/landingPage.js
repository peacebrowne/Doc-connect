
let chats_section = document.querySelector("#tab-head-chat");
chats_section.addEventListener('click', (e) => {
    let name = 'Chat'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
    hideElement("#filter-search")
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#home-page";
    current_weigh_tab_head = "#tab-head-chat #icons";
    document.getElementById("footerChatText").style.color = "#000";
    showElement(current_weigh_section);
    showElement('#landing-page-header')
    setAsActive(current_weigh_tab_head);
    search_anything.value = ''
    showElement('#schedule-appointment')

})

let doctors_section = document.querySelector("#tab-head-doctors")
doctors_section.addEventListener('click', (e) => {
    let name = 'Doctors'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#doctors";
    current_weigh_tab_head = "#tab-head-doctors #icons";
    document.getElementById("footerChatText").style.color = "#000";
    showElement(current_weigh_section);
    showElement("#filter-search")
    showElement('#landing-page-header')
    setAsActive(current_weigh_tab_head);
    search_anything.value = ''
    showElement('#schedule-appointment')

})

let hospital_section = document.querySelector("#tab-head-posts")
hospital_section.addEventListener('click', () => {
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
    search_anything.value = ''
   
})

let pharmacy_section = document.querySelector("#tab-head-calls")
pharmacy_section.addEventListener('click', () => {
    let name = 'Order Medicine'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    // showElement('#landing-page-header')
    hideElement("#filter-search")
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#calls";
    current_weigh_tab_head = "#tab-head-calls";
    document.getElementById("footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    search_anything.value = ''
    showElement('#landing-page-header')
    hideElement('#schedule-appointment')
})


function showDocInfo(img,name,specs,id){
    let doc_img = document.querySelector('#doc-profile .card img')
    doc_img.src = img;
    
	let doc_name = document.querySelector('#doc-profile .card .card-body h3')
	doc_name.textContent = name;

	let doc_specs = document.querySelector('#doc-profile .card .card-body h5');
	doc_specs.textContent = specs;

	let doc_id = document.querySelector('#doc-profile #doc-id');
    doc_id.textContent = id;
}


// This function is displaying all doctors data to the user's landing page.
function display_patientView(){
    // docs_div.replaceChildren()
    
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
				docs_div.appendChild(showDocs)
			}
			
		}
		openChatBox()
	})
}


function openChatBox(){
    
    let all_Docs =   document.querySelectorAll('.friend')
    all_Docs.forEach((doc)=>{
        doc.addEventListener('click',(ev)=>{
            
            getDocInfo(doc)
            
        })
    })
}

function getDocInfo(doc){
    
    let doc_img = doc.firstElementChild.src;
    let name = doc.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.textContent;
    let specs = doc.children[1].firstElementChild.lastElementChild.textContent;
    let doc_id = doc.lastElementChild.textContent;
	let user_id = localStorage.getItem("userID")
    
    hideCurrentSection()
    showDocInfo(doc_img,name,specs,doc_id)
	received_ID(doc_id)
	getUsersId(doc_id,user_id,doc_img,localStorage.getItem('user-name'))
}

function hideCurrentSection(){

    hideElement('#landing-page-header')
    hideElement('#landing-page-main')
    hideElement('#landing-page-footer')
    showElement('#doc-profile')

}




