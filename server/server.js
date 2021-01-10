import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

import remarks from './routes/remark.js';

app.post('/add-remark', (req, res) => {
  let remark = {
    message: req.body.message,
    tags: req.body.tags,
  };
  remarks.addRemark(remark).then(() => {
    res.end();
  });
});

app.get('/get-random-remark', (req, res) => {
  remarks.getRandomRemark().then((snapshot) => {
    let remarks = snapshot.docs;
    let randIndex = Math.floor(Math.random() * remarks.length);
    res.send(remarks[randIndex].data());
  });
});

app.get('/get-tags', (req, res) => {
  remarks.getTags().then((tags) => res.send(tags));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
