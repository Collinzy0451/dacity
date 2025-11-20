from flask import Blueprint, jsonify
from app.utils.jwt_utils import token_required, admin_required
from app.models.post import Post
from app.models.user import User
from app import db

admin_posts_bp = Blueprint("admin_posts", __name__)

# GET all posts
@admin_posts_bp.get("/all")
@token_required
@admin_required
def get_all_posts(current_user):
    posts = Post.query.order_by(Post.created_at.desc()).all()
    post_list = []
    for p in posts:
        user = User.query.get(p.user_id)
        post_list.append({
            "id": p.id,
            "user_id": p.user_id,
            "user_name": user.name if user else "Unknown",
            "content": p.content,
            "image_url": p.image_url,
            "status": p.status,
            "created_at": p.created_at.isoformat()
        })
    return jsonify(post_list), 200


# DELETE a post
@admin_posts_bp.delete("/delete/<int:post_id>")
@token_required
@admin_required
def delete_post(current_user, post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted successfully"}), 200
