import db from "../db/firebase";

const addRemark = (remark) => {
    return db.collection('remarks')
            .add(remark);
}

const getRandomRemark = () => {
    return db.collection('remarks')
        .get();
}

module.exports = {
    addRemark,
    getRandomRemark,
}