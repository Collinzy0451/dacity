from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from app.utils.jwt_utils import create_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Auth routes working"})

# -------------------------
# USER REGISTRATION
# -------------------------
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json

    if not data.get("email") or not data.get("password") or not data.get("name"):
        return jsonify({"error": "Missing fields"}), 400

    existing = User.query.filter_by(email=data["email"]).first()
    if existing:
        return jsonify({"error": "Email already exists"}), 400

    user = User(
        name=data["name"],
        email=data["email"]
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    # CREATE TOKEN
    token = create_token(user.id)

    return jsonify({
        "message": "User registered successfully",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_admin": user.is_admin
        }
    }), 201

# -------------------------
# USER LOGIN
# -------------------------
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_token(user.id)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_admin": user.is_admin
        }
    }), 200
