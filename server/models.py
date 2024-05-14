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

    #TODO finish relationships

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

    #TODO finish relationships

    #TODO finish validations

class Fortune(db.Model, SerializerMixin):
    __tablename__ = 'fortunes'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    fortune = db.Column(db.String)

    #TODO finish relationships

    #TODO finish validations

class Keyword(db.Model, SerializerMixin):
    __tablename__ = 'keywords'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    keyword = db.Column(db.String)

    #TODO finish relationships

    #TODO finish validations

class LightMeaning(db.Model, SerializerMixin):
    __tablename__ = 'lightMeanings'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    light_meaning = db.Column(db.String)

    #TODO finish relationships

    #TODO finish validations

class ShadowMeaning(db.Model, SerializerMixin):
    __tablename__ = 'shadowMeanings'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    shadow_meaning = db.Column(db.String)

    #TODO finish relationships

    #TODO finish validations

class Question(db.Model, SerializerMixin):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('tarotCards.id'), nullable=False)
    question = db.Column(db.String)

    #TODO finish relationships

    #TODO finish validations
class Lesson(db.Model, SerializerMixin):
    __tablename__ = 'lessons'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)

    #TODO finish relationships 


class LessonStatistics(db.Model, SerializerMixin):
    __tablename__ = 'lessonStatistics'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    #TODO finish relationships

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

    #TODO finish relationships

    #TODO finish validations




