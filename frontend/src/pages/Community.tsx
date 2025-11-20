import React, { useEffect, useState } from "react";
import axios from "@/api/axiosConfig";
import { Heart, MessageSquare } from "lucide-react";

// Auto-initials avatar
const Avatar = ({ name }: { name?: string }) => {
  const safeName = (name || "U").trim();
  const initials = safeName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      {initials || "U"}
    </div>
  );
};

interface CommentItem {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
}

interface Post {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  image_url?: string;
  created_at: string;
  likes?: number;
  comments?: number;
  liked_by_current_user?: boolean;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [openComments, setOpenComments] = useState<{ [k: number]: boolean }>({});
  const [comments, setComments] = useState<{ [k: number]: CommentItem[] }>({});
  const [newComment, setNewComment] = useState<{ [k: number]: string }>({});

  // normalize post object returned from backend to shape the UI expects
  const normalizePost = (raw: any): Post | null => {
    if (!raw || typeof raw !== "object") return null;
    // prefer camelCase names if backend uses different keys
    const p: Partial<Post> = {};
    p.id = raw.id ?? raw.post_id ?? raw.postId;
    if (!p.id) return null; // invalid post
    p.user_id = raw.user_id ?? raw.userId ?? raw.userId;
    p.user_name =
      raw.user_name ??
      raw.userName ??
      raw.name ??
      (raw.user && raw.user.name) ??
      "Unknown";
    p.content = raw.content ?? "";
    p.image_url = raw.image_url ?? raw.imageUrl ?? raw.image ?? undefined;
    // created_at: ensure string
    const created = raw.created_at ?? raw.createdAt ?? new Date().toISOString();
    p.created_at = typeof created === "string" ? created : new Date(created).toISOString();
    p.likes = typeof raw.likes === "number" ? raw.likes : 0;
    p.comments = typeof raw.comments === "number" ? raw.comments : 0;
    p.liked_by_current_user = !!raw.liked_by_current_user || !!raw.liked_by_user || false;

    return p as Post;
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await axios.get<{ posts: any[] }>("/api/users/posts/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawPosts = Array.isArray(res.data?.posts) ? res.data.posts : [];
      const normalized = rawPosts
        .map(normalizePost)
        .filter((x): x is Post => x !== null);

      setPosts(normalized);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<{ comments: CommentItem[] }>(
        `/api/users/posts/${postId}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => ({ ...prev, [postId]: res.data.comments || [] }));
    } catch (err) {
      console.error("Failed to load comments", err);
      setComments((p) => ({ ...p, [postId]: [] }));
    }
  };

  const toggleComments = async (postId: number) => {
    const open = openComments[postId];
    setOpenComments((p) => ({ ...p, [postId]: !open }));
    if (!open) await fetchComments(postId);
  };

  const submitComment = async (postId: number) => {
    const content = newComment[postId];
    if (!content || !content.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/users/posts/${postId}/comment`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchComments(postId);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: (p.comments ?? 0) + 1 } : p
        )
      );

      setNewComment((p) => ({ ...p, [postId]: "" }));
    } catch (err) {
      console.error("Failed to submit comment", err);
    }
  };

  const toggleLike = async (postId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/users/posts/${postId}/like`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                liked_by_current_user: !p.liked_by_current_user,
                likes: p.liked_by_current_user ? (p.likes ?? 1) - 1 : (p.likes ?? 0) + 1,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const createPost = async () => {
    if (!newPost.trim()) return;

      try {
      const token = localStorage.getItem("token");
      const res = await axios.post<{ post?: any }>(
        "/api/users/posts/create",
        { content: newPost, image_url: null },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // defensive: handle different response shapes
      const raw = (res.data?.post ?? res.data) ?? null;
      const normalized = normalizePost(raw);

      if (!normalized) {
        // If backend returned something unexpected, don't push undefined — fetch fresh list instead
        console.warn("Create post returned unexpected payload; refetching posts.", res.data);
        await fetchPosts();
      } else {
        // put newly created post at top of feed
        setPosts((prev) => [normalized, ...prev]);
      }

      setNewPost("");
    } catch (err) {
      console.error("Create post failed:", err);
      setError("Failed to create post");
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="w-full bg-blue-900 text-white py-16 px-6 mb-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">Lotsdacity Community</h1>
          <p className="text-blue-100 max-w-2xl">
            Connect, share, and collaborate. Post updates, ask questions, and
            interact with other members of the Lotsdacity ecosystem.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN (POST FORM) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg mb-3">Create a Post</h2>

            <textarea
              className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Share something with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />

            <button
              onClick={createPost}
              className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg"
            >
              Post
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>

        {/* RIGHT COLUMN (POST FEED) */}
        <div className="lg:col-span-2 space-y-6">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar name={post.user_name} />
                  <div>
                    <p className="font-semibold">{post.user_name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{post.content}</p>

                {post.image_url && (
                  <img
                    src={post.image_url}
                    className="rounded-lg mt-2 max-h-80 object-cover"
                    alt="post media"
                  />
                )}

                {/* Actions */}
                <div className="flex gap-6 mt-4 text-gray-600">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 ${post.liked_by_current_user ? "text-red-500" : ""}`}
                  >
                    <Heart size={18} fill={post.liked_by_current_user ? "red" : "none"} />
                    {post.likes ?? 0}
                  </button>

                  <button className="flex items-center gap-2" onClick={() => toggleComments(post.id)}>
                    <MessageSquare size={18} />
                    {post.comments ?? 0}
                  </button>
                </div>

                {/* Comments */}
                {openComments[post.id] && (
                  <div className="mt-4 border-t pt-4">
                    <textarea
                      className="w-full border rounded-lg p-2 text-sm"
                      placeholder="Write a comment..."
                      value={newComment[post.id] || ""}
                      onChange={(e) => setNewComment((p) => ({ ...p, [post.id]: e.target.value }))}
                    />

                    <button
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg"
                      onClick={() => submitComment(post.id)}
                    >
                      Comment
                    </button>

                    <div className="mt-4 space-y-3">
                      {(comments[post.id] || []).map((c) => (
                        <div key={c.id} className="bg-gray-100 p-3 rounded-lg text-sm">
                          <p className="font-semibold">{c.user_name}</p>
                          <p>{c.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(c.created_at).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              {loading ? "Loading posts..." : "No posts yet. Be the first to post!"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Community;