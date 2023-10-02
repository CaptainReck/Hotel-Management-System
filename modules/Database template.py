import sqlite3

# Connect to or create a new database file
conn = sqlite3.connect("my_database.db")

# Create a cursor object to interact with the database
cursor = conn.cursor()

# Create a table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        email TEXT,
        password TEXT PRIMARY KEY
    )
""")

# Insert data into the table
cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", ("john@example.com","john_doe"))
cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", ("jane@example.com","jane_smith"))

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database created and data inserted successfully!")
