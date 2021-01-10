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
    .then((snapshot) => {
      return Object.values(snapshot.data());
    });
};

export default {
  addRemark,
  getRandomRemark,
  getTags,
  addFavourite,
  getFavourites,
};
