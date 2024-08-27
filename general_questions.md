
**1.** What is the usage of Angular's Dependency Injection system 
, and how does it enhance modularity in an application? What are the different injection options?

**A**:
It allows us to inject service instance by class, abstract class or some string name. Which allows us to easily support singletone pattern. Releaves us from need to manually create or import created instance of service. 

Also it allows us to decouple controller and service as service can be injected via abstract class.

You can inject item in constructor or via `inject` method

**2.** Given a table called users with columns `id`, `name`, `email`, and `created_at`, write a query to find the top 10 users who have been recently created.
Describe how you would optimize this query if the table grows to over 1M records.

**A**:
```sql
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;
```

To optimize this query we can add index for `created_at` property

**3.** Explain the different categories of HTTP status codes and provide examples of status codes that fall under each category.

**A**:
- `1**`: informational response. For example we can send `102 Processing` to indicate that request takes too long and we still have no response but everything is working

- `2**`: sucessfull response. Used to provide information that request proceded sucessfully (`200` for sucessfull get or update request)

- `3**`: redirection response. For example, if we changed our app routing we can add `308` redirect response and redirect to updated route

- `4**`: client side errors. Invalid data from client side (`400`), problems with auth (`401`, `403`)

- `5**`: server errors. We use it then some unexpected error appeared on server like server unavailable (`503`) is not responding (`504`)

**4.** You have the following database tables:
```sql
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            created_at TIMESTAMP
);
          CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            product_name VARCHAR(100),
            amount DECIMAL(10, 2),
            order_date TIMESTAMP
);
```
Write a query resulting in the count of orders placed by each user in the past month, with the total amount spent by each user - only for VIP users, meaning, only for users with more than 5 orders.
Include the user’s name, email, order count, and total spent amount, and order the results by the big spender in descending order.

**A**:

```sql
SELECT
    u.name,
    u.email,
    COUNT(o.id) order_count,
    SUM(o.amount) total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
-- MySql syntax
WHERE o.order_date >= TIMESTAMPADD(MONTH, -1, NOW())
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 5
ORDER BY total_spent DESC;

```