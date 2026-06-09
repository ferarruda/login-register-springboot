import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@app/core/services/auth.service";
import { LoadingButtonComponent } from "@app/shared/components/loading-button/loading-button.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LoadingButtonComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["../auth-shell.scss"],
})
export class LoginComponent {
  year = new Date().getFullYear();

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  loading = signal(false);
  hide = signal(true);

  form = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(4)]],
  });

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    this.auth
      .login({
        userId: this.form.getRawValue().email,
        password: this.form.getRawValue().password,
      })
      .subscribe({
        next: (ok) => {
          this.loading.set(false);
          if (ok) {
            this.snack.open("Login realizado com sucesso!", "Fechar", {
              duration: 2500,
            });
            this.router.navigate(["/dashboard"]);
          } else {
            this.snack.open("E-mail ou senha inválidos.", "Fechar", {
              duration: 3500,
            });
          }
        },
        error: () => this.loading.set(false),
      });
  }
}
