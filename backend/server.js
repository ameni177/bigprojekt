const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlConnection = require('./db');

const app = express();
const port = 3001; // oder eine andere gewünschte Portnummer

app.use(cors());
app.use(bodyParser.json());

// Beispiel-Route, um Daten aus der Datenbank abzurufen
 app.get('/api/conferences', (req, res) => {
     mysqlConnection.query('SELECT * FROM databank.Conference1', (err, rows) => {
         if (err) {
             console.error('Error querying MySQL: ' + err.stack);
             res.status(500).send('Database query error');
             return;
         }
         console.log('Fetched rows:', rows);
        res.json(rows);
    });
 });



app.post('/api/conferences', (req, res) => {
    const { name, description, startdate, enddate, starttime, endtime, location, link, participant_emails } = req.body;

    const query = 'INSERT INTO databank.Conference1 (name, description, startdate, enddate, starttime, endtime, location, link, participant_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Assuming participant_emails is an array of strings
    participant_emails.forEach(email => {
        mysqlConnection.query(query, [name, description, startdate, enddate, starttime, endtime, location, link, email], (err, result) => {
            if (err) {
                console.error('Error inserting conference:', err);
                res.status(500).send('Error inserting conference');
                return;
            }
            console.log(`Inserted conference with email: ${email}`);
        });
    });

    res.status(201).send('Conference inserted successfully');
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
            }

            console.log('Inserted or updated user:', result);
        });
    });
});

app.post('/api/transactions', (req, res) => {
    const { amount, date, email } = req.body;
  
    const query = 'INSERT INTO transactions (amount, date, email) VALUES (?, ?, ?)';
    connection.execute(query, [amount, date, email], (err, results) => {
      if (err) {
        console.error('Fehler beim Einfügen der Daten:', err);
        res.status(500).send({ message: 'Fehler beim Einfügen der Daten' });
      } else {
        res.status(200).send({ message: 'Transaktion erfolgreich gespeichert!', results });
      }
    });
  });


// app.post('/api/data1', (req, res) => {
//     mysqlConnection.query('INSERT INTO test (id, user) VALUES (3, "erik")', (err, result) => {
//         if (err) {
//             console.error('Error querying MySQL: ' + err.stack);
//             res.status(500).send('Database query error');
//             return;
//         }
//         res.json("erfolgreich");
//     });
// });



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});