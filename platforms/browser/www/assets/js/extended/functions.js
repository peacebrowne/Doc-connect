const URL = "https://docconnect2022.herokuapp.com";
let is_loggedin = false;

function textDecoration() {
    document.getElementById("icons").style = "color:rgba(201,0,40,255)";
}
const redirectUser = (status) => {
    let file_name = window.location.pathname.split('/');
    is_loggedin = status;

    if (!is_loggedin && !file_name.includes('login.html')) {
        window.location.href = "login.html";
    } else if (is_loggedin && file_name.includes('login.html')) {
        window.location.href = "index.html";
    }
}

const hideLoader = (ele) => {
    document.querySelector(ele).style = "display: none";
}

const showLoader = (ele) => {
    document.querySelector(ele).style = "display: block";
}

const makeAPIPostRequest = async(url, data_to_send) => {
    return await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data_to_send)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err.message)
}

const makeAPIPostRequestForLogin = async(url, data_to_send) => {
    return await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data_to_send)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(err => err.message)
}

const changeNetworkStatusIcon = () => {
    // let check_network_interval = setInterval(() => changeNetworkStatusIcon(), 5000);

    let file_name = window.location.pathname.split('/');

    if (!file_name.includes('login.html')) {
        if (checkNetworkStatus()) {
            hideElement('#offline-wifi-icon');
            showElement('#online-wifi-icon');
        } else {
            hideElement('#online-wifi-icon');
            showElement('#offline-wifi-icon');
        }
        console.log("Checked")

        // clearInterval(check_network_interval);
    }
    changeNetworkStatusIcon();
}

const checkNetworkStatus = () => navigator.onLine ? true : false;

// changeNetworkStatusIcon();

const goBack = () => {
    alert(previous_section);

    if (previous_section) {
        hideElement(current_section);
        showElement(previous_section);
        previous_section = "";
    } else {
        navigator.app.exitApp();
    }
}

// document.addEventListener("backbutton", goBack(), false);