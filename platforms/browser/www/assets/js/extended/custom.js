let current_section = '#home-section';
let previous_section = '';

let current_profile_tab_head = "#tab-head-view";
let current_profile_section = "#tab-content-view";

let current_weigh_tab_head = "#tab-head-chat";
let current_weigh_section = "#home-page";




/**
 * General Functions
 */
const hideElement = (ele) => {
    document.querySelector(ele).style = "display: none";
}

const showElement = (ele) => {
    document.querySelector(ele).style = "display: block";
}

const setAsActive = (ele) => {
    document.querySelector(ele).style = "color:rgba(201,0,40,255)";

}

const setAsInactive = (ele) => {
    document.querySelector(ele).style = "color: black;";
}