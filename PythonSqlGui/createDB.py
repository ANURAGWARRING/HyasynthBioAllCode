from psycopg2 import connect, extensions, sql

# declare a new PostgreSQL connection object
conn = connect(
dbname = "python_test",
user = "objectrocket",
host = "localhost",
password = "mypass"
)
DB_NAME = "some_new_database"
# object type: psycopg2.extensions.connection
print ("\ntype(conn):", type(conn))
# get the isolation leve for autocommit
autocommit = extensions.ISOLATION_LEVEL_AUTOCOMMIT
print ("ISOLATION_LEVEL_AUTOCOMMIT:", extensions.ISOLATION_LEVEL_AUTOCOMMIT)

# set the isolation level for the connection's cursors
# will raise ActiveSqlTransaction exception otherwise
conn.set_isolation_level( autocommit )
cursor = conn.cursor()

# use the execute() method to make a SQL request
cursor.execute('CREATE DATABASE ' + str(DB_NAME))
cursor.execute(sql.SQL(
"CREATE DATABASE {}"
).format(sql.Identifier( DB_NAME )))

# close the cursor to avoid memory leaks
cursor.close()

# close the connection to avoid memory leaks
conn.close()
