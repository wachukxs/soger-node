delibrations: should controllers handle sending status codes?

todo: do type casting https://github.com/mysqljs/mysql#type-casting for buffer


since we want to filter orders by start and end date and is vegan:
I included a new column in the Orders table to indicate when the order should should be delivered, so users can book orders for future date. It's an option field, if it isn't provided, it's assumed to be a same day delivery
`DeliveryDate datetime NULL ,`


I had to re-write both SQL files, as there was some errors preventing all the queries from being executed

in SpicyMeats.sql
I moved the query to create Product table before OrderItem table since OrderItem table references the Product table, so Product table should be created first.


when filtering:
possible param values: [filterBy, maxValue, minValue]
possible values for filterBy: OrderDate & IsVegan
if filtering by OrderDate, maxValue, and minValue are date strings
if filtering by IsVegan, the only provide minValue [boolean]


in SeedData.sql ... just fixed the quotes, making OrderNumber strings


For FEAT: add items to an order
add products to an order that wasn't existing in the order