import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {
  contacts: any[] = [];
  constructor() {
  }

  ngOnInit() {
    var user = getSession();

    if (user == null) {
      throw Exception;
    }

    console.log(user.user.contacts);
    for (let c of user.user.contacts) {
      this.contacts.push({
        'username': c.username,
        'public_key': c.public_key,
        'id': c.id
      });
    }
  }
}

function getSession() {
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  let cookie = getCookie('session')
  let session = JSON.parse(cookie)
  console.log(session)
  if(session)
    return session
  else
    return null;
}
