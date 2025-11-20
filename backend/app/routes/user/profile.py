from flask import Blueprint, request, jsonify
from app.utils.jwt_utils import token_required
from app import db
from app.models.user import User
from werkzeug.utils import secure_filename
import os

user_profile_bp = Blueprint("user_profile", __name__)

# ----------------------------------------
# GET current user's profile
# ----------------------------------------
@user_profile_bp.route("/", methods=["GET"])
@token_required
def get_profile(current_user):
    return jsonify({
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "is_admin": current_user.is_admin,
        "profile_image_url": current_user.profile_image_url  # return saved image
    }), 200


# ----------------------------------------
# UPDATE current user's profile
# ----------------------------------------
@user_profile_bp.route("/", methods=["PUT"])
@token_required
def update_profile(current_user):
    data = request.get_json()

    if "name" not in data or "email" not in data:
        return jsonify({"message": "Missing fields"}), 400

    try:
        current_user.name = data["name"]
        current_user.email = data["email"]

        db.session.commit()

        return jsonify({"message": "Profile updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Server error",
            "error": str(e)
        }), 500


# ----------------------------------------
# UPLOAD Profile Image
# ----------------------------------------
@user_profile_bp.route("/upload-image", methods=["POST"])
@token_required
def upload_profile_image(current_user):
    if "image" not in request.files:
        return jsonify({"message": "No image uploaded"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"message": "Invalid file"}), 400

    filename = secure_filename(image.filename)

    # Save inside static/uploads/profile_images so Flask can serve it
    upload_folder = os.path.join("app", "static", "uploads", "profile_images")
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, filename)
    image.save(filepath)

    # Save URL in database and commit
    relative_url = f"/static/uploads/profile_images/{filename}"  # <- important fix
    current_user.profile_image_url = relative_url
    db.session.commit()

    return jsonify({"image_url": relative_url}), 200
