"""empty message

Revision ID: 2d8aa36dcb2d
Revises: d31ffc0789b7
Create Date: 2019-03-22 14:02:50.497125

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d8aa36dcb2d'
down_revision = 'd31ffc0789b7'
branch_labels = None
depends_on = None


def upgrade():
    connection = op.get_bind()
    insert_q = """
        INSERT INTO users (id, username, email)
        VALUES (1, 'admin', 'buckner.jared@gmail.com')
    """
    connection.execute(insert_q)

    insert_q = """
        INSERT INTO progression (user_id, display, measures, notes)
        VALUES (1, '["I", "IV", "V", "I"]', 4, '[["C4", "E4", "G4"], ["F4", "A4", "C4"], ["G4", "B4", "D4"], ["C4", "E4", "G4"]]'),
            (1, '["I", "V", "IV", "I"]', 4, '[["C4", "E4", "G4"], ["G4", "B4", "D4"], ["F4", "A4", "C4"], ["C4", "E4", "G4"]]'),
            (1, '["I", "V", "vi", "IV"]', 4, '[["C4", "E4", "G4"], ["G4", "B4", "D4"], ["A4", "C4", "E4"], ["F4", "A4", "C4"]]')
    """
    connection.execute(insert_q)
    pass


def downgrade():
    connection = op.get_bind()
    connection.execute("""
        TRUNCATE progression
    """)
    connection.execute("""
    	TRUNCATE users
    """)
    pass