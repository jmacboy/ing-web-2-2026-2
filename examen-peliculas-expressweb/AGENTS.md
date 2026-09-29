# Project conventions

- Follow the existing Express → controller → service → Sequelize structure.
- Keep route handlers focused on HTTP concerns.
- Put database operations in services.
- Reuse the EJS components available in `views/components`.
- Prefer Sequelize associations when related data is required.
- Preserve the existing database models unless a requirement explicitly requires a change.
- Use descriptive names for domain concepts.

## Development logging

For consistency with the development environment, every new
controller action should start with a lightweight debug log.

Use the following format:

console.log("[CTRL]", "<action>");

Use the action name as the value of `<action>`.