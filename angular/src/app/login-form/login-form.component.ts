<<<<<<< HEAD
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

>>>>>>> 85f022447143ebe416aaaa5ed58a7fd9b61fc848
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

<<<<<<< HEAD
  constructor(private router: Router) {}
=======
  constructor(private router:Router, private http:HttpClient) { }

>>>>>>> 85f022447143ebe416aaaa5ed58a7fd9b61fc848
  ngOnInit() {
    console.log('hit');
  }

  loginUser(e) {
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    console.log(username, password);

<<<<<<< HEAD
    if (username == 'admin' && password == 'admin')
=======
    // GET
    // change URL
    // change UserObject interface (below) to include more variables
    this.http.get<UserObject>('https://api.github.com/users/seeschweiler').subscribe(
      data => {
        // Do logic in here
        console.log("You are in the request");
        console.log("Username: " + data.username);
        console.log("Password: " + data.password);
      },
      err => {
        console.log("Error occured.")
      }
    );

    // POST
    const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
      username: 'foo',
      password: 'bar',
      userId: 1
    }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );

    if(username == 'admin' && password == 'admin')
>>>>>>> 85f022447143ebe416aaaa5ed58a7fd9b61fc848
      this.router.navigate(['dashboard']);

    if (username.length > 0 && password.length > 0) {
      const req = HttpClientModule.get('localhost:3000/login', {
          username: username,
          password: password
        })
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Error occured");
          }
        );
    }




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
  }
}

interface UserObject {
  username: string;
  password: string;
}
