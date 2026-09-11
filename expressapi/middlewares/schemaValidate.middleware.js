const schemaValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.safeParse(req.body);
        if (error) {
            const errors = error.issues.map((issue) => issue.message);
            return res.status(400).json({
                message: "Validation error",
                errors,
            });
        }
        next();
    }
}
module.exports = schemaValidate;