const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'database-1.ch8iakcmiwic.eu-central-1.rds.amazonaws.com',
  user: 'admin',
  password: 'PartyKeller23!?',
  database: 'databank'
});

connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
    return;
  }
  console.log('Verbunden mit der MySQL-Datenbank');
  connection.end();
});
