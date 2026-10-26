const { default: z } = require("zod");

const productoFields = {
    nombre: z.string("Nombre es obligatorio").min(1, "Nombre es obligatorio"),
    precio: z.number("Precio debe ser un número").finite().nonnegative(),
    stock: z.number("Stock debe ser un entero").int().nonnegative(),
    categoriaId: z.number("ID de categoría debe ser un entero").int().positive(),
};
const productoSchema = z.object(productoFields);
const productoPatchSchema = z.object(Object.fromEntries(
    Object.entries(productoFields).map(([key, schema]) => [key, schema.optional()])
));

module.exports = { productoSchema, productoPatchSchema };
