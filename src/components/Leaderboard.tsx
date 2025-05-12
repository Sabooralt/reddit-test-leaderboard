"use client";

import { useState, useEffect, useMemo } from "react";
import { Badge } from "./Badge";
import { Rank1, Rank2, Rank3, RankRest } from "./Rank_SVGS";
import { LeaderboardItem } from "@/types";
import { AnimatedNumber } from "./AnimatedNumber";

interface LeaderboardProps {
  items: LeaderboardItem[];
}

export default function Leaderboard({ items }: LeaderboardProps) {
  const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => {
      item.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [items]);

  useEffect(() => {
    const sortedItems = [...items].sort((a, b) => a.rank - b.rank);
    setLeaderboardItems(sortedItems);
    setIsLoading(false);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedTags.length === 0) {
      return leaderboardItems;
    }

    return leaderboardItems.filter((item) =>
      selectedTags.some((tag) => item.tags.includes(tag))
    );
  }, [leaderboardItems, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Rank1 />;
      case 2:
        return <Rank2 />;
      case 3:
        return <Rank3 />;
      default:
        return <RankRest />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto ">
      <div className="mb-4 bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter by Tags
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {selectedTags.length}{" "}
                {selectedTags.length === 1 ? "filter" : "filters"} applied
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-black hover:text-gray-800"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {isFilterOpen && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Select tags to filter:
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  active={selectedTags.includes(tag)}
                  className="cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="bg-black text-white p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Leaderboard
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  Rank
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  XP
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr className="bg-white">
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-4 sm:px-6 py-4 text-center">
                      {getRankIcon(item.rank)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-medium">
                      {item.username}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center font-bold">
                      {item.points.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center text-gray-700">
                      <AnimatedNumber value={item.xp} />
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            active={selectedTags.includes(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No results match your filter criteria. Try selecting
                    different tags or clear filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
