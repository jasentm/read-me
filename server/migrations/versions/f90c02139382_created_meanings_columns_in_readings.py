"""created meanings columns in readings

Revision ID: f90c02139382
Revises: 311019ef4ddc
Create Date: 2024-05-22 11:57:02.798190

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f90c02139382'
down_revision = '311019ef4ddc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('readings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('past_card_meaning', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('present_card_meaning', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('future_card_meaning', sa.String(), nullable=True))
        batch_op.drop_column('meaning')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('readings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('meaning', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('future_card_meaning')
        batch_op.drop_column('present_card_meaning')
        batch_op.drop_column('past_card_meaning')

    # ### end Alembic commands ###