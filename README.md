# TODO App

## Front end (client)

- Accessibility - Should pass lighthouse accessibility test
- i18n - Should be available at least in 2 languages
- should have at least 2 routes
  - index - list all the todos categorized by day
  - :id - details & update a todo
  - [O] login
  - [O] register
- [O] PWA capable

## Back end (server)

- Create a todo
- Read a todo
  - filters
  - pagination
- Update a todo
- Delete a todo
- [O] Authentication
- [O] GraphQL endpoint
- [O] Bulk actions for update & delete

## Database

- 1 table for Todo entity
  - id
  - title
  - description
  - status
  - createdAt
  - updatedAt
  - [O] deletedAt (if soft delete)
  - [O] dueAt
  - [O] importance
  - [O] userId (if authentication)
- [O] 1 table for the users (if add authentication)
  - id
  - email
  - password
  - createdAt
  - updatedAt
  - [O] deletedAt (if soft delete)
