const { Router } = require('express');
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'tempUploads/' });

const uploadImageCloud = require('../controllers/uploadImageCloud.controller');

router.get('/', function(req, res) {
  res.send({message: 'Hello World!'});
});

router.post('/uploadImage', upload.single('image'), uploadImageCloud)

module.exports = router;
