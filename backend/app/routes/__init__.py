# app/routes/__init__.py
def register_routes(app):
    # Auth routes
    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    # Admin routes
    from .admin.users import admin_users_bp
    from .admin.properties import admin_properties_bp
    from .admin.posts import admin_posts_bp
    from .admin.admin_dashboard import admin_dashboard_bp

    app.register_blueprint(admin_users_bp, url_prefix="/api/admin/users")
    app.register_blueprint(admin_properties_bp, url_prefix="/api/admin/properties")
    app.register_blueprint(admin_posts_bp, url_prefix="/api/admin/posts")
    app.register_blueprint(admin_dashboard_bp, url_prefix="/api/admin")

    # User routes
    from .user import register_user_routes
    register_user_routes(app)
