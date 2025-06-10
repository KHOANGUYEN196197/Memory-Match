import { useState, useEffect, useMemo } from "react";
import { useGameStore } from "../store/gameStore/GameStore";
import Card from "./Card";
import Scoreboard from "./Scoreboard";
import { saveScore } from "../utils/saveScore";
import { getAuth } from "firebase/auth";

export default function Board() {
  const cards = useGameStore((state) => state.pokemonList);
  const gridSize = useGameStore((state) => state.gridSize);
  const setGridSize = useGameStore((state) => state.setGridSize);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<string>>(new Set());
  const [disableAll, setDisableAll] = useState(false);
  const setLoading = useGameStore((state) => state.setLoading);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const user = getAuth().currentUser;

  const gridCols = useMemo(() => {
    return gridSize;
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
        setLoading(true);
        setIsRunning(false);
        const nextGrid = gridSize + 1;
        const level = nextGrid - 1;
        const time = elapsed;
        if (user) {
           saveScore(user, level, time);
        }
        setGridSize(nextGrid);
      }, 1000);
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
    <div className="flex items-start justify-between h-full gap-4">
      <div className="text-center w-[70%]">
        <div
          className={`gap-x-[3px] gap-y-[3px] justify-start grid`}
          style={{
            gridTemplateColumns: `repeat(${
              gridCols % 2 === 0
                ? gridCols > 22
                  ? 20
                  : gridCols
                : gridCols + 1 > 22
                ? 20
                : gridCols + 1
            }, 60px)`,
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
      </div>
      <div className="py-[30px] px-[16px] bg-[#8bdc9f26] w-[28%] h-[calc(100vh-60px)] flex flex-col items-center justify-between">
        <Scoreboard
          level={gridCols - 1}
          isRunning={isRunning}
          setElapsed={setElapsed}
        />
      </div>
    </div>
  );
}
