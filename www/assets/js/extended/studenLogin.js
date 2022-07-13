


let schools = document.querySelector('#schools-Login select')


function allSchools(){
    if (checkNetworkStatus()) {

        // getting all schools from db
        makeAPIGetRequest(`${URL}/api/getSchools`)
        .then(data => {
            let current_schools = data[0]

            // iterate through all schools.
            current_schools.forEach(school => {

                let sch = document.createElement('option')
                sch.textContent = school.school_name;

                // display each school.
                schools.appendChild(sch)

            })
        })

    }
    

}

allSchools()

let studentUsername = document.querySelector('#schools-Login #username')
let studentPassword = document.querySelector('#schools-Login #password')
let studentSchool = document.querySelector('#schools-Login select')

function studentLoginData(ev){
    ev.preventDefault()

    let studentData = {

        schoolName: studentSchool.value,
        username: studentUsername.value,
        password: studentPassword.value

    }
 
    studentValidation(studentData)
    
}

function studentValidation(info){
    
    let studentInfo = document.querySelectorAll('#schools-Login input')
    let studentSchool = document.querySelector('#schools-Login select')
    let counter = 0;

    for(let i = 0; i < studentInfo.length; i++){

        let student = studentInfo[i];

        // if an info is not entered throw error
        if(student.value == ''){
            Swal.fire({
                icon: 'error',
                title: 'Please enter the empty field!',
                confirmButtonText: "Close"
            })
            break;
        }
        else{
            counter++
        }

         // check if all student info is entered
        if(counter == studentInfo.length){

            if(studentSchool.value != 'PLEASE SELECT YOUR SCHOOL'){
              
                submitStudentInfo(info)

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Please Select Your School!',
                    confirmButtonText: "Close"
                })
                break;
            }

        }
    }

  
}

let studentLoginBtn = document.getElementById('student-loginBtn')

studentLoginBtn.addEventListener('click',studentLoginData)

function submitStudentInfo(info){
// send student login credential to db to check if student exist.
    makeAPIPostRequest(`${URL}/api/student_login`,info)
    .then(data => {
        // if student credential does not exist, throw error message.
        // else log student in.

        if(data.length == 0){
            Swal.fire({
                icon: 'error',
                title: 'Wrong username or password!',
                confirmButtonText: "Close"
            })
        }else if(data == false){
            Swal.fire({
                icon: 'error',
                title: 'Wrong username or password!',
                confirmButtonText: "Close"
            })
        }
        else{
            
            let img = data.image;
            localStorage.setItem('profile-picture',img)
            localStorage.setItem('userID',data.studentID)
            localStorage.setItem('school-name',info.schoolName)
            localStorage.setItem('assign-doctor',data.assign_doctor)
            localStorage.setItem('user-name',`${data.first_name} ${data.last_name}`)

            if (checkNetworkStatus()) {
               
                showLoader("#loader-cover");
                showLoader(".loader");
                location.replace('schools.html')

            }else {

                hideLoader("#loader-cover");
                hideLoader(".loader");
        
                Swal.fire({
                    icon: 'error',
                    title: 'Please connect to the internet to login',
                    confirmButtonText: "Close"
                })
            }
        }

    })

   

    // get student ID and save
    // makeAPIGetRequest(`${URL}/api/getStudents`)
    // .then(data => {
    //     console.log(data)
    //     let studentData = data[0];
    //     console.log(info);

    //     // studentData.find(datum =>{
    //     //     if(datum.username == info.username && datum.password == info.password && datum.school_name == info.schoolName){
    //     //         console.log()
    //     //     }
    //     // })
        
       
    // })

    // makeAPIPostRequest(`${URL}/api/student_login`,info)
    // .then(data => {
    //     if(data == true){
        //   location.replace('schools.html')
    //     }else{
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Wrong username or password!',
    //             confirmButtonText: "Close"
    //         })
    //     }
    // })
}















