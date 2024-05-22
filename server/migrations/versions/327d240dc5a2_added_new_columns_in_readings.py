"""added new columns in readings

Revision ID: 327d240dc5a2
Revises: 9ba9341b48b3
Create Date: 2024-05-21 12:19:07.319321

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '327d240dc5a2'
down_revision = '9ba9341b48b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('readings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('past_card_reversed', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('present_card_reversed', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('future_card_reversed', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('readings', schema=None) as batch_op:
        batch_op.drop_column('future_card_reversed')
        batch_op.drop_column('present_card_reversed')
        batch_op.drop_column('past_card_reversed')

    # ### end Alembic commands ###
