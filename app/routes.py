import os 

from flask import render_template, send_from_directory, jsonify
from app import app
from app.models import Progression

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

@app.route('/api/<path:path>')
def api(path):
    data = Progression.query.filter(Progression.user_id == 1).all()
    result = [d.__dict__ for d in data]
    for res in result:
        del res['_sa_instance_state']

    return jsonify(result)
