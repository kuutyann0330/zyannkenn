from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    # appの設定
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile('config.py')

    # DBの設定
    db.init_app(app)
    from flask_app import models

    # Blueprintの登録
    from flask_app.controllers.index import index_bp
    from flask_app.controllers.sample import sample_bp
    from flask_factory.flask_app.controllers.logic import logic_bp
    app.register_blueprint(index_bp)
    app.register_blueprint(sample_bp)
    app.register_blueprint(logic_bp)

    return app

