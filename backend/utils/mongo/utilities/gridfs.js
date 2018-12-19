const {
    GridFSBucket
} = require('mongodb');


module.exports = (client, dbName) => {
    /**
     * Helper function to retrieve grid fs bucket to work with gridfs
     */
    async function getBucket() {
        const db = (await client).db(dbName);
        return new GridFSBucket(db);
    }


    /**
     * Downloads file to the output stream
     * @param {Object} outputStream output stream
     * @param {String} filename name of the downloaded file
     */
    async function downloadFile(outputStream, filename) {
        const bucket = await getBucket();
        return new Promise((res, rej) => {
            bucket.openDownloadStreamByName(filename)
                .on('error', function(error) {
                    rej(error);
                })
                .pipe(outputStream)
                .on('error', function(error) {
                    rej(error);
                })
                .on('finish', function() {
                    res();
                });
        });
    }

    /**
     * Uploads file from the input stream
     * @param {Object} inputStream input stream
     * @param {String} filename name of the uploaded file
     */
    async function uploadFile(inputStream, filename) {
        const bucket = await getBucket();
        return new Promise((res, rej) => {
            inputStream
                .pipe(bucket.openUploadStream(filename))
                .on('error', function(error) {
                    rej(error);
                })
                .on('finish', function() {
                    res();
                });
        });
    }

    return {
        downloadFile,
        uploadFile
    };
};
