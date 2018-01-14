import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-key',
  templateUrl: './private-key.component.html',
  styleUrls: ['./private-key.component.css']
})
export class PrivateKeyComponent implements OnInit {

  isVisible = false;
  keyCharArr: string[];

  constructor() {
    let stringy = "ASDFGHJKL";
    let tempArr = stringy.split('');

    for (character of tempArr) {
      keyCharArr.push({ 'char': character });
    }
  }

  ngOnInit() {
  }

  togglePkey() {
    isVisible = !isVisible;
    /* Get the private key from Mongo */
    /*var body = 'username=' + username + '&password=' + password;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post('/api',
        body, {
          headers: headers
        })
        .subscribe(data => {
              alert('ok');
              this.router.navigate(['dashboard']);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });*/

    let pkey = "123456789";
    let pkeyArray = pkey.split('');
  }

}
