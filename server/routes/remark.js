import db from '../db/firebase.js';

const addRemark = (body) => {
  let remark = {
    message: body.message,
    tags: body.tags,
  };
  return db.collection('remarks').add(remark);
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

export default {
  addRemark,
  getRandomRemark,
  getTags,
};
