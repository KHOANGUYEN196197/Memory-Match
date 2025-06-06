import { useState, useEffect, useMemo } from "react";
import { useGameStore } from "../store/gameStore/GameStore";
import Card from "./Card";

export default function Board() {
  const cards = useGameStore((state) => state.pokemonList);
  const gridSize = useGameStore((state) => state.gridSize);
  const setGridSize = useGameStore((state) => state.setGridSize);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<string>>(new Set());
  const [disableAll, setDisableAll] = useState(false);
  const gridCols = useMemo(() => {
    return gridSize
  }, [cards.length]);

  const handleCardClick = (uid: string) => {
    if (disableAll || flippedCards.includes(uid) || matchedCards.has(uid))
      return;

    if (flippedCards.length === 0) {
      setFlippedCards([uid]);
    } else if (flippedCards.length === 1) {
      const firstUid = flippedCards[0];
      setFlippedCards([firstUid, uid]);
      setDisableAll(true);
    }
  };
  useEffect(() => {
    if (matchedCards.size === cards.length && cards.length > 0) {
      setTimeout(() => {
        const nextGrid = gridSize + 1;
        setGridSize(nextGrid);
      }, 1500);
    }
  }, [matchedCards, cards.length]);



  useEffect(() => {
    if (flippedCards.length < 2) return;

    const [firstUid, secondUid] = flippedCards;
    const firstCard = cards.find((c) => c.uid === firstUid);
    const secondCard = cards.find((c) => c.uid === secondUid);

    if (!firstCard || !secondCard) return;

    if (firstCard.id === secondCard.id) {
      setMatchedCards((prev) => new Set(prev).add(firstUid).add(secondUid));
      setFlippedCards([]);
      setDisableAll(false);
    } else {
      const timeout = setTimeout(() => {
        setFlippedCards([]);
        setDisableAll(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [flippedCards, cards]);

  return (
    
    <div
      className={`gap-[10px] justify-center grid`}
        style={{
        gridTemplateColumns: `repeat(${gridCols}, 96px)`,
      }}

    >
      {cards.map((card) => (
        <Card
          key={card.uid}
          card={card}
          isFlipped={flippedCards.includes(card.uid || "")}
          isMatched={matchedCards.has(card.uid || "")}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}
