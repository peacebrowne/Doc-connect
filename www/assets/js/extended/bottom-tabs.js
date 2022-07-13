/**
 * Bottom tab eventlisteners
 */
document.querySelector("#home-icon").addEventListener('click', () => {
    hideElement(current_section);
    previous_section = current_section;
    current_section = "#home-section";
    showElement(current_section);
})

document.querySelector("#sync-icon").addEventListener('click', () => {
    hideElement(current_section);
    previous_section = current_section;
    current_section = "#sync-section";
    showElement(current_section);
})

document.querySelector("#announcement-icon").addEventListener('click', () => {
    hideElement(current_section);
    previous_section = current_section;
    current_section = "#announcement-section";
    showElement(current_section);
})