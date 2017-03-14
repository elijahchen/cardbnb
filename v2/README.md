# cardbnb
A great website for vagabonds to find a temporary home, never worry about finding the next place to stay!

- Add landing page
- Add directory page that lists all locations
- Setup route to show form
- Add basic unstyled form

Each location has:
- Name
- Image

# Style - locations.ejs:
- Add a better header/title
- Make locations display in a grid

# Style - Navbar and Form:
- Add a navbar to all templates
- Style the new locations form

# Mongoose
- Include mongoose
- Interact with a Mongo Database using Mongoose
- Create schema and add to model inside of route

# Show Page
- Confirm RESTful routes are working and implemented
- Add description to our location model
- Show db.collection.drop()
- Add a show route/template

RESTFUL ROUTES
name    url         verb    desc.
=============================
INDEX   /dogs       GET     Display a list of all dogs
NEW     /dogs/new   GET     Display form to make a new dog
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog