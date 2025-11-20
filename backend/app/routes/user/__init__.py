def register_user_routes(app):
    from .profile import user_profile_bp
    from .posts import user_posts_bp
    from .properties import user_properties_bp

    # Register user profile routes
    app.register_blueprint(user_profile_bp, url_prefix="/api/users/profile")

    # Register posts routes
    app.register_blueprint(user_posts_bp, url_prefix="/api/users/posts")

    # Register properties routes
    app.register_blueprint(user_properties_bp, url_prefix="/api/users/properties")
