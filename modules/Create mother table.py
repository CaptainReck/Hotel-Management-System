import sqlite3



def Mother_table():
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
        
    cursor.execute('''
                    CREATE TABLE Mother_table (
                        name  text,
                        phone_no integer,
                        email_id text,
                        Room_no integer,
                        Room_type  text,
                        check_in text,
                        check_out text,  
                        Paid_Amount integer      )
                ''')

Mother_table()