from flask_bcrypt import Bcrypt

bcrypt = Bcrypt() #instantiate Bcrypt here to avoid circular dependencies 

def init_bcrypt(app):
    bcrypt.init_app(app)