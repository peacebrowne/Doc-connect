let clinicName;
let nextBtn = document.getElementById('nextBtn')
const pharmacy_order_form = document.getElementById('pharmacy-order-form')



const selected_pharmacy = document.querySelector('#ask-patient form select');
// console.log(selected_pharmacy)
selected_pharmacy.addEventListener('change', () =>{
    let result = selected_pharmacy.value;
    if(result == 'yes'){
        hideElement('#landing-page-header')
        hideElement('#landing-page-footer')
        hideElement('#pharmacy-order-form select')
        showElement('#order-medication')
        document.getElementById('order-medication').style.display ='flex';
        showElement('#upload-prescription')
        hideElement('#upload-prescription-btn')
    }
    else if(result == 'no'){
        // pharmacy_order_form.style.height = '780px'
        hideElement('#landing-page-header')
        hideElement('#landing-page-footer')
        hideElement('#pharmacy-order-form select')
        showElement('#list-of-med')
        hideElement('#nextBtn')
        document.getElementById('order-medication').style.display = 'flex'
        document.getElementById('pharmacy-btns').style.display = 'flex'
        reInitialiseCard()
    }
})


const bckToAsk = document.querySelector('#order-medication #bckToAsk')
let upload_prescription = document.getElementById('upload-prescription')
let medicine_list = document.getElementById('list-of-med')
// taking you back to asking patient for prescription
bckToAsk.addEventListener('click', ()=>{

    // if prescription form is display hide it
    if(upload_prescription.style.display == 'block'){
        hideElement('#upload-prescription')
        hideElement('#order-medication')
        showElement('#pharmacy-order-form select')
        document.querySelector('#pharmacy-order-form select').value = "DO YOU HAVE ANY PRESCRIPTON ?"
        document.querySelector('#pharmacy-order-form select').style.cssText = "width: 90%; margin-top: 3%;"
        document.querySelector('#landing-page-header').style.display = "flex";
        document.querySelector('#landing-page-footer').style.display = "flex";
    }
     // if medicine list is display hide it
    else if(medicine_list.style.display == 'block'){
        hideElement('#list-of-med')
        hideElement('#order-medication')
        hideElement('#pharmacy-btns')
        showElement('#pharmacy-order-form select')
        document.querySelector('#pharmacy-order-form select').value = "DO YOU HAVE ANY PRESCRIPTON ?"
        document.querySelector('#pharmacy-order-form select').style.cssText = "width: 90%; margin-top: 3%;"
        document.querySelector('#landing-page-header').style.display = "flex";
        document.querySelector('#landing-page-footer').style.display = "flex";

    }

    // pharmacy_order_form.style.height = '650px'
    showElement('#landing-page-header')
    document.getElementById('landing-page-footer').style.display = "flex"
    document.querySelector('#pharmacy-order-form select').value = "DO YOU HAVE ANY PRESCRIPTON ?"
    document.querySelector('#pharmacy-order-form select').style.cssText = "width: 90%; margin-top: 3%;"
    
    hideElement('#list-of-med')
    hideElement('#order-medication')
    hideElement('#nextBtn')
})



let medicine = document.querySelectorAll('#list-of-med .med-name .med')
const angleUp = 'fa fa-angle-up';
const angleDown = 'fa fa-angle-down'

medicine.forEach(med_name =>{
    med_name.addEventListener('click',(e)=>{
        e.stopImmediatePropagation()
        let medList ;
        let angle = med_name.firstElementChild.nextElementSibling;
        // changing the icon class name
        // if icon is facing down med list hide
        // else it shows
        medList = med_name.nextElementSibling;
        let med_children = medList.children;

        if(angle.className.includes(angleUp)){
            Array.from(med_children).forEach(child => {
                child.style.display = 'block';
            })
            angle.className = angleDown
            medList.style.display = 'flex'

        }else if(angle.className.includes(angleDown)){
            angle.className = angleUp
            medList.style.display = 'none'
        }
    })
})

const all_medicine_check = document.querySelectorAll('.medicine .card .add-to-card');

all_medicine_check.forEach(btn =>{
    btn.addEventListener('click',selecteMed)
})

let selectedMedicine =[]
const addToCard = 'ADD TO CART';
const removeFromCard = 'REMOVE FROM CART'

// prompt the user that he/she has successefully added a medicine to card list
let popup = document.getElementById("myPopup");
let text;

function myPopUp(element) {
    popup.textContent = `successefully ${text} to card!`

    if(element.classList.value.includes('show')){
       
        element.classList.remove('show')
        element.classList.toggle('show')
    
    }
    else{
        
        element.classList.toggle('show');
        // element.classList.toggle()

    }

    

}

    // selecting prescribed medicine
