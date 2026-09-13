# Runbook de campaña — "Viernes 12" (template reutilizable)

## 1. Alcance y consentimiento (antes de lanzar)

- [ ] Targets 100% internos y avisados (lista en GoPhish, jamás en Git).
- [ ] Autorización firmada del responsable (alcance, fecha, ventana horaria).
- [ ] Landing sin recolección real: credenciales de prueba o hash descartable.
- [ ] Plan de comunicación post-campaña (capacitación 1h + reporte anonimizado).

## 2. Piezas (versionadas en este repo)

| Pieza | Archivo |
|---|---|
| Email template (Acme, marca ficticia) | `templates/email-template.html` |
| Perfil SMTP Mailpit | `config/config-example.md` |
| Landing de capacitación | `index.html` (demo pública, sin captura) |

Variables GoPhish usadas: `{{.FirstName}}`, `{{.URL}}`, `{{.TrackingURL}}`.

## 3. Lanzamiento

1. Sending Profile → `Mailpit local` (`127.0.0.1:1025`).
2. Landing Page → importar `index.html` adaptada (form con `action` a GoPhish).
3. Users & Groups → solo cuentas de prueba (`usuario1@acme-noa.test`).
4. Campaign → launch, ventana recomendada 10:00–12:00.

## 4. Métricas y cierre

- Timeline referencia: Sent +10s Opened, +16s Clicked, +3m06s Submitted.
- Exportar a CSV vía API (anonimizar antes de archivar):

```bash
curl -s -H "Authorization: Bearer $GOPHISH_KEY" \
  "$GOPHISH_URL/api/campaigns/" \
  | jq -r '.[] | [.name, .stats.sent, .stats.opened, .stats.clicked, .stats.submitted] | @csv'
```

- Limpieza: borrar grupo de targets en GoPhish, rotar API key, archivar solo
  agregados en `report/` (nunca emails ni credenciales).
