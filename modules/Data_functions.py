import sqlite3
import datetime





def verify(email,password):
    conn=sqlite3.connect("my_database.db")
    cursor=conn.cursor()

    cursor.execute("Select * FROM users")
    r=cursor.fetchall()
    for i in r:
        if email==i[0] and password==i[1]:
            return True
    return False    




def booking( name,email,adults,number,room_type):
    #Finding the current date and time
    current_datetime= datetime.datetime.now()
    date = current_datetime.strftime("%Y-%m-%d %H:%M:%S.%f")    
    
    
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
        
    cursor.execute("SELECT * FROM Room_table")

    r= cursor.fetchall()
    
    i=0
    while i<=(len(r) - 1):
        if r[i][1] == room_type  and r[i][2] == 1:
            #Inserting values in the booking table
            cursor.execute('''INSERT INTO  Booking_table(Room_no , Room_type , name , email , number , adults , DATE) 
                           VALUES(?,?,?,?,?,?,?)  ''' , (  r[i][0] ,r[i][1] , name , email , number , adults , current_datetime ))
            
            #Updating the Avaibility of the room 
            cursor.execute(''' UPDATE Room_table SET Availability = ? WHERE Room_no = ? ''' ,(0,r[i][0]))

            #Inserting values in the mother table
            cursor.execute('''INSERT INTO  Mother_table(name,phone_no , email_id , Room_type , Room_no ,check_in , check_out , Paid_Amount ) 
                           VALUES(?,?,?,?,?,?,?,?)  ''' , ( name, number,email,r[i][1],r[i][0] , date , "--", 0  ))
            
            conn.commit()
            return(r[i][0])
            break
        else:
            i=i+1
    return None           

def check_out(Room_no):
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
    current_datetime = datetime.datetime.now() 
    print(Room_no)
    cursor.execute("DELETE FROM Booking_table WHERE Room_no = ?" , (Room_no,))

    #inserting values into the mother table
    cursor.execute(''' UPDATE Mother_table  SET check_out = ? WHERE Room_no = ?''' ,(current_datetime,Room_no))
    

    cursor.execute(''' UPDATE Room_table SET Avaibility = ? WHERE Room_no = ?''' ,(1,Room_no))
    conn.commit()
    print("Room now Available")

def return_Mothertabledata():
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM Mother_table''')
    data=cursor.fetchall()
    l=[]
    for i in data:
        k={"name":i[0],"phone":i[1],"email":i[2],"room_no":i[3],"room_type":i[4],"check_in":i[5],"check_out":i[6],"amount":i[7]}
        l.append(k)

    conn.commit()
    return l

def date_reverse(input_date):
    from datetime import datetime

    # Convert to a datetime object
    date_object = datetime.strptime(input_date, "%Y-%m-%d")

    # Format the date as "dd-mm-yyyy"
    formatted_date = date_object.strftime("%d-%m-%Y")

    return formatted_date



          
       
        
            
        


