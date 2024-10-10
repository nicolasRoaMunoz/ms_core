import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    console.log('asdasdasdasd');
    
    res.send('1');
});

router.get('/', (req, res) => {
    res.send('2');
});


export default router;