import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router) {}
  ngOnInit() {
    console.log('hit');
  }

  loginUser(e) {
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    console.log(username, password);

    if (username == 'admin' && password == 'admin')
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
