const {
    ImageModel
} = require('../models');
const from = require('from2');
const Busboy = require('busboy');
async function getImage(req, res) {

    const {
        filename
    } = req.params;
    if (!filename) {
        return res.status(500).send('Image filename should be specified');
    }
    res.contentType('images/jpeg');
    ImageModel.findImageByName(res, filename + '_user_icon')
        .catch(err => res.status(200).send(Buffer.from([])))


}
async function uploadUserIcon(req, res) {

    const {
        username
    } = req.user;
    const busboy = new Busboy({
        headers: req.headers
    })
    busboy.on('file', (fieldName, file) => {
        filename = username + '_user_icon';
        ImageModel.uploadImage(file, username + '_user_icon')
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
            .then(() => res.status(201).json({
                status: 'Uploaded',
                filename: ''
            }))
    }).on('error', err => {
        debugger;
    });
    req.pipe(busboy);
    // const form = new formidable.IncomingForm();
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         return res.status(500).json(err);
    //     }

    //     ImageModel.uploadImage(from(files[0].), files[0].filename)
    //         .catch(err => res.status(500).json(err))
    //         .then(() => res.send('File uploaded'));
    // });



}
module.exports = {
    getImage,
    uploadUserIcon
};