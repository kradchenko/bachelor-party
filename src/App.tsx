import { useCallback, useEffect, useState } from "react";
import { CHALLENGES, ChallengeType } from "./challenges";

const App = () => {
  const [isNight, setIsNight] = useState<boolean>(false);
  const toggle = () => {
    setIsNight((prev) => !prev);
  };

  const [usedChallenges, setUsedChallenges] = useState<number[]>([]);

  useEffect(() => {
    const usedChallengesStr = localStorage.getItem("usedChallenges");
    if (usedChallengesStr) {
      const usedChallenges = JSON.parse(usedChallengesStr);
      setUsedChallenges(usedChallenges);
    }
  }, []);

  const finishChallenge = useCallback(
    (newId: number) => {
      const newUsedChallenges = [...usedChallenges, newId];

      localStorage.setItem("usedChallenges", JSON.stringify(newUsedChallenges));

      setUsedChallenges(newUsedChallenges);
    },
    [usedChallenges]
  );

  return (
    <div className="bg-black h-full w-full flex flex-col justify-start items-center text-white">
      <div className="flex items-center justify-between w-full p-3 border-b border-white">
        <h1 className="text-white text-2xl text-center">Bachelor Party</h1>
        <DayNightButton isNight={isNight} toggle={toggle} />
      </div>
      <CardList
        isNight={isNight}
        usedChallenges={usedChallenges}
        finishChallenge={finishChallenge}
      />
    </div>
  );
};

const CardList = ({
  isNight,
  usedChallenges,
  finishChallenge,
}: {
  isNight: boolean;
  usedChallenges: number[];
  finishChallenge: (newId: number) => void;
}) => {
  const filteredChallenges = isNight
    ? CHALLENGES.filter((el) => el.type === ChallengeType.NIGHT)
    : CHALLENGES.filter((el) => el.type === ChallengeType.DAY);

  return (
    <div className="px-3 w-full mt-5">
      <span className="text-xl text-gray-100">
        {isNight ? "Night Challenges" : "Day Challenges"}
      </span>
      {filteredChallenges.map((challenge, index) => {
        return (
          <Card
            key={`challenge_${challenge.id}`}
            id={index}
            title={challenge.title}
            challengeText={challenge.challengeText}
            punishmentText={challenge.punishmentText}
            revealed={usedChallenges.includes(challenge.id)}
            finishChallenge={() => finishChallenge(challenge.id)}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  id,
  title,
  challengeText,
  punishmentText,
  revealed,
  finishChallenge,
}: {
  id: number;
  title: string;
  challengeText: string;
  punishmentText: string;
  revealed: boolean;
  finishChallenge: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isForfeit, setIsForfeit] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center my-5 p-5 bg-gray-800 rounded-xl w-full">
        {revealed ? title : `Challenge #${id + 1}`}
        <button
          className="rounded-xl bg-gray-700 p-3"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Reveal
        </button>
      </div>
      {isOpen && !isForfeit ? (
        <div className="flex flex-col px-2 my-5">
          <div className="text-2xl border-b border-white pb-2 mb-3">
            {title}
          </div>
          <div className="text-xl">{challengeText}</div>
          <div className="flex justify-around items-center mt-5">
            <button
              className="rounded-xl bg-green-800 p-3 text-xl"
              onClick={finishChallenge}
            >
              Done
            </button>
            <button
              className="rounded-xl bg-red-800 p-3 text-xl"
              onClick={() => setIsForfeit(true)}
            >
              Forfeit
            </button>
          </div>
        </div>
      ) : null}
      {isOpen && isForfeit ? (
        <div className="flex flex-col px-2 my-5">
          <div className="text-2xl border-b border-white pb-2 mb-3">
            This is your punishment!!!
          </div>
          <div className="text-xl">{challengeText}</div>
        </div>
      ) : null}
    </>
  );
};

const DayNightButton = ({
  toggle,
  isNight,
}: {
  toggle: () => void;
  isNight: boolean;
}) => {
  return (
    <button
      onClick={toggle}
      className="border border-white rounded-xl text-white p-3"
    >
      {isNight ? "Day" : "Night"}
    </button>
  );
};

export default App;
