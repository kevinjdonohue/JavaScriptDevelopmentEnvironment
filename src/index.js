import './index.css';
import { getUsers } from './api/userApi';

getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody += `<div id="row">
                   <div id="column1"><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></div>
                   <div id="id">${user.id}</div>
                   <div id="firstName">${user.firstName}</div>
                   <div id="lastName">${user.lastName}</div>
                   <div id="email">${user.email}</div>
                </div>`
    });

    global.document.getElementById('users').outerHTML = usersBody;
});
