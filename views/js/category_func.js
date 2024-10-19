// Function to fetch and display categories
function fetchCategories() {
    fetch("/categories/list") // Adjust the route for fetching categories
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching categories");
            }
            return response.json();
        })
        .then(categories => {
            const tbody = document.querySelector("tbody");
            tbody.innerHTML = ""; // Clear existing rows
            categories.forEach((category, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${category.category_name} - ${category.category_description}</td>
                    <td>
                        <button class="btn-icon btn-edit" data-id="${category.category_id}">
                            <i class="bx bx-edit-alt"></i>
                        </button>
                        <button class="btn-icon btn-delete">
                            <i class="bx bx-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row); // Append new row
            });
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
            alert(error.message); // Show error message
        });
}

// Handle form submission for saving a new category
document.getElementById("categoryForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const categoryName = document.getElementById("category-name").value;
    const categoryDescription = document.getElementById("category-description").value;

    fetch("/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            category_name: categoryName,
            category_description: categoryDescription,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Error occurred');
            });
        }
        return response.json();
    })
    .then(data => {
        alert("Category saved successfully!");
        // Clear the form inputs
        document.getElementById("category-name").value = '';
        document.getElementById("category-description").value = '';
        fetchCategories(); // Fetch and display updated categories
    })
    .catch(error => {
        console.error("Error saving category:", error);
        alert(error.message); // Show the error message
    });
});

// Fetch categories on initial load
fetchCategories(); // Load categories when the page is first rendered

// Event listener for edit buttons
document.addEventListener("click", function (e) {
    if (e.target.closest(".btn-edit")) {
        const button = e.target.closest(".btn-edit");
        const categoryId = button.getAttribute("data-id");
        const row = button.closest("tr");
        const categoryName = row.querySelector("td:nth-child(2)").innerText.split(" - ")[0]; // Get name
        const categoryDescription = row.querySelector("td:nth-child(2)").innerText.split(" - ")[1]; // Get description

        // Fill modal fields
        document.getElementById("edit-category-id").value = categoryId;
        document.getElementById("edit-category-name").value = categoryName;
        document.getElementById("edit-category-description").value = categoryDescription;

        // Show the modal
        document.getElementById("editModal").style.display = "block";
    }
});

// Close modal
document.getElementById("closeModal").onclick = function() {
    document.getElementById("editModal").style.display = "none";
};

// Cancel button action
document.getElementById("cancelEdit").onclick = function() {
    document.getElementById("editModal").style.display = "none";
};

// Handle form submission for updating category
document.getElementById("editCategoryForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const categoryId = document.getElementById("edit-category-id").value;
    const categoryName = document.getElementById("edit-category-name").value;
    const categoryDescription = document.getElementById("edit-category-description").value;

    fetch(`/categories/${categoryId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            category_name: categoryName,
            category_description: categoryDescription,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Error occurred');
            });
        }
        return response.json(); 
    })
    .then(data => {
        alert("Category updated successfully!");
        fetchCategories(); // Refresh the categories list
        document.getElementById("editModal").style.display = "none"; // Close the modal
    })
    .catch(error => {
        console.error("Error updating category:", error);
        alert(error.message); // Show error message
    });
});
