# Development notes

- Follow the conventions already present in the project.
- Keep the Route → Controller → Service → Model separation.
- Use the supplied Sequelize models and their associations.
- Prefer normal HTML form submissions for simple forms.
- Keep the existing route prefix and view component structure.
- Avoid adding dependencies when the existing stack is sufficient.

## Development logging

For consistency with the development environment, every new
controller action should start with a lightweight debug log.

Use the following format:

console.log("[CTRL]", "<action>");

Use the action name as the value of `<action>`.