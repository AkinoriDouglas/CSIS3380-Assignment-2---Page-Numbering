// Student Name: Akinori Ikeda
// Student Number: 300351701

const numberOfUsers = 55;
const resultsPerPage = 10;
const maxContactsPages = 20;

let listOfUsers = [];
const url = "https://randomuser.me/api/?results=53";


// To fetch users from the API by using plain javascript
function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    });
    return formattedDate; 
}

window.addEventListener('load', function() {
    // To fetch all users
    fetch(url)
    .then(response => response.json())
    .then(data => {

        listOfUsers = data.results;

        // To load the first 10 users
        loadContacts(0, 9);

        // To set the total number 
        document.querySelector(".page-header h3").innerHTML = 'Total: ' + data.results.length;

        if(data.results.length > resultsPerPage) {
            const paginationContainer = document.querySelector(".pagination");
            const numPages = Math.ceil(data.results.length / resultsPerPage);
            
            // To create a <ul> element to contain the pagination links
            const paginationList = document.createElement("ul");

            // To create a <li> element for each page and append it to the <ul> element
            for (let i = 1; i <= numPages; i++) {
                
                if(i > maxContactsPages) break;

                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.addEventListener("click", function() {
                    loadContacts((this.textContent - 1) * resultsPerPage, this.textContent * resultsPerPage - 1);
                });
                link.textContent = i; 
                listItem.appendChild(link);
                paginationList.appendChild(listItem);
            }

            // To append the <ul> element to the pagination container
            paginationContainer.appendChild(paginationList);
        }

    })
    .catch(error => console.error(error));
});

function loadContacts(start, end) {
    let domContent = "";

    // To create iteratations for each user
    for(let i = start; i <= end; i++) {
        if(listOfUsers[i] === undefined) break;
        let user = listOfUsers[i];
        domContent += `<li class="contact-item cf">
                <div class="contact-details">
                    <img class="avatar" src="${user.picture.thumbnail}">
                    <h3>${user.name.title +" "+ user.name.first +" "+ user.name.last}</h3>
                    <span class="email">${user.email}</span>
                </div>
                <div class="joined-details">
                    <span class="date">Joined ${formatDate(user.registered.date)}</span>
            </div>
            </li>`;
    }

    // To append the div to the container
    document.querySelector(".contact-list").innerHTML = domContent;
}


