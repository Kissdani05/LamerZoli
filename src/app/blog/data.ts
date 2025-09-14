export type BlogPost = {
  id: string;
  title: string;
  category: string;
  date: string; // ISO
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
  content?: string; // optional extended content
};

// Statikus teszt bejegyzések
export const posts: BlogPost[] = [
  {
    id: 'telemetria-alapok',
    title: 'Telemetria alapok: Hogyan elemezd a köreidet',
    category: 'TECH',
    date: '2025-09-01T10:00:00+02:00',
    readTime: '5 perc',
    excerpt: 'Megmutatjuk hogyan olvasd ki a fék-, gáz- és kormányadatokat hogy gyorsabb legyél.',
    image: '/2.png',
    author: 'Szerkesztőség',
    content:
      'Részletes telemetria útmutató: sávok, fékpontok, gázállás összehasonlítás, csúcspont és kigyorsítás elemzés. A cél a következetesség és a hibás szokások feltárása. Használd a rétegezett összehasonlítást a legjobb kör vs. átlagos kör között.',
  },
  {
    id: 'gumihomerseklet',
    title: 'Miért fontos a gumi hőmérséklete gokartban is?',
    category: 'TECH',
    date: '2025-09-04T09:00:00+02:00',
    readTime: '4 perc',
    excerpt: 'A megfelelő hőtartomány előnyei és hogyan érd el gyorsabban a tapadást.',
    image: '/3.png',
    author: 'Zoli',
    content:
      'A hideg gumi csúszik, a túlmelegedett gumi kenődik. A tempóépítés kulcsa az egyenletes terhelés és a kerékcsúszás minimalizálása az első két körben.',
  },
  {
    id: 'mentalis-fokusz',
    title: 'Mentális fókusz: Mit csinálj a rajtrácson?',
    category: 'INSIDE',
    date: '2025-09-06T08:30:00+02:00',
    readTime: '6 perc',
    excerpt: 'Légzés, vizualizáció és ritmus – profi tippek amatőr versenyzőknek.',
    image: '/4.png',
    author: 'Szerkesztőség',
    content:
      'Rajtrács rutin: légzés 4-7-8, fejben a kör kulcspontjainak vizualizálása, trigger szó a kuplung elengedésére.',
  },
  {
    id: 'futam-elemzes-gp4',
    title: 'GP 4. forduló kulcspillanatai – hol dőlt el?',
    category: 'RACE ANALYSIS',
    date: '2025-09-07T18:00:00+02:00',
    readTime: '7 perc',
    excerpt: 'Kanyar 3-as belső ív, kiállási ritmus és előzési zónák részletesen.',
    image: '/5.png',
    author: 'Elemző Csapat',
    content:
      'A döntés a középső szektor ritmusán múlt, különösen a 3-as kanyar kijárat stabilitásán és a forgalom kezelésén.',
  },
  {
    id: 'idolok',
    title: 'Karting legendák akik inspirálnak',
    category: 'STORY',
    date: '2025-09-08T12:10:00+02:00',
    readTime: '5 perc',
    excerpt: 'Az ikonikus versenyzők mentalitása és mit tanulhatunk tőlük gokartban.',
    image: '/6.png',
    author: 'Szerkesztőség',
    content:
      'A legendák közös pontja: fegyelem, visszajelzés feldolgozása, alázat a köridőkkel szemben.',
  },
  {
    id: 'idomenetek-optimalizalasa',
    title: 'Időmérő: Hogyan építsd a kör tempót?',
    category: 'TECH',
    date: '2025-09-09T09:45:00+02:00',
    readTime: '6 perc',
    excerpt: 'Gumik előkészítése, lendületkör és tempó felépítés 3 lépésben.',
    image: '/7.png',
    author: 'Zoli',
    content: 'Fokozatos terhelés, hőfelépítés, majd push kör – ne pazarold el a gumi ablakát.',
  },
  {
    id: 'uj-motor-szabalyok',
    title: 'Új motor egység – mit jelent a mezőnyre?',
    category: 'NEWS',
    date: '2025-09-09T14:00:00+02:00',
    readTime: '3 perc',
    excerpt: 'Friss specifikációk és várható hatások a rajtrács erősorrendjére.',
    image: '/8.png',
    author: 'Szerkesztőség',
    content:
      'Az új egység kiegyenlítheti a végsebesség különbségeket, nagyobb hangsúlyt kap a kigyorsítás.',
  },
  {
    id: 'strategia-es-benzin',
    title: 'Stratégia: Miért számít a tankolás előtti súly?',
    category: 'RACE ANALYSIS',
    date: '2025-09-10T11:20:00+02:00',
    readTime: '5 perc',
    excerpt: 'Tömegközéppont, gyorsulás és kopás – mérlegen a kompromisszumok.',
    image: '/9.png',
    author: 'Elemző Csapat',
    content:
      'Az alacsonyabb kezdeti tömeg gyorsabb gumi felmelegedést adhat, de előbb jelentkezik a balansz változása.',
  },
];

export function getPostById(id: string) {
  return posts.find((p) => p.id === id);
}
