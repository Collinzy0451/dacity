# models/post.py
from app import db
from datetime import datetime

class Post(db.Model):
    __tablename__ = "post"  # optional but explicit

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(20), default="visible")  # visible, hidden
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
