import os 

from flask import render_template, send_from_directory
from app import app

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')