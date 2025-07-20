import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Star, Heart, List, Activity, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import GameTile from '@/components/GameTile';
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

const Profile = () => {
  const { user } = useAuth();
  const [following, setFollowing] = useState(false);

  // Mock profile data
  const profile = {
    username: user?.user_metadata?.username || 'GamerTag',
    displayName: user?.user_metadata?.display_name || 'Gaming Enthusiast',
    bio: 'Passionate gamer exploring virtual worlds. Currently obsessed with RPGs and indie titles.',
    location: 'Gaming Realm',
    joinDate: 'January 2024',
    stats: {
      totalGames: 127,
      hoursPlayed: 1247,
      avgRating: 4.3,
      mostPlayedGenre: 'RPG',
      followers: 248,
      following: 156,
    }
  };

  // Mock data for tabs
  const diaryEntries = [
    { title: 'Cyberpunk 2077', date: '2024-01-15', rating: 4, image: game1 },
    { title: 'Elden Ring', date: '2024-01-10', rating: 5, image: game2 },
    { title: 'Gran Turismo 7', date: '2024-01-05', rating: 4, image: game3 },
  ];

  const reviews = [
    {
      game: 'Elden Ring',
      rating: 5,
      date: '2024-01-10',
      excerpt: 'A masterpiece that redefines open-world gaming...',
      likes: 42,
      image: game2
    },
    {
      game: 'Cyberpunk 2077',
      rating: 4,
      date: '2024-01-15',
      excerpt: 'Much improved since launch, Night City is stunning...',
      likes: 28,
      image: game1
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Banner */}
        <Card className="glass-card mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full md:w-auto">
                  <Button
                    variant={following ? "secondary" : "default"}
                    onClick={() => setFollowing(!following)}
                    className={`w-full ${following ? "" : "hero-button"}`}
                  >
                    {following ? 'Following' : 'Follow'}
                  </Button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="w-full">
                    <h1 className="text-3xl font-bold mb-1">{profile.displayName}</h1>
                    <p className="text-lg text-muted-foreground mb-2">@{profile.username}</p>
                    <p className="text-foreground mb-4 w-full">{profile.bio}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {profile.joinDate}
                  </div>
                </div>

                <div className="flex gap-4 text-sm">
                  <span><strong>{profile.stats.following}</strong> Following</span>
                  <span><strong>{profile.stats.followers}</strong> Followers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats.totalGames}</div>
              <div className="text-sm text-muted-foreground">Games Logged</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats.hoursPlayed}h</div>
              <div className="text-sm text-muted-foreground">Hours Played</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats.avgRating}/5</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats.mostPlayedGenre}</div>
              <div className="text-sm text-muted-foreground">Top Genre</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="diary" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="diary" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Diary
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="ratings" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Ratings
            </TabsTrigger>
            <TabsTrigger value="lists" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Lists
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diary" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diaryEntries.map((entry, index) => (
                <Card key={index} className="glass-card hover:bg-muted/20 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] mb-3 rounded-lg overflow-hidden">
                      <img 
                        src={entry.image} 
                        alt={entry.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-1">{entry.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{entry.date}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                        {entry.rating}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={review.image} 
                          alt={review.game}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{review.game}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{review.excerpt}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{review.date}</span>
                          <div className="flex items-center text-muted-foreground">
                            <Heart className="h-4 w-4 mr-1" />
                            {review.likes} likes
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ratings" className="mt-6">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {diaryEntries.map((game, index) => (
                <GameTile
                  key={index}
                  title={game.title}
                  image={game.image}
                  rating={game.rating}
                  year="2022"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lists" className="mt-6">
            <div className="text-center py-12">
              <List className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No lists yet</h3>
              <p className="text-muted-foreground">Create your first curated game list</p>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="space-y-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Rated Elden Ring 5 stars</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Logged 15 hours in Cyberpunk 2077</p>
                      <p className="text-sm text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;