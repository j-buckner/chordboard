from app import db
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Progression(db.Model):
    __tablename__ = 'progression'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    measures = db.Column(db.Integer)
    display = db.Column(db.JSON)
    notes = db.Column(db.JSON)

    def __repr__(self):
        return '<Progression {}>'.format(self.id)