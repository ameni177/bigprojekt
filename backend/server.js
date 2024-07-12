const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlConnection = require('./db');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

 app.get('/api/conferences', (req, res) => {
     mysqlConnection.query('SELECT * FROM databank.Conference1', (err, rows) => {
         if (err) {
             console.error('Error querying MySQL: ' + err.stack);
             res.status(500).send('Datenbankabfragefehler');
             return;
         }
         console.log('Fetched rows:', rows);
        res.json(rows);
    });
 });

 app.get('/api/emails', (req, res) => {
    mysqlConnection.query('SELECT * FROM databank.Emails', (err, rows) => {
        if (err) {
            console.error('Fehler beim Abfragen von MySQL:', err.stack);
            res.status(500).send('Datenbankabfragefehler');
            return;
        }
        res.json(rows);
    });
});

app.post('/api/conferences', async (req, res) => {
    const { organisator,name, description, startdate, enddate, starttime, endtime, location, link, participant_emails } = req.body;

    const query = 'INSERT INTO databank.Conference1 (name, description, startdate, enddate, starttime, endtime, location, link, participant_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    participant_emails.forEach(email => {
        mysqlConnection.query(query, [name, description, startdate, enddate, starttime, endtime, location, link, email], (err, result) => {
            if (err) {
                console.error('Fehler beim Einfügen der Konferenz:', err);
                res.status(500).send('Fehler beim Einfügen der Konferenz');
                return;
            }
            console.log(`Konferenz mit E-Mail eingefügt: ${email}`);
        });
    });

    const apiGatewayEndpoint = 'https://hbxjaesw5b.execute-api.eu-central-1.amazonaws.com/sendemail';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    };
    
    try {
        const response = await fetch(apiGatewayEndpoint, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // E-Mails in der Datenbank speichern
        const bodytext = `You are invited to a conference: \n
        Name: ${name}
         Organisator: ${organisator}       
        Description: ${description}
        Date: ${startdate} to ${enddate}
        Time: ${starttime} to ${endtime}
        Location: ${location}
        Link: ${link}`;
        
        const emailQuery = 'INSERT INTO databank.Emails (subject, body, recipient) VALUES (?, ?, ?)';
        participant_emails.forEach(email => {
            mysqlConnection.query(emailQuery, [`Conference: ${name}`, bodytext, email], (err, result) => {
                if (err) {
                    console.error('Fehler beim Speichern der E-Mail:', err);
                }
            });
        });
        res.status(200).send('Emails sent and stored successfully');
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).send('Error sending emails');
    }
});

app.post('/api/benutzer', (req, res) => {
    const { email, vorname, nachname, adresse, telefonnummer } = req.body;

    const selectQuery = 'SELECT * FROM benutzer WHERE email = ?';
    mysqlConnection.query(selectQuery, [email], (err, results) => {
        if (err) {
            console.error('Error selecting user:', err);
            res.status(500).send('Error selecting user');
            return;
        }

        console.log('Current user data:', results);

        const query = `
            INSERT INTO benutzer (email, vorname, nachname, adresse, telefonnummer)
            VALUES (?, ?, ?, ?, ?)
            AS new
            ON DUPLICATE KEY UPDATE
            vorname = new.vorname,
            nachname = new.nachname,
            adresse = new.adresse,
            telefonnummer = new.telefonnummer
        `;

        mysqlConnection.query(query, [email, vorname, nachname, adresse, telefonnummer], (err, result) => {
            if (err) {
                console.error('Error inserting or updating user:', err);
                res.status(500).send('Error inserting or updating user');
                return;
            } else {
            console.log('Inserted or updated user:', result);
            res.status(200).send();
            };
        });
    });
});

app.get('/api/benutzer', (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).send('Email parameter is required');
    }

    const selectQuery = 'SELECT * FROM benutzer WHERE email = ?';
    mysqlConnection.query(selectQuery, [email], (err, results) => {
        if (err) {
            console.error('Error selecting user:', err);
            res.status(500).send('Error selecting user');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(results[0]);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});