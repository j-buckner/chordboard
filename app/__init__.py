from flask import Flask

app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend/")

from app import routes
