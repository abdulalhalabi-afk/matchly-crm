# Matchly CRM Backend

Professionelle CRM-Backend für Kontakt- und Service-Verwaltung mit Express, TypeScript und SQLite.

## Installation

```bash
npm install
```

## Konfiguration

Erstelle `.env` Datei basierend auf `.env.example`:

```env
PORT=3001
NODE_ENV=development
DATABASE_PATH=./db/crm.db
```

## Datenbank

### Initialisieren
```bash
npm run db:init
```

### Mit Beispieldaten befüllen
```bash
npm run db:seed
```

## Development

```bash
npm run dev
```

Server läuft auf `http://localhost:3001`

## Produktion

```bash
npm run build
npm start
```

## API Endpoints

### Organisationen
- `GET /api/organizations` - Alle Organisationen
- `POST /api/organizations` - Neue Organisation
- `GET /api/organizations/:id` - Details
- `PUT /api/organizations/:id` - Aktualisieren
- `DELETE /api/organizations/:id` - Löschen

### Kontakte
- `GET /api/contacts?status=active&search=müller` - Alle Kontakte (mit Filter)
- `POST /api/contacts` - Neuer Kontakt
- `GET /api/contacts/:id` - Details
- `PUT /api/contacts/:id` - Aktualisieren
- `DELETE /api/contacts/:id` - Löschen

### Service Tickets
- `GET /api/tickets?status=open&priority=high` - Alle Tickets
- `POST /api/tickets` - Neues Ticket
- `GET /api/tickets/:id` - Details
- `PUT /api/tickets/:id` - Aktualisieren
- `DELETE /api/tickets/:id` - Löschen

### Termine
- `GET /api/appointments?type=meeting` - Alle Termine
- `POST /api/appointments` - Neuer Termin
- `GET /api/appointments/:id` - Details
- `PUT /api/appointments/:id` - Aktualisieren
- `DELETE /api/appointments/:id` - Löschen

### Notizen & Aktivitäten
- `GET /api/notes?contactId=:id` - Aktivitätshistorie
- `POST /api/notes` - Neue Notiz
- `GET /api/notes/:id` - Details
- `PUT /api/notes/:id` - Aktualisieren
- `DELETE /api/notes/:id` - Löschen

## Datenmodelle

### Organization
- `id` (UUID) - Eindeutige ID
- `name` - Organisationsname
- `email` - Email
- `phone` - Telefon
- `website` - Webseite
- `address` - Adresse
- `city` - Stadt

### Contact
- `id` (UUID)
- `organizationId` - Zugehörige Organisation
- `firstName` - Vorname
- `lastName` - Nachname
- `email` - Email
- `phone` - Telefon
- `position` - Position
- `status` - active|inactive|lead
- `tags` - Comma-separated tags
- `notes` - Notizen

### ServiceTicket
- `id` (UUID)
- `contactId` - Zugeordneter Kontakt
- `title` - Titel
- `description` - Beschreibung
- `status` - open|in_progress|resolved|closed
- `priority` - low|medium|high|urgent
- `dueDate` - Fälligkeitsdatum
- `assignedTo` - Zugewiesen an

### Appointment
- `id` (UUID)
- `contactId` - Zugeordneter Kontakt
- `title` - Titel
- `description` - Beschreibung
- `startDate` - Startzeit
- `endDate` - Endzeit
- `location` - Ort
- `type` - meeting|call|email|task

### ActivityNote
- `id` (UUID)
- `contactId` - Zugeordneter Kontakt
- `content` - Inhalt
- `type` - call|email|meeting|note|task
- `createdAt` - Erstellungsdatum

## License

MIT
