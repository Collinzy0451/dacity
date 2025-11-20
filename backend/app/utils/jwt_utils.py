import datetime
import jwt
from flask import request, jsonify
from functools import wraps
from app.config import Config
from app.models.user import User

# ------------------------------------------------
# CREATE TOKEN (already exists)
# ------------------------------------------------
def create_token(user_id):
    payload = {
        "id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }

    return jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")


# ------------------------------------------------
# TOKEN REQUIRED DECORATOR
# ------------------------------------------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Token comes from Authorization header: Bearer <token>
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"error": "Token missing"}), 401    

        try:
            decoded = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(decoded["id"])
        except Exception:
            return jsonify({"error": "Invalid or expired token"}), 401

        return f(current_user, *args, **kwargs)

    return decorated



# ------------------------------------------------
# ADMIN REQUIRED DECORATOR
# ------------------------------------------------
def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if not current_user.is_admin:
            return jsonify({"error": "Admin access required"}), 403
        return f(current_user, *args, **kwargs)

    return decorated
