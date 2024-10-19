// Get the modal element
const modal = document.getElementById("add-bundle-modal");
// Get the button that opens the modal
const addButton = document.querySelector(".add-bundle-btn");
// Get the close button element
const closeBtn = document.querySelector(".close-btn");
// Get the cancel button in the form
const cancelBtn = document.querySelector(".cancel-btn");

// Show the modal when the Add Bundle button is clicked
addButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Hide the modal when the close button or cancel button is clicked
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Optionally, close the modal when clicking outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// New Multi-Select Dropdown Logic

const selectBox = document.getElementById('select-box');
const dropdown = document.querySelector('.checkbox-dropdown');
const checkboxes = document.querySelectorAll('.checkbox-dropdown input');
const displaySpan = selectBox.querySelector('span');

selectBox.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
  selectBox.classList.toggle('active');
});

// Handle checkbox selection
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const selectedProducts = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    
    displaySpan.textContent = selectedProducts.length > 0 
      ? selectedProducts.join(', ') 
      : 'Select Product';
  });
});

// Optional: Close dropdown if clicked outside
window.addEventListener('click', (e) => {
  if (!selectBox.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
    selectBox.classList.remove('active');
  }
});
