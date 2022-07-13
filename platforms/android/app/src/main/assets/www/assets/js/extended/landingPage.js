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
    setAsActive(current_weigh_tab_head);
    search_anything.value = ''
    hideElement(current_section_icon)
    current_section_icon = "#chat-icon"
    showElement(current_section_icon)
})

document.querySelector("#tab-head-posts").addEventListener('click', () => {
    let name = 'Hospital'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
    hideElement("#filter-search")
    document.getElementById("icons").style.color = null;
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#hospitals";
    current_weigh_tab_head = "#tab-head-posts";
    document.getElementById("footerHospitalText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    search_anything.value = ''
    hideElement(current_section_icon)
    current_section_icon = "#hospital-icon"
    showElement(current_section_icon)
})

document.querySelector("#tab-head-calls").addEventListener('click', () => {
    let name = 'Calls'
    let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
    current_section_name.textContent = name;
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#calls";
    current_weigh_tab_head = "#tab-head-calls";
    document.getElementById("footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    search_anything.value = ''
    hideElement(current_section_icon)
    current_section_icon = "#calls-icon"
    showElement(current_section_icon)
})

function removeUserFromSession() {
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    redirectUser(false)
}

// $(document).ready(function() {
//     $("#myInput").on("keyup", function() {
//         var value = $(this).val().toLowerCase();
//         $("#myDIV *").filter(function() {
//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         });
//     });
// });

let input = document.getElementById('filter-search');

function filter_docs(){
    
    let doc_specs = document.querySelectorAll('#friends .friend .doc-flow .doc-flow-items .doc-specs')

    let filter_value = input.value;
    let data;
    for(let i = 0; i < doc_specs.length; i++){
        let request = doc_specs[i];
        data = request.parentElement.parentElement.parentElement;
        if(request.textContent.includes(filter_value)){
            data.style.display = ''
        }else{
            data.style.display = 'none'
        }
    }
    if(filter_value == 'All'){
        for(let i = 0; i < doc_specs.length; i++){
            let request = doc_specs[i];
            data = request.parentElement.parentElement.parentElement;
            data.style.display = ''
        }
    }

}

input.addEventListener('change',filter_docs)


const docs_div = document.getElementById('friends');

// This function is displaying all doctors data to the user's landing page.
function display_doctors(){
    docs_div.replaceChildren()

    fetch("https://docconnect2022.herokuapp.com/api/get_users")
        .then(response => response.json())
        .then(data => {
            // console.log(data[0])
            data[0].map((datum)=>{

                if(datum.roles === 'Doctor' && datum.specialization !== 'ordinary'){

                    let showDocs = document.createElement('div')
                    showDocs.classList.add("friend")
                    let print = `
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                                    
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
                                            `
                    showDocs.innerHTML = print;

                    docs_div.append(showDocs)

                }

            })
        })
}
display_doctors()


// General search for anything, it searches for anything only
// on the display section

let search_anything = document.querySelector('#allSearch input')

search_anything.addEventListener('keyup',function(e){
    var term = e.target.value.toLowerCase();

    // searching for anything only on the chat section
    if(document.getElementById('home-page').style.display === 'block'){
        let friends = document.querySelectorAll('.doc-names');
        friends.forEach((friend)=>{

            let text = friend.textContent;
            let trimText = text.trim().toLowerCase();

            if(trimText.indexOf(term) != -1){
                let display = friend.parentElement.parentElement;
                display.style.display = 'flex'
            }else{
                let display = friend.parentElement.parentElement;
                display.style.display = 'none'
            }

        })
    }

    
// searching for anything only on the hospital section
    if(document.getElementById('hospitals').style.display === "block"){
        let hospital = document.querySelectorAll('.info');
        hospital.forEach((word)=>{

            let childElement = word.textContent;
            let sentence = childElement.trim().toLowerCase()
            if(sentence.indexOf(term) != -1){
                let display = word.parentElement.parentElement;
                display.style.display = 'flex'
            }else{
                let display = word.parentElement.parentElement;
                display.style.display = 'none'
            }
        })
    }

// Searching for anything only on the call section
    // if(document.getElementById('calls').style.display === 'block'){

    // }

});
