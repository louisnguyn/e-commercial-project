document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.dropdownButton');
    const dropdownContent = document.getElementById('profileDropdownContent');
    const toggleIcon = dropdownButton.querySelector('.toggle-icon');

    dropdownButton.addEventListener('click', () => {
        // Toggle the visibility of the dropdown content
        dropdownContent.classList.toggle('show');
        dropdownButton.classList.toggle('active');

        // Change the icon dynamically
        if (dropdownContent.classList.contains('show')) {
            toggleIcon.classList.remove('fa-angle-up');
            toggleIcon.classList.add('fa-angle-down');
        } else {
            toggleIcon.classList.remove('fa-angle-down');
            toggleIcon.classList.add('fa-angle-up');
        }
    });
});