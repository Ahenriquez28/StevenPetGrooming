> **ARCHIVED — NOT BUILT.** This describes a planned ASP.NET + Postgres back office that does not exist in this repo. The live system is documented in [../ARCHITECTURE.md](../ARCHITECTURE.md).

# Data Model

PostgreSQL via EF Core (code-first, migrations in `backend/LuxePups.Api/Migrations/`).
All timestamps are `timestamptz` UTC. All money columns are `numeric` (C# `decimal`).
Emails are **always stored lowercase** — every lookup/dedupe rule below depends on that.

## AdminUser
Admins who can log into the admin panel (`#/admin`).

| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| Email | text, **unique** | lowercase |
| DisplayName | text | |
| PasswordHash | text | BCrypt |
| IsOwner | bool | seeded owner cannot be deleted |
| CreatedAt | timestamptz | |

Seeded on startup: `Luxepupsut@gmail.com` (IsOwner = true). Password comes from
env `ADMIN_SEED_PASSWORD` (only used when the row does not exist yet). Any admin can add
more admins; nobody can delete the owner or themselves.

## Customer
One row per real person — **no duplicates, ever**. Unique index on `Email`.

| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| Name | text | |
| Email | text, **unique** | lowercase |
| Phone | text | |
| Address | text | |
| Status | int enum | `0 Potential`, `1 Current`, `2 Finished` |
| Subscribed | bool | default true — included in mass emails |
| CreatedAt / UpdatedAt | timestamptz | |

**Lifecycle:** a public booking submission upserts by email. New email → new Customer with
status `Potential`. Existing email → update Name/Phone/Address to the freshest values,
**keep the existing Status**, and just attach a new BookingRequest. Admins move status
Potential → Current → Finished (any direction allowed, it's just a dropdown).

## CustomerNote
Free-form notes admins jot on a customer profile.

| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| CustomerId | FK → Customer, cascade delete | |
| Body | text | |
| AuthorName | text | display name of the admin who wrote it |
| CreatedAt | timestamptz | |

## BookingRequest
One per booking-form submission. Belongs to a Customer.

| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| CustomerId | FK → Customer, cascade delete | |
| DogName | text | |
| DogBreed | text | |
| ServiceName | text | snapshot of the service name at submission time |
| PreferredDate | date, nullable | |
| Notes | text | customer's own notes from the form |
| Status | int enum | `0 New`, `1 Contacted`, `2 Scheduled`, `3 Completed`, `4 Cancelled` |
| CreatedAt | timestamptz | |

## Service
Drives both the homepage services section and the booking form dropdown — the owner can
rename, reprice, add or retire services without code changes.

| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| Name | text | |
| Description | text | |
| PriceLabel | text | e.g. `From $65` — what the homepage shows |
| BasePrice | numeric | used for finance defaults |
| PriceTiersJson | text, nullable | JSON `[{"label":"XS","sublabel":"1–15 lbs","price":65}, …]` for size-tiered pricing |
| SortOrder | int | |
| Active | bool | inactive services disappear from the public site |

Seeded with the 4 current services (Luxury Spa Bath incl. its 6 size tiers, Luxe Touch Up,
The Luxe Groom, DeLuxe Groom Package).

## InventoryItem
| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| Name | text | |
| Category | text | free-form, e.g. "Shampoo", "Tools" |
| Quantity | int | |
| Unit | text | e.g. "bottles" |
| UnitCost | numeric | |
| LowStockThreshold | int | UI flags items at/below this |
| Notes | text | |
| UpdatedAt | timestamptz | |

## FinancialTransaction
| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| Type | int enum | `0 Income`, `1 Expense` |
| Category | text | free-form, e.g. "Grooming", "Supplies", "Fuel", "Deposit" |
| Description | text | |
| Amount | numeric | always positive; Type says direction |
| Date | date | |
| CustomerId | FK → Customer, nullable, **on delete set null** | optionally link income to a customer |
| CreatedAt | timestamptz | |

## EmailContact
Manually-added mailing list members who are *not* customers. Unique index on `Email`.
Adding an email that already exists as a Customer or EmailContact returns 409 — one list,
no copies.

| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| Email | text, **unique** | lowercase |
| Name | text | |
| Subscribed | bool | default true |
| CreatedAt | timestamptz | |

## EmailCampaign
History of mass sends.

| Column | Type | Notes |
|---|---|---|
| Id | int PK | |
| Subject | text | |
| BodyHtml | text | |
| Audience | text | `all` \| `potential` \| `current` \| `finished` \| `manual` |
| SentAt | timestamptz | |
| RecipientCount | int | |
| FailedCount | int | |
| FailedAddresses | text | comma-separated, for retry/debugging |

**Send-time recipient resolution** (dedupe happens here, by lowercase email):
- `all` → every subscribed Customer + every subscribed EmailContact
- `potential` / `current` / `finished` → subscribed Customers with that status
- `manual` → subscribed EmailContacts only
