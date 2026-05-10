// Statikus teszt adatok a Results oldalhoz
// A valódi implementáció később jöhet adatbázisból / API-ból.

export type DriverResult = {
  position: number;
  driverName: string;
  entryOrder: number; // nevezési sorrend
  points: number;
};

export type TimedResult = {
  position: number;
  driverName: string;
  time: string; // pl. "36,894"
  gap: string; // pl. "+0,249" vagy "-" az elsőnek
};

export type RaceEntry = {
  position: number;
  driverName: string;
  points: number;
  gap: string;
  positionChange: number;
  category?: string;
};

export type OverallEntry = {
  position: number;
  driverName: string;
  totalPoints: number;
  rounds: { detail: string; points: number }[];
};

export type CategoryResult = {
  categoryId: string;
  categoryName: string;
  results: DriverResult[];
  timedResults?: TimedResult[];
  raceResults?: RaceEntry[];
  timedTabs?: { label: string; results: TimedResult[] }[];
  raceTabs?: { label: string; results: RaceEntry[] }[];
  absoluteTabs?: { label: string; kind: 'race' | 'timed'; results: RaceEntry[] | TimedResult[] }[];
  overallResults?: OverallEntry[];
  roundLabels?: string[];
  displayMode?: 'full' | 'simple' | 'absolute' | 'points' | 'overall';
};

const round3AbsoluteTimed1Results: TimedResult[] = [
  { position: 1, driverName: 'Gyeskó Csongor', time: '37,124', gap: '-' },
  { position: 2, driverName: 'Dworák Marcell', time: '37,440', gap: '+0,316' },
  { position: 3, driverName: 'Kőrösi Dávid', time: '37,448', gap: '+0,324' },
  { position: 4, driverName: 'Lámer Zoltán', time: '37,518', gap: '+0,394' },
  { position: 5, driverName: 'Halmágyi Péter (J)', time: '37,617', gap: '+0,493' },
  { position: 6, driverName: 'Petruska Milán', time: '37,646', gap: '+0,522' },
  { position: 7, driverName: 'Szabó József (J)', time: '37,691', gap: '+0,567' },
  { position: 8, driverName: 'Lámer Richárd', time: '37,692', gap: '+0,568' },
  { position: 9, driverName: 'Kiss Dániel', time: '37,694', gap: '+0,570' },
  { position: 10, driverName: 'Kiss Csaba', time: '37,745', gap: '+0,621' },
  { position: 11, driverName: 'Kovács Máté', time: '37,767', gap: '+0,643' },
  { position: 12, driverName: 'Dóró Soma (J)', time: '37,771', gap: '+0,647' },
  { position: 13, driverName: 'Ádám Kristóf', time: '37,820', gap: '+0,696' },
  { position: 14, driverName: 'Kereki Nándor', time: '37,969', gap: '+0,845' },
  { position: 15, driverName: 'Antal Marcell', time: '37,985', gap: '+0,861' },
  { position: 16, driverName: 'Stók Pál', time: '38,032', gap: '+0,908' },
  { position: 17, driverName: 'Vígh György', time: '38,099', gap: '+0,975' },
  { position: 18, driverName: 'Mezey Bálint', time: '38,149', gap: '+1,025' },
  { position: 19, driverName: 'Vígh Levente (J)', time: '38,159', gap: '+1,035' },
  { position: 20, driverName: 'Vincze Tibor', time: '38,242', gap: '+1,118' },
  { position: 21, driverName: 'Borsy Zoltán', time: '38,261', gap: '+1,137' },
  { position: 22, driverName: 'Szoták Mihály', time: '38,285', gap: '+1,161' },
  { position: 23, driverName: 'Mészáros Ákos', time: '38,398', gap: '+1,274' },
  { position: 24, driverName: 'Nagy Bálint (J)', time: '38,599', gap: '+1,475' },
  { position: 25, driverName: 'Zsigri Márton', time: '38,675', gap: '+1,551' },
  { position: 26, driverName: 'Kalányos Kristóf', time: '38,749', gap: '+1,625' },
  { position: 27, driverName: 'Szabó Csaba', time: '38,784', gap: '+1,660' },
  { position: 28, driverName: 'Kvasz Richárd', time: '38,887', gap: '+1,763' },
  { position: 29, driverName: 'Halmágyi Dávid (J)', time: '38,946', gap: '+1,822' },
  { position: 30, driverName: 'Turcsán János', time: '39,036', gap: '+1,912' },
  { position: 31, driverName: 'Rása Dávid Attila', time: '39,805', gap: '+2,681' },
  { position: 32, driverName: 'Gombos Orosz Zsombor', time: '39,899', gap: '+2,775' },
];

// Recompute and insert R3/2 (2. verseny) into the 2026 overall Abszolút table,
// add new drivers if missing, recalc totals and resort positions.

const round3AbsoluteTimed2Results: TimedResult[] = [
  { position: 1, driverName: 'Antal Marcell', time: '37,514', gap: '-' },
  { position: 2, driverName: 'Kiss Dániel', time: '37,549', gap: '+0,035' },
  { position: 3, driverName: 'Kiss Csaba', time: '37,645', gap: '+0,131' },
  { position: 4, driverName: 'Petruska Milán', time: '37,683', gap: '+0,169' },
  { position: 5, driverName: 'Ádám Kristóf', time: '37,734', gap: '+0,220' },
  { position: 6, driverName: 'Kereki Nándor', time: '37,744', gap: '+0,230' },
  { position: 7, driverName: 'Szabó József (J)', time: '37,757', gap: '+0,243' },
  { position: 8, driverName: 'Kovács Máté', time: '37,811', gap: '+0,297' },
  { position: 9, driverName: 'Gyeskó Csongor', time: '37,891', gap: '+0,377' },
  { position: 10, driverName: 'Szoták Mihály', time: '37,910', gap: '+0,396' },
  { position: 11, driverName: 'Borsy Zoltán', time: '37,925', gap: '+0,411' },
  { position: 12, driverName: 'Vígh Levente (J)', time: '37,940', gap: '+0,426' },
  { position: 13, driverName: 'Vincze Tibor', time: '37,967', gap: '+0,453' },
  { position: 14, driverName: 'Lámer Zoltán', time: '37,977', gap: '+0,463' },
  { position: 15, driverName: 'Mezey Bálint', time: '37,982', gap: '+0,468' },
  { position: 16, driverName: 'Halmágyi Péter (J)', time: '37,988', gap: '+0,474' },
  { position: 17, driverName: 'Turcsán János', time: '38,025', gap: '+0,511' },
  { position: 18, driverName: 'Dworák Marcell', time: '38,044', gap: '+0,530' },
  { position: 19, driverName: 'Kalányos Kristóf', time: '38,071', gap: '+0,557' },
  { position: 20, driverName: 'Lámer Richárd', time: '38,071', gap: '+0,557' },
  { position: 21, driverName: 'Kvasz Richárd', time: '38,128', gap: '+0,614' },
  { position: 22, driverName: 'Zsigri Márton', time: '38,245', gap: '+0,731' },
  { position: 23, driverName: 'Halmágyi Dávid (J)', time: '38,425', gap: '+0,911' },
  { position: 24, driverName: 'Kőrösi Dávid', time: '38,482', gap: '+0,968' },
  { position: 25, driverName: 'Stók Pál', time: '38,532', gap: '+1,018' },
  { position: 26, driverName: 'Dóró Soma (J)', time: '38,547', gap: '+1,033' },
  { position: 27, driverName: 'Vígh György', time: '38,758', gap: '+1,244' },
  { position: 28, driverName: 'Szabó Csaba', time: '38,816', gap: '+1,302' },
  { position: 29, driverName: 'Rása Dávid Attila', time: '38,986', gap: '+1,472' },
  { position: 30, driverName: 'Mészáros Ákos', time: '39,096', gap: '+1,582' },
  { position: 31, driverName: 'Gombos Orosz Zsombor', time: '39,328', gap: '+1,814' },
  { position: 32, driverName: 'Nagy Bálint (J)', time: '39,476', gap: '+1,962' },
];

const normalizeName = (n: string) =>
  n
    .replace(/\s*\(.*?\)/g, '')
    .replace(/[^\p{L}0-9\s-]/gu, '')
    .trim()
    .toLowerCase();

const timed2PosMap = new Map<string, number>(
  round3AbsoluteTimed2Results.map((r) => [normalizeName(r.driverName), r.position]),
);

const racePointsByPosition = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const buildRaceResults = (
  names: string[],
  positionChanges: number[] = [],
  categories: (string | undefined)[] = [],
): RaceEntry[] =>
  names.map((driverName, index) => {
    const position = index + 1;
    const points = racePointsByPosition[index] ?? 0;
    const gap = position === 1 ? '-' : `${points === 0 ? '-25' : `-${25 - points}`} pt`;
    return {
      position,
      driverName,
      points,
      gap,
      positionChange: positionChanges[index] ?? 0,
      category: categories[index] ?? (driverName.includes('(J)') ? 'Junior' : undefined),
    };
  });

const round3AbsoluteRace1Names = [
  'Gyeskó Csongor',
  'Lámer Zoltán',
  'Kiss Csaba',
  'Lámer Richárd',
  'Szabó József',
  'Kőrösi Dávid',
  'Halmágyi Péter',
  'Dworák Marcell',
  'Petruska Milán',
  'Antal Marcell',
  'Kovács Máté',
  'Ádám Kristóf',
  'Vígh György',
  'Stók Pál',
  'Mezey Bálint',
  'Kiss Dániel',
  'Vígh Levente',
  'Dóró Soma',
  'Kereki Nándor',
  'Borsy Zoltán',
  'Halmágyi Dávid',
  'Kvasz Richárd',
  'Turcsán János',
  'Kalányos Kristóf',
  'Mészáros Ákos',
  'Szabó Csaba',
  'Szoták Mihály',
  'Vincze Tibor',
  'Nagy Bálint',
  'Zsigri Márton',
  'Gombos Orosz Zsombor',
  'Rása Dávid',
];

// category mapping transcribed from the provided table screenshot
const nameToCategoryMap = new Map<string, string>([
  [normalizeName('Gyeskó Csongor'), 'Elite'],
  [normalizeName('Lámer Zoltán'), 'Elite'],
  [normalizeName('Kiss Csaba'), 'Elite'],
  [normalizeName('Lámer Richárd'), 'Semipro'],
  [normalizeName('Szabó József'), 'Semipro'],
  [normalizeName('Kőrösi Dávid'), 'Rookie'],
  [normalizeName('Halmágyi Péter'), 'Semipro'],
  [normalizeName('Dworák Marcell'), 'Elite'],
  [normalizeName('Petruska Milán'), 'Elite'],
  [normalizeName('Antal Marcell'), 'Semipro'],
  [normalizeName('Kovács Máté'), 'Semipro'],
  [normalizeName('Ádám Kristóf'), 'Semipro'],
  [normalizeName('Vígh György'), 'Rookie'],
  [normalizeName('Stók Pál'), 'Semipro'],
  [normalizeName('Mezey Bálint'), 'Semipro'],
  [normalizeName('Kiss Dániel'), 'Rookie'],
  [normalizeName('Vígh Levente'), 'Rookie'],
  [normalizeName('Dóró Soma'), 'Semipro'],
  [normalizeName('Kereki Nándor'), 'Semipro'],
  [normalizeName('Borsy Zoltán'), 'Semipro'],
  [normalizeName('Halmágyi Dávid'), 'Semipro'],
  [normalizeName('Kvasz Richárd'), 'Semipro'],
  [normalizeName('Turcsán János'), 'Semipro'],
  [normalizeName('Kalányos Kristóf'), 'Rookie'],
  [normalizeName('Mészáros Ákos'), 'Rookie'],
  [normalizeName('Szabó Csaba'), 'Semipro'],
  [normalizeName('Szoták Mihály'), 'Semipro'],
  [normalizeName('Vincze Tibor'), 'Semipro'],
  [normalizeName('Nagy Bálint'), 'Semipro'],
  [normalizeName('Zsigri Márton'), 'Rookie'],
  [normalizeName('Gombos Orosz Zsombor'), 'Rookie'],
  [normalizeName('Rása Dávid'), 'Rookie'],
]);

const round3AbsoluteRace1Categories = round3AbsoluteRace1Names.map(
  (n) => nameToCategoryMap.get(normalizeName(n)) ?? (n.includes('(J)') ? 'Junior' : 'Unknown'),
);

const round3AbsoluteRace1Results: RaceEntry[] = buildRaceResults(
  round3AbsoluteRace1Names,
  [
    0, 2, 7, 4, 2, -3, -2, -6, -3, 5, 0, 1, 4, 2, 3, -7, 2, -6, -5, 1, 8, 6, 7, 2, -2, 1, -5, -8,
    -5, -5, 1, -1,
  ],
  round3AbsoluteRace1Categories,
);

const round3Race2Names = [
  'Antal Marcell',
  'Kiss Dániel',
  'Gyeskó Csongor',
  'Ádám Kristóf',
  'Kovács Máté',
  'Kiss Csaba',
  'Kereki Nándor',
  'Szabó József',
  'Petruska Milán',
  'Vígh Levente',
  'Mezey Bálint',
  'Vincze Tibor',
  'Halmágyi Péter',
  'Lámer Zoltán',
  'Szoták Mihály',
  'Dworák Marcell',
  'Lámer Richárd',
  'Turcsán János',
  'Borsy Zoltán',
  'Zsigri Márton',
  'Halmágyi Dávid',
  'Vígh György',
  'Kvasz Richárd',
  'Kalányos Kristóf',
  'Dóró Soma',
  'Stók Pál',
  'Mészáros Ákos',
  'Kőrösi Dávid',
  'Szabó Csaba',
  'Nagy Bálint',
  'Gombos Orosz Zsombor',
  'Ráda Dávid',
];

const round3AbsoluteRace2PositionChanges = round3Race2Names.map((name, idx) => {
  const norm = normalizeName(name);
  const timedPos = timed2PosMap.get(norm);
  if (timedPos != null) return timedPos - (idx + 1);
  // fallback: match by last name
  const last = norm.split(' ').slice(-1)[0];
  for (const [k, pos] of timed2PosMap.entries()) {
    if (k.includes(last)) return pos - (idx + 1);
  }
  return 0;
});

const round3AbsoluteRace2Categories = round3Race2Names.map(
  (n) =>
    nameToCategoryMap.get(normalizeName(n)) ??
    (n.includes('(J)') ? 'Junior' : n === 'Ráda Dávid' ? 'Rookie' : 'Unknown'),
);

const round3AbsoluteRace2Results: RaceEntry[] = buildRaceResults(
  round3Race2Names,
  round3AbsoluteRace2PositionChanges,
  round3AbsoluteRace2Categories,
);

// detect juniors from timed lists (names containing (J))
const juniorNamesSet = new Set<string>(
  [...round3AbsoluteTimed1Results, ...round3AbsoluteTimed2Results]
    .filter((r) => /\(J\)/.test(r.driverName))
    .map((r) => normalizeName(r.driverName)),
);

const categoryPointsByPosition = [10, 8, 6, 5, 4, 3, 2, 1];

const buildCategoryRaceResults = (results: RaceEntry[]): RaceEntry[] =>
  results.map((result, index) => {
    const position = index + 1;
    const points = categoryPointsByPosition[index] ?? 0;
    const gap = position === 1 ? '-' : `${points === 0 ? '-10' : `-${10 - points}`} pt`;
    return {
      ...result,
      position,
      points,
      gap,
      positionChange: 0,
    };
  });

const buildRound3CategoryResults = (sourceResults: RaceEntry[], category: string): RaceEntry[] =>
  buildCategoryRaceResults(
    sourceResults.filter((result) => {
      if (category === 'Junior') {
        return result.category === 'Junior' || juniorNamesSet.has(normalizeName(result.driverName));
      }
      return result.category === category;
    }),
  );

// Filtered category-specific race results for round 3 derived from the absolute 1. verseny
const round3SemiProRace1Results = buildRound3CategoryResults(round3AbsoluteRace1Results, 'Semipro');
const round3SemiProRace2Results = buildRound3CategoryResults(round3AbsoluteRace2Results, 'Semipro');

const round3JuniorRace1Results = buildRound3CategoryResults(round3AbsoluteRace1Results, 'Junior');
const round3JuniorRace2Results = buildRound3CategoryResults(round3AbsoluteRace2Results, 'Junior');

const round3RookieRace1Results = buildRound3CategoryResults(round3AbsoluteRace1Results, 'Rookie');
const round3RookieRace2Results = buildRound3CategoryResults(round3AbsoluteRace2Results, 'Rookie');

export type RaceResult = {
  id: string;
  name: string;
  date: string; // ISO
  location: string;
  categories: CategoryResult[];
};

export const races: RaceResult[] = [
  {
    id: 'gokart-gp-2026-overall',
    name: 'Összesített Eredmények',
    date: '2026-01-01T12:00:00+02:00',
    location: 'Szezon Összesítő',
    categories: [
      {
        categoryId: 'abszolut',
        categoryName: 'Abszolút',
        displayMode: 'overall',
        results: [],
        roundLabels: ['R1', 'R2', 'R3/1', 'R3/2', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
        overallResults: [
          {
            position: 1,
            driverName: 'Lámer Zoltán',
            totalPoints: 51,
            rounds: [
              { detail: '11', points: 11 },
              { detail: '20', points: 20 },
              { detail: '20', points: 20 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 2,
            driverName: 'Kovács Marcell',
            totalPoints: 50,
            rounds: [
              { detail: '25', points: 25 },
              { detail: '25', points: 25 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 3,
            driverName: 'Kiss Csaba',
            totalPoints: 46,
            rounds: [
              { detail: '20', points: 20 },
              { detail: '10', points: 10 },
              { detail: '16', points: 16 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 4,
            driverName: 'Ádám Kristóf',
            totalPoints: 36,
            rounds: [
              { detail: '16', points: 16 },
              { detail: '16', points: 16 },
              { detail: '4', points: 4 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 5,
            driverName: 'Gyeskó Csongor',
            totalPoints: 32,
            rounds: [
              { detail: '7', points: 7 },
              { detail: '', points: 0 },
              { detail: '25', points: 25 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 6,
            driverName: 'Szabó József',
            totalPoints: 24,
            rounds: [
              { detail: '6', points: 6 },
              { detail: '7', points: 7 },
              { detail: '11', points: 11 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 7,
            driverName: 'Halmágyi Péter',
            totalPoints: 22,
            rounds: [
              { detail: '', points: 0 },
              { detail: '13', points: 13 },
              { detail: '9', points: 9 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 8,
            driverName: 'Lámer Richárd',
            totalPoints: 22,
            rounds: [
              { detail: '', points: 0 },
              { detail: '9', points: 9 },
              { detail: '13', points: 13 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 9,
            driverName: 'Mezey Bálint',
            totalPoints: 21,
            rounds: [
              { detail: '9', points: 9 },
              { detail: '11', points: 11 },
              { detail: '1', points: 1 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 10,
            driverName: 'Dworák Marcell',
            totalPoints: 21,
            rounds: [
              { detail: '13', points: 13 },
              { detail: '', points: 0 },
              { detail: '8', points: 8 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 11,
            driverName: 'Kőrösi Dávid',
            totalPoints: 21,
            rounds: [
              { detail: '10', points: 10 },
              { detail: '1', points: 1 },
              { detail: '10', points: 10 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 12,
            driverName: 'Antal Marcell',
            totalPoints: 19,
            rounds: [
              { detail: '5', points: 5 },
              { detail: '8', points: 8 },
              { detail: '6', points: 6 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 13,
            driverName: 'Petruska Milán',
            totalPoints: 11,
            rounds: [
              { detail: '4', points: 4 },
              { detail: '', points: 0 },
              { detail: '7', points: 7 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 14,
            driverName: 'Kalányos Kristóf',
            totalPoints: 8,
            rounds: [
              { detail: '8', points: 8 },
              { detail: '', points: 0 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 15,
            driverName: 'Kovács Máté',
            totalPoints: 7,
            rounds: [
              { detail: '', points: 0 },
              { detail: '2', points: 2 },
              { detail: '5', points: 5 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 16,
            driverName: 'Csige László',
            totalPoints: 6,
            rounds: [
              { detail: '1', points: 1 },
              { detail: '5', points: 5 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 17,
            driverName: 'Halmágyi Dávid',
            totalPoints: 6,
            rounds: [
              { detail: '', points: 0 },
              { detail: '6', points: 6 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 18,
            driverName: 'Molnár Attila',
            totalPoints: 4,
            rounds: [
              { detail: '', points: 0 },
              { detail: '4', points: 4 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 19,
            driverName: 'Kvasz Richárd',
            totalPoints: 3,
            rounds: [
              { detail: '3', points: 3 },
              { detail: '', points: 0 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 20,
            driverName: 'Szoták Mihály',
            totalPoints: 3,
            rounds: [
              { detail: '', points: 0 },
              { detail: '3', points: 3 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 21,
            driverName: 'Vígh György',
            totalPoints: 3,
            rounds: [
              { detail: '', points: 0 },
              { detail: '', points: 0 },
              { detail: '3', points: 3 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 22,
            driverName: 'Stók Pál',
            totalPoints: 2,
            rounds: [
              { detail: '', points: 0 },
              { detail: '', points: 0 },
              { detail: '2', points: 2 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 23,
            driverName: 'Kuhár Olivér',
            totalPoints: 2,
            rounds: [
              { detail: '2', points: 2 },
              { detail: '', points: 0 },
              { detail: '', points: 0 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 24,
            driverName: 'Vígh Levente',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 25,
            driverName: 'Oláh Sándor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 26,
            driverName: 'Kereki Nándor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 27,
            driverName: 'Zsigri Márton',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 28,
            driverName: 'Nagy László',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 29,
            driverName: 'Vincze Tibor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 30,
            driverName: 'Nagy Bálint',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 31,
            driverName: 'Stáhl Roland',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 32,
            driverName: 'Vígh László',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 33,
            driverName: 'Szabó Csaba',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 34,
            driverName: 'Turcsán János',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 35,
            driverName: 'Kiss Benett',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 36,
            driverName: 'Kelemen Hunor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 37,
            driverName: 'Dóró Soma',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 38,
            driverName: 'Nagy Patrik',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 39,
            driverName: 'Borsy Zoltán',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 40,
            driverName: 'Kozma Zoltán',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 41,
            driverName: 'Mészáros Ákos',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 42,
            driverName: 'Vas Lőrinc',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 43,
            driverName: 'Link János',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 44,
            driverName: 'Rási Csanád',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 45,
            driverName: 'Lukács Benedek',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 46,
            driverName: 'Fehér Hunor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
        ],
      },
      {
        categoryId: 'semipro',
        categoryName: 'Semi-Pro',
        displayMode: 'overall',
        results: [],
        roundLabels: ['R1', 'R2', 'R3/1', 'R3/2', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
        overallResults: [
          {
            position: 1,
            driverName: 'Ádám Kristóf',
            totalPoints: 20,
            rounds: [
              { detail: '10', points: 10 },
              { detail: '10', points: 10 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 2,
            driverName: 'Mezey Bálint',
            totalPoints: 14,
            rounds: [
              { detail: '8', points: 8 },
              { detail: '6', points: 6 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 3,
            driverName: 'Halmágyi Péter',
            totalPoints: 9,
            rounds: [
              { detail: '1', points: 1 },
              { detail: '8', points: 8 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 4,
            driverName: 'Szabó József',
            totalPoints: 9,
            rounds: [
              { detail: '6', points: 6 },
              { detail: '3', points: 3 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 5,
            driverName: 'Antal Marcell',
            totalPoints: 9,
            rounds: [
              { detail: '5', points: 5 },
              { detail: '4', points: 4 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 6,
            driverName: 'Lámer Richárd',
            totalPoints: 5,
            rounds: [
              { detail: '', points: 0 },
              { detail: '5', points: 5 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 7,
            driverName: 'Kvasz Richárd',
            totalPoints: 4,
            rounds: [
              { detail: '4', points: 4 },
              { detail: '0', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 8,
            driverName: 'Csige László',
            totalPoints: 4,
            rounds: [
              { detail: '3', points: 3 },
              { detail: '1', points: 1 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 9,
            driverName: 'Oláh Sándor',
            totalPoints: 2,
            rounds: [
              { detail: '2', points: 2 },
              { detail: '', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 10,
            driverName: 'Halmágyi Dávid',
            totalPoints: 2,
            rounds: [
              { detail: '0', points: 0 },
              { detail: '2', points: 2 },
              ...Array(8).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 11,
            driverName: 'Kereki Nándor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 12,
            driverName: 'Kovács Máté',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 13,
            driverName: 'Stók Pál',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 14,
            driverName: 'Nagy László',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 15,
            driverName: 'Vincze Tibor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 16,
            driverName: 'Molnár Attila',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 17,
            driverName: 'Nagy Bálint',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 18,
            driverName: 'Szabó Csaba',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 19,
            driverName: 'Turcsán János',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 20,
            driverName: 'Szoták Mihály',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 21,
            driverName: 'Dóró Soma',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 22,
            driverName: 'Nagy Patrik',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 23,
            driverName: 'Borsy Zoltán',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 24,
            driverName: 'Kozma Zoltán',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
        ],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        displayMode: 'overall',
        results: [],
        roundLabels: ['R1', 'R2', 'R3/1', 'R3/2', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
        overallResults: [
          {
            position: 1,
            driverName: 'Szabó József',
            totalPoints: 16,
            rounds: [
              { detail: '8', points: 8 },
              { detail: '8', points: 8 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 2,
            driverName: 'Halmágyi Péter',
            totalPoints: 15,
            rounds: [
              { detail: '5', points: 5 },
              { detail: '10', points: 10 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 3,
            driverName: 'Kiss Csaba',
            totalPoints: 10,
            rounds: [
              { detail: '10', points: 10 },
              { detail: '', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 4,
            driverName: 'Vígh Levente',
            totalPoints: 10,
            rounds: [
              { detail: '6', points: 6 },
              { detail: '4', points: 4 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 5,
            driverName: 'Halmágyi Dávid',
            totalPoints: 10,
            rounds: [
              { detail: '4', points: 4 },
              { detail: '6', points: 6 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 6,
            driverName: 'Dóró Soma',
            totalPoints: 5,
            rounds: [
              { detail: '', points: 0 },
              { detail: '5', points: 5 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 7,
            driverName: 'Nagy Bálint',
            totalPoints: 3,
            rounds: [
              { detail: '3', points: 3 },
              { detail: '', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 8,
            driverName: 'Vass Lőrinc',
            totalPoints: 3,
            rounds: [
              { detail: '', points: 0 },
              { detail: '3', points: 3 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 9,
            driverName: 'Kiss Benett',
            totalPoints: 2,
            rounds: [
              { detail: '2', points: 2 },
              { detail: '', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 10,
            driverName: 'Rási Csanád',
            totalPoints: 2,
            rounds: [
              { detail: '', points: 0 },
              { detail: '2', points: 2 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 11,
            driverName: 'Fehér Hunor',
            totalPoints: 1,
            rounds: [
              { detail: '', points: 0 },
              { detail: '1', points: 1 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
        ],
      },
      {
        categoryId: 'rookie',
        categoryName: 'Rookie',
        displayMode: 'overall',
        results: [],
        roundLabels: ['R1', 'R2', 'R3/1', 'R3/2', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
        overallResults: [
          {
            position: 1,
            driverName: 'Kőrösi Dávid',
            totalPoints: 20,
            rounds: [
              { detail: '10', points: 10 },
              { detail: '10', points: 10 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 2,
            driverName: 'Zsigri Márton',
            totalPoints: 12,
            rounds: [
              { detail: '4', points: 4 },
              { detail: '8', points: 8 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 3,
            driverName: 'Vígh Levente',
            totalPoints: 11,
            rounds: [
              { detail: '5', points: 5 },
              { detail: '6', points: 6 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 4,
            driverName: 'Kalányos Kristóf',
            totalPoints: 8,
            rounds: [
              { detail: '8', points: 8 },
              { detail: '', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 5,
            driverName: 'Vígh György',
            totalPoints: 8,
            rounds: [
              { detail: '3', points: 3 },
              { detail: '5', points: 5 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 6,
            driverName: 'Kuhár Olivér',
            totalPoints: 6,
            rounds: [
              { detail: '6', points: 6 },
              { detail: '', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 7,
            driverName: 'Stáhl Roland',
            totalPoints: 6,
            rounds: [
              { detail: '2', points: 2 },
              { detail: '4', points: 4 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 8,
            driverName: 'Mészáros Ákos',
            totalPoints: 3,
            rounds: [
              { detail: '', points: 0 },
              { detail: '3', points: 3 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 9,
            driverName: 'Vass Lőrinc',
            totalPoints: 2,
            rounds: [
              { detail: '', points: 0 },
              { detail: '2', points: 2 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 10,
            driverName: 'Vígh László',
            totalPoints: 1,
            rounds: [
              { detail: '1', points: 1 },
              { detail: '', points: 0 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 11,
            driverName: 'Link János',
            totalPoints: 1,
            rounds: [
              { detail: '', points: 0 },
              { detail: '1', points: 1 },
              ...Array(9).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 12,
            driverName: 'Kiss Benett',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 13,
            driverName: 'Kelemen Hunor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 14,
            driverName: 'Rási Csanád',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 15,
            driverName: 'Lukács Benedek',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
          {
            position: 16,
            driverName: 'Fehér Hunor',
            totalPoints: 0,
            rounds: Array(11).fill({ detail: '', points: 0 }),
          },
        ],
      },
      {
        categoryId: 'endurance',
        categoryName: 'Endurance',
        displayMode: 'overall',
        results: [],
        roundLabels: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
        overallResults: [
          {
            position: 1,
            driverName: 'Tri-V Motorsport',
            totalPoints: 28,
            rounds: [
              { detail: '10', points: 10 },
              { detail: '8', points: 8 },
              { detail: '10', points: 10 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 2,
            driverName: 'Lámer Kart',
            totalPoints: 20,
            rounds: [
              { detail: '5', points: 5 },
              { detail: '10', points: 10 },
              { detail: '5', points: 5 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 3,
            driverName: 'Team L.S.L.',
            totalPoints: 18,
            rounds: [
              { detail: '6', points: 6 },
              { detail: '6', points: 6 },
              { detail: '6', points: 6 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 4,
            driverName: 'Német Prémium',
            totalPoints: 16,
            rounds: [
              { detail: '8', points: 8 },
              { detail: '', points: 0 },
              { detail: '8', points: 8 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 5,
            driverName: 'Oakley',
            totalPoints: 9,
            rounds: [
              { detail: '', points: 0 },
              { detail: '5', points: 5 },
              { detail: '4', points: 4 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 6,
            driverName: 'Teszt1',
            totalPoints: 7,
            rounds: [
              { detail: '', points: 0 },
              { detail: '4', points: 4 },
              { detail: '3', points: 3 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 7,
            driverName: 'Lámer Rally Team',
            totalPoints: 4,
            rounds: [
              { detail: '4', points: 4 },
              { detail: '', points: 0 },
              { detail: '', points: 0 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
          {
            position: 8,
            driverName: 'Teszt2',
            totalPoints: 3,
            rounds: [
              { detail: '', points: 0 },
              { detail: '3', points: 3 },
              { detail: '', points: 0 },
              ...Array(7).fill({ detail: '', points: 0 }),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'gokart-gp-2026-1',
    name: 'Téglás Gokart GP 2026 1. Forduló',
    date: '2026-03-07T10:00:00+02:00',
    location: 'Téglás F1 Gokartpálya',
    categories: [
      {
        categoryId: 'abszolut',
        categoryName: 'Abszolút',
        displayMode: 'absolute',
        results: [],
        timedResults: [
          { position: 1, driverName: 'Kovács Marcell', time: '36,894', gap: '-' },
          { position: 2, driverName: 'Lámer Zoltán', time: '37,143', gap: '+0,249' },
          { position: 3, driverName: 'Kalányos Kristóf', time: '37,144', gap: '+0,250' },
          { position: 4, driverName: 'Kiss Csaba Jr', time: '37,244', gap: '+0,350' },
          { position: 5, driverName: 'Ádám Kristóf', time: '37,282', gap: '+0,388' },
          { position: 6, driverName: 'Mezey Bálint', time: '37,343', gap: '+0,449' },
          { position: 7, driverName: 'Dworák Marcell', time: '37,363', gap: '+0,469' },
          { position: 8, driverName: 'Gyeskó Csongor', time: '37,367', gap: '+0,473' },
          { position: 9, driverName: 'Petruska Milán', time: '37,474', gap: '+0,580' },
          { position: 10, driverName: 'Csige László', time: '37,501', gap: '+0,607' },
          { position: 11, driverName: 'Kuhár Olivér', time: '37,555', gap: '+0,661' },
          { position: 12, driverName: 'Szabó József', time: '37,582', gap: '+0,688' },
          { position: 13, driverName: 'Antal Marcell', time: '37,584', gap: '+0,690' },
          { position: 14, driverName: 'Kvasz Richárd', time: '37,586', gap: '+0,692' },
          { position: 15, driverName: 'Kőrösi Dávid', time: '37,594', gap: '+0,700' },
          { position: 16, driverName: 'Zsigri Márton', time: '37,618', gap: '+0,724' },
          { position: 17, driverName: 'Vigh Levente', time: '37,664', gap: '+0,770' },
          { position: 18, driverName: 'Oláh Sándor', time: '37,687', gap: '+0,793' },
          { position: 19, driverName: 'Kovács Máté', time: '37,717', gap: '+0,823' },
          { position: 20, driverName: 'Stók Pál', time: '37,733', gap: '+0,839' },
          { position: 21, driverName: 'Halmágyi Péter', time: '37,743', gap: '+0,849' },
          { position: 22, driverName: 'Molnár Attila', time: '37,763', gap: '+0,869' },
          { position: 23, driverName: 'Kereki Kornél', time: '37,772', gap: '+0,878' },
          { position: 24, driverName: 'Nagy Bálint', time: '37,783', gap: '+0,889' },
          { position: 25, driverName: 'Vigh György', time: '37,847', gap: '+0,953' },
          { position: 26, driverName: 'Halmágyi Dávid', time: '37,852', gap: '+0,958' },
          { position: 27, driverName: 'Nagy László', time: '37,873', gap: '+0,979' },
          { position: 28, driverName: 'Vincze Tibor', time: '37,879', gap: '+0,985' },
          { position: 29, driverName: 'Stáhl Roland', time: '38,054', gap: '+1,160' },
          { position: 30, driverName: 'Kelemen Hunor', time: '38,144', gap: '+1,250' },
          { position: 31, driverName: 'Vigh László', time: '38,384', gap: '+1,490' },
          { position: 32, driverName: 'Szabó Csaba', time: '38,493', gap: '+1,599' },
          { position: 33, driverName: 'Kiss Benett', time: '38,886', gap: '+1,992' },
          { position: 34, driverName: 'Turcsán János', time: '38,902', gap: '+2,008' },
        ],
        raceResults: [
          { position: 1, driverName: 'Kovács Marcell', points: 25, gap: '-', positionChange: 0 },
          { position: 2, driverName: 'Kiss Csaba', points: 20, gap: '-5 pt', positionChange: 2 },
          { position: 3, driverName: 'Ádám Kristóf', points: 16, gap: '-9 pt', positionChange: 2 },
          {
            position: 4,
            driverName: 'Dworák Marcell',
            points: 13,
            gap: '-12 pt',
            positionChange: 3,
          },
          {
            position: 5,
            driverName: 'Lámer Zoltán',
            points: 11,
            gap: '-14 pt',
            positionChange: -3,
          },
          { position: 6, driverName: 'Kőrösi Dávid', points: 10, gap: '-15 pt', positionChange: 9 },
          { position: 7, driverName: 'Mezey Bálint', points: 9, gap: '-16 pt', positionChange: -1 },
          {
            position: 8,
            driverName: 'Kalányos Kristóf',
            points: 8,
            gap: '-17 pt',
            positionChange: -5,
          },
          {
            position: 9,
            driverName: 'Gyeskó Csongor',
            points: 7,
            gap: '-18 pt',
            positionChange: -1,
          },
          { position: 10, driverName: 'Szabó József', points: 6, gap: '-19 pt', positionChange: 2 },
          {
            position: 11,
            driverName: 'Antal Marcell',
            points: 5,
            gap: '-20 pt',
            positionChange: 2,
          },
          {
            position: 12,
            driverName: 'Petruska Milán',
            points: 4,
            gap: '-21 pt',
            positionChange: -3,
          },
          {
            position: 13,
            driverName: 'Kvasz Richárd',
            points: 3,
            gap: '-22 pt',
            positionChange: 1,
          },
          {
            position: 14,
            driverName: 'Kuhár Olivér',
            points: 2,
            gap: '-23 pt',
            positionChange: -3,
          },
          {
            position: 15,
            driverName: 'Csige László',
            points: 1,
            gap: '-24 pt',
            positionChange: -5,
          },
          { position: 16, driverName: 'Vígh Levente', points: 0, gap: '-25 pt', positionChange: 1 },
          { position: 17, driverName: 'Oláh Sándor', points: 0, gap: '-25 pt', positionChange: 1 },
          {
            position: 18,
            driverName: 'Halmágyi Péter',
            points: 0,
            gap: '-25 pt',
            positionChange: 3,
          },
          {
            position: 19,
            driverName: 'Kereki Nándor',
            points: 0,
            gap: '-25 pt',
            positionChange: 4,
          },
          {
            position: 20,
            driverName: 'Zsigri Márton',
            points: 0,
            gap: '-25 pt',
            positionChange: -4,
          },
          { position: 21, driverName: 'Kovács Máté', points: 0, gap: '-25 pt', positionChange: -2 },
          { position: 22, driverName: 'Stók Pál', points: 0, gap: '-25 pt', positionChange: -2 },
          {
            position: 23,
            driverName: 'Halmágyi Dávid',
            points: 0,
            gap: '-25 pt',
            positionChange: 3,
          },
          { position: 24, driverName: 'Nagy László', points: 0, gap: '-25 pt', positionChange: 3 },
          { position: 25, driverName: 'Vígh György', points: 0, gap: '-25 pt', positionChange: 0 },
          { position: 26, driverName: 'Vincze Tibor', points: 0, gap: '-25 pt', positionChange: 2 },
          {
            position: 27,
            driverName: 'Molnár Attila',
            points: 0,
            gap: '-25 pt',
            positionChange: -5,
          },
          { position: 28, driverName: 'Nagy Bálint', points: 0, gap: '-25 pt', positionChange: -4 },
          { position: 29, driverName: 'Stáhl Roland', points: 0, gap: '-25 pt', positionChange: 0 },
          { position: 30, driverName: 'Vígh László', points: 0, gap: '-25 pt', positionChange: 1 },
          { position: 31, driverName: 'Szabó Csaba', points: 0, gap: '-25 pt', positionChange: 1 },
          {
            position: 32,
            driverName: 'Turcsán János',
            points: 0,
            gap: '-25 pt',
            positionChange: 2,
          },
          { position: 33, driverName: 'Kiss Benett', points: 0, gap: '-25 pt', positionChange: 0 },
          {
            position: 34,
            driverName: 'Kelemen Hunor',
            points: 0,
            gap: '-25 pt',
            positionChange: -4,
          },
        ],
      },
      {
        categoryId: 'semipro',
        categoryName: 'Semi-Pro',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Ádám Kristóf', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Mezey Bálint', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Szabó József', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Antal Marcell', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Kvasz Richárd', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Csige László', points: 3, entryOrder: 7 },
          { position: 7, driverName: 'Oláh Sándor', points: 2, entryOrder: 8 },
          { position: 8, driverName: 'Halmágyi Péter', points: 1, entryOrder: 9 },
          { position: 9, driverName: 'Kereki Nándor', points: 0, entryOrder: 10 },
          { position: 10, driverName: 'Kovács Máté', points: 0, entryOrder: 10 },
          { position: 11, driverName: 'Stók Pál', points: 0, entryOrder: 10 },
          { position: 12, driverName: 'Halmágyi Dávid', points: 0, entryOrder: 10 },
          { position: 13, driverName: 'Nagy László', points: 0, entryOrder: 10 },
          { position: 14, driverName: 'Vincze Tibor', points: 0, entryOrder: 10 },
          { position: 15, driverName: 'Molnár Attila', points: 0, entryOrder: 10 },
          { position: 16, driverName: 'Nagy Bálint', points: 0, entryOrder: 10 },
          { position: 17, driverName: 'Szabó Csaba', points: 0, entryOrder: 10 },
          { position: 18, driverName: 'Turcsán János', points: 0, entryOrder: 10 },
        ],
      },

      {
        categoryId: 'junior',
        categoryName: 'Junior',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Kiss Csaba', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Szabó József', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Vígh Levente', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Halmágyi Péter', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Halmágyi Dávid', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Nagy Bálint', points: 3, entryOrder: 7 },
          { position: 7, driverName: 'Kiss Benett', points: 2, entryOrder: 8 },
        ],
      },
      {
        categoryId: 'rookie',
        categoryName: 'Rookie',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Kőrösi Dávid', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Kalányos Kristóf', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Kuhár Olivér', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Vígh Levente', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Zsigri Márton', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Vígh György', points: 3, entryOrder: 7 },
          { position: 7, driverName: 'Stáhl Roland', points: 2, entryOrder: 8 },
          { position: 8, driverName: 'Vígh László', points: 1, entryOrder: 9 },
          { position: 9, driverName: 'Kiss Benett', points: 0, entryOrder: 10 },
          { position: 10, driverName: 'Kelemen Hunor', points: 0, entryOrder: 10 },
        ],
      },
      {
        categoryId: 'endurance',
        categoryName: 'Endurance',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Tri-V Motorsport', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Német Prémium', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Team L.S.L.', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Lámer Kart', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Lámer Rally Team', points: 4, entryOrder: 6 },
        ],
      },
    ],
  },
  {
    id: 'gokart-gp-2026-2',
    name: 'Téglás Gokart GP 2026 2. Forduló',
    date: '2026-04-05T10:00:00+02:00',
    location: 'Téglás F1 Gokartpálya',
    categories: [
      {
        categoryId: 'abszolut',
        categoryName: 'Abszolút',
        displayMode: 'absolute',
        results: [],
        timedResults: [
          { position: 1, driverName: 'Kovács Marcell', time: '37,929', gap: '-' },
          { position: 2, driverName: 'Kiss Csaba', time: '38,033', gap: '+0,104' },
          { position: 3, driverName: 'Lámer Zoltán', time: '38,073', gap: '+0,144' },
          { position: 4, driverName: 'Halmágyi Péter', time: '38,090', gap: '+0,161' },
          { position: 5, driverName: 'Mezey Bálint', time: '38,252', gap: '+0,323' },
          { position: 6, driverName: 'Szabó József', time: '38,267', gap: '+0,338' },
          { position: 7, driverName: 'Antal Marcell', time: '38,301', gap: '+0,372' },
          { position: 8, driverName: 'Lámer Richárd', time: '38,332', gap: '+0,403' },
          { position: 9, driverName: 'Ádám Kristóf', time: '38,360', gap: '+0,431' },
          { position: 10, driverName: 'Molnár Attila', time: '38,395', gap: '+0,466' },
          { position: 11, driverName: 'Halmágyi Dávid', time: '38,400', gap: '+0,471' },
          { position: 12, driverName: 'Kőrösi Dávid', time: '38,473', gap: '+0,544' },
          { position: 13, driverName: 'Nagy László', time: '38,516', gap: '+0,587' },
          { position: 14, driverName: 'Csige László', time: '38,571', gap: '+0,642' },
          { position: 15, driverName: 'Dóró Soma', time: '38,592', gap: '+0,663' },
          { position: 16, driverName: 'Kovács Máté', time: '38,667', gap: '+0,738' },
          { position: 17, driverName: 'Szoták Mihály', time: '38,687', gap: '+0,758' },
          { position: 18, driverName: 'Vígh György', time: '38,758', gap: '+0,829' },
          { position: 19, driverName: 'Kvasz Richárd', time: '38,823', gap: '+0,894' },
          { position: 20, driverName: 'Stók Pál', time: '38,882', gap: '+0,953' },
          { position: 21, driverName: 'Zsigri Márton', time: '38,940', gap: '+1,011' },
          { position: 22, driverName: 'Nagy Patrik', time: '38,946', gap: '+1,017' },
          { position: 23, driverName: 'Vígh Levente', time: '38,951', gap: '+1,022' },
          { position: 24, driverName: 'Vincze Tibor', time: '38,952', gap: '+1,023' },
          { position: 25, driverName: 'Stáhl Roland', time: '39,213', gap: '+1,284' },
          { position: 26, driverName: 'Kozma Zoltán', time: '39,276', gap: '+1,347' },
          { position: 27, driverName: 'Turcsán János', time: '39,325', gap: '+1,396' },
          { position: 28, driverName: 'Szabó Csaba', time: '39,434', gap: '+1,505' },
          { position: 29, driverName: 'Borsy Zoltán', time: '39,523', gap: '+1,594' },
          { position: 30, driverName: 'Mészáros Ákos', time: '39,598', gap: '+1,669' },
          { position: 31, driverName: 'Link János', time: '39,949', gap: '+2,020' },
          { position: 32, driverName: 'Rási Csanád', time: '41,488', gap: '+3,559' },
          { position: 33, driverName: 'Vas Lőrinc', time: '43,870', gap: '+5,941' },
          { position: 34, driverName: 'Lukács Benedek', time: '-', gap: '-' },
          { position: 35, driverName: 'Fehér Hunor', time: '-', gap: '-' },
        ],
        raceResults: [
          { position: 1, driverName: 'Kovács Marcell', points: 25, gap: '-', positionChange: 0 },
          { position: 2, driverName: 'Lámer Zoltán', points: 20, gap: '-5 pt', positionChange: 1 },
          { position: 3, driverName: 'Ádám Kristóf', points: 16, gap: '-9 pt', positionChange: 6 },
          {
            position: 4,
            driverName: 'Halmágyi Péter',
            points: 13,
            gap: '-12 pt',
            positionChange: 0,
          },
          { position: 5, driverName: 'Mezey Bálint', points: 11, gap: '-14 pt', positionChange: 0 },
          { position: 6, driverName: 'Kiss Csaba', points: 10, gap: '-15 pt', positionChange: -4 },
          { position: 7, driverName: 'Lámer Richárd', points: 9, gap: '-16 pt', positionChange: 1 },
          {
            position: 8,
            driverName: 'Antal Marcell',
            points: 8,
            gap: '-17 pt',
            positionChange: -1,
          },
          { position: 9, driverName: 'Szabó József', points: 7, gap: '-18 pt', positionChange: -3 },
          {
            position: 10,
            driverName: 'Halmágyi Dávid',
            points: 6,
            gap: '-19 pt',
            positionChange: 1,
          },
          { position: 11, driverName: 'Csige László', points: 5, gap: '-20 pt', positionChange: 3 },
          {
            position: 12,
            driverName: 'Molnár Attila',
            points: 4,
            gap: '-21 pt',
            positionChange: -2,
          },
          {
            position: 13,
            driverName: 'Szoták Mihály',
            points: 3,
            gap: '-22 pt',
            positionChange: 4,
          },
          { position: 14, driverName: 'Kovács Máté', points: 2, gap: '-23 pt', positionChange: 2 },
          {
            position: 15,
            driverName: 'Kőrösi Dávid',
            points: 1,
            gap: '-24 pt',
            positionChange: -3,
          },
          { position: 16, driverName: 'Nagy László', points: 0, gap: '-25 pt', positionChange: -3 },
          { position: 17, driverName: 'Dóró Soma', points: 0, gap: '-25 pt', positionChange: -2 },
          { position: 18, driverName: 'Stók Pál', points: 0, gap: '-25 pt', positionChange: 2 },
          {
            position: 19,
            driverName: 'Zsigri Márton',
            points: 0,
            gap: '-25 pt',
            positionChange: 2,
          },
          { position: 20, driverName: 'Nagy Patrik', points: 0, gap: '-25 pt', positionChange: 2 },
          { position: 21, driverName: 'Borsy Zoltán', points: 0, gap: '-25 pt', positionChange: 8 },
          {
            position: 22,
            driverName: 'Kvasz Richárd',
            points: 0,
            gap: '-25 pt',
            positionChange: -3,
          },
          { position: 23, driverName: 'Vincze Tibor', points: 0, gap: '-25 pt', positionChange: 1 },
          {
            position: 24,
            driverName: 'Vígh Levente',
            points: 0,
            gap: '-25 pt',
            positionChange: -1,
          },
          { position: 25, driverName: 'Vígh György', points: 0, gap: '-25 pt', positionChange: -7 },
          {
            position: 26,
            driverName: 'Stáhl Roland',
            points: 0,
            gap: '-25 pt',
            positionChange: -1,
          },
          {
            position: 27,
            driverName: 'Kozma Zoltán',
            points: 0,
            gap: '-25 pt',
            positionChange: -1,
          },
          {
            position: 28,
            driverName: 'Mészáros Ákos',
            points: 0,
            gap: '-25 pt',
            positionChange: 2,
          },
          {
            position: 29,
            driverName: 'Turcsán János',
            points: 0,
            gap: '-25 pt',
            positionChange: -2,
          },
          { position: 30, driverName: 'Vas Lőrinc', points: 0, gap: '-25 pt', positionChange: 3 },
          { position: 31, driverName: 'Link János', points: 0, gap: '-25 pt', positionChange: 0 },
          { position: 32, driverName: 'Rási Csanád', points: 0, gap: '-25 pt', positionChange: 0 },
          { position: 33, driverName: 'Szabó Csaba', points: 0, gap: '-25 pt', positionChange: -5 },
          {
            position: 34,
            driverName: 'Lukács Benedek',
            points: 0,
            gap: '-25 pt',
            positionChange: 0,
          },
          { position: 35, driverName: 'Fehér Hunor', points: 0, gap: '-25 pt', positionChange: 0 },
        ],
      },
      {
        categoryId: 'semipro',
        categoryName: 'Semi-Pro',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Ádám Kristóf', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Halmágyi Péter', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Mezey Bálint', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Lámer Richárd', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Antal Marcell', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Szabó József', points: 3, entryOrder: 7 },
          { position: 7, driverName: 'Halmágyi Dávid', points: 2, entryOrder: 8 },
          { position: 8, driverName: 'Csige László', points: 1, entryOrder: 9 },
          { position: 9, driverName: 'Molnár Attila', points: 0, entryOrder: 10 },
          { position: 10, driverName: 'Szoták Mihály', points: 0, entryOrder: 10 },
          { position: 11, driverName: 'Kovács Máté', points: 0, entryOrder: 10 },
          { position: 12, driverName: 'Nagy László', points: 0, entryOrder: 10 },
          { position: 13, driverName: 'Dóró Soma', points: 0, entryOrder: 10 },
          { position: 14, driverName: 'Stók Pál', points: 0, entryOrder: 10 },
          { position: 15, driverName: 'Nagy Patrik', points: 0, entryOrder: 10 },
          { position: 16, driverName: 'Borsy Zoltán', points: 0, entryOrder: 10 },
          { position: 17, driverName: 'Kvasz Richárd', points: 0, entryOrder: 10 },
          { position: 18, driverName: 'Vincze Tibor', points: 0, entryOrder: 10 },
          { position: 19, driverName: 'Kozma Zoltán', points: 0, entryOrder: 10 },
          { position: 20, driverName: 'Turcsán János', points: 0, entryOrder: 10 },
          { position: 21, driverName: 'Szabó Csaba', points: 0, entryOrder: 10 },
        ],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Halmágyi Péter', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Szabó József', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Halmágyi Dávid', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Dóró Soma', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Vígh Levente', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Vass Lőrinc', points: 3, entryOrder: 7 },
          { position: 7, driverName: 'Rási Csanád', points: 2, entryOrder: 8 },
          { position: 8, driverName: 'Fehér Hunor', points: 1, entryOrder: 9 },
        ],
      },
      {
        categoryId: 'rookie',
        categoryName: 'Rookie',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Kőrösi Dávid', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Zsigri Márton', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Vígh Levente', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Vígh György', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Stáhl Roland', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Mészáros Ákos', points: 3, entryOrder: 7 },
          { position: 7, driverName: 'Vass Lőrinc', points: 2, entryOrder: 8 },
          { position: 8, driverName: 'Link János', points: 1, entryOrder: 9 },
          { position: 9, driverName: 'Rási Csanád', points: 0, entryOrder: 10 },
          { position: 10, driverName: 'Lukács Benedek', points: 0, entryOrder: 10 },
          { position: 11, driverName: 'Fehér Hunor', points: 0, entryOrder: 10 },
        ],
      },
      {
        categoryId: 'endurance',
        categoryName: 'Endurance',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Lámer Kart', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Tri-V Motorsport', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Team L.S.L.', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Oakley', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Teszt1', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Teszt2', points: 3, entryOrder: 7 },
        ],
      },
    ],
  },
  {
    id: 'gokart-gp-2026-3',
    name: 'Téglás Gokart GP 2026 3. Forduló',
    date: '2026-05-03T10:00:00+02:00',
    location: 'Téglás F1 Gokartpálya',
    categories: [
      {
        categoryId: 'abszolut',
        categoryName: 'Abszolút',
        displayMode: 'absolute',
        results: [],
        absoluteTabs: [
          { label: '1. Verseny', kind: 'race', results: round3AbsoluteRace1Results },
          { label: '2. Verseny', kind: 'race', results: round3AbsoluteRace2Results },
          { label: '1. Időmérő', kind: 'timed', results: round3AbsoluteTimed1Results },
          { label: '2. Időmérő', kind: 'timed', results: round3AbsoluteTimed2Results },
        ],
      },
      {
        categoryId: 'semipro',
        categoryName: 'Semi-Pro',
        displayMode: 'points',
        results: [],
        raceTabs: [
          { label: '1. Verseny', results: round3SemiProRace1Results },
          { label: '2. Verseny', results: round3SemiProRace2Results },
        ],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        displayMode: 'points',
        results: [],
        raceTabs: [
          { label: '1. Verseny', results: round3JuniorRace1Results },
          { label: '2. Verseny', results: round3JuniorRace2Results },
        ],
      },
      {
        categoryId: 'rookie',
        categoryName: 'Rookie',
        displayMode: 'points',
        results: [],
        raceTabs: [
          { label: '1. Verseny', results: round3RookieRace1Results },
          { label: '2. Verseny', results: round3RookieRace2Results },
        ],
      },
      {
        categoryId: 'endurance',
        categoryName: 'Endurance',
        displayMode: 'points',
        results: [
          { position: 1, driverName: 'Tri-V Motorsport', points: 10, entryOrder: 0 },
          { position: 2, driverName: 'Német Prémium', points: 8, entryOrder: 2 },
          { position: 3, driverName: 'Team L.S.L.', points: 6, entryOrder: 4 },
          { position: 4, driverName: 'Lámer Kart', points: 5, entryOrder: 5 },
          { position: 5, driverName: 'Oakley', points: 4, entryOrder: 6 },
          { position: 6, driverName: 'Teszt1', points: 3, entryOrder: 7 },
        ],
      },
    ],
  },
  {
    id: 'gokart-gp-2025-overall',
    name: 'Összesített Eredmények',
    date: '2025-01-01T12:00:00+02:00',
    location: 'Szezon Összesítő',
    categories: [
      {
        categoryId: 'semipro',
        categoryName: 'Semi-Pro',
        results: [
          { position: 1, driverName: 'Kovács Marcell', entryOrder: 0, points: 186 },
          { position: 2, driverName: 'Forgács Dávid', entryOrder: 79, points: 107 },
          { position: 3, driverName: 'Lámer Zoltán', entryOrder: 80, points: 106 },
          { position: 4, driverName: 'Varga Dávid', entryOrder: 87, points: 99 },
          { position: 5, driverName: 'Gyeskó Csongor', entryOrder: 122, points: 64 },
          { position: 6, driverName: 'Bálint Kristóf', entryOrder: 148, points: 38 },
          { position: 7, driverName: 'Petruska Milán', entryOrder: 149, points: 37 },
          { position: 8, driverName: 'Szána Iván', entryOrder: 150, points: 36 },
          { position: 9, driverName: 'Ádám Kristóf', entryOrder: 153, points: 33 },
          { position: 10, driverName: 'Tóth Tamás', entryOrder: 155, points: 31 },
          { position: 11, driverName: 'Kiss Csaba Jr.', entryOrder: 156, points: 30 },
          { position: 12, driverName: 'Szoták Mihály', entryOrder: 160, points: 26 },
          { position: 13, driverName: 'Molnár Attila', entryOrder: 160, points: 26 },
          { position: 14, driverName: 'Kovács Benedek Balázs', entryOrder: 161, points: 25 },
          { position: 15, driverName: 'Lámer Richárd', entryOrder: 163, points: 23 },
          { position: 16, driverName: 'Dworák Marcell', entryOrder: 164, points: 22 },
          { position: 17, driverName: 'Takács Márton', entryOrder: 165, points: 21 },
          { position: 18, driverName: 'Farkas Sándor', entryOrder: 169, points: 17 },
          { position: 19, driverName: 'Németh Barnabás', entryOrder: 170, points: 16 },
          { position: 20, driverName: 'Palik Ádám', entryOrder: 170, points: 16 },
          { position: 21, driverName: 'Oláh Benjamin', entryOrder: 171, points: 15 },
          { position: 22, driverName: 'Pataki Attila', entryOrder: 171, points: 15 },
          { position: 23, driverName: 'Jánecskó Adrián', entryOrder: 173, points: 13 },
          { position: 24, driverName: 'Boda Marcell', entryOrder: 173, points: 13 },
          { position: 25, driverName: 'Stók Pál', entryOrder: 173, points: 13 },
          { position: 26, driverName: 'Dóró Soma', entryOrder: 175, points: 11 },
          { position: 27, driverName: 'Halmágyi Péter', entryOrder: 175, points: 11 },
          { position: 28, driverName: 'Szabó József', entryOrder: 176, points: 10 },
          { position: 29, driverName: 'Manzák Martin', entryOrder: 177, points: 9 },
          { position: 30, driverName: 'Kovács Máté', entryOrder: 178, points: 8 },
          { position: 31, driverName: 'Bodnár Bence', entryOrder: 179, points: 7 },
          { position: 32, driverName: 'Szim Dániel', entryOrder: 179, points: 7 },
          { position: 33, driverName: 'Csige László', entryOrder: 179, points: 7 },
          { position: 34, driverName: 'Antal Marcell', entryOrder: 180, points: 6 },
          { position: 35, driverName: 'Halmágyi Dávid', entryOrder: 182, points: 4 },
          { position: 36, driverName: 'Kvasz Richárd', entryOrder: 183, points: 3 },
          { position: 37, driverName: 'Hamza Krisztián', entryOrder: 184, points: 2 },
          { position: 38, driverName: 'Tar Gábriel', entryOrder: 184, points: 2 },
          { position: 39, driverName: 'Nagy Patrik', entryOrder: 184, points: 2 },
          { position: 40, driverName: 'Szabó Csaba', entryOrder: 185, points: 1 },
          { position: 41, driverName: 'Diviki Zalán', entryOrder: 185, points: 1 },
          { position: 42, driverName: 'Keserű Dániel', entryOrder: 185, points: 1 },
        ],
      },
      {
        categoryId: 'endurance',
        categoryName: 'Csapatverseny',
        results: [
          { position: 1, driverName: 'Kovács Marcell - Ádám Kristóf', entryOrder: 0, points: 219 },
          { position: 2, driverName: 'Forgács Dávid - Tóth Tamás', entryOrder: 81, points: 138 },
          { position: 3, driverName: 'Lámer Zoltán - Lámer Richárd', entryOrder: 90, points: 129 },
          { position: 4, driverName: 'Varga Dávid - Molnár Attila', entryOrder: 94, points: 125 },
          { position: 5, driverName: 'Gyeskó Csongor - Boda Marcell', entryOrder: 142, points: 77 },
          { position: 6, driverName: 'Takács Márton - Pataki Attila', entryOrder: 183, points: 36 },
          { position: 7, driverName: 'Farkas Sándor - Stók Pál', entryOrder: 189, points: 30 },
        ],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        results: [
          { position: 1, driverName: 'Oláh Benjámin', entryOrder: 0, points: 55 },
          { position: 2, driverName: 'Halmágyi Péter', entryOrder: 11, points: 44 },
          { position: 3, driverName: 'Szabó József', entryOrder: 13, points: 42 },
          { position: 4, driverName: 'Kiss Csaba Jr.', entryOrder: 21, points: 34 },
          { position: 5, driverName: 'Halmágyi Dávid', entryOrder: 27, points: 28 },
          { position: 6, driverName: 'Roshal Richárd', entryOrder: 41, points: 14 },
          { position: 7, driverName: 'Manzák Martin', entryOrder: 45, points: 10 },
          { position: 8, driverName: 'Dóró Soma', entryOrder: 45, points: 10 },
          { position: 9, driverName: 'Lévai Bence Levente', entryOrder: 49, points: 6 },
          { position: 10, driverName: 'Urbán Benedek', entryOrder: 50, points: 5 },
          { position: 11, driverName: 'Győrfi Verinika', entryOrder: 51, points: 4 },
          { position: 12, driverName: 'Szabó Richárd', entryOrder: 51, points: 4 },
          { position: 13, driverName: 'Nagy Bálint', entryOrder: 51, points: 4 },
          { position: 14, driverName: 'Szabó Lóránt', entryOrder: 52, points: 3 },
          { position: 15, driverName: 'Szilágyi Ákos', entryOrder: 55, points: 0 },
          { position: 16, driverName: 'Gombos Zsombor', entryOrder: 55, points: 0 },
        ],
      },
    ],
  },
];

// Recompute and insert R3/2 (2. verseny) into the 2026 overall Abszolút table,
// add new drivers if missing, recalc totals and resort positions.
type OverallRoundResult = { detail: string; points: number };
type OverallStandingRow = OverallEntry & { rounds: OverallRoundResult[] };

type OverallCategoryKey = 'abszolut' | 'junior' | 'rookie' | 'semipro';

const ensureOverallRounds = (row: OverallStandingRow, len = 11) => {
  while (row.rounds.length < len) row.rounds.push({ detail: '', points: 0 });
};

const buildOverallStandingRow = (driverName: string, len = 11): OverallStandingRow => ({
  position: 0,
  driverName,
  totalPoints: 0,
  rounds: Array.from({ length: len }, () => ({ detail: '', points: 0 })),
});

const updateOverallCategory = (
  categoryId: OverallCategoryKey,
  roundIndex: number,
  results: RaceEntry[],
) => {
  const overallRace = races.find((race) => race.id === 'gokart-gp-2026-overall');
  if (!overallRace) return;

  const category = overallRace.categories.find(
    (candidate) => candidate.categoryId === categoryId && candidate.displayMode === 'overall',
  );
  if (!category || !category.overallResults) return;

  const standingRows = category.overallResults as OverallStandingRow[];
  const existing = new Map<string, OverallStandingRow>();

  for (const row of standingRows) {
    ensureOverallRounds(row);
    existing.set(row.driverName, row);
  }

  for (const result of results) {
    const name = result.driverName;
    const points = result.points ?? 0;
    let entry = existing.get(name);
    if (!entry) {
      entry = buildOverallStandingRow(name);
      standingRows.push(entry);
      existing.set(name, entry);
    }

    entry.rounds[roundIndex] = { detail: String(points === 0 ? '' : points), points };
  }

  for (const row of standingRows) {
    row.totalPoints = row.rounds.reduce((sum, round) => sum + round.points, 0);
  }

  standingRows.sort(
    (left, right) =>
      right.totalPoints - left.totalPoints || left.driverName.localeCompare(right.driverName),
  );
  standingRows.forEach((row, index) => {
    row.position = index + 1;
  });
};

updateOverallCategory('abszolut', 3, round3AbsoluteRace2Results);
updateOverallCategory('junior', 3, round3JuniorRace2Results);
updateOverallCategory('rookie', 2, round3RookieRace1Results);
updateOverallCategory('rookie', 3, round3RookieRace2Results);
updateOverallCategory('semipro', 2, round3SemiProRace1Results);
updateOverallCategory('semipro', 3, round3SemiProRace2Results);
