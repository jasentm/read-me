#!/usr/bin/env python3
from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api
from models import User, Lesson, LessonStatistics, Reading, TarotCard, LessonQuestion
from flask_login import login_user, logout_user, login_required, current_user
from sqlalchemy import desc
import random
import os

import google.generativeai as genai

#configuration of Google Gemini AI 
model = genai.GenerativeModel('gemini-1.5-flash')
gemini_api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=gemini_api_key)

# routes for login and user authentication 

@app.route('/users', methods=['POST'])
def signup():
    data = request.json
    existing_user = User.query.filter_by(email=data.get('email')).first()
    if existing_user:
        return make_response({"error": "Email already exists"}, 400)

    new_user = User(
        username=data.get('username'),
        email=data.get('email')
    )
    new_user.password_hash = data.get('password')
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)

    return make_response(new_user.to_dict(only=['id', 'username', 'email']), 201)


@app.route('/logout')
@login_required
def logout():
    logout_user()  # Log out the current user
    return make_response({}), 200

@app.route('/authenticate-session', methods=['POST'])
def authenticate_session():
    data = request.json
    user_id = data.get('userId')  # Get the user ID from the request body

    if user_id:
        user = User.query.filter(User.id == user_id).first()
        if user:
            return make_response(user.to_dict(only=['id', 'username', 'email'])), 200

    return make_response({'message': 'failed to authenticate'}), 401

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if user and user.authenticate(data.get('password')):
        login_user(user)  # Log in the user
        return make_response(user.to_dict(only=['id', 'username', 'email'])), 200
    return make_response({'message': 'Invalid username or password'}), 401

@app.route('/tarot-cards') #GET route for rendering all tarot cards
def get_tarot():
     tarot_cards = [card.to_dict(rules=('-future_readings', '-lesson', '-lesson_id', '-past_readings', '-present_readings')) for card in TarotCard.query.all()]
     return make_response(tarot_cards)


@app.route('/tarot-cards/<int:id>') #GET route for individual tarot cards
def get_individual_card(id):
    card = TarotCard.query.filter(TarotCard.id == id).first()
    if card:
         return make_response(card.to_dict(rules=('-future_readings', '-lesson', '-lesson_id', '-past_readings', '-present_readings')))
    else:
         return make_response({'error': 'Card does not exist.'}, 404)
    
class UsersById(Resource): # RESTful routes for rendering, editing, and deleting user data
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

@app.route('/lesson-statistics', methods=['POST']) #POST route for creating LessonStatistic after completing lesson
def post_completed_lesson():
    data = request.json
    try:
        new_lesson_stat = LessonStatistics(
            user_id = data.get('user_id'),
            lesson_id = data.get('lesson_id'),
            completed = data.get('completed'),
            correct_answers = data.get('correct_answers')
        )
        if new_lesson_stat:
            db.session.add(new_lesson_stat)
            db.session.commit()

            return make_response(new_lesson_stat.to_dict(), 201)
    except:
            return make_response({"errors": ["validation errors"]}, 400)

@app.route('/completed/<int:user_id>') #GET route for displaying lesson statistics for a user on Profile page
def get_completed_lessons(user_id):
    completed = [lessonstat.to_dict() for lessonstat in LessonStatistics.query.filter(LessonStatistics.user_id == user_id, LessonStatistics.completed == True).order_by(LessonStatistics.created_at.desc()).all()]
    if completed:
        return make_response(completed)
    else:
        return make_response({'error': 'No lessons complete yet'})
    
@app.route('/readings/<int:user_id>') #GET route for displaying completed readings for a user on Profile page
def get_readings(user_id):
    readings = [reading.to_dict(only=['created_at', 'id']) for reading in Reading.query.filter(Reading.user_id == user_id).order_by(Reading.created_at.desc()).all()]
    if readings:
        return make_response(readings)
    else:
        return make_response({"error": "No readings yet"})
    
class Readings(Resource): #RESTful route to create new Reading instance
    def post(self):
        data = request.json
        try:
            new_reading = Reading(
                user_id = data.get('user_id'),
                past_card_id = data.get('past_card_id'),
                past_card_reversed = data.get('past_card_reversed'),
                present_card_id = data.get('present_card_id'),
                present_card_reversed = data.get('present_card_reversed'),
                future_card_id = data.get('future_card_id'),
                future_card_reversed = data.get('future_card_reversed'),
                past_card_meaning=data.get('past_card_meaning'),
                present_card_meaning=data.get('present_card_meaning'),
                future_card_meaning=data.get('future_card_meaning')
            )
            if new_reading:
                db.session.add(new_reading)
                db.session.commit()

                return make_response(new_reading.to_dict())
            else:
                return make_response({'error': 'Reading could not be made'}, 400)
        except:
            return make_response({'error': ['validation errors']}, 400)
        
api.add_resource(Readings, '/readings')

@app.route('/saved-readings/<int:id>') #GET route to render Reading for a user to view anytime
def get_saved_reading(id):
    reading = Reading.query.filter(Reading.id == id).first()
    if reading:
        return make_response(reading.to_dict())
    else:
        return make_response({"error": "No readings yet"})
    
@app.route('/lessons') #GET route to render lesson titles
def get_lesson_titles():
    lessons = [lesson.to_dict(only=['id', 'type']) for lesson in Lesson.query.all()]
    if lessons:
        return make_response(lessons)
    else:
        return make_response({'error': "No lessons found"})

@app.route('/lesson-questions/<int:lesson_id>') #GET route to randomize and choose 10 questions for each lesson
def get_lesson_questions(lesson_id):
    #Get all questions associated with a specific lesson
    all_questions = [question.to_dict() for question in LessonQuestion.query.filter(LessonQuestion.lesson_id == lesson_id).all()]
    if all_questions:
        random.shuffle(all_questions) #shuffle the questions
        questions = all_questions[:10] #get the first 10
        return make_response(questions) #return the first 10 to be rendered
    else:
        return make_response({'error': 'No questions found'})

@app.route('/ask-ai', methods=['POST']) #POST route to generate AI response for Reading
def ask_ai():
    # Retrieve data from the request
    data = request.json
    query = data.get('query')

    # Make the request to the Gemini API
    response = model.generate_content(query)

    # Check if the request was successful
    if response:
        return make_response({"text": response.text}, 200)
    else:
        return make_response({'error': 'Failed to fetch AI interpretation'}, 500)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

