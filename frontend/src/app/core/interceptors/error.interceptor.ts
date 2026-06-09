import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);
  return next(req).pipe(
    catchError((err) => {
      const message =
        err?.error?.message ||
        (err?.status === 0
          ? 'Não foi possível conectar ao servidor.'
          : `Erro ${err?.status ?? ''}: tente novamente.`);
      snack.open(message, 'Fechar', { duration: 4000, panelClass: 'snack-error' });
      return throwError(() => err);
    }),
  );
};
