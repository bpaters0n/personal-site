/*
 * Personal data for the minimalist website.
 *
 * This file exposes a handful of variables used throughout the site.
 * Feel free to edit the values below to personalise your biography,
 * social links, travel history, poker sessions and golf courses.  The
 * rest of the site dynamically consumes these variables to populate
 * the pages at runtime.
 */

// Bio text shown on the home page.  Use backticks to allow
// multi‑line strings.
const bio = `Hey, I'm Ben.

I'm currently part of the NA team at Alpha FMC solving problems for clients in the asset management world.

Outside of consulting, I'm passionate about early‑stage technology, investing, and small business acquisitions. I'm building a small business acquisition vehicle focused on acquiring and operating established Canadian businesses with the goal of creating long‑term, cash‑flowing opportunities.

Before Alpha, I worked at a SaaS startup, co‑chaired a student‑run crypto investing fund, and completed internships across investing and risk. I also studied commerce and captained the varsity swim team at Queen's.

If any of this resonates with you, drop me a note – always happy to chat.`;

// Social links displayed in the header.  Replace these with your own
// resume, LinkedIn and X/Twitter URLs.
const social = {
  resumeUrl: "https://your‑resume‑link.pdf",
  linkedinUrl: "https://www.linkedin.com/in/patersonb/",
  xUrl: "https://x.com/benpaters0n",
};

// Travel data: list of ISO‑3 country codes that you have visited and
// cities you've lived in (with latitude and longitude).  You can
// obtain ISO‑3 codes from https://www.iban.com/country‑codes.
const travel = {
  visitedIso3: [
    "MAR", "ZAF", "JPN", "MYS", "SGP", "AUT", "BEL", "CYP", "CZE",
    "DNK", "FRA", "DEU", "GRC", "IRL", "ITA", "NLD", "PRT", "SRB",
    "SVN", "KOR", "ESP", "SWE", "GBR", "CYM", "VAT", "BHS", "BRB",
    "DOM", "MEX", "USA", "CAN",
  ],
  livedCities: [
    { city: "Toronto", country: "Canada", lat: 43.65107, lon: -79.347015 },
    { city: "New York", country: "USA", lat: 40.7128, lon: -74.0060 },
    { city: "Prague", country: "Czech Republic", lat: 50.0755, lon: 14.4378 },
  ],
};

// Poker sessions.  Each entry contains a date (YYYY‑MM‑DD), the stakes
// you played, number of hours, your profit or loss for the session and
// optional notes.  Negative profit values are displayed in red on the
// Poker page.
const pokerSessions = [
  { date: "2025‑08‑01", stakes: "Starting", hours: 0, profit: 300, notes: "Initial bankroll" },
  // Add more sessions here as you play
  { date: "2025-08-23", stakes: "$0.25/$0.50", hours: 3.5, profit: -200 },
];

// Golf courses played and those on your wishlist.  Each course may
// include an optional date or notes.  The Golf page uses these arrays
// to build the two lists.
const golf = {
  played: [
    { course: "Kapalua Bay Course", city: "Maui", country: "USA" },
    { course: "The Nest at Friday Harbour", city: "Innisfil", country: "Canada" },
    { course: "Toronto Golf Club", city: "Toronto", country: "Canada" },
    { course: "Carrying Place Golf & Country Club", city: "King City", country: "Canada" },
    { course: "Coppinwood Golf Club", city: "Uxbridge", country: "Canada" },
    { course: "Black Bear Ridge Golf Course", city: "Vandorf", country: "Canada" },
    { course: "Bayview Golf and Country Club", city: "Thornhill", country: "Canada" },
    { course: "Lebovic Golf Club", city: "Aurora", country: "Canada" },
    { course: "Kingswood Signature", city: "Fredericton", country: "Canada" },
    { course: "Yamaguchi rainbow Hills Toyodako Golf Club", city: "Toyoda", country: "Japan" },
    { course: "Smuggler's Glen Golf Course", city: "Gananoque", country: "Canada" },
    { course: "Cork Golf Club", city: "Cork", country: "Ireland" },
    { course: "The K Club", city: "Straffan", country: "Ireland" },
    { course: "Waikoloa Beach Resort Golf", city: "Waikoloa", country: "USA" },
    { course: "Wooden Sticks Golf Club", city: "Uxbridge", country: "Canada" },
    { course: "Hammock Beach Resort Conservatory", city: "Palm Coast", country: "USA" },
    { course: "Hammock Beach Resort Ocean Course", city: "Palm Coast", country: "USA" },
    { course: "Ka'anapali Golf Resort Kai Course", city: "Maui", country: "USA" },
    { course: "Algonquin Golf Course", city: "St. Andrews", country: "Canada" },
  ],
  wishlist: [
    { course: "Te Arai Golf Links North Course", city: "Te Arai", country: "New Zealand" },
    { course: "Te Arai Golf Links South Course", city: "Te Arai", country: "New Zealand" },
    { course: "Thracian Cliffs", city: "Kavarna", country: "Bulgaria" },
    { course: "Lahinch", city: "Lahinch", country: "Ireland" },
    { course: "Lofoten Links", city: "Lofoten Islands", country: "Norway" },
    { course: "Cabot Cliffs", city: "Inverness", country: "Canada" },
    { course: "Whistling Straits", city: "Kohler", country: "USA" },
    { course: "Bandon Dunes", city: "Bandon", country: "USA" },
  ],
};

// Music collection: a list of favourite albums with their artist and
// personal rating (out of 10).  These entries are displayed on the
// Music page.  Feel free to customise this list.
const music = [
  { album: 'Blonde', artist: 'Frank Ocean', rating: 10 },
  { album: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', rating: 9.5 },
  { album: 'My Beautiful Dark Twisted Fantasy', artist: 'Kanye West', rating: 9 },
  { album: 'OK Computer', artist: 'Radiohead', rating: 9 },
  { album: 'Channel Orange', artist: 'Frank Ocean', rating: 9 },
  { album: 'Norman Fucking Rockwell!', artist: 'Lana Del Rey', rating: 8.5 },
  { album: 'IGOR', artist: 'Tyler, the Creator', rating: 8.5 },
  { album: 'Purple Rain', artist: 'Prince', rating: 8 },
  { album: 'In Rainbows', artist: 'Radiohead', rating: 8 },
  { album: 'Graduation', artist: 'Kanye West', rating: 7.5 },
];

// Expose the data objects globally.  This allows inline scripts on
// individual pages to access `bio`, `social`, `travel`, `pokerSessions`
// and `golf` directly without using modules or bundlers.
window.bio = bio;
window.social = social;
window.travel = travel;
window.pokerSessions = pokerSessions;
window.golf = golf;
// Expose the music list globally so it can be accessed on the Music page
window.music = music;