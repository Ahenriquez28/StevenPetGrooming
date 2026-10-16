> **ARCHIVED — NOT BUILT.** This describes a planned ASP.NET + Postgres back office that does not exist in this repo. The live system is documented in [../ARCHITECTURE.md](../ARCHITECTURE.md).

# API Contract

Base URL: `/api` (dev: `http://localhost:5080/api`). JSON everywhere.
Auth: `Authorization: Bearer <JWT>` — required on **everything except** the endpoints
marked **PUBLIC**. 401 when missing/expired.

Errors: non-2xx responses return `{ "error": "human readable message" }`.

## Auth
| Method & Path | Body → Response |
|---|---|
| `POST /auth/login` **PUBLIC** | `{email, password}` → `200 {token, email, displayName, isOwner}` \| `401` |
| `GET /auth/me` | → `{id, email, displayName, isOwner}` |
| `POST /auth/change-password` | `{currentPassword, newPassword}` → `204` \| `400` |

JWT: HS256, secret from env `JWT__SECRET`, 12h expiry, claims: `sub` (admin id), `email`, `name`.

## Admins
| Method & Path | Notes |
|---|---|
| `GET /admins` | → `[{id, email, displayName, isOwner, createdAt}]` |
| `POST /admins` | `{email, displayName, password}` → `201`. 409 if email taken. Password min 8 chars. |
| `DELETE /admins/{id}` | `204`. `403` if target IsOwner or is the caller themselves. |

## Bookings
| Method & Path | Notes |
|---|---|
| `POST /bookings` **PUBLIC** | The homepage form. Body: `{name, phone, email, address, dogName, dogBreed, service, preferredDate?, notes?}`. Validates name/email/phone required. **Upserts Customer by lowercase email** (see DATA-MODEL.md), creates BookingRequest (status New), then fire-and-forget emails: notification to owner + confirmation to customer — email failure must NOT fail the request. → `201 {bookingId}` |
| `GET /bookings?status=` | newest first, each row includes `{id, status, createdAt, dogName, dogBreed, serviceName, preferredDate, notes, customer: {id, name, email, phone, status}}` |
| `PATCH /bookings/{id}` | `{status}` → `200` |
| `DELETE /bookings/{id}` | `204` |

## Customers
| Method & Path | Notes |
|---|---|
| `GET /customers?status=&search=` | `status` = potential/current/finished (omit = all). `search` matches name/email/phone, case-insensitive. → `[{id, name, email, phone, address, status, subscribed, createdAt, bookingCount, lastBookingAt}]` newest first |
| `GET /customers/{id}` | → detail + `notes: [{id, body, authorName, createdAt}]` (newest first) + `bookings: [...]` (newest first) |
| `PATCH /customers/{id}` | any of `{name, phone, address, status, subscribed}` → `200`. 409 if changing email would collide (email edits allowed via `email` field too). |
| `DELETE /customers/{id}` | `204` (cascades notes + bookings) |
| `POST /customers/{id}/notes` | `{body}` → `201 {id, body, authorName, createdAt}` — authorName from JWT |
| `DELETE /customers/{id}/notes/{noteId}` | `204` |

Status values in JSON are lowercase strings: `"potential" | "current" | "finished"`.
Booking status likewise: `"new" | "contacted" | "scheduled" | "completed" | "cancelled"`.

## Inventory
| Method & Path | Notes |
|---|---|
| `GET /inventory` | → all items, sorted by Category then Name, each with computed `lowStock: bool` |
| `POST /inventory` | `{name, category, quantity, unit, unitCost, lowStockThreshold, notes}` → `201` |
| `PUT /inventory/{id}` | full update → `200` |
| `PATCH /inventory/{id}/adjust` | `{delta}` (int, can be negative; clamps at 0) → `200 {quantity}` |
| `DELETE /inventory/{id}` | `204` |

## Services
| Method & Path | Notes |
|---|---|
| `GET /services` **PUBLIC** | active only, by SortOrder → `[{id, name, description, priceLabel, basePrice, priceTiers: [{label, sublabel, price}] \| null}]` |
| `GET /services/all` | includes inactive |
| `POST /services` / `PUT /services/{id}` / `DELETE /services/{id}` | standard CRUD; body mirrors GET shape with `priceTiers` array + `sortOrder`, `active` |

## Finance
| Method & Path | Notes |
|---|---|
| `GET /finance/transactions?year=&month=&type=` | filters optional; newest first; includes `customerName` when linked |
| `POST /finance/transactions` | `{type: "income"\|"expense", category, description, amount, date, customerId?}` → `201` |
| `PUT /finance/transactions/{id}` | → `200` |
| `DELETE /finance/transactions/{id}` | `204` |
| `GET /finance/summary?year=` | → `{year, months: [{month: 1..12, income, expenses, net}], totalIncome, totalExpenses, totalNet, incomeByCategory: [{category, total}], expensesByCategory: [{category, total}]}` |

## Mailing
| Method & Path | Notes |
|---|---|
| `GET /mailing/recipients` | combined view of Customers + EmailContacts → `[{email, name, source: "customer"\|"manual", customerStatus?, subscribed, contactId?, customerId?}]` |
| `POST /mailing/contacts` | `{email, name}` → `201`. `409` if email already exists as Customer OR EmailContact. |
| `PATCH /mailing/contacts/{id}` | `{subscribed?, name?}` → `200` |
| `DELETE /mailing/contacts/{id}` | `204` |
| `POST /mailing/campaigns` | `{subject, bodyHtml, audience: "all"\|"potential"\|"current"\|"finished"\|"manual"}` → sends synchronously via SMTP, one message per recipient (BCC-free, personal To:). → `200 {recipientCount, failedCount}`. Stores an EmailCampaign row. |
| `GET /mailing/campaigns` | history, newest first |

## Misc
| Method & Path | Notes |
|---|---|
| `GET /health` **PUBLIC** | `200 {status: "ok"}` — also used by Docker healthcheck |

## CORS
Allowed origins from env `CORS__ORIGINS` (comma-separated).
Default: `https://luxepupsutah.com,http://localhost:5173`.
