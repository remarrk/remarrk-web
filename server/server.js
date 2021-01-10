import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

import remarks from './routes/remark.js';

app.post('/add-remark', (req, res) => {
  remarks.addRemark(req.body).then(() => {
    res.send('Success!');
  });
});

app.get('/get-random-remark', (req, res) => {
  remarks.getRandomRemark().then((randomRemark) => {
    res.send(randomRemark);
  });
});

app.get('/get-tags', (req, res) => {
  remarks.getTags().then((tags) => res.send(tags));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
