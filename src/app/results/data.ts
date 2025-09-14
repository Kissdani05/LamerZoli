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
    id: 'gokart-gp-4',
    name: 'Gokart GP 4. Forduló',
    date: '2025-05-18T10:00:00+02:00',
    location: 'Téglás',
    categories: [
      {
        categoryId: 'overall',
        categoryName: 'Összetett',
        results: [
          { position: 1, driverName: 'Kiss Dániel', entryOrder: 3, points: 25 },
          { position: 2, driverName: 'Nagy Bence', entryOrder: 1, points: 18 },
          { position: 3, driverName: 'Tóth Márk', entryOrder: 5, points: 15 },
          { position: 4, driverName: 'Szabó Levente', entryOrder: 2, points: 12 },
          { position: 5, driverName: 'Farkas András', entryOrder: 7, points: 10 },
          { position: 6, driverName: 'Varga Lehel', entryOrder: 4, points: 8 },
          { position: 7, driverName: 'Horváth Áron', entryOrder: 6, points: 6 },
          { position: 8, driverName: 'Molnár Soma', entryOrder: 8, points: 4 },
          { position: 9, driverName: 'Balogh Kristóf', entryOrder: 10, points: 2 },
          { position: 10, driverName: 'Major Patrik', entryOrder: 9, points: 1 },
        ],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        results: [
          { position: 1, driverName: 'Horváth Áron', entryOrder: 6, points: 25 },
          { position: 2, driverName: 'Molnár Soma', entryOrder: 8, points: 18 },
          { position: 3, driverName: 'Balogh Kristóf', entryOrder: 10, points: 15 },
        ],
      },
      {
        categoryId: 'senior',
        categoryName: 'Senior',
        results: [
          { position: 1, driverName: 'Kiss Dániel', entryOrder: 3, points: 25 },
          { position: 2, driverName: 'Nagy Bence', entryOrder: 1, points: 18 },
          { position: 3, driverName: 'Tóth Márk', entryOrder: 5, points: 15 },
        ],
      },
    ],
  },
  {
    id: 'gokart-gp-5',
    name: 'Gokart GP 5. Forduló',
    date: '2025-06-22T10:00:00+02:00',
    location: 'Téglás',
    categories: [
      {
        categoryId: 'overall',
        categoryName: 'Összetett',
        results: [
          { position: 1, driverName: 'Nagy Bence', entryOrder: 4, points: 25 },
          { position: 2, driverName: 'Kiss Dániel', entryOrder: 2, points: 18 },
          { position: 3, driverName: 'Farkas András', entryOrder: 6, points: 15 },
          { position: 4, driverName: 'Tóth Márk', entryOrder: 1, points: 12 },
          { position: 5, driverName: 'Varga Lehel', entryOrder: 5, points: 10 },
          { position: 6, driverName: 'Szabó Levente', entryOrder: 3, points: 8 },
          { position: 7, driverName: 'Major Patrik', entryOrder: 10, points: 6 },
          { position: 8, driverName: 'Molnár Soma', entryOrder: 9, points: 4 },
          { position: 9, driverName: 'Balogh Kristóf', entryOrder: 11, points: 2 },
          { position: 10, driverName: 'Horváth Áron', entryOrder: 7, points: 1 },
        ],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        results: [
          { position: 1, driverName: 'Horváth Áron', entryOrder: 7, points: 25 },
          { position: 2, driverName: 'Molnár Soma', entryOrder: 9, points: 18 },
          { position: 3, driverName: 'Balogh Kristóf', entryOrder: 11, points: 15 },
        ],
      },
      {
        categoryId: 'senior',
        categoryName: 'Senior',
        results: [
          { position: 1, driverName: 'Nagy Bence', entryOrder: 4, points: 25 },
          { position: 2, driverName: 'Kiss Dániel', entryOrder: 2, points: 18 },
          { position: 3, driverName: 'Farkas András', entryOrder: 6, points: 15 },
        ],
      },
    ],
  },
  {
    id: 'gokart-gp-6',
    name: 'Gokart GP 6. Forduló',
    date: '2025-09-07T10:00:00+02:00',
    location: 'Téglás',
    categories: [
      {
        categoryId: 'overall',
        categoryName: 'Összetett',
        results: [
          { position: 1, driverName: 'Kiss Dániel', entryOrder: 3, points: 25 },
          { position: 2, driverName: 'Nagy Bence', entryOrder: 1, points: 18 },
          { position: 3, driverName: 'Farkas András', entryOrder: 5, points: 15 },
          { position: 4, driverName: 'Szabó Levente', entryOrder: 2, points: 12 },
          { position: 5, driverName: 'Tóth Márk', entryOrder: 4, points: 10 },
          { position: 6, driverName: 'Varga Lehel', entryOrder: 6, points: 8 },
        ],
      },
      {
        categoryId: 'junior',
        categoryName: 'Junior',
        results: [
          { position: 1, driverName: 'Horváth Áron', entryOrder: 7, points: 25 },
          { position: 2, driverName: 'Molnár Soma', entryOrder: 9, points: 18 },
          { position: 3, driverName: 'Balogh Kristóf', entryOrder: 11, points: 15 },
        ],
      },
      {
        categoryId: 'senior',
        categoryName: 'Senior',
        results: [
          { position: 1, driverName: 'Kiss Dániel', entryOrder: 3, points: 25 },
          { position: 2, driverName: 'Nagy Bence', entryOrder: 1, points: 18 },
          { position: 3, driverName: 'Farkas András', entryOrder: 5, points: 15 },
        ],
      },
      {
        categoryId: 'women',
        categoryName: 'Nők',
        results: [
          { position: 1, driverName: 'Kovács Lili', entryOrder: 12, points: 25 },
          { position: 2, driverName: 'Szabó Anna', entryOrder: 14, points: 18 },
        ],
      },
    ],
  },
];
