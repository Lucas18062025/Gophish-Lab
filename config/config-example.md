# Perfil SMTP de ejemplo — Mailpit local (sin credenciales)

> Copiar estos valores en GoPhish → **Sending Profiles → New Profile**.
> Nunca commitear credenciales reales (ver `.gitignore`: `sender_profile.json`,
> `smtp_credentials.txt`).

| Campo | Valor lab |
|---|---|
| Name | `Mailpit local` |
| Interface type | `SMTP` |
| SMTP From | `rrhh@acme-noa.test` (dominio ficticio) |
| Host | `127.0.0.1:1025` |
| Username / Password | *(vacío — Mailpit no pide auth)* |
| Ignore Certificate Errors | ✅ (solo lab) |

```bash
# Mailpit en Kali (Docker)
docker run -d --name mailpit -p 8025:8025 -p 1025:1025 \
  axllent/mailpit
# UI: http://127.0.0.1:8025  |  SMTP: 127.0.0.1:1025
```
