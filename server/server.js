import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

import remarks from './routes/remark.js';

app.post('/add-remark', (req, res) => {
  let message = req.body.message;
  let tags = req.body.tags;
  remarks.addRemark(message, tags).then(() => res.end());
});

app.get('/get-random-remark', (req, res) => {
  remarks.getRandomRemark().then((randomRemark) => {
    res.send(randomRemark);
  });
});

app.get('/get-tags', (req, res) => {
  remarks.getTags().then((tags) => res.send(tags));
});

app.post('/add-favourite', (req, res) => {
  let userId = req.body.userId;
  let remarkId = req.body.remarkId;
  remarks.addFavourite(userId, remarkId).then(() => res.end());
});

app.get('/get-favourites', (req, res) => {
  let userId = req.body.userId;
  remarks.getFavourites(userId).then((favs) => res.send(favs));
});

app.post('/upvote', (req, res) => {
  let userId = req.body.userId;
  let remarkId = req.body.remarkId;
  remarks.upvoteRemark(userId, remarkId).then(() => res.end());
});

app.post('/downvote', (req, res) => {
  let userId = req.body.userId;
  let remarkId = req.body.remarkId;
  remarks.downvoteRemark(userId, remarkId).then(() => res.end());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
