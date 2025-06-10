import React from 'react';
import type { Pokemon } from '../store/gameStore/GameStore';

interface CardProps {
  card: Pokemon;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (uid: string) => void;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(card.uid || '');
    }
  };

  return (
   <div className="w-[60px] h-[60px] bg-[#8bdc9f45] perspective cursor-pointer" onClick={handleClick}>
  <div
    className={`relative w-full h-full card-inner ${isFlipped || isMatched ? 'card-rotate' : ''}`}
  >
    
    <div className="absolute bg-[#8bdc9f] w-full h-full bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center card-face">
    </div>
    <div className="absolute w-full h-full bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center card-face card-back">
      <img
        src={card.image}
        alt={card.name}
        className="w-[60px] h-[60px] object-contain"
        draggable={false}
      />
    </div>
  </div>
</div>
  );
};

export default Card;
