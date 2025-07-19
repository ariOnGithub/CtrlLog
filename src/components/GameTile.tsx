import { Star } from "lucide-react";

interface GameTileProps {
  title: string;
  image: string;
  rating?: number;
  year?: string;
}

const GameTile = ({ title, image, rating, year }: GameTileProps) => {
  return (
    <div className="game-tile group cursor-pointer">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between text-xs text-white/80">
            {year && <span>{year}</span>}
            {rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-secondary text-secondary" />
                <span>{rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTile;