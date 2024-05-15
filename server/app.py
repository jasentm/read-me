#!/usr/bin/env python3
from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models import User, Lesson, LessonStatistics, Reading, TarotCard


# Views go here!

# routes for login and user authentication 
#TODO - look into JWT and other Authentication Packages 
@app.route('/users', methods=['POST']) #sign up route
def signup():
        data = request.json
        new_user = User(
             username=data.get('username'),
             email=data.get('email')
         ) #create new user instance 
        new_user.password_hash = data.get('password')  # Set the password_hash using the setter
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id #set session hash to user id to keep logged in
        response = make_response(new_user.to_dict())
        response.set_cookie('user_id', str(new_user.id))

        #TODO ADD INSTANTIATING LESSON STATS FOR USER FOR ALL LESSONS
        return response, 201

@app.route('/logout')
def logout():
    session['user_id'] = None #clear session hash
    response = make_response({})
    response.delete_cookie('user_id')
    return response, 200

@app.route('/authenticate-session') #route for authentication 
def authorize():
    cookie_id = request.cookies.get('user_id')  
    if cookie_id:
        user = User.query.filter_by(id=cookie_id).first() #check to see if cookie matches current user id
        if user:
            return make_response(user.to_dict(only=['id', 'username'])), 200
    return make_response({'message': 'failed to authenticate'}), 401

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first() #check to see if username exists in db
    password = data.get('password') 
    if user and user.authenticate(password): #check entered password against encrypted password in db 
        session['user_id'] = user.id 
        response = make_response(user.to_dict())
        response.set_cookie('user_id', str(user.id))
        return response, 200
    return make_response({'message': 'Invalid username or password'}), 401

@app.route('/tarot-cards')
def get_tarot():
     tarot_cards = [card.to_dict(rules=('-future_readings', '-lesson', '-lesson_id', '-past_readings', '-present_readings')) for card in TarotCard.query.all()]
     return make_response(tarot_cards)


@app.route('/tarot-cards/<int:id>')
def get_individual_card(id):
    card = TarotCard.query.filter(TarotCard.id == id).first()
    if card:
         return make_response(card.to_dict(rules=('-future_readings', '-lesson', '-lesson_id', '-past_readings', '-present_readings')))
    else:
         return make_response({'error': 'Card does not exist.'}, 404)
    
class UsersById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            return make_response(user.to_dict())
        else:
            return make_response({'error': 'User not found'}, 404) 
        
    def patch(self,id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        else:
            try:
                for attr in request.json:
                    setattr(user, attr, request.json.get(attr))
                
                db.session.add(user)
                db.session.commit()

                return make_response(user.to_dict(), 202)
            except:
                return make_response({"errors": ["validation errors"]}, 400)
            
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        else:
            db.session.delete(user)
            db.session.commit()

            return make_response({}, 204)
        
api.add_resource(UsersById, '/users/<int:id>')

class LessonStatsByUser(Resource):
    def patch(self, id):
        lessonstats = LessonStatistics.query.filter(LessonStatistics.user_id == id).first()
        if not lessonstats:
            return make_response({'error': 'Statistics not found'}, 404)
        else:
            try:
                for attr in request.json:
                    setattr(lessonstats, attr, request.json.get(attr))

                db.session.add(lessonstats)
                db.session.commit()

                return make_response(lessonstats.to_dict(), 202)
            except:
                return make_response({'errors': ['validation errors']}, 400)
            
    def get(self, id):
        lessonstats = LessonStatistics.query.filter(LessonStatistics.user_id == id).first()
        if lessonstats:
            return make_response(lessonstats.to_dict())
        else:
            return make_response({'error': 'Statistics not found'}, 404)
        
api.add_resource(LessonStatsByUser, '/lesson-statistics/<int:user_id>')

@app.route('/completed/<int:user_id>')
def get_completed_games(id):
    completed = [lessonstat.to_dict() for lessonstat in LessonStatistics.query.filter(LessonStatistics.user_id == id, LessonStatistics.completed == True).all()]
    if completed:
        return make_response(completed)
    else:
        return make_response({'error': 'No lessons complete yet'})
    
@app.route('/readings/<int:user_id>')
def get_readings(id):
    readings = [reading.to_dict() for reading in Reading.query.filter(Reading.user_id == id)]
    if readings:
        return make_response(readings)
    else:
        return make_response({"error": "No readings yet"})

if __name__ == '__main__':
    app.run(port=5555, debug=True)

