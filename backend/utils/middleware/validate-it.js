/**
 * Validates values from body
 * @param {Object} schema schema object
 * @param {Object} req request object
 */
async function validateBody(schema, req) {
    await schema.body.validate(req.body);
}

/**
 * Validates values from query params
 * @param {Object} schema schema object
 * @param {Object} req request object
 */
async function validateQuery(schema, req) {
    const queries = schema.query;
    await (async function() {
        for (const key of Object.keys(queries)) {
            await queries[key].validate(req.query[key]);
        }
    })();
}


module.exports = (schema) => async (req, res, next) => {
    try {
        await (async function validate() {
            for (key of Object.keys(schema)) {
                switch (key) {
                case 'body':
                    await validateBody(schema, req);
                    break;
                case 'query':
                    await validateQuery(schema, req);
                    break;
                }
            }
        })();
        next();
    } catch (err) {
        next(JSON.stringify(err.details));
    }
};
