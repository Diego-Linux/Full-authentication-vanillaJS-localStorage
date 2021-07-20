// HOME PAGE CODE =>
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalCustomerStorage = () => JSON.parse(localStorage.getItem('db_customer')) ?? []
const setLocalCustomerStorage = (dbCustomer) => localStorage.setItem("db_customer", JSON.stringify(dbCustomer))

// CRUD - create read update delete
const deleteCustomer = (index) => {
    const dbCustomer = readCustomer()
    dbCustomer.splice(index, 1)
    setLocalCustomerStorage(dbCustomer)
}

const updateCustomer = (index, customer) => {
    const dbCustomer = readCustomer()
    dbCustomer[index] = customer
    setLocalCustomerStorage(dbCustomer)
}

const readCustomer = () => getLocalCustomerStorage()

const createCustomer = (customer) => {
    const dbCustomer = getLocalCustomerStorage()
    dbCustomer.push(customer)
    setLocalCustomerStorage(dbCustomer)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interaction with the layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveCustomer = () => {
    if (isValidFields()) {
        const customer = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
        }
        const index = document.getElementById('name').dataset.index
        if (index == 'new') {
            createCustomer(customer)
            updateTable()
            closeModal()
        } else {
            updateCustomer(index, customer)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (customer, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Edit</button>
            <button type="button" class="button red" id="delete-${index}" >Delete</button>
        </td>
    `
    document.querySelector('#tableCustomer>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableCustomer>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbCustomer = readCustomer()
    clearTable()
    dbCustomer.forEach(createRow)
}

const fillFields = (customer) => {
    document.getElementById('name').value = customer.name
    document.getElementById('email').value = customer.email
    document.getElementById('name').dataset.index = customer.index
}

const editCustomer = (index) => {
    const customer = readCustomer()[index]
    customer.index = index
    fillFields(customer)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editCustomer(index)
        } else {
            const customer = readCustomer()[index]
            const response = confirm(`Do you really want to delete the register "${customer.name}"?`)
            if (response) {
                deleteCustomer(index)
                updateTable()
            }
        }
    }
}

userLogout = () => {
    localStorage.removeItem('myToken');
    location.href = "login.html"
}

updateTable()

// Events
document.getElementById('createCustomer')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cancel')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveCustomer)

document.querySelector('#tableCustomer>tbody')
    .addEventListener('click', editDelete)

document.getElementById('logout')
    .addEventListener('click', logoutUser)