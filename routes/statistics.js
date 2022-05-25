const { Router } = require("express");
const router = Router();
const sequelize = require("./../utils/database");
const { QueryTypes } = require('sequelize');


// const statistics = require("./../models/statistics");


router.post('/', async (req, res) => {   
   try{
    let sql = 'SELECT * FROM statistics';
    const statistics = await sequelize.query(sql, {
      type: QueryTypes.SELECT
    });    
    res.status(200).send({statistics})
   }
   catch(err){
       console.log(err);
       res.status(422).send({error: err.message})
   }
})

module.exports = router;