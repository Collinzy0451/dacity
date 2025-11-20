from flask import Blueprint, jsonify
from app.utils.jwt_utils import token_required, admin_required
from app.models.user import User
from app import db

admin_users_bp = Blueprint("admin_users", __name__)

# GET all users
@admin_users_bp.get("/all")
@token_required
@admin_required
def get_all_users(current_user):
    users = User.query.order_by(User.id.desc()).all()
    return jsonify([{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "is_admin": u.is_admin,
        "profile_image_url": u.profile_image_url
    } for u in users]), 200


# DELETE user
@admin_users_bp.delete("/delete/<int:user_id>")
@token_required
@admin_required
def delete_user(current_user, user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200
