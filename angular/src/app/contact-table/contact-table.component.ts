import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {

  characters = [
      'Finn the human',
      'Jake the dog',
      'Princess bubblegum',
      'Lumpy Space Princess',
      'Beemo1',
      'Beemo2'
    ];
  contacts = [{
    'username': 'Finn', 'public_key': 'qwer6...'
  },
  {
    'username': 'Jake', 'public_key': 'huv2h...'
  },
  {
    'username': 'Lumpy', 'public_key': '7v84j...'
  }];
  constructor() { }

  ngOnInit() {
    let user = getSession();

    if (user == null) {
      throw Exception;
    }

    console.log(user[0].username);
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
    let cookie = getCookie('session');
    let session = JSON.parse(cookie);
    console.log(session);
    if(session)
      return session;
    else
      return null;
  }

}
