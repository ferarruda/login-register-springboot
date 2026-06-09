import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "@env/environment";
import {
  LoginRequest,
  RegisterRequest,
  SessionUser,
} from "../models/user.model";

const STORAGE_KEY = "auth.session";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  readonly user = signal<SessionUser | null>(this.readSession());

  register(payload: RegisterRequest): Observable<any> {
    return this.http.post(`${this.api}/addUser`, payload);
  }

  login(payload: LoginRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}/loginUser`, payload).pipe(
      tap((ok) => {
        if (ok) this.persistSession({ email: payload.userId });
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.user.set(null);
  }

  isAuthenticated(): boolean {
    return this.user() !== null;
  }

  private persistSession(user: SessionUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.user.set(user);
  }

  private readSession(): SessionUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SessionUser) : null;
    } catch {
      return null;
    }
  }
}
