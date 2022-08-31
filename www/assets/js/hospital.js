let hospital_search = document.querySelector('#hospitals input')

// Hospital search
hospital_search.addEventListener('keyup',function(e){
    var term = e.target.value.toLowerCase();

    let hospital_list = document.querySelectorAll('#hospitals .card-title')
    
    hospital_list.forEach(hospital =>{
        
        let hospital_name = hospital.textContent.toLocaleLowerCase();
        let hospital_card = hospital.parentElement.parentElement;

        if(hospital_name.includes(term)){
            hospital_card.style.display = 'block';
        }else{
            hospital_card.style.display = 'none';
        }

    })
    
})

let input = document.getElementById('filter-search');

function filter_docs(){
    
    let doc_specs = document.querySelectorAll('#friends .friend .doc-flow .doc-flow-items .doc-specs')

    let filter_value = input.value;
    let data;
    for( let i = 0; i < doc_specs.length; i++){

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


// General search for anything, it searches for anything only
// on the display section

let search_anything = document.querySelector('#nav_logo #doctorSearchBox input')

search_anything.addEventListener('keyup',function(e){
    let term = e.target.value.toLowerCase();
    // searching for anything only on the chat section

    if(document.getElementById('home-page').style.display = "block"){

        let friends = document.querySelectorAll('.doc-name')
        friends.forEach((friend)=>{

            let text = friend.textContent.toLowerCase();
            let display = friend.parentElement.parentElement.parentElement;
            
            if(text.indexOf(term) != -1){
                display.style.display = 'flex'
            }else{
                display.style.display = 'none'
            }

        })
    }
    
});
