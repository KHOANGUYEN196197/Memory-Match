import Leaderboard from "./LeaderBoard";
import LoginWithGG from "./LoginWithGG";
import Timer from "./Timer";

interface ScoreboardProps {
  level: number;
  isRunning: boolean;
  setElapsed: (t: number) => void;
}

function Scoreboard({ level, isRunning, setElapsed }: ScoreboardProps) {
  return (
    <div>
      <LoginWithGG/>

      <div className="flex gap-[12px]">
        <div
          className="font-semibold text-sm text-[#8bdc9f]"
          style={{ fontFamily: "Pokemon Solid" }}
        >
          Level: <span className="text-blue-500">{level}</span>
        </div>
        <div
          className="font-semibold text-sm flex items-center gap-1 text-[#8bdc9f]"
          style={{ fontFamily: "Pokemon Solid" }}
        >
          Time: <Timer isRunning={isRunning} onTick={setElapsed} />
        </div>
      </div>
      <Leaderboard />
    </div>
  );
}

export default Scoreboard;
