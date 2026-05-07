import sqlite3
 
DB_PATH = "tasks.db"  # this files is created by SQL automaticly
 
# SQL code 
def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            title       TEXT    NOT NULL,
            description TEXT,
            deadline    TEXT,
            priority    INTEGER DEFAULT 2,
            completed   INTEGER DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()
 
 
init_db()  # Runs autoamticly when file is imported

# Sorts tasks by:
# 1. Incomplete tasks first
# 2. Priority (High → Medium → Low)
# 3. Tasks with deadlines before tasks without
# 4. Nearest deadline first
def get_all_tasks():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("""
        SELECT * FROM tasks
        ORDER BY
            completed ASC,
            priority ASC,
            CASE WHEN deadline IS NULL THEN 1 ELSE 0 END,
            deadline ASC
    """).fetchall()
    conn.close()
    return [dict(row) for row in rows]      # Convert each row to a plain dict

def create_task(data: dict):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.execute(
        "INSERT INTO tasks (title, description, deadline, priority) VALUES (?, ?, ?, ?)",
        (data["title"], data.get("description"), data.get("deadline"), data.get("priority", 2))
    )
    # Fetch the newly created task and return it
    conn.commit()
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (cur.lastrowid,)).fetchone()
    conn.close()
    return dict(row)
 
 
def update_task(task_id: int, data: dict):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # Build the SQL dynamically based on which fields were sent
    fields = ", ".join(f"{key} = ?" for key in data)
    values = list(data.values()) + [task_id]
    conn.execute(f"UPDATE tasks SET {fields} WHERE id = ?", values)
    conn.commit()
    # Fetch and return the updated task
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    conn.close()
    return dict(row) if row else None
 
 
def delete_task(task_id: int):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return cur.rowcount > 0     # Returns True if a row was deleted, False if id didn't exist
 

def get_today_tasks():
    from datetime import date
    today = date.today().isoformat()  # Ger "2026-05-07"
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("""
        SELECT * FROM tasks
        WHERE completed = 0
          AND deadline IS NOT NULL
          AND deadline <= ?
        ORDER BY priority ASC, deadline ASC
    """, (today,)).fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_week_tasks():
    from datetime import date, timedelta
    today = date.today().isoformat()
    week_end = (date.today() + timedelta(days=7)).isoformat()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("""
        SELECT * FROM tasks
        WHERE completed = 0
          AND deadline IS NOT NULL
          AND deadline >= ?
          AND deadline <= ?
        ORDER BY deadline ASC, priority ASC
    """, (today, week_end)).fetchall()
    conn.close()
    return [dict(row) for row in rows]