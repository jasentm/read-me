"""initial migration

Revision ID: 92ed0254065b
Revises: 
Create Date: 2024-05-15 11:09:23.140501

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '92ed0254065b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('lessons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('lessonStatistics',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('lesson_id', sa.Integer(), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['lesson_id'], ['lessons.id'], name=op.f('fk_lessonStatistics_lesson_id_lessons')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_lessonStatistics_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tarotCards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('lesson_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('number', sa.Integer(), nullable=True),
    sa.Column('arcana', sa.String(), nullable=True),
    sa.Column('suit', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['lesson_id'], ['lessons.id'], name=op.f('fk_tarotCards_lesson_id_lessons')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fortunes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('fortune', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['tarotCards.id'], name=op.f('fk_fortunes_card_id_tarotCards')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('keywords',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('keyword', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['tarotCards.id'], name=op.f('fk_keywords_card_id_tarotCards')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('lightMeanings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('light_meaning', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['tarotCards.id'], name=op.f('fk_lightMeanings_card_id_tarotCards')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('question', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['tarotCards.id'], name=op.f('fk_questions_card_id_tarotCards')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('readings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('past_card_id', sa.Integer(), nullable=False),
    sa.Column('present_card_id', sa.Integer(), nullable=False),
    sa.Column('future_card_id', sa.Integer(), nullable=False),
    sa.Column('meaning', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['future_card_id'], ['tarotCards.id'], name=op.f('fk_readings_future_card_id_tarotCards')),
    sa.ForeignKeyConstraint(['past_card_id'], ['tarotCards.id'], name=op.f('fk_readings_past_card_id_tarotCards')),
    sa.ForeignKeyConstraint(['present_card_id'], ['tarotCards.id'], name=op.f('fk_readings_present_card_id_tarotCards')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_readings_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shadowMeanings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=False),
    sa.Column('shadow_meaning', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['tarotCards.id'], name=op.f('fk_shadowMeanings_card_id_tarotCards')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shadowMeanings')
    op.drop_table('readings')
    op.drop_table('questions')
    op.drop_table('lightMeanings')
    op.drop_table('keywords')
    op.drop_table('fortunes')
    op.drop_table('tarotCards')
    op.drop_table('lessonStatistics')
    op.drop_table('users')
    op.drop_table('lessons')
    # ### end Alembic commands ###