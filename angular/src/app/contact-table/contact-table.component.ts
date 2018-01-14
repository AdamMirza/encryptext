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
    var user = JSON.parse(localStorage.getItem('session'))

    if (!user) {
      return;
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
