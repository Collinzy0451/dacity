from flask import Blueprint, request, jsonify
from app.utils.jwt_utils import token_required
from app.models.post import Post
from app.models.user import User
from app.models.like import Like
from app.models.comment import Comment
from app import db

user_posts_bp = Blueprint("user_posts", __name__)

# CREATE a community post
@user_posts_bp.route("/create", methods=["POST"])
@token_required
def create_post(current_user):
    data = request.json
    content = data.get("content")
    image_url = data.get("image_url")

    if not content:
        return jsonify({"error": "Content is required"}), 400

    post = Post(user_id=current_user.id, content=content, image_url=image_url)
    db.session.add(post)
    db.session.commit()

    return jsonify({
        "message": "Post created successfully",
        "post": {
            "id": post.id,
            "content": post.content,
            "image_url": post.image_url,
            "created_at": post.created_at
        }
    }), 201

# DELETE a user's own post
@user_posts_bp.route("/delete/<int:post_id>", methods=["DELETE"])
@token_required
def delete_post(current_user, post_id):
    post = Post.query.get(post_id)
    if not post or post.user_id != current_user.id:
        return jsonify({"error": "Post not found or unauthorized"}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": f"Post {post_id} deleted"}), 200

# GET all posts by current user
@user_posts_bp.route("/my-posts", methods=["GET"])
@token_required
def get_my_posts(current_user):
    posts = Post.query.filter_by(user_id=current_user.id).order_by(Post.created_at.desc()).all()
    result = [{
        "id": p.id,
        "content": p.content,
        "image_url": p.image_url,
        "created_at": p.created_at
    } for p in posts]
    return jsonify({"posts": result}), 200

# Toggle like for a post
@user_posts_bp.route("/<int:post_id>/like", methods=["POST"])
@token_required
def toggle_like(current_user, post_id):
    like = Like.query.filter_by(user_id=current_user.id, post_id=post_id).first()

    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"message": "Post unliked"}), 200
    else:
        new_like = Like(user_id=current_user.id, post_id=post_id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify({"message": "Post liked"}), 201

# Add a comment
@user_posts_bp.route("/<int:post_id>/comment", methods=["POST"])
@token_required
def add_comment(current_user, post_id):
    data = request.json
    content = data.get("content")
    if not content:
        return jsonify({"error": "Content is required"}), 400

    comment = Comment(user_id=current_user.id, post_id=post_id, content=content)
    db.session.add(comment)
    db.session.commit()

    return jsonify({
        "message": "Comment added",
        "comment": {
            "id": comment.id,
            "user_id": comment.user_id,
            "user_name": current_user.name,   # <-- ADDED
            "post_id": comment.post_id,
            "content": comment.content,
            "created_at": comment.created_at
        }
    }), 201

# Get all comments for a post
@user_posts_bp.route("/<int:post_id>/comments", methods=["GET"])
@token_required
def get_comments(current_user, post_id):
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.created_at.asc()).all()
    
    result = []
    for c in comments:
        user = User.query.get(c.user_id)  # <-- GET COMMENTER NAME
        result.append({
            "id": c.id,
            "user_id": c.user_id,
            "user_name": user.name if user else "Unknown",  # <-- ADDED
            "post_id": c.post_id,
            "content": c.content,
            "created_at": c.created_at
        })

    return jsonify({"comments": result}), 200

# GET all community posts with poster's name, likes count, comments count, and user's like status
@user_posts_bp.route("/all", methods=["GET"])
@token_required
def get_all_posts(current_user):
    posts = Post.query.order_by(Post.created_at.desc()).all()
    result = []

    for p in posts:
        user = User.query.get(p.user_id)
        likes_count = Like.query.filter_by(post_id=p.id).count()
        liked_by_user = Like.query.filter_by(post_id=p.id, user_id=current_user.id).first() is not None

        comments_count = Comment.query.filter_by(post_id=p.id).count()  # <-- ADDED

        result.append({
            "id": p.id,
            "user_id": p.user_id,
            "user_name": user.name if user else "Unknown",
            "content": p.content,
            "image_url": p.image_url,
            "created_at": p.created_at,
            "likes": likes_count,
            "comments": comments_count,              # <-- ADDED
            "liked_by_current_user": liked_by_user
        })

    return jsonify({"posts": result}), 200
