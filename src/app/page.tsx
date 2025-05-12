import Leaderboard from "@/components/Leaderboard";
import { leaderboard } from "@/data/leaderboard";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Player Rankings</h1>
      <Leaderboard items={leaderboard} />
    </main>
  );
}
