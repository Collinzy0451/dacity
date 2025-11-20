# app/routes/user/users.py
from flask import request, jsonify
from app.models.user import User
from app import db
from app.utils.jwt_utils import token_required
from . import user_bp


# -------------------------------------------------
# GET USER PROFILE
# -------------------------------------------------
@user_bp.route("/<int:user_id>", methods=["GET"])
@token_required
def get_user(current_user, user_id):

    # Allow admin OR the user themselves
    if not current_user.is_admin and current_user.id != user_id:
        return jsonify({"error": "Not authorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_admin": user.is_admin
    })


# -------------------------------------------------
# UPDATE USER PROFILE
# -------------------------------------------------
@user_bp.route("/<int:user_id>", methods=["PUT"])
@token_required
def update_user(current_user, user_id):
    data = request.get_json()

    # Allow admin OR the user themselves
    if not current_user.is_admin and current_user.id != user_id:
        return jsonify({"error": "Not authorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Validate fields
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    # Check if email already exists for another user
    email_exists = User.query.filter_by(email=email).first()
    if email_exists and email_exists.id != user.id:
        return jsonify({"error": "Email already in use"}), 400

    # Update user
    user.name = name
    user.email = email

    db.session.commit()

    return jsonify({
        "message": "Profile updated successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_admin": user.is_admin
        }
    }), 200


# -------------------------------------------------
# DELETE USER ACCOUNT
# -------------------------------------------------
@user_bp.route("/<int:user_id>", methods=["DELETE"])
@token_required
def delete_user(current_user, user_id):

    # Only admin OR owner themselves
    if not current_user.is_admin and current_user.id != user_id:
        return jsonify({"error": "Not authorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


# -------------------------------------------------
# LIST ALL USERS (Admin only)
# -------------------------------------------------
@user_bp.route("/", methods=["GET"])
@token_required
def get_users(current_user):

    if not current_user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    users = User.query.all()

    return jsonify({
        "users": [
            {
                "id": u.id,
                "name": u.name,
                "email": u.email,
                "is_admin": u.is_admin
            }
            for u in users
        ]
    })
