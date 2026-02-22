// Statikus teszt adatok a Results oldalhoz
// A valódi implementáció később jöhet adatbázisból / API-ból.

export type DriverResult = {
  position: number;
  driverName: string;
  entryOrder: number; // nevezési sorrend
  points: number;
};

export type CategoryResult = {
  categoryId: string;
  categoryName: string;
  results: DriverResult[];
};

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
        categoryId: 'sprint',
        categoryName: 'Sprint',
        results: [],
      },
      {
        categoryId: 'endurance',
        categoryName: 'Endurance',
        results: [],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        results: [],
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
        categoryId: 'sprint',
        categoryName: 'Sprint',
        results: [],
      },
      {
        categoryId: 'endurance',
        categoryName: 'Endurance',
        results: [],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        results: [],
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
        categoryId: 'sprint',
        categoryName: 'Sprint',
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
