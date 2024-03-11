const form = document.getElementById('dataForm');
const countryInput = document.getElementById('country');
const dateInput = document.getElementById('date');
const usernameInput = document.getElementById('username');
const dataBody = document.getElementById('dataBody');

let data = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newData = {
        country: countryInput.value,
        date: dateInput.value,
        username: usernameInput.value
    };
    data.push(newData);
    renderTable();
    form.reset();
});

function renderTable() {
    dataBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        const usernameCell = document.createElement('td'); // Create Username cell first
        usernameCell.textContent = item.username; // Assign username value
        const countryCell = document.createElement('td'); // Create Country cell
        countryCell.textContent = item.country; // Assign country value
        const dateCell = document.createElement('td'); // Create Date cell
        dateCell.textContent = item.date; // Assign date value
        const updateCell = document.createElement('td');
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => updateData(index));
        updateCell.appendChild(updateButton);
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteData(index));
        deleteCell.appendChild(deleteButton);
        // Append cells to row in desired order
        row.appendChild(usernameCell);
        row.appendChild(countryCell);
        row.appendChild(dateCell);
        row.appendChild(updateCell);
        row.appendChild(deleteCell);
        dataBody.appendChild(row);
    });
}

function updateData(index) {
    // Create a form dynamically
    const updateForm = document.createElement('form');
    const countryLabel = document.createElement('label');
    countryLabel.textContent = 'Updated Country:';
    const countryInput = document.createElement('input');
    countryInput.type = 'text';
    countryInput.required = true;
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Updated Date:';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.required = true;
    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Updated Username:';
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.required = true;
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    // Handle form submission
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedCountry = countryInput.value;
        const updatedDate = dateInput.value;
        const updatedUsername = usernameInput.value;
        // Check if all fields are provided and not empty
        if (updatedCountry.trim() !== '' && updatedDate.trim() !== '' && updatedUsername.trim() !== '') {
            // Update the data at the given index
            data[index].country = updatedCountry;
            data[index].date = updatedDate;
            data[index].username = updatedUsername;
            renderTable();
            // Remove the form from the DOM
            updateForm.remove();
        } else {
            alert('Please provide valid country, date, and username.');
        }
    });
    // Append form elements to the form
    updateForm.appendChild(usernameLabel);
    updateForm.appendChild(usernameInput);
    updateForm.appendChild(countryLabel);
    updateForm.appendChild(countryInput);
    updateForm.appendChild(dateLabel);
    updateForm.appendChild(dateInput);
    updateForm.appendChild(submitButton);

    // Append the form to the body
    document.body.appendChild(updateForm);
}

function deleteData(index) {
    data.splice(index, 1);
    renderTable();
}
