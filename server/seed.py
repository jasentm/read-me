#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, TarotCard, Lesson, LessonStatistics, Reading, Fortune, Keyword, LightMeaning, ShadowMeaning, Question, LessonQuestion
from os.path import join, dirname
import json

fake = Faker()

def seed_lessons():
    lesson_types = ['Introduction', 'Elements', 'Numbers', 'Major Arcana', 'Cups', 'Swords', 'Wands', 'Pentacles']
    for lesson_type in lesson_types:
        lesson = Lesson(type=lesson_type)
        db.session.add(lesson)
    db.session.commit()

def create_cards():
    file_path = join(dirname(__file__), '../json/tarot-images.json')

    with open(file_path, 'r') as file:
        data = json.load(file)

    for card_data in data:
        card = TarotCard(
            name=card_data['name'],
            number=card_data['number'],
            arcana=card_data['arcana'],
            suit=card_data['suit'],
            image=card_data['img']
        )

        db.session.add(card)

        for fortune in card_data['fortune_telling']:
            fortune_obj = Fortune(fortune=fortune, tarot_card=card)
            db.session.add(fortune_obj)

        for keyword in card_data['keywords']:
            keyword_obj = Keyword(keyword=keyword, tarot_card=card)
            db.session.add(keyword_obj)

        for light_meaning in card_data['meanings']['light']:
            light_meaning_obj = LightMeaning(light_meaning=light_meaning, tarot_card=card)
            db.session.add(light_meaning_obj)

        for shadow_meaning in card_data['meanings']['shadow']:
            shadow_meaning_obj = ShadowMeaning(shadow_meaning=shadow_meaning, tarot_card=card)
            db.session.add(shadow_meaning_obj)

        for question in card_data['Questions to Ask']:
            question_obj = Question(question=question, tarot_card=card)
            db.session.add(question_obj)

    db.session.commit()

def seed_questions():
    file_path = join(dirname(__file__), '../json/questions.json')

    with open(file_path, 'r') as file:
        data = json.load(file)

    lesson_types = {
        'introduction': 'Introduction',
        'elements': 'Elements',
        'numbers': 'Numbers',
        'major_arcana': 'Major Arcana',
        'cups': 'Cups',
        'swords': 'Swords',
        'wands': 'Wands',
        'pentacles': 'Pentacles'
    }

    for key, questions in data.items():
        lesson_type = lesson_types[key]
        lesson = Lesson.query.filter_by(type=lesson_type).first()
        if lesson:
            for question_data in questions:
                question = LessonQuestion(
                    lesson_id=lesson.id,
                    question=question_data['question'],
                    answer1=question_data['answer1'],
                    answer2=question_data['answer2'],
                    answer3=question_data['answer3'],
                    answer4=question_data['answer4'],
                    correct_answer=question_data['correct_answer'],
                    explanation=question_data['explanation']
                )
                db.session.add(question)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        
        create_cards()
        seed_lessons()
        seed_questions()
