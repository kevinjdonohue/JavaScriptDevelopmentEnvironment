import './index.css';
import { getUsers, deleteUser } from './api/userApi';

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

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  Array.from(deleteLinks, link => {
    link.onclick = function (event) {
      event.preventDefault();

      const element = event.target;
      deleteUser(element.attributes["data-id"].value);

      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
