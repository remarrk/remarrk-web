import db from '../db/firebase.js';

const addRemark = (remark) => {
  return db.collection('remarks').add(remark);
};

const getRandomRemark = () => {
  return db.collection('remarks').get();
};

const getTags = () => {
  return new Promise((resolve) => {
    db.collection('tags')
      .get()
      .then((snapshot) => {
        let tags = snapshot.docs.map((doc) => doc.data().tag);
        resolve(tags);
      });
  });
};

export default {
  addRemark,
  getRandomRemark,
  getTags,
};
