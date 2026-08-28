const schemaValidate = (schema, returnUrl) => {
    return (req, res, next) => {
        const { error } = schema.safeParse(req.body);
        if (error) {
            const errors = error.issues.map((issue) => issue.message);
            req.session.error = errors;
            if (returnUrl) {
                returnUrl = returnUrl.replace(':id', req.params.id);
            }
            res.redirect(returnUrl);
            return;
        }
        next();
    }
}
module.exports = schemaValidate;