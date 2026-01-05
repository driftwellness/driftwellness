import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Instagram, Music } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export default function SocialMediaFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated social media posts
    // In production, this would fetch from Instagram Graph API or TikTok API
    const mockPosts: SocialPost[] = [
      {
        id: '1',
        platform: 'instagram',
        author: 'Emma Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        content: 'Just completed my 30-day Drift challenge! 🧘‍♀️ Feeling so peaceful and centered. #DriftWellness #Mindfulness',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop',
        likes: 342,
        comments: 28,
        timestamp: '2 days ago',
      },
      {
        id: '2',
        platform: 'tiktok',
        author: 'Zane Wellness',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zane',
        content: 'Morning meditation with Drift soundscapes 🌅 Best way to start the day! #DriftApp #MeditationChallenge',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        likes: 1203,
        comments: 156,
        timestamp: '1 day ago',
      },
      {
        id: '3',
        platform: 'instagram',
        author: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        content: 'The AI Wellness Coach feature is a game-changer! 🤖✨ Personalized guidance whenever I need it. #DriftCommunity',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        likes: 567,
        comments: 89,
        timestamp: '3 days ago',
      },
      {
        id: '4',
        platform: 'tiktok',
        author: 'Mindful Maria',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        content: 'Sleep videos from Drift helped me finally get 8 hours! 😴💤 Goodbye insomnia! #SleepWellness #DriftApp',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        likes: 2341,
        comments: 312,
        timestamp: '4 days ago',
      },
      {
        id: '5',
        platform: 'instagram',
        author: 'Alex Rivera',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        content: 'Drift soundscapes while working = maximum productivity 🎵 The ocean waves preset is *chef\'s kiss* #DriftWellness',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        likes: 891,
        comments: 124,
        timestamp: '5 days ago',
      },
      {
        id: '6',
        platform: 'tiktok',
        author: 'Wellness Warrior',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Warrior',
        content: 'Drift helped me reduce anxiety by 80%! 🙏 This app is literally life-changing #MentalHealthMatters #DriftCommunity',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=400&fit=crop',
        likes: 3456,
        comments: 445,
        timestamp: '6 days ago',
      },
    ];

    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
      setPostsFromAPI(mockPosts);
    }, 800);
  }, []);

  const setPostsFromAPI = (data: SocialPost[]) => {
    setLoading(false);
    setPostsFromAPI(data);
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our <span className="text-accent">Community</span>
            </h2>
            <p className="text-lg text-muted-foreground">Loading community stories...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card/20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our <span className="text-accent">Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how thousands of members are transforming their lives with Drift
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="https://instagram.com/driftwellness"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy hover:bg-burgundy/90 text-white rounded-full transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </a>
            <a
              href="https://tiktok.com/@driftwellness"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-full transition-colors"
            >
              <Music className="w-4 h-4" />
              Follow on TikTok
            </a>
          </div>
        </div>

        {/* Social Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent/50 transition-all hover:shadow-lg"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center gap-3 border-b border-border/50">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                </div>
                <div className="flex items-center gap-1">
                  {post.platform === 'instagram' ? (
                    <Instagram className="w-4 h-4 text-pink-600" />
                  ) : (
                    <Music className="w-4 h-4 text-black" />
                  )}
                </div>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.content}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="p-4">
                <p className="text-sm text-foreground mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 pb-3 border-b border-border/50">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                    <Heart className="w-4 h-4" />
                    Like
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Comment
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Share your Drift journey with <span className="font-semibold text-foreground">#DriftWellness</span>
          </p>
          <a
            href="https://instagram.com/explore/tags/driftwellness"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors font-semibold"
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
}
