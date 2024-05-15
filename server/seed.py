#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, TarotCard, Lesson, LessonStatistics, Reading, Fortune, Keyword, LightMeaning, ShadowMeaning, Question
from os.path import join, dirname
import json

def create_cards():
    file_path = join(dirname(__file__), '../tarot/tarot-images.json')

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

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        
        create_cards()
        
