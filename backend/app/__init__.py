from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config
import os

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(
        __name__,
        static_url_path="/static",
        static_folder="static",
        instance_relative_config=True
    )
    app.config.from_object(Config)

    # Extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    migrate.init_app(app, db)

    # ------------------------------------
    # Register ALL route blueprints here
    # ------------------------------------
    from app.routes import register_routes
    register_routes(app)

    # --------------------------
    # Fallback route for property images
    # --------------------------
    @app.route("/uploads/properties/<filename>")
    def serve_property_image(filename):
        uploads_path = os.path.join(app.static_folder, "uploads", "properties")
        return send_from_directory(uploads_path, filename)

    # --------------------------
    # Fallback route for profile images
    # --------------------------
    @app.route("/uploads/profile_images/<filename>")
    def serve_profile_image(filename):
        uploads_path = os.path.join(app.static_folder, "uploads", "profile_images")
        return send_from_directory(uploads_path, filename)

    return app