function selecteMed(ev){
    ev.preventDefault()
    let box = ev.target;
    let med_name = ev.target.parentElement.firstElementChild.textContent;
    let med_amount = ev.target.previousElementSibling.lastElementChild.firstElementChild.children[1].textContent;
    let med_amount_currency = ev.target.previousElementSibling.lastElementChild.firstElementChild.lastElementChild.textContent;

    if(box.textContent == addToCard){ 
        // text = 'added'
        // myPopUp(popup)
        box.textContent = removeFromCard;
        selectedMedicine.push({
            name: med_name,
            amount: med_amount,
            currency: med_amount_currency
            
        })


        // showing view btn for selected med

        if(selectedMedicine.length == 1){
            showElement('#nextBtn')
        }


    }
    else if(box.textContent == removeFromCard){
        text = 'removed'
        myPopUp(popup)

        // removing prescribed med
        box.textContent = addToCard
        for(let i = 0; i < selectedMedicine.length; i++){

            if(selectedMedicine[i].name == med_name){
                selectedMedicine.splice(i,1)
                // console.log(selectedMedicine)
            }
            if(selectedMedicine.length == 0){
                hideElement('#nextBtn')
            }
        }
    }

}

const selected_med_list = document.querySelector('#selected-med div');

// displaying selected medicine
function viewAddMed(med){

    selected_med_list.replaceChildren()

    med.forEach(medicine =>{
        let med_card = document.createElement('div')
        med_card.classList.add('medicine-card');
        med_card.classList.add('form-control')
        let card = `
                    <i class="fas fa-window-close"></i>
                    <div class="left-card form-control">
                    <div class="left-card-span">
                        <span class="login-head">${medicine.name}</span>
                    </div>
                    <div class="price">
                        <span style="margin-right: -5%;">$</span>
                        <span>${medicine.amount}</span>
                        <span>${medicine.currency}</span>
                        <span style="display:none;">${medicine.amount}</span>
                    </div>
                </div>
                <div class="right-card form-control">
                    <select class="form-control milligram">
                        <option selected disabled>Milligram</option>
                        <option value="250">250mg</option>
                        <option value="500">500mg</option>
                    </select>
                    <input class="form-control quantity" type="number" placeholder="Quantity">
                </div>
        `
        med_card.innerHTML = card;
        selected_med_list.appendChild(med_card)
    })
   

    showElement('#selected-med')
    priceAndQuantity()
}

const sectionTitle = document.getElementById('order-medication').children[2]

nextBtn.addEventListener('click',ev=>{
    ev.preventDefault()
    hideElement('#nextBtn')
    showElement('#orderBtn')
    hideElement('#list-of-med')
    hideElement('#bckToAsk')
    showElement('#bcktoMedList')
    viewAddMed(selectedMedicine)
    cancelMedicine()
    sectionTitle.textContent = 'MEDICINES'
    getUserOrderList()


})

const back_to_med_list = document.getElementById('bcktoMedList')
back_to_med_list.addEventListener('click',()=>{
    hideElement('#selected-med')
    hideElement('#bcktoMedList')
    showElement('#bckToAsk')
    showElement('#list-of-med')
    showElement('#nextBtn')
    hideElement('#orderBtn')
    document.getElementById('pharmacy-btns').style.display = 'flex'
    sectionTitle.textContent = 'SELECT MEDICATION'
})

let card_btn = document.querySelectorAll('.add-to-card')
// Reinitializing selected med card to empty card
function reInitialiseCard(){
    // let medicine = document.querySelectorAll('#list-of-med .med-name .med')

    medicine.forEach(med => {
        med.lastElementChild.className = angleUp
        let medName = med.nextElementSibling;
        medName.style.display = 'none'
       
        // // if there medicine already selected
        // // remove all.
        for(let i = 0; i < selectedMedicine.length; i++){
            selectedMedicine.splice(i,1)
        }

        // remove previous med list to normal
        selected_med_list.innerHTML = ''
    })
    card_btn.forEach(btn =>{
        btn.textContent = addToCard;
    })
}



function priceAndQuantity(){
    let number_of_quantity = document.querySelectorAll('.quantity')

    // getting all quantity of medicine
    // and multiply the number of quantity with the fixed price.

    number_of_quantity.forEach(input =>{
        input.addEventListener('change', ev => {

           let quantity = Number(ev.target.value);
           let price = ev.target.parentElement.previousElementSibling.lastElementChild.children[1];
           let fixedPrice = ev.target.parentElement.previousElementSibling.lastElementChild.lastElementChild.textContent;

        // if quantity value is not an empty string
        // multiply fixed price by number of quantity
        // else multiply fixed price by 1
            if( quantity != ''){
                
                price.textContent = Number(fixedPrice) * quantity;
                getUserOrderList()
            }
            else if(quantity == ''){

                price.textContent = Number(fixedPrice) * 1;
                getUserOrderList() 
            }

        })
    })
    
}


// removing medicine from the list
function cancelMedicine(){
    let cancel = document.querySelectorAll('.fa-window-close')
    cancel.forEach(icon =>{
        icon.addEventListener('click', ev => {
            let parentElement = ev.target.parentElement.parentElement;
            let price = ev.target.nextElementSibling.lastElementChild.children[1].textContent;
             
            subtractTotalAmount(price)

            // removing medicine from the list
            parentElement.removeChild(ev.target.parentElement)
           
        })
    })
}



