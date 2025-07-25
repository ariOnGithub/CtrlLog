import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Clock, Filter, Search, Heart, StarHalf } from 'lucide-react';
import Header from '@/components/Header';
import GameTile from '@/components/GameTile';
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

const Discover = () => {
  const { user } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYearRange, setSelectedYearRange] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingFilter, setRatingFilter] = useState('above');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for games
  const featuredGames = [
    { id: 1, title: 'Cyberpunk 2077', image: game1, rating: 4.2, year: '2020', genre: 'rpg' },
    { id: 2, title: 'Elden Ring', image: game2, rating: 4.8, year: '2022', genre: 'rpg' },
    { id: 3, title: 'Gran Turismo 7', image: game3, rating: 4.1, year: '2022', genre: 'racing' },
    { id: 4, title: 'Horizon Forbidden West', image: game1, rating: 4.6, year: '2022', genre: 'action' },
    { id: 5, title: 'God of War Ragnarök', image: game2, rating: 4.9, year: '2022', genre: 'action' },
    { id: 6, title: 'The Last of Us Part I', image: game3, rating: 4.3, year: '2022', genre: 'action' },
  ];

  const latestGames = [
    { id: 7, title: 'Spider-Man 2', image: game1, rating: 4.7, year: '2023', genre: 'action' },
    { id: 8, title: 'Baldur\'s Gate 3', image: game2, rating: 4.9, year: '2023', genre: 'rpg' },
    { id: 9, title: 'Starfield', image: game3, rating: 4.0, year: '2023', genre: 'rpg' },
    { id: 10, title: 'Alan Wake 2', image: game1, rating: 4.4, year: '2023', genre: 'horror' },
  ];

  const bestReviewedGames = [
    { id: 11, title: 'The Legend of Zelda: Tears of the Kingdom', image: game2, rating: 4.9, year: '2023', genre: 'adventure' },
    { id: 12, title: 'Super Mario Bros. Wonder', image: game3, rating: 4.8, year: '2023', genre: 'platformer' },
    { id: 13, title: 'Metroid Prime Remastered', image: game1, rating: 4.7, year: '2023', genre: 'adventure' },
  ];

  const recommendedGames = user ? [
    { id: 14, title: 'Final Fantasy XVI', image: game2, rating: 4.5, year: '2023', genre: 'rpg', reason: 'Featured: Epic fantasy adventure' },
    { id: 15, title: 'Diablo IV', image: game3, rating: 4.2, year: '2023', genre: 'rpg', reason: 'Similar to games you\'ve rated highly' },
    { id: 16, title: 'Street Fighter 6', image: game1, rating: 4.6, year: '2023', genre: 'fighting', reason: 'Trending in your network' },
    { id: 17, title: 'The Witcher 3', image: game2, rating: 4.9, year: '2015', genre: 'rpg', reason: 'Featured: Community favorite' },
    { id: 18, title: 'Red Dead Redemption 2', image: game3, rating: 4.7, year: '2018', genre: 'action', reason: 'Based on your adventure preferences' },
    { id: 19, title: 'Cyberpunk 2077', image: game1, rating: 4.2, year: '2020', genre: 'rpg', reason: 'Futuristic RPG experience' },
  ] : [];

  const genres = [
    { id: 'all', name: 'All Games', count: 150 },
    { id: 'rpg', name: 'RPG', count: 45 },
    { id: 'action', name: 'Action', count: 38 },
    { id: 'adventure', name: 'Adventure', count: 22 },
    { id: 'racing', name: 'Racing', count: 15 },
    { id: 'horror', name: 'Horror', count: 12 },
    { id: 'platformer', name: 'Platformer', count: 8 },
    { id: 'fighting', name: 'Fighting', count: 10 },
  ];

  const filteredGames = selectedGenre === 'all' 
    ? featuredGames 
    : featuredGames.filter(game => game.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Discover Games
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore the latest releases, hidden gems, and community favorites
          </p>
        </div>

        {/* Featured Games - Show for new users */}
        {!user && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Games</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredGames.slice(0, 6).map((game) => (
                <GameTile
                  key={game.id}
                  title={game.title}
                  image={game.image}
                  rating={game.rating}
                  year={game.year}
                />
              ))}
            </div>
          </div>
        )}

        {user && recommendedGames.length > 0 && (
          <div className="mb-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
                  Recommended For You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {recommendedGames.slice(0, 6).map((game) => (
                    <div key={game.id} className="flex flex-col">
                      <GameTile
                        title={game.title}
                        image={game.image}
                        rating={game.rating}
                        year={game.year}
                      />
                      <p className="text-base text-muted-foreground mt-2 text-center">{game.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col gap-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
              />
            </div>
            
            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Year Range Dropdown */}
              <select
                value={selectedYearRange}
                onChange={(e) => setSelectedYearRange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-input bg-background text-sm min-w-[120px]"
              >
                <option value="all">All time</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2015-2019">2015-2019</option>
                <option value="before-2015">Before 2015</option>
              </select>

              {/* Rating Dropdown */}
              <div className="relative">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg border border-input bg-background text-sm min-w-[120px] appearance-none cursor-pointer"
                >
                  <option value={0}>Any rating</option>
                  <option value={0.5}>0.5+ stars</option>
                  <option value={1}>1+ stars</option>
                  <option value={1.5}>1.5+ stars</option>
                  <option value={2}>2+ stars</option>
                  <option value={2.5}>2.5+ stars</option>
                  <option value={3}>3+ stars</option>
                  <option value={3.5}>3.5+ stars</option>
                  <option value={4}>4+ stars</option>
                  <option value={4.5}>4.5+ stars</option>
                  <option value={5}>5 stars</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`h-3 w-3 ${selectedRating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Genre Dropdown */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-3 py-2 rounded-lg border border-input bg-background text-sm min-w-[120px]"
              >
                <option value="all">All genres</option>
                {genres.filter(g => g.id !== 'all').map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name} ({genre.count})
                  </option>
                ))}
              </select>

              {/* Apply Filters Button */}
              <Button className="px-6">
                <Search className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="latest" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Latest
            </TabsTrigger>
            <TabsTrigger value="best-reviewed" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Best Reviewed
            </TabsTrigger>
            <TabsTrigger value="by-genre" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              By Genre
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {latestGames.map((game) => (
                <GameTile
                  key={game.id}
                  title={game.title}
                  image={game.image}
                  rating={game.rating}
                  year={game.year}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="best-reviewed" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {bestReviewedGames.map((game) => (
                <GameTile
                  key={game.id}
                  title={game.title}
                  image={game.image}
                  rating={game.rating}
                  year={game.year}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="by-genre" className="mt-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Browse by Genre</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre.id}
                    variant={selectedGenre === genre.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGenre(genre.id)}
                    className="flex items-center gap-2"
                  >
                    {genre.name}
                    <Badge variant="secondary" className="text-xs">
                      {genre.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredGames.map((game) => (
                <GameTile
                  key={game.id}
                  title={game.title}
                  image={game.image}
                  rating={game.rating}
                  year={game.year}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Discover;