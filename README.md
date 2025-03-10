# Multi-Table Queries and Database Helpers
//comment.
## Topics

-   Joins
-   Database Queries
-   Knex Queries
-   Modular Code

## Assignment

For this lab you will

-   write SQL statements against the `northwind.db3` database. Once you have the correct SQL Statement for each query, write it inside the _queries.sql_ file under the corresponding comment.
-   write the db helper methods for the `schemes` resource in `./schemes/scheme-model.js`

### Multi Table Queries

Use a graphical tool like `SQLite Studio` to open `./data/northwind.db3` and execute the following queries:

-   Display the ProductName and CategoryName for all products in the database. Returns 77 records.
-   Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Returns 429 records.
-   Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Returns 3 records.
-   Display the OrderID, customer's Company Name and the employee's Last Name for every order. All columns should be labeled clearly. Returns 16,789 records.

### Database Methods

Write helpers methods in `./schemes/scheme-model.js` that match the following specifications:

-   `find()`:
    -   Calling find returns a promise that resolves to an array of all schemes in the database.
    -   No steps are included.
-   `findById(id)`:
    -   Expects a scheme `id` as its only parameter.
    -   Resolve to a single scheme object.
    -   On an invalid `id`, resolves to `null`.
-   `findSteps(id)`:
    -   Expects a scheme `id`.
    -   Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
    -   This array should include the `scheme_name` _not_ the `scheme_id`.
-   `add(scheme)`:
    -   Expects a scheme object.
    -   Inserts scheme into the database.
    -   Resolves to the newly inserted scheme, including `id`.
-   `update(changes, id)`:
    -   Expects a changes object and an `id`.
    -   Updates the scheme with the given id.
    -   Resolves to the newly updated scheme object.
-   `remove(id)`:
    -   Removes the scheme object with the provided id.
    -   Resolves to the removed scheme
    -   Resolves to `null` on an invalid id.
    -   (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)

#### Schemes Schema

| field       | data type        | metadata                                            |
| :---------- | :--------------- | :-------------------------------------------------- |
| id          | unsigned integer | primary key, auto-increments, generated by database |
| scheme_name | string           | required, unique                                    |

#### Steps Schema

| field        | data type        | metadata                                            |
| :----------- | :--------------- | :-------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| scheme_id    | unsigned integer | foreign key referencing scheme.id, required         |
| step_number  | unsigned integer | required                                            |
| instructions | string           | required                                            |

#### API

The following endpoints are available to test the functionality of the model methods.

-   `GET /api/schemes/` - gets master list of schemes (without steps)
-   `GET /api/schemes/:id` - gets a single scheme
-   `GET /api/schemes/:id/steps` - gets all steps for a given scheme, ordered correctly
-   `POST /api/schemes` - adds a new scheme
-   `PUT /api/schemes:id` - updates a given scheme
-   `DELETE /api/schemes/:id` - removes a given scheme and all associated steps

## Stretch Problems

-   In [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top):
    -   Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.
    -   Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.
-   Add the following method to your API
    -   `addStep(step, scheme_id)`: This method expects a step object and a scheme id. It inserts the new step into the database, correctly linking it to the intended scheme.
    -   You may use `POST /api/schemes/:id/addStep` to test this method.
