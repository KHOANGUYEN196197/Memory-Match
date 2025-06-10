import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

interface Player {
  name: string;
  photoURL?: string;
  level: number;
  time: number;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  // const rankEmojis = ["🥇", "🥈", "🥉"];
  const rankEmojis: string | any[] = [];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "leaderboard"),
        orderBy("level", "desc"),
        orderBy("time", "asc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const data: Player[] = snapshot.docs.map((doc) => doc.data() as Player);
      setPlayers(data);
      setIsLoading(false);
    } catch (error) {
      setPlayers([]);
      setIsLoading(false);
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <>
      <div
        className="py-[42px] px-[36px] max-w-2xl mx-auto mt-10 p-6 bg-[#8bdc9f26] shadow-2xl rounded-2xl "
        style={{ fontFamily: "Pokemon Solid" }}
      >
        <h1 className="text-3xl font-bold text-center mt-[1px]">Leaderboard</h1>
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-5">
            {players.map((player, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80,
                }}
                className="flex gap-[8px] items-start bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex gap-[6px] items-center space-x-4">
                  {rankEmojis.length > 0 && (
                    <span className="text-2xl">
                      {rankEmojis[index] || `${index + 1}.`}
                    </span>
                  )}

                  <img
                    src={player.photoURL}
                    alt={player.name}
                    className="w-[35px] h-[35px] rounded-full border-1 border-blue-500"
                  />
                  <div>
                    <p className="text-lg font-semibold">{player.name}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Level {player.level}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
