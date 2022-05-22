const { Router } = require("express");
const router = Router();
const sequelize = require('./../utils/database');
const { QueryTypes } = require('sequelize');

router.get("/", async (req, res) => {  
  try {
    let sql = 'SELECT * FROM test';
    const data = await sequelize.query(sql, {
      type: QueryTypes.SELECT
    });
    res.status(200).send({ data });
    
  } catch (err) {
    console.log('err', err);
    res.status(422).send({ error: err.message });
  }
});

router.post("/", (req, res) => {
  try {
    const { name, email, gender } = req.body;

    let sql = 'INSERT INTO `test`(`name`, `email`, `gender`) VALUES' + `("${name}", "${email || 'hhh'}", "${gender}")`;
    sequelize.query(sql, function (err, result) {
      if (err) throw err;   
    });

    res.status(200).send({ name, email, gender });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user_exists = await userExists(id)
    if(!user_exists){
      throw new Error("Can't finde user by this id")
    }
    let sql = 'DELETE FROM `test` WHERE id = ' + id;
    await sequelize.query(sql, {type: QueryTypes.DELETE});    
    res.status(200).send({ deleted_user_id: id });    
  } catch (err) {
    console.log(err);
    res.status(422).send({error: err.message});
  }
});

async function userExists(id){
  let sql = 'SELECT * FROM `test` WHERE id = ' + id;
  const result = await sequelize.query(sql, {type: QueryTypes.SELECT});
  return !!(result && result.length);
}

module.exports = router;
