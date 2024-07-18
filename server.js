const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'edgelink_services'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Routes
app.post('/submit-career', upload.single('resume'), (req, res) => {
    const { name, email, phone, cover_letter } = req.body;
    const resume = req.file;

    // Read resume file as binary data
    const fs = require('fs');
    const resumeData = fs.readFileSync(resume.path);

    const query = 'INSERT INTO career_inquiries (name, email, phone, resume, cover_letter) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, resumeData, cover_letter], (err, result) => {
        if (err) throw err;
        res.send('Career inquiry submitted successfully!');
    });
});

app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contact_inquiries (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) throw err;
        res.send('Contact inquiry submitted successfully!');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
