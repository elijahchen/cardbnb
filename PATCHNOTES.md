CHANGELOG

# v9
- Prevent an unauthenticated user from creating a listing
- Save and associate the original user to the listing

# v8
- Associated users and comments
- Save author's name to a comment automatically

# v7
- Refactored routes to their own stand alone files within a route directory

# v6
- Added authentication using passport.js
- Restricting routes if authentication is not met
- Added a user model to serialize and deserialize into database

# v5
- Added seeds to populate database
- Improved ui to be less jarring

# v4
- Now displaying all related comments on the detail/show page
- Created nested routes
- Added a new comment form that makes post db calls
- Added new and create routes for comments

# v3
- Created a models directory to separate the mongoose models involving the schema
- Included module.export to the models
- Added a seed file to populate the database

# v2
- Enabled data persistence
- Integrated mongoDB with mongoose for asynchronous calls
- Removed array library
- Replaced 'var' declarations with let and const for block-scoping

# v1
- Piping initial routes
- Created layout
- Reading and displaying a list of locations
- Styled ejs files, including forms and navigation