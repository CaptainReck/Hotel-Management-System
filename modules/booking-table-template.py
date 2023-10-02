import sqlite3

def Booking_table():
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
        
    cursor.execute('''
                    CREATE TABLE Booking_table (
                        Room_no  integer  PRIMARY KEY,
                        Room_type text,
                        name text,
                        email text,
                        number integer,
                        adults integer,
                        DATE date
                         )
                ''')

Booking_table()

def Room_table():
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
        
    cursor.execute('''
                    CREATE TABLE Room_table (
                        Room_no  integer ,
                        Room_type text,
                        Avaibility integer
                         )
                ''')




# conn = sqlite3.connect("my_database.db")
# cursor = conn.cursor()   
# insert_data = [
#         101, "standard room"  ,  1,
#         102, "standard room"  ,  1,
#         103, "standard room"  ,  1,
#         104, "standard room"  ,  1,
#         106, "standard room"  , 1,
#         107, "standard room"  , 1,
#         108, "standard room"  , 1,
#         109, "standard room"  , 1,
#         110, "standard room"  , 1,
#         111, "standard room"  , 1,
#         112, "standard room"  , 1,
#         113, "standard room"  , 1,
#         114, "standard room"  , 1,
#         115, "standard room"  , 1,
#         116, "standard room"  , 1,
#         117, "standard room"  , 1,
#         118, "standard room"  , 1,
#         119, "standard room"  , 1,
#         120, "standard room"  , 1,


#         201, "Deluxe room"  , 1,
#         202, "Deluxe room"  , 1,
#         203, "Deluxe room"  ,  1,
#         204, "Deluxe room"  ,  1,
#         206, "Deluxe room"  , 1,
#         207, "Deluxe room"  , 1,
#         208, "Deluxe room"  , 1,
#         209, "Deluxe room"  ,1,
#         210, "Deluxe room"  ,1,
#         211, "Deluxe room"  ,1,
#         212, "Deluxe room"  ,1,
#         213, "Deluxe room"  ,1,
#         214, "Deluxe room"  ,1,
#         215, "Deluxe room"  ,1,
#         216, "Deluxe room"  ,1,
#         217, "Deluxe room"  ,1,
#         218, "Deluxe room"  ,1,
#         219, "Deluxe room"  ,1,
#         220, "Deluxe room"  ,1,


#         301, "Premier suite"  ,1,
#         302, "Premier suite"  , 1,
#         303, "Premier suite"  , 1,
#         304, "Premier suite"  ,    1,
#         306, "Premier suite"  ,1,
#         307, "Premier suite"  ,1,
#         308, "Premier suite"  ,1,
#         309, "Premier suite"  ,1,
#         310, "Premier suite"  ,1,

#         401, "Executive suite"  ,1,
#         402, "Executive suite"  , 1,
#         403, "Executive suite"  , 1,
#         404, "Executive suite"  ,    1,
#         406, "Executive suite"  ,1,
#         407, "Executive suite"  ,1,
#         408, "Executive suite"  ,1,

#         ]

# for i in range (0,len(insert_data),3 ):
                                
#     cursor.execute('''INSERT INTO Room_table (Room_no , Room_type,Avaibility) 
#                     VALUES(?,?,?) ''',(insert_data[i],insert_data[i+1],insert_data[i+2] )  ) 
#     conn.commit()    



    