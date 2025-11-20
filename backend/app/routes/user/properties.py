from flask import Blueprint, request, jsonify, current_app, url_for
from app.utils.jwt_utils import token_required
from app.models.property import Property
from app import db
import os
from werkzeug.utils import secure_filename

user_properties_bp = Blueprint("user_properties", __name__)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# Return absolute path to upload folder and ensure it exists
def get_upload_folder():
    upload_path = os.path.join(current_app.root_path, "static", "uploads", "properties")
    os.makedirs(upload_path, exist_ok=True)
    return upload_path


@user_properties_bp.route("/add", methods=["POST"])
@token_required
def add_property(current_user):
    title = request.form.get("title")
    description = request.form.get("description")
    price = request.form.get("price")
    listing_type = request.form.get("listing_type", "")  # Default to "sale" if not provided

    if not title:
        return jsonify({"error": "Title is required"}), 400

    # Handle file upload
    image_url = None
    file = request.files.get("image")
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(get_upload_folder(), filename)
        file.save(save_path)
        image_url = url_for(
    'serve_property_image',  # Use the fallback route function name
    filename=filename,
    _external=True
)

        print("IMAGE URL SAVED:", image_url)

    prop = Property(
        user_id=current_user.id,
        title=title,
        description=description,
        price=price,
        image_url=image_url,
        listing_type=listing_type  # <--- save it
    )

    db.session.add(prop)
    db.session.commit()

    return jsonify({
        "message": "Property added successfully",
        "property": {
            "id": prop.id,
            "user_id": prop.user_id,
            "title": prop.title,
            "description": prop.description,
            "price": prop.price,
            "status": prop.status,
            "created_at": prop.created_at,
            "image_url": prop.image_url,
            "listingType": getattr(prop, "listingType", None)
        }
    }), 201


@user_properties_bp.route("/all", methods=["GET"])
@token_required
def get_all_properties(current_user):
    properties = Property.query.filter_by(status="approved").order_by(Property.created_at.desc()).all()
    return jsonify({
        "properties": [
            {
                "id": p.id,
                "user_id": p.user_id,
                "title": p.title,
                "description": p.description,
                "price": p.price,
                "status": p.status,
                "created_at": p.created_at,
                "image_url": p.image_url,
                "listingType": getattr(p, "listingType", None)
            } for p in properties
        ]
    }), 200


@user_properties_bp.route("/my-properties", methods=["GET"])
@token_required
def my_properties(current_user):
    properties = Property.query.filter_by(user_id=current_user.id).order_by(Property.created_at.desc()).all()
    return jsonify({
        "properties": [
            {
                "id": p.id,
                "user_id": p.user_id,
                "title": p.title,
                "description": p.description,
                "price": p.price,
                "status": p.status,
                "created_at": p.created_at,
                "image_url": p.image_url,
                "listingType": getattr(p, "listingType", None)
            } for p in properties
        ]
    }), 200
