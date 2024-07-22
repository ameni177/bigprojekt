# WatchUs Projekt : Conference Management Tool

## Kurze Einführung ins Projekt
Unser Projekt ist ein umfassendes Konferenzmanagementsystem, das es Benutzern ermöglicht, Konferenzen zu erstellen, daran teilzunehmen und diese zu verwalten.
## Deployment Anleitung ((Zielgruppe Entwickler))

### Installation und Start

Um das Projekt lokal zu installieren und zu starten, folge diesen Schritten:

1. Klone das Repository:
   ```bash
   git clone https://github.com/ameni177/bigprojekt
   cd bigprojekt

2. Installiere die Abhängigkeiten für das Frontend:
   ```bash
   cd frontend
   npm install


3. Installiere die Abhängigkeiten für das Backend:
   ```bash
   cd ../backend
   npm install

4. Terminal 1: Starte das Backend::
   ```bash
   cd backend
   node server.js
5. Terminal 2: Starte das Frontend (localhost)
   ```bash
   cd ../frontend
   npm run dev
5. Terminal 2: Starte das Frontend (AWS EC2)
   ```bash
   cd ../frontend
   npm run dev -- --host

## Techstack

### Frontend
- **Programmiersprache:** Javascript
- **Framework:** React


### Backend
- **Programmiersprache:** JavaScript
- **Framework:** Node.js mit Express.js

### Datenbank
- **Datenbank:** AWS RDS MYSQL

### AWS
  - **AWS Dienste:** Amazon Cognito, Lambda und SES.


   

