import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from '../services/routing.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    ngOnInit() {
    }
    submitMessage = '';
    register() {
        if (!this.username.value || !this.password.value) {
            this.submitMessage = `Username and Password are required`;
            return;
        }
        this.authService.registerUser({ UserName: this.username.value, Password: this.password.value })
            .subscribe(response => {
                let token = response[`token`];
                this.authService.saveSecurityToken(token);this.authService.saveUsername(this.username.value); this.routingService.navigateToDashboard();
            },
                error => { 
                    if(error.status === 404){this.submitMessage =`Http failure response for http://localhost:8089/api/register: 404 Not Found`    }
                    else if(error.status === 409){ this.submitMessage =`Username already exists`}
                    else{this.submitMessage = `Sorry! an error occured while processing your request. Please try after some time.`}        
                 });
    }
    constructor(private authService: AuthenticationService, private routingService: RoutingService) {
    }

}
