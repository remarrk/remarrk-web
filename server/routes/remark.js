import db from '../db/firebase.js';

const addRemark = async (message, tags) => {
  return db.collection('remarks').add({
    message: message,
    tags: tags,
  });
};

const getRandomRemark = async () => {
  return db
    .collection('remarks')
    .get()
    .then((snapshot) => {
      let remarks = snapshot.docs;
      let randIndex = Math.floor(Math.random() * remarks.length);
      return remarks[randIndex].data();
    });
};

const getTags = async () => {
  return db
    .collection('tags')
    .get()
    .then((snapshot) => {
      let tags = {};
      snapshot.docs.forEach((doc) => (tags[doc.data().tag] = false));
      return tags;
    });
};

const upvoteRemark = async (userId, remarkId) => {
  return db
    .collection('remarks')
    .doc(remarkId)
    .collection('votes')
    .doc(userId)
    .set({ score: 1 });
};

const downvoteRemark = async (userId, remarkId) => {
  return db
    .collection('remarks')
    .doc(remarkId)
    .collection('votes')
    .doc(userId)
    .set({ score: -1 });
};

const addFavourite = async (userId, remarkId) => {
  return db
    .collection('favourites')
    .doc(userId)
    .set({ [remarkId]: true }, { merge: true });
};

const getFavourites = async (userId) => {
  return db
    .collection('favourites')
    .doc(userId)
    .get()
    .then(async (f) => {
      let favIds = Object.keys(f.data());
      return db
        .collection('remarks')
        .get()
        .then((r) => {
          return r.docs.filter((doc) => favIds.includes(doc.id)).map((doc) => doc.data());
        });
    });
};

export default {
  addRemark,
  getRandomRemark,
  getTags,
  addFavourite,
  getFavourites,
  upvoteRemark,
  downvoteRemark,
};
