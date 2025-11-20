# models/property.py
from app import db
from datetime import datetime

class Property(db.Model):
    __tablename__ = "property"  # optional but explicit

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=True)
    status = db.Column(db.String(20), default="pending")  # pending, approved, declined
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    image_url = db.Column(db.String(255), nullable=True)
    listing_type = db.Column(db.String(10), default="")  # <--- NEW FIELD
