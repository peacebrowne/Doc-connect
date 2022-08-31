const back = document.querySelector('#booking-emegency-header #icon')
const emergency_btns = document.querySelectorAll('.emergency-btn')
emergency_btns.forEach(btn =>{
    btn.addEventListener('click',ev =>{
        ev.preventDefault()

        let pathname = location.pathname

        if(!pathname.endsWith('schools.html')){

            hideElement('#landing-page-footer');

        };

        hideElement('main')
        showElement('#booking-emergency')
    })
})

back.addEventListener('click',() => {

    hideElement('#booking-emergency')
    showElement('main')

    let pathname = location.pathname

    if(! pathname.endsWith('schools.html')){

        document.getElementById('landing-page-footer').style.display = 'flex'

    };


})


const emergency_response = [
    { need :'Ambulance', contact: '0770669988' },
    { need :'First Aid', contact: '0770554433' },
    { need :'Quick Response', contact: '0886542125' }
]

const emergency_needs = document.querySelectorAll('.needs')
emergency_needs.forEach(need =>{
    need.addEventListener('click',ev =>{
        ev.preventDefault()

        let content = need.firstElementChild.textContent;
        emergency_response.forEach(response =>{

            if(response.need.includes(content.trim())){
                Swal.fire({
                    title: `Please Call this number ${response.contact}`,
                })
                return;
            }

        })

    })
})