function getUserOrderList(){

    // getting all listed medicine
    let medicines = document.querySelectorAll('.medicine-card')
    let sum = 0;

    // adding all the prices together and passing it to
    // total amount function.
    medicines.forEach(med =>{

        let med_price = med.children[1].lastElementChild.children[1];
        let price = Number(med_price.textContent)
        sum = sum + price

    })

    addTotalAmount(sum)

}


// displaying total amount for all medicines
function addTotalAmount(element){
    
    let totalAmount = document.getElementById('totalAmount').children[1];

    // returning sum
    totalAmount.textContent = element

}

// if a medicine is deleted from the list of selected medicice
// it price will be subtracted from the total price
function subtractTotalAmount(price){

    // get current total amount
    let totalAmount = document.getElementById('totalAmount').children[1];
    let currentTotal = Number(totalAmount.textContent)

    // subtract price from current total amount
    let result = currentTotal - Number(price)

    totalAmount.textContent = result
}

const orderBtns = document.getElementById('orderBtn');

// request order
orderBtns.addEventListener('click', ev =>{
    ev.preventDefault();
    // orderMedication()
    validateMilligram()
})


    // validating for zero milligram and quantity
function validateMilligram(){
    
    let milligrams = document.querySelectorAll('.milligram')
    let counter = 0;

    // check if a milligram value is equal to empty string
    for(let i = 0; i < milligrams.length; i++){
        let gram = milligrams[i].value;

        if(gram == 'Milligram'){
            Swal.fire({
                icon: 'error',
                title: 'Please select the milligram of all medicines',
                confirmButtonText: "Close"
            })

        }else{

            counter ++
        
        }
       
    }

    if(counter == milligrams.length){
        orderMedication()
    }

}

    // user making order for medication
function orderMedication(){
    let medicines = document.querySelectorAll('.medicine-card')
    let totalAmount = document.getElementById('totalAmount').children[1].textContent;
    let orderList = [];

    
    medicines.forEach(med => {

        let med_name = med.children[1].firstElementChild.firstElementChild.textContent;
        let med_milligram = med.children[2].firstElementChild.value;
        let med_quantity = med.children[2].lastElementChild.value;
       
        // if a med quantity is empty set it to one ,else if remains the same.

        med_quantity == '' ? med_quantity = 1 : '' ;

        orderList.push({
            medicine_name: med_name,
            milligram: Number(med_milligram),
            quantity: Number(med_quantity),
        })

    })

    orderList.push({
        total: `${totalAmount} USD`
    })
    submitMedOrder(orderList)
    
}

// submitting medicine order
function submitMedOrder(list){
    // console.log(list)
    // make api post request
    makeAPIPostRequest(`${URL}/api/ordered_medicines`,list)
    .then(data => {
        console.log(data)
    })
}



// searching for med name in the medicine list
let appointment_search = document.querySelector('#appointment-search input')

appointment_search.addEventListener('keyup',function(e){
    var term = e.target.value.toLowerCase();
   
    let med_list = document.querySelectorAll('#list-of-med .card .card-body .card-title')
    med_list.forEach(med => {
        let text = med.textContent.toLowerCase().trim();
        let display = med.parentElement.parentElement;
        let angle = display.parentElement.parentElement.parentElement.firstElementChild.lastElementChild;
        let card = display.parentElement.parentElement;
       


        // if medicine exist show it, else hide it
        if(text.indexOf(term) != -1){
            card.style.display = 'flex';
            angle.className = angleDown;
            display.parentElement.style.display = 'block'

        }
        else{

            display.parentElement.style.display = 'none'
            // angle.className = angleUp;

        }

        // // if seach bar is empty hide card
        if(appointment_search.value == ''){
            
            card.style.display = 'none'
            display.parentElement.style.display = 'block'
            angle.className = angleUp;

        }
    })
});

let upload_prescription_btn = document.getElementById('upload-prescription-btn')



let uploadedPic;

upload_prescription_btn.addEventListener('click',ev=>{
    ev.preventDefault()
    // getSignedRequest(uploadedPic)
    console.log(uploadedPic.src)
})

let order_med_pic = document.querySelector('.order-med-pic')
let pic_result = document.querySelector('.upload-card .card-img .result')

order_med_pic.addEventListener('change', (e) => {
	if (e.target.files.length) {
		// start file reader
	    const reader = new FileReader();
	    reader.onload = (e)=> {
            if(e.target.result){
                // create new image
                let img = document.createElement('img');
                img.id = 'image';
                img.setAttribute('Height','90%')
                img.setAttribute('margin','3% auto')
                img.src = e.target.result
                
                pic_result.innerHTML = '';
                pic_result.appendChild(img);
                showElement('#upload-prescription-btn')
                uploadedPic = img
            }
	    };

	  reader.readAsDataURL(e.target.files[0]);
	}
  });
