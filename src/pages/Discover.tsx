import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Star, TrendingUp, Clock, Filter, Search, Heart, StarHalf, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import GameTile from '@/components/GameTile';
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

const Discover = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();
  
  // Define genres first
  const genres = [
    { id: 'rpg', name: 'RPG', count: 45 },
    { id: 'action', name: 'Action', count: 38 },
    { id: 'adventure', name: 'Adventure', count: 22 },
    { id: 'racing', name: 'Racing', count: 15 },
    { id: 'horror', name: 'Horror', count: 12 },
    { id: 'platformer', name: 'Platformer', count: 8 },
    { id: 'fighting', name: 'Fighting', count: 10 },
  ];

  // State variables
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genres.map(g => g.id));
  const [yearFrom, setYearFrom] = useState(currentYear);
  const [yearTo, setYearTo] = useState(currentYear);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingFilter, setRatingFilter] = useState('above');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  // Generate year options
  const yearOptions = [];
  for (let year = currentYear; year >= 1990; year--) {
    yearOptions.push(year);
  }

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

  const filteredGames = selectedGenres.length === genres.length
    ? featuredGames 
    : featuredGames.filter(game => selectedGenres.includes(game.genre));

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-between min-w-[150px]">
                    {yearFrom === yearTo ? `${yearFrom}` : `${yearFrom} - ${yearTo}`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Year Range</div>
                    <div className="flex gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">From</label>
                        <select
                          value={yearFrom}
                          onChange={(e) => setYearFrom(Number(e.target.value))}
                          className="w-20 p-2 rounded border border-input bg-background"
                        >
                          {yearOptions.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">To</label>
                        <select
                          value={yearTo}
                          onChange={(e) => setYearTo(Number(e.target.value))}
                          className="w-20 p-2 rounded border border-input bg-background"
                        >
                          {yearOptions.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Rating Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-between min-w-[150px]">
                    {selectedRating === 0 ? 'Any rating' : `Rating ${ratingFilter === 'above' ? '≥' : '≤'} ${selectedRating} stars`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="relative">
                          <button
                            onClick={() => setSelectedRating(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="p-1 relative"
                          >
                            <Star 
                              className={`h-6 w-6 ${
                                (hoveredStar >= star || selectedRating >= star) 
                                ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => setSelectedRating(star - 0.5)}
                            onMouseEnter={() => setHoveredStar(star - 0.5)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="absolute left-1 top-1 w-3 h-6 bg-transparent"
                          />
                        </div>
                      ))}
                    </div>
                    {selectedRating > 0 && (
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant={ratingFilter === 'above' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRatingFilter('above')}
                        >
                          ≥ {selectedRating}
                        </Button>
                        <Button
                          variant={ratingFilter === 'below' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRatingFilter('below')}
                        >
                          ≤ {selectedRating}
                        </Button>
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedRating(0)}
                      className="w-full text-center px-3 py-2 rounded-md text-sm hover:bg-accent"
                    >
                      Any rating
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Genre Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-between min-w-[130px]">
                    {selectedGenres.length === genres.length ? 'All genres' : 
                     selectedGenres.length === 1 ? genres.find(g => g.id === selectedGenres[0])?.name :
                     `${selectedGenres.length} genres`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Select Genres</div>
                    <div className="grid grid-cols-3 gap-2 max-w-xs">
                      {genres.map((genre) => (
                        <button
                          key={genre.id}
                          onClick={() => {
                            const isSelected = selectedGenres.includes(genre.id);
                            if (isSelected) {
                              const newSelection = selectedGenres.filter(id => id !== genre.id);
                              setSelectedGenres(newSelection.length === 0 ? genres.map(g => g.id) : newSelection);
                            } else {
                              setSelectedGenres([...selectedGenres, genre.id]);
                            }
                          }}
                          className={`px-3 py-2 rounded-full text-xs font-medium transition-colors hover:bg-accent ${
                            selectedGenres.includes(genre.id) 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2 border-t">
                      <button
                        onClick={() => setSelectedGenres(genres.map(g => g.id))}
                        className="px-3 py-1 text-xs rounded hover:bg-accent"
                      >
                        Select All
                      </button>
                      <button
                        onClick={() => setSelectedGenres([])}
                        className="px-3 py-1 text-xs rounded hover:bg-accent"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

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
                    variant={selectedGenres.includes(genre.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const isSelected = selectedGenres.includes(genre.id);
                      if (isSelected) {
                        const newSelection = selectedGenres.filter(id => id !== genre.id);
                        setSelectedGenres(newSelection.length === 0 ? genres.map(g => g.id) : newSelection);
                      } else {
                        setSelectedGenres([...selectedGenres, genre.id]);
                      }
                    }}
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