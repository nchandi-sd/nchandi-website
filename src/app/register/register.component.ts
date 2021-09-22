import { Component } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { Router, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = "";
  successMessage = "";

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async tryFacebookLogin() {
    await this.authService.doFacebookLogin().then(
      (res) => {
        this.router.navigate(["/user"]);
      },
      (err) => console.log(err)
    );
  }

  async tryTwitterLogin() {
    await this.authService.doTwitterLogin().then(
      (res) => {
        this.router.navigate(["/user"]);
      },
      (err) => console.log(err)
    );
  }

  async tryGoogleLogin() {
    await this.authService.doGoogleLogin().then(
      (res) => {
        this.router.navigate(["/user"]);
      },
      (err) => console.log(err)
    );
  }

  async tryRegister(value) {
    await this.authService.doRegister(value).then(
      (res) => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        this.tryLogin(value);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }

  private tryLogin(value) {
    this.authService.doLogin(value).then(
      (res) => {
        this.router.navigate(["/user"]);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }
}
