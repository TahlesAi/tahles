
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import useFavorites from '@/hooks/useFavorites';
import useUserJourneyLogger from '@/hooks/useUserJourneyLogger';

interface FavoriteButtonProps {
  id: string;
  type: 'service' | 'provider';
  name: string;
  imageUrl?: string;
  price?: number;
  provider?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  type,
  name,
  imageUrl,
  price,
  provider,
  size = 'md',
  variant = 'ghost',
  className
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { logEvent } = useUserJourneyLogger();
  const isCurrentlyFavorite = isFavorite(id);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCurrentlyFavorite) {
      removeFromFavorites(id);
      logEvent('remove_from_favorites', { id, type, name });
    } else {
      addToFavorites({
        id,
        type,
        name,
        imageUrl,
        price,
        provider
      });
      logEvent('add_to_favorites', { id, type, name });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size="sm"
            onClick={handleToggleFavorite}
            className={cn(
              sizeClasses[size],
              'transition-all duration-200',
              isCurrentlyFavorite && 'text-red-500 hover:text-red-600',
              !isCurrentlyFavorite && 'text-gray-400 hover:text-red-500',
              className
            )}
          >
            <Heart 
              className={cn(
                iconSizes[size],
                'transition-all duration-200',
                isCurrentlyFavorite && 'fill-current'
              )} 
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCurrentlyFavorite ? 'הסר מהמועדפים' : 'הוסף למועדפים'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FavoriteButton;
