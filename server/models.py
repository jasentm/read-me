from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from flask_login import UserMixin

from database import db
from bcrypt_utils import bcrypt


class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'
    serialize_rules = ('-_password_hash', '-reading.user', '-lesson_statistics.user')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    #TODO look into cascade 
    reading = db.relationship('Reading', back_populates='user')
    lesson_statistics = db.relationship('LessonStatistics', back_populates='user')
    lessons = association_proxy('lessonStatistics', 'lesson')
    #TODO finish validations

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')) #encrypt passed in password
        self._password_hash = password_hash.decode('utf-8') #set private attribute to decoded password

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8') #check to see if encrypted password match
        )

class TarotCard(db.Model, SerializerMixin):
    __tablename__ = 'tarotCards'
    serialize_rules = ('-lesson.tarot_card', '-past_readings.past_card', '-present_readings.present_card', 
                       '-future_readings.future_card', '-fortunes.tarot_card', '-keywords.tarot_card', 
                       '-light_meanings.tarot_card', '-shadow_meanings.tarot_card', '-questions.tarot_card')

    id = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    name = db.Column(db.String)
    number = db.Column(db.Integer)
    arcana = db.Column(db.String)
    suit = db.Column(db.String)
    image = db.Column(db.String)

    lesson = db.relationship('Lesson', back_populates='tarot_card')
    past_readings = db.relationship('Reading', back_populates='past_card', foreign_keys='Reading.past_card_id')
    present_readings = db.relationship('Reading', back_populates='present_card', foreign_keys='Reading.present_card_id')
    future_readings = db.relationship('Reading', back_populates='future_card', foreign_keys='Reading.future_card_id')


    fortunes = db.relationship('Fortune', back_populates='tarot_card')
    keywords = db.relationship('Keyword', back_populates='tarot_card')
    light_meanings = db.relationship('LightMeaning', back_populates='tarot_card')
    shadow_meanings = db.relationship('ShadowMeaning', back_populates='tarot_card')
    questions = db.relationship('Question', back_populates='tarot_card')
    #TODO finish validations

    #TODO add serialize rules

class Fortune(db.Model, SerializerMixin):
    __tablename__ = 'fortunes'
    serialize_only = ('fortune',)

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    fortune = db.Column(db.String)

    tarot_card = db.relationship('TarotCard', back_populates='fortunes')
    #TODO finish validations

class Keyword(db.Model, SerializerMixin):
    __tablename__ = 'keywords'
    serialize_only = ('keyword',)

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    keyword = db.Column(db.String)
   
    tarot_card = db.relationship('TarotCard', back_populates='keywords')
    #TODO finish validations

class LightMeaning(db.Model, SerializerMixin):
    __tablename__ = 'lightMeanings'
    serialize_only = ('light_meaning',)

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    light_meaning = db.Column(db.String)
 
    tarot_card = db.relationship('TarotCard', back_populates='light_meanings')
    #TODO finish validations

class ShadowMeaning(db.Model, SerializerMixin):
    __tablename__ = 'shadowMeanings'
    serialize_only = ('shadow_meaning',)

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    shadow_meaning = db.Column(db.String)
    
    tarot_card = db.relationship('TarotCard', back_populates='shadow_meanings')
    #TODO finish validations

class Question(db.Model, SerializerMixin):
    __tablename__ = 'questions'
    serialize_only = ('question',)

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    question = db.Column(db.String)

    tarot_card = db.relationship('TarotCard', back_populates='questions')
    #TODO finish validations
class Lesson(db.Model, SerializerMixin):
    __tablename__ = 'lessons'
    serialize_rules = ('-tarot_card.lesson', '-lesson_statistics.lesson', '-lesson_questions.lesson')
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)

    lesson_statistics = db.relationship('LessonStatistics', back_populates='lesson')
    tarot_card = db.relationship('TarotCard', back_populates='lesson')
    lesson_questions = db.relationship('LessonQuestion', back_populates='lesson')

    users = association_proxy('lessonStatistics', 'user')

class LessonStatistics(db.Model, SerializerMixin):
    __tablename__ = 'lessonStatistics'
    serialize_rules = ('-user.lesson_statistics', '-lesson.lesson_statistics')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
   

    user = db.relationship('User', back_populates='lesson_statistics')
    lesson = db.relationship('Lesson', back_populates='lesson_statistics')
    #TODO finish validations

class LessonQuestion(db.Model, SerializerMixin):
    __tablename__ = 'lessonQuestions'
    serialize_rules = ('-lesson.lesson_questions')

    id = db.Column(db.Integer, primary_key = True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
    question = db.Column(db.String)
    answer1 = db.Column(db.String)
    answer2 = db.Column(db.String)
    answer3 = db.Column(db.String)
    answer4 = db.Column(db.String)
    correct_answer = db.Column(db.String)
    explanation = db.Column(db.String)

    lesson = db.relationship('Lesson', back_populates='lesson_questions')

class Reading(db.Model, SerializerMixin):
    __tablename__ = 'readings'
    serialize_rules = ('-user.reading', '-past_card.past_readings', '-present_card.present_readings', '-future_card.future_readings')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    past_card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    past_card_reversed = db.Column(db.Boolean)
    present_card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    present_card_reversed = db.Column(db.Boolean)
    future_card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    future_card_reversed = db.Column(db.Boolean)
    past_card_meaning = db.Column(db.String)
    present_card_meaning = db.Column(db.String)
    future_card_meaning = db.Column(db.String)  
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', back_populates='reading')
    past_card = db.relationship('TarotCard', back_populates='past_readings', foreign_keys=[past_card_id])
    present_card = db.relationship('TarotCard', back_populates='present_readings', foreign_keys=[present_card_id])
    future_card = db.relationship('TarotCard', back_populates='future_readings', foreign_keys=[future_card_id])
    #TODO finish validations




