from flask import Blueprint, jsonify
from app.utils.jwt_utils import token_required, admin_required
from app.models.user import User
from app.models.post import Post
from app.models.property import Property

admin_dashboard_bp = Blueprint("admin_dashboard", __name__)

@admin_dashboard_bp.get("/stats")
@token_required
@admin_required
def get_dashboard_stats(current_user):
    total_users = User.query.count()
    total_posts = Post.query.count()
    total_properties = Property.query.count()
    pending_properties = Property.query.filter_by(status="pending").count()
    approved_properties = Property.query.filter_by(status="approved").count()

    return jsonify({
        "total_users": total_users,
        "total_posts": total_posts,
        "total_properties": total_properties,
        "pending_properties": pending_properties,
        "approved_properties": approved_properties
    })
