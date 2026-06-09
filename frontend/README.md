# Angular Login & Register — SaaS UI

Frontend Angular 20 (standalone) com Angular Material para o backend Spring Boot
[`login-register-springboot`](https://github.com/ferarruda/login-register-springboot).

## Endpoints consumidos
- `POST /addUser`     — cadastro
- `POST /loginUser`   — login (retorna `boolean`)

Configure a URL do backend em `src/environments/environment.ts` (`apiUrl`).
Padrão: `http://localhost:8080`.

## Como rodar

```bash
npm install
npm start
# abre em http://localhost:4200
```

## Estrutura

```
src/app/
├── core/
│   ├── guards/auth.guard.ts
│   ├── interceptors/error.interceptor.ts
│   ├── models/user.model.ts
│   └── services/auth.service.ts
├── features/
│   ├── auth/
│   │   ├── auth-shell.scss
│   │   ├── login/
│   │   └── register/
│   └── dashboard/
├── shared/components/loading-button/
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

## Fluxo
1. `Cadastro` → `POST /addUser` → redireciona para `/login`.
2. `Login` → `POST /loginUser`. Se `true`, salva sessão no `localStorage` e vai para `/dashboard`. Se `false`, mostra erro.
3. `Dashboard` é protegido por `authGuard`. Botão de logout limpa a sessão.

## CORS no backend (Spring Boot)
Adicione no controller (ou config global):

```java
@CrossOrigin(origins = "http://localhost:4200")
```

## Stack
- Angular 20 standalone components + signals
- Angular Material (tema azul)
- Reactive Forms com validações
- HttpClient + interceptor de erros
- Lazy loading por rota
- Responsivo (desktop e mobile)
