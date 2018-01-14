import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit() {
    console.log('hit');
  }

  loginUser(e) {
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    console.log(username,password);

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

    if(username == 'admin' && password == 'admin') {
      let elem: HTMLElement = document.getElementById('snd-header');
      elem.setAttribute("style", "display:none;");
      this.router.navigate(['dashboard']);
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
