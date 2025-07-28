import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  Calendar, 
  Users, 
  Trophy,
  ExternalLink,
  Play,
  Check,
  X,
  Plus,
  ChevronDown,
  MessageCircle,
  Heart,
  Share2,
  Clock,
  Gamepad2,
  Monitor,
  Smartphone
} from 'lucide-react';
import Header from '@/components/Header';
import GameTile from '@/components/GameTile';
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

const GameInfo = () => {
  const { gameId } = useParams();
  const { user } = useAuth();
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Mock game data - would come from API based on gameId
  const gameData = {
    id: gameId,
    title: "Cyberpunk 2077",
    coverImage: game1,
    developer: "CD Projekt RED",
    publisher: "CD Projekt",
    releaseDate: "2020-12-10",
    platforms: ["PC", "PS5", "Xbox Series X/S", "PS4", "Xbox One"],
    genres: ["RPG", "Action", "Open World", "Sci-Fi"],
    description: {
      short: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
      full: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character's cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you. Built for next-generation hardware, Cyberpunk 2077 features ray tracing, faster loading times and a host of other improvements."
    },
    rating: {
      average: 4.2,
      count: 15420,
      distribution: { 5: 6500, 4: 4200, 3: 2800, 2: 1200, 1: 720 }
    },
    stats: {
      playing: 2800,
      completed: 8400,
      dropped: 1200,
      wishlisted: 3200
    },
    duration: {
      main: "22 hours",
      completionist: "103 hours"
    },
    achievements: {
      total: 44,
      unlocked: user ? 23 : 0,
      rarest: "The Sun (0.8%)"
    },
    media: [
      { type: 'image', url: game1, caption: 'Night City skyline' },
      { type: 'image', url: game2, caption: 'Character customization' },
      { type: 'image', url: game3, caption: 'Combat gameplay' },
    ],
    links: {
      official: "https://www.cyberpunk.net",
      steam: "https://store.steampowered.com/app/1091500",
      psn: "https://store.playstation.com",
      xbox: "https://www.xbox.com"
    }
  };

  const reviews = [
    {
      id: 1,
      author: "GamerPro2023",
      rating: 5,
      date: "2024-01-15",
      content: "After the recent updates, this game has become a masterpiece. The world-building is incredible and the story is engaging.",
      likes: 128
    },
    {
      id: 2,
      author: "NightCityFan",
      rating: 4,
      date: "2024-01-10",
      content: "Great atmosphere and visuals. Some bugs still persist but overall a solid experience.",
      likes: 89
    },
    {
      id: 3,
      author: "RPGLover",
      rating: 4,
      date: "2024-01-08",
      content: "The RPG elements are well implemented. Character progression feels meaningful.",
      likes: 56
    }
  ];

  const similarGames = [
    { id: 1, title: 'Deus Ex: Mankind Divided', image: game2, rating: 4.1, year: '2016' },
    { id: 2, title: 'The Witcher 3', image: game3, rating: 4.9, year: '2015' },
    { id: 3, title: 'Ghost in the Shell', image: game1, rating: 3.8, year: '2017' },
    { id: 4, title: 'Shadowrun Returns', image: game2, rating: 4.3, year: '2013' },
    { id: 5, title: 'Blade Runner 2049', image: game3, rating: 4.5, year: '2019' },
    { id: 6, title: 'Detroit: Become Human', image: game1, rating: 4.4, year: '2018' }
  ];

  const platformIcons = {
    PC: Monitor,
    PS5: Gamepad2,
    "Xbox Series X/S": Gamepad2,
    PS4: Gamepad2,
    "Xbox One": Gamepad2,
    Mobile: Smartphone
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFullStar = rating >= star;
          const isPartialStar = rating >= star - 0.75 && rating < star;
          const isQuarterStar = rating >= star - 1 && rating < star - 0.75;
          const isHalfStar = rating >= star - 0.75 && rating < star - 0.25;
          const isThreeQuarterStar = rating >= star - 0.25 && rating < star;
          
          let fillWidth = '0%';
          if (isFullStar) fillWidth = '100%';
          else if (isThreeQuarterStar) fillWidth = '75%';
          else if (isHalfStar) fillWidth = '50%';
          else if (isQuarterStar) fillWidth = '25%';
          
          return (
            <div key={star} className="relative">
              <Star 
                className={`h-5 w-5 text-gray-300 ${interactive ? 'cursor-pointer' : ''}`}
                onClick={interactive ? () => setUserRating(star) : undefined}
                onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
                onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
              />
              {(isFullStar || isPartialStar) && (
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: fillWidth }}
                >
                  <Star className="h-5 w-5 text-primary fill-current" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Game Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Cover Image */}
          <div className="lg:col-span-1">
            <div className="aspect-[3/4] relative overflow-hidden rounded-2xl">
              <img 
                src={gameData.coverImage} 
                alt={gameData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Game Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{gameData.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <span>{gameData.developer}</span>
                <span>•</span>
                <span>{gameData.publisher}</span>
                <span>•</span>
                <span>{new Date(gameData.releaseDate).getFullYear()}</span>
              </div>
              
              {/* Platforms */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {gameData.platforms.map((platform) => {
                  const IconComponent = platformIcons[platform as keyof typeof platformIcons] || Monitor;
                  return (
                    <div key={platform} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm">{platform}</span>
                    </div>
                  );
                })}
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {gameData.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="px-3 py-1">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Rating Summary */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">CtrlLog Community Rating</div>
                    <div className="text-3xl font-bold mb-2">{gameData.rating.average}</div>
                    {renderStars(gameData.rating.average)}
                    <div className="text-sm text-muted-foreground mt-1">
                      {gameData.rating.count.toLocaleString()} ratings
                    </div>
                  </div>
                  
                  {user && (
                    <div className="text-center border-l border-zinc-700 pl-6">
                      <div className="text-sm text-muted-foreground mb-2">Your Rating</div>
                      <div className="flex justify-center">
                        {renderStars(hoveredStar || userRating, true)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {userRating ? `${userRating} stars` : 'Not rated'}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center border-l border-zinc-700 pl-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-lg font-semibold text-green-400">
                          {gameData.stats.completed.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-blue-400">
                          {gameData.stats.playing.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Playing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {user ? (
                <>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Log
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                </>
              ) : (
                <Button size="lg" variant="outline">
                  Log in to track
                </Button>
              )}
              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {showFullDescription ? gameData.description.full : gameData.description.short}
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto mt-2 text-primary hover:text-primary/80"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                </Button>
              </CardContent>
            </Card>

            {/* Game Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Release Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Release Date</span>
                    <span>{new Date(gameData.releaseDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Developer</span>
                    <span>{gameData.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Publisher</span>
                    <span>{gameData.publisher}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Play Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Main Story</span>
                    <span>{gameData.duration.main}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completionist</span>
                    <span>{gameData.duration.completionist}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-primary" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span>{gameData.achievements.total}</span>
                  </div>
                  {user && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unlocked</span>
                      <span className="text-green-400">{gameData.achievements.unlocked}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rarest</span>
                    <span className="text-xs">{gameData.achievements.rarest}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* External Links */}
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={gameData.links.official} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Official Site
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={gameData.links.steam} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Steam
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={gameData.links.psn} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      PlayStation
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={gameData.links.xbox} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Xbox
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Games */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Games</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {similarGames.map((game) => (
                    <Link key={game.id} to={`/game/${game.id}`}>
                      <GameTile
                        title={game.title}
                        image={game.image}
                        rating={game.rating}
                        year={game.year}
                      />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              {user && (
                <Card>
                  <CardHeader>
                    <CardTitle>Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Your Rating:</span>
                        {renderStars(hoveredStar || userRating, true)}
                      </div>
                      <textarea 
                        placeholder="Share your thoughts about this game..."
                        className="w-full p-3 rounded-lg border border-input bg-background min-h-[100px] resize-none"
                      />
                      <Button>Post Review</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Community Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {review.author[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium">{review.author}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="mr-1 h-4 w-4" />
                          {review.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="mr-1 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Screenshots & Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={gameData.media[activeMediaIndex].url} 
                      alt={gameData.media[activeMediaIndex].caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {gameData.media.map((media, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveMediaIndex(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                          activeMediaIndex === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={media.url} 
                          alt={media.caption}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Player Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-400" />
                        <span>Completed</span>
                      </div>
                      <span className="font-semibold">{gameData.stats.completed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-2">
                        <Play className="h-5 w-5 text-blue-400" />
                        <span>Currently Playing</span>
                      </div>
                      <span className="font-semibold">{gameData.stats.playing.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2">
                        <X className="h-5 w-5 text-red-400" />
                        <span>Dropped</span>
                      </div>
                      <span className="font-semibold">{gameData.stats.dropped.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-yellow-400" />
                        <span>Wishlisted</span>
                      </div>
                      <span className="font-semibold">{gameData.stats.wishlisted.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = gameData.rating.distribution[stars as keyof typeof gameData.rating.distribution];
                      const percentage = (count / gameData.rating.count) * 100;
                      return (
                        <div key={stars} className="flex items-center gap-3">
                           <div className="flex items-center gap-1 w-12">
                             <span className="text-sm">{stars}</span>
                             <Star className="h-3 w-3 text-primary fill-current" />
                           </div>
                           <div className="flex-1 bg-muted rounded-full h-2">
                             <div 
                               className="bg-primary h-2 rounded-full transition-all duration-300"
                               style={{ width: `${percentage}%` }}
                             />
                           </div>
                          <span className="text-sm text-muted-foreground w-16 text-right">
                            {count.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
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

export default GameInfo;