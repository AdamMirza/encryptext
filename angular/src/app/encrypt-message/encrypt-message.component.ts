import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-encrypt-message',
  templateUrl: './encrypt-message.component.html',
  styleUrls: ['./encrypt-message.component.css']
})
export class EncryptMessageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  encryptMessage(name, msg){

  }

}
