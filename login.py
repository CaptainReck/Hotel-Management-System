from flask import Flask, jsonify, request, redirect, session, render_template
from flask_session import Session
import modules.Data_functions as func
import secrets

app = Flask(__name__)

app.secret_key = 'ASDHFOT568As51@#'

# App route for the login page
@app.route("/")
def index():
    if session.get('is_verified')==True:
        return redirect('/protected-page')
    else:    
        return render_template('login_page.html')

# App route for getting the email id and password from the website
@app.route('/', methods=['POST'])
def login():
    data = request.get_json()
    
    if func.verify(data['email'], data['password']):
        session['is_verified'] = True
        response_data = {"verified": "yes"}
    else:    
        response_data = {"verified": "no"}
    return jsonify(response_data)

# App route for checking the user is verified when going to /protected-page 
@app.route('/protected-page', methods=['GET'])
def protected_page():
    if session.get('is_verified')==True:
        return render_template('index.html')
    else:
        return redirect('/')
    
# App route for getting the booking details from the website and returning the room no and message 
@app.route('/protected-page', methods=['POST'])
def booking_data():
        user_data = request.get_json()

        name=user_data["Name"]
        email=user_data["Email"]
        people=user_data["Number of People"]
        room_type=user_data["Room Type"]
        phone=user_data["Phone Number"]
        checkIn=user_data["CheckIn"]
        checkOut=user_data["CheckOut"]

        checkIn=func.date_reverse(checkIn)
        checkOut=func.date_reverse(checkOut)


        print(checkIn,checkOut)
        room_no=func.booking(name,email,people,phone,room_type)
        print (room_no)
        if room_no:
            return jsonify({"message":"Room Booked","Room No":room_no})
        else:
            return jsonify({"message":"Room Booking unsuccessfull"})

#App route for getting the user info for the employees
@app.route('/customer_info', methods=['GET'])
def customer_info_page():
    data=func.return_Mothertabledata()
    if session.get('is_verified'):
        # You can add logic here to fetch customer info or display forms.
        return render_template('details.html',data=data)
    else:
        return redirect('/')







if __name__ == '__main__':
    app.static_folder = 'static'
    app.run(host="0.0.0.0",port=5000,debug=True)

