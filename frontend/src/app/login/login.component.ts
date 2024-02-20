import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from '../services/routing.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    ngOnInit() {
    }
    submitMessage = '';
    loginSubmit() {
        if (!this.username.value || !this.password.value) {
            this.submitMessage = `Username and Password are required`;
            return;
        }
        this.authService.loginUser({ UserName: this.username.value, Password: this.password.value })
            .subscribe(response => {
                let token = response[`token`];
                this.authService.saveSecurityToken(token); this.authService.saveUsername(this.username.value); this.routingService.navigateToDashboard();
            },
                error => { 
                    if(error.status === 404){this.submitMessage =`Http failure response for http://localhost:8089/api/authenticate: 404 Not Found`    }
                    else if(error.status === 403){this.submitMessage =`Unauthorized`}
                    else{this.submitMessage = `Sorry! an error occured while processing your request. Please try after some time.`}        
                 });
    }
    constructor(private authService: AuthenticationService, private routingService: RoutingService) {
    }

}
