document.querySelector("#tab-head-chat").addEventListener('click', (e) => {
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#home-page";
    current_weigh_tab_head = "#tab-head-chat";
    document.getElementById("footerChatText").style.color = "#000";
    showElement(current_weigh_section);
    showElement("#filter-search")
    document.getElementById("landing-page-header").style.height = "200px"
    setAsActive(current_weigh_tab_head);
})

document.querySelector("#tab-head-posts").addEventListener('click', () => {
    hideElement(current_weigh_section);
    hideElement("#filter-search")
    document.getElementById("landing-page-header").style.cssText= "height:200px;"
    document.getElementById("icons").style.color = null;
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#hospitals";
    current_weigh_tab_head = "#tab-head-posts";
    document.getElementById("footerHospitalText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
})

document.querySelector("#tab-head-calls").addEventListener('click', () => {
    document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#calls";
    current_weigh_tab_head = "#tab-head-calls";
    document.getElementById("footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
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
console.log(input)


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