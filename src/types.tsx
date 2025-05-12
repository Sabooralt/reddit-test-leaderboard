/* 
Username
* XP total
* Associated tags (e.g., “DeFi”, “NFTs”, etc.)
* Rank (sorted from highest to lowest XP)
* Allow filtering by tag (e.g., only show users with tag “DeFi”) 
* */

export interface LeaderboardItem {
  username: string;
  points: number;
  tags: string[];

  xp: number;
}
