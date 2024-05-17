# Standard library imports
# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_login import LoginManager
from models import User
from database import db
from bcrypt_utils import init_bcrypt


# Instantiate app, set attributes
app = Flask(__name__)

init_bcrypt(app)

app.secret_key = b'\xe3\xc4l\x85\xdcG\xb2\xcf0\xed \x07\xfc\xa8\xb91'

login_manager = LoginManager()
login_manager.init_app(app)

# Set the user loader function
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db

migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)
