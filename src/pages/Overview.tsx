import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Plus, Clock, Star, TrendingUp, Users, Calendar, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Overview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for now
  const stats = {
    gamesLogged: 42,
    hoursTracked: 284,
    avgRating: 4.2,
  };

  const recentActivity = [
    {
      type: 'game_logged',
      content: 'You logged Cyberpunk 2077',
      time: '2 days ago',
      icon: Gamepad2,
    },
    {
      type: 'review',
      content: 'You reviewed Elden Ring - 5 stars',
      time: '3 days ago',
      icon: Star,
    },
    {
      type: 'sync',
      content: 'Synced 5 games from Steam',
      time: '1 week ago',
      icon: TrendingUp,
    },
    {
      type: 'friend',
      content: 'Alex started following you',
      time: '2 weeks ago',
      icon: Users,
    },
  ];

  const quickActions = [
    { name: 'My Profile', icon: Users, path: '/profile' },
    { name: 'Discover Games', icon: TrendingUp, path: '/discover' },
    { name: 'Find Friends', icon: Users, path: '/friends' },
    { name: 'Settings', icon: Gamepad2, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            Welcome back, {user?.user_metadata?.username || 'Gamer'}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Continue tracking your gaming journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex justify-center">
          <Button 
            onClick={() => navigate('/log-game')}
            className="hero-button text-lg px-8 py-6"
          >
            <Plus className="mr-2 h-5 w-5" />
            🎮 Log a New Game
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="actions" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Quick Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats Panel */}
              <div className="lg:col-span-1">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                      Your Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Games Logged</span>
                      <Badge variant="secondary" className="text-lg bg-accent text-accent-foreground">
                        {stats.gamesLogged}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Hours Tracked</span>
                      <Badge variant="secondary" className="text-lg bg-accent text-accent-foreground">
                        {stats.hoursTracked}h
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg Rating</span>
                      <Badge variant="secondary" className="text-lg bg-accent text-accent-foreground">
                        {stats.avgRating}/5
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Feed */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => {
                        const IconComponent = activity.icon;
                        return (
                          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                            <div className="p-2 rounded-full bg-primary/10">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.content}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-muted/50 hover:border-primary/50 transition-colors"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Overview;