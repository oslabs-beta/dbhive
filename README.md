# Welcome to dbHive! 🐝

## Table of Contents
- [About](#about)
- [Getting Started](#getting-started)
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## About
dbHive offers an interactive dashboard to visualize the performance of one or more PostgreSQL databases. By providing easily accessible information about the health and activity of a database, dbHive enables developers to make informed decisions that optimize the way they store their data.

## Getting Started
1. **Fork** and **clone** this [repository](https://github.com/oslabs-beta/dbhive) to your machine.
2. Navigate to the project directory and install dependencies.
```
npm install
```
3. Enter the following command to start up dbHive. 
```
npm start
```
6. Create an account on the sign up page.
7. Connect your database and get started!

## Features
### ➮ Query Execution Times
Get a broad sense of database performance by viewing average query times across the database, as well as averages for specific types of SQL queries. Pinpoint the slowest queries to gain insight for database improvement.
### ➮ Most Frequent Queries
To analyze common and recurring database activity, view charts on the most frequent queries within and across all query types.
### ➮ Other Key Stats
At a glance, gather other vital information, including:
- conflicts
- deadlocks
- rolled back transactions
- cache hit ratio
- block hits
- and more
### ➮ Access everything with a secure account
Maintain privacy and security with dbHive's required secure login. All database information and metrics are protected with encrypted accounts.
### ➮ Connect one or more databases
Easily access all databases and metrics within one place with the ability to toggle between multiple database dashboards.
### ➮ Customize database metrics dashboard
Use dropdowns to view more details on a given metric. Expand graphs to fill the screen. Adjust the fetch interval, the frequency at which the dashboard is updated with the latest metrics.
### ➮ Delete a database
Remove a database when it is no longer in use, keeping your dashboard clean.

## Testing
To conduct tests on the codebase, **fork** and **clone** this [repository](https://github.com/oslabs-beta/dbhive) to your machine, and then execute the command:
```
npm run test
```

## Future Enhancements
- **Search Feature:** Add a search bar to the dashboard that allows users to find data by keywords.
- **Expansion to Other Databases:** Make dbHive available for other databases besides PostgreSQL.
- **Comparing Schemas:** Allow users to compare the performance of alternate database schemas alongside their current schemas.
- **Additional Customization:** Give users more power to customize graphs and dashboard arrangement.

## Troubleshooting
If certain database metrics are not showing up in the dashboard, look into the database user's permissions. User permissions and admin privileges can vary depending on the database hosting service used.

## Contributing
Read our [contribution guide]() for more information on how to contribute to dbHive.

### Authors
- Melanie Forbes [@mforbz12](https://github.com/mforbz12) | [LinkedIn](https://www.linkedin.com/in/melanie-forbes-/)
- Elise McConnell [@enmcco](https://github.com/enmcco) | [LinkedIn](https://www.linkedin.com/in/elisemcconnell/)
- Brandon Miller [@bmiller1881](https://github.com/bmiller1881) | [LinkedIn](https://www.linkedin.com/in/brandon-j-miller/)
- Emily Paine [@erpaine](https://github.com/erpaine) | [LinkedIn](https://www.linkedin.com/in/emily-paine1/)
- Jeffery Richardson [@jrichardson-rn](https://github.com/jrichardson-rn) | [LinkedIn](https://www.linkedin.com/in/jeffery-richardson-ii-2ba819100/)
