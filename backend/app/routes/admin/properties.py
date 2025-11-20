from flask import Blueprint, jsonify
from app.utils.jwt_utils import token_required, admin_required
from app.models.property import Property
from app.models.user import User
from app import db

admin_properties_bp = Blueprint("admin_properties", __name__)

# GET all properties
@admin_properties_bp.get("/all")
@token_required
@admin_required
def get_all_properties(current_user):
    properties = Property.query.order_by(Property.created_at.desc()).all()
    prop_list = []
    for p in properties:
        user = User.query.get(p.user_id)
        prop_list.append({
            "id": p.id,
            "user_id": p.user_id,
            "user_name": user.name if user else "Unknown",
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "status": p.status,
            "created_at": p.created_at.isoformat()
        })
    return jsonify(prop_list), 200


# APPROVE property
@admin_properties_bp.put("/approve/<int:property_id>")
@token_required
@admin_required
def approve_property(current_user, property_id):
    prop = Property.query.get(property_id)
    if not prop:
        return jsonify({"error": "Property not found"}), 404

    prop.status = "approved"
    db.session.commit()
    return jsonify({"message": "Property approved"}), 200


# DECLINE property
@admin_properties_bp.put("/decline/<int:property_id>")
@token_required
@admin_required
def decline_property(current_user, property_id):
    prop = Property.query.get(property_id)
    if not prop:
        return jsonify({"error": "Property not found"}), 404

    prop.status = "declined"
    db.session.commit()
    return jsonify({"message": "Property declined"}), 200


# DELETE property
@admin_properties_bp.delete("/delete/<int:property_id>")
@token_required
@admin_required
def delete_property(current_user, property_id):
    prop = Property.query.get(property_id)
    if not prop:
        return jsonify({"error": "Property not found"}), 404

    db.session.delete(prop)
    db.session.commit()
    return jsonify({"message": "Property deleted"}), 200
