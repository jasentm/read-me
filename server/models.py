from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Columm(db.Integer, primary_key=True)
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

    id = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    name = db.Column(db.String)
    number = db.Column(db.Integer)
    arcana = db.Column(db.String)
    suit = db.Column(db.String)
    image = db.Column(db.String)

    lesson = db.relationship('Lesson', back_populates='tarot_card')
    reading = db.relationship('Reading', back_populates='tarot_card')

    fortunes = db.relationship('Fortune', back_populates='tarot_card')
    keywords = db.relationship('Keyword', back_populates='tarot_card')
    light_meanings = db.relationship('LightMeaning', back_populates='tarot_card')
    shadow_meanings = db.relationship('ShadowMeaning', back_populates='tarot_card')
    questions = db.relationship('Fortune', back_populates='tarot_card')
    #TODO finish validations

    #TODO add serialize rules

class Fortune(db.Model, SerializerMixin):
    __tablename__ = 'fortunes'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    fortune = db.Column(db.String)

    tarot_card = db.relationship('TarotCard', back_populates='fortunes')
    #TODO finish validations

class Keyword(db.Model, SerializerMixin):
    __tablename__ = 'keywords'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    keyword = db.Column(db.String)
   
    tarot_card = db.relationship('TarotCard', back_populates='keywords')
    #TODO finish validations

class LightMeaning(db.Model, SerializerMixin):
    __tablename__ = 'lightMeanings'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    light_meaning = db.Column(db.String)
 
    tarot_card = db.relationship('TarotCard', back_populates='light_meanings')
    #TODO finish validations

class ShadowMeaning(db.Model, SerializerMixin):
    __tablename__ = 'shadowMeanings'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    shadow_meaning = db.Column(db.String)
    
    tarot_card = db.relationship('TarotCard', back_populates='shadow_meanings')
    #TODO finish validations

class Question(db.Model, SerializerMixin):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    question = db.Column(db.String)

    tarot_card = db.relationship('TarotCard', back_populates='questions')
    #TODO finish validations
class Lesson(db.Model, SerializerMixin):
    __tablename__ = 'lessons'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)

    lesson_statistics = db.relationship('LessonStatistics', back_populates='lesson')
    tarot_card = db.relationship('TarotCard', back_populates='lesson')

    users = association_proxy('lessonStatistics', 'user')

class LessonStatistics(db.Model, SerializerMixin):
    __tablename__ = 'lessonStatistics'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', back_populates='lesson_statistics')
    lesson = db.relationship('Lesson', back_populates='lesson_statistics')
    #TODO finish validations

class Reading(db.Model, SerializerMixin):
    __tablename__ = 'readings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    past_card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    present_card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    future_card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    meaning = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', back_populates='reading')
    tarot_card = db.relationship('TarotCard', back_populates='reading')
    #TODO finish validations




