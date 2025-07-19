import Header from "@/components/Header";
import GameTile from "@/components/GameTile";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Gamepad2, Trophy, MessageSquare, Link, Zap } from "lucide-react";
import heroImage from "@/assets/hero-gaming.jpg";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";

const Index = () => {
  const featuredGames = [
    { title: "Cyberpunk 2077", image: game1, rating: 4.2, year: "2020" },
    { title: "Elden Ring", image: game2, rating: 4.8, year: "2022" },
    { title: "Gran Turismo 7", image: game3, rating: 4.1, year: "2022" },
    { title: "Cyberpunk 2077", image: game1, rating: 4.2, year: "2020" },
    { title: "Elden Ring", image: game2, rating: 4.8, year: "2022" },
    { title: "Gran Turismo 7", image: game3, rating: 4.1, year: "2022" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Gaming setup"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Track Your Games.{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Share Your Journey.
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover, log, and showcase your entire gaming history. Connect with fellow gamers and never lose track of your adventures.
            </p>
            <Button 
              className="hero-button text-lg px-10 py-6"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Games Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Popular This Week</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what games the community is playing and talking about
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {featuredGames.map((game, index) => (
              <GameTile
                key={index}
                title={game.title}
                image={game.image}
                rating={game.rating}
                year={game.year}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for gamers, by gamers. Track your progress, discover new titles, and connect with your community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={BookOpen}
              title="Log Your Games"
              description="Keep track of every game you've played, currently playing, or want to play. Rate and review your experiences."
            />
            <FeatureCard
              icon={Zap}
              title="Discover New Titles"
              description="Get personalized recommendations based on your gaming history and discover hidden gems."
            />
            <FeatureCard
              icon={Users}
              title="Connect With Friends"
              description="Follow other gamers, see what they're playing, and share your gaming journey together."
            />
            <FeatureCard
              icon={Link}
              title="Cross-Platform Sync"
              description="Connect your Steam, PlayStation, Xbox, and other gaming accounts for automatic game tracking."
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're constantly working on new features to enhance your gaming experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={MessageSquare}
              title="Community Reviews"
              description="Read and write detailed reviews. Help other gamers make informed decisions about their next adventure."
              isComingSoon
            />
            <FeatureCard
              icon={Trophy}
              title="Achievements & Trophies"
              description="Track your achievements across all platforms. Show off your gaming accomplishments and rare trophies."
              isComingSoon
            />
            <FeatureCard
              icon={Gamepad2}
              title="Enhanced Platform Sync"
              description="Deeper integration with Steam, PlayStation, Xbox, and Nintendo Switch for seamless game tracking."
              isComingSoon
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Gaming Journey?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of gamers who are already tracking their adventures with CtrlLog
          </p>
          <Button 
            className="hero-button text-lg px-10 py-6"
            onClick={() => window.location.href = '/auth'}
          >
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                CtrlLog
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
