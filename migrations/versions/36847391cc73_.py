"""empty message

Revision ID: 36847391cc73
Revises: 3b433e14f667
Create Date: 2019-03-24 17:03:27.912379

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '36847391cc73'
down_revision = '3b433e14f667'
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
            (1, '["I", "V", "vi", "IV"]', 4, '[["C4", "E4", "G4"], ["G4", "B4", "D4"], ["A4", "C4", "E4"], ["F4", "A4", "C4"]]'),
            (1, '["iii", "VI", "ii", "V"]', 4, '[["E4", "G4", "B4"], ["A4", "C4", "E4"], ["D4", "F4", "A4"], ["G4", "B4", "D4"]]'),            
            (1, '["I", "vi", "IV", "V"]', 4, '[["C4", "E4", "G4"], ["A4", "C4", "E4"], ["F4", "A4", "C4"], ["G4", "B4", "D4"]]'),
            (1, '["I", "IV", "ii", "V"]', 4, '[["C4", "E4", "G4"], ["F4", "A4", "C4"], ["D4", "F4", "A4"], ["G4", "B4", "D4"]]')
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
