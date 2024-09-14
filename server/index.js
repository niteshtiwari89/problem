// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const classSchema = new mongoose.Schema({
  className: String,
  section: Number,
  startTime: String,
  endTime: String,
  remarks: String
});

const ClassModel = mongoose.model('Class', classSchema);

app.post('/api/classes', async (req, res) => {
  try {
    const { className, section, startTime, endTime, remarks } = req.body;

    const newClass = new ClassModel({
      className,
      section,
      startTime,
      endTime,
      remarks
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error saving class:', error);
    res.status(500).send('Server error');
  }
});


const sessionSchema = new mongoose.Schema({
    session: String,
    section: Number,
    startTime: String,
    endTime: String,
    remarks: String
  });
  
  const SessionModel = mongoose.model('Session', sessionSchema);
  
  app.post('/api/session', async (req, res) => {
    try {
      const { session, section, startTime, endTime, remarks } = req.body;
  
      const newSession = new SessionModel({
        session,
        section,
        startTime,
        endTime,
        remarks
      });
  
      await newSession.save();
      res.status(201).json(newSession);
    } catch (error) {
      console.error('Error saving class:', error);
      res.status(500).send('Server error');
    }
  });

  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
