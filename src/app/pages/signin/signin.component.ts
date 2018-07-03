import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  userForm: FormGroup;
  formErrors = {
    email: '',
    password: ''
  };
  validationMessages = {
    email: {
      required: 'Digite email',
      email: 'Informe email corretamente'
    },
    password: {
      required: 'Digite senha',
      pattern: 'Deve conter números e letras.',
      minlength: 'Mínimo 5 caracteres.',
      maxlength: 'Máximo 25 caracteres.'
    }
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  signInWithGoogle() {
    this.auth.googleLogin().then(() => this.afterSignIn());
  }

  signInWithGithub() {
    this.auth.githubLogin().then(() => this.afterSignIn());
  }

  signInWithEmail() {
    this.auth
      .emailLogin(this.userForm.value['email'], this.userForm.value['password'])
      .catch(error => console.log('erro', error));
  }

  signInAnonymously() {
    this.auth.anonymousLogin().then(() => this.afterSignIn());
  }

  login() {
    this.signInWithEmail();
  }

  private afterSignIn() {
    this.router.navigate(['/']);
  }
}
