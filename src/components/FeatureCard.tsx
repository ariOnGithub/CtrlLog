import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isComingSoon?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, isComingSoon }: FeatureCardProps) => {
  return (
    <div className={`feature-card ${isComingSoon ? 'opacity-75' : ''}`}>
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {isComingSoon && (
              <span className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-full">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;