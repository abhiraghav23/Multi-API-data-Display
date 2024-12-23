const loadDataButton = document.getElementById('load-data-button');
const tableBody = document.querySelector('#api-data tbody');

function displayData(type, data) {
    const row = document.createElement('tr');
    const typeCell = document.createElement('td');
    const dataCell = document.createElement('td');
    
    typeCell.textContent = type;
    dataCell.textContent = JSON.stringify(data.slice(0, 5)); // Just displaying 
    
    row.appendChild(typeCell);
    row.appendChild(dataCell);
    tableBody.appendChild(row);
}

function PromiseAPI1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://dummyjson.com/posts')
                .then(response => response.json())
                .then(data => {
                    displayData('Posts', data.posts);
                    resolve();
                })
                .catch(error => reject('Failed to load posts: ' + error));
        }, 1000);
    });
}

function PromiseAPI2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://dummyjson.com/products')
                .then(response => response.json())
                .then(data => {
                    displayData('Products', data.products);
                    resolve();
                })
                .catch(error => reject('Failed to load products: ' + error));
        }, 2000);
    });
}

function PromiseAPI3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch('https://dummyjson.com/todos')
                .then(response => response.json())
                .then(data => {
                    displayData('Todos', data.todos);
                    resolve();
                })
                .catch(error => reject('Failed to load todos: ' + error));
        }, 3000);
    });
}

loadDataButton.addEventListener('click', function() {
    tableBody.innerHTML = '';
    
    PromiseAPI1()
        .then(() => PromiseAPI2())
        .then(() => PromiseAPI3())
        .catch(error => {
            const errorRow = document.createElement('tr');
            const errorCell = document.createElement('td');
            errorCell.colSpan = 2;
            errorCell.textContent = 'Error: ' + error;
            errorRow.appendChild(errorCell);
            tableBody.appendChild(errorRow);
        });
});
