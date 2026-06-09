import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/core/services/auth.service';
import { LoadingButtonComponent } from '@app/shared/components/loading-button/loading-button.component';

function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const p = group.get('password')?.value;
  const c = group.get('confirm')?.value;
  return p && c && p !== c ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    LoadingButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['../auth-shell.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  loading = signal(false);
  hide = signal(true);
  year = new Date().getFullYear();

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm: ['', [Validators.required]],
    },
    { validators: matchPasswords },
  );

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, password } = this.form.getRawValue();
    this.loading.set(true);
    this.auth.register({ name, email, password }).subscribe({
      next: (ok) => {
        this.loading.set(false);
        if (ok) {
          this.snack.open('Cadastro realizado! Faça login.', 'Fechar', { duration: 2500 });
          this.router.navigate(['/login']);
        } else {
          this.snack.open('Não foi possível cadastrar. E-mail já cadastrado?', 'Fechar', { duration: 3500 });
        }
      },
      error: () => this.loading.set(false),
    });
  }
}
