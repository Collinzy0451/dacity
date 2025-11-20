# models/like.py
from app import db
from datetime import datetime

class Like(db.Model):
    __tablename__ = "like"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Optional: prevent duplicate likes
    __table_args__ = (
        db.UniqueConstraint('user_id', 'post_id', name='unique_user_post_like'),
    )
