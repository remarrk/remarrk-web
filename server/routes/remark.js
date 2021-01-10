import db from '../db/firebase.js';

const addRemark = (remark) => {
  return db.collection('remarks').add(remark);
};

const getRandomRemark = () => {
  return db.collection('remarks').get();
};

export default {
  addRemark,
  getRandomRemark,
};
