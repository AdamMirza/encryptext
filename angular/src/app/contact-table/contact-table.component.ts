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
  }

}
