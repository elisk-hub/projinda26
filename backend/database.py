import sqlite3
 
DB_PATH = "tasks.db"  # this files is created by SQL automaticly
 
# SQL code 
def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            title       TEXT    NOT NULL,
            completed   INTEGER DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()
 
 
init_db()  # Runs autoamticly when file is imported
 