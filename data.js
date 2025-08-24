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

// Music collection: each record contains the album metadata plus its tracklist.
// `year` denotes the release year, `cover` is the relative path to the
// abstract placeholder image stored in the images/ directory, and
// `tracks` is an array of track objects.  Each track has a `title`
// and a `fave` boolean indicating whether it is a personal favourite.
// These entries are displayed on the Music page.  Feel free to
// customise this list – add your own albums or adjust favourite
// tracks as needed.
const music = [
  {
    album: 'Blonde',
    artist: 'Frank Ocean',
    year: 2016,
    cover: 'images/blonde.png',
    tracks: [
      { title: 'Nikes', fave: false },
      { title: 'Ivy', fave: true },
      { title: 'Pink + White', fave: true },
      { title: 'Be Yourself', fave: false },
      { title: 'Solo', fave: true },
      { title: 'Skyline To', fave: false },
      { title: 'Self Control', fave: true },
      { title: 'Good Guy', fave: false },
      { title: 'Nights', fave: true },
      { title: 'Solo (Reprise)', fave: false },
      { title: 'Pretty Sweet', fave: false },
      { title: 'Facebook Story', fave: false },
      { title: 'Close to You', fave: false },
      { title: 'White Ferrari', fave: true },
      { title: 'Seigfried', fave: false },
      { title: 'Godspeed', fave: true },
      { title: 'Futura Free', fave: false },
    ],
  },
  {
    album: 'To Pimp a Butterfly',
    artist: 'Kendrick Lamar',
    year: 2015,
    cover: 'images/tpab.png',
    tracks: [
      { title: "Wesley's Theory", fave: false },
      { title: 'For Free? (Interlude)', fave: false },
      { title: 'King Kunta', fave: true },
      { title: 'Institutionalized', fave: false },
      { title: 'These Walls', fave: false },
      { title: 'u', fave: false },
      { title: 'Alright', fave: true },
      { title: 'For Sale? (Interlude)', fave: false },
      { title: 'Momma', fave: false },
      { title: 'Hood Politics', fave: false },
      { title: 'How Much a Dollar Cost', fave: true },
      { title: 'Complexion (A Zulu Love)', fave: false },
      { title: 'The Blacker the Berry', fave: false },
      { title: "You Ain't Gotta Lie (Momma Said)", fave: false },
      { title: 'i', fave: false },
      { title: 'Mortal Man', fave: false },
    ],
  },
  {
    album: 'My Beautiful Dark Twisted Fantasy',
    artist: 'Kanye West',
    year: 2010,
    cover: 'images/mbdtf.png',
    tracks: [
      { title: 'Dark Fantasy', fave: false },
      { title: 'Gorgeous', fave: false },
      { title: 'Power', fave: false },
      { title: 'All of the Lights', fave: true },
      { title: 'Monster', fave: false },
      { title: 'So Appalled', fave: false },
      { title: 'Devil in a New Dress', fave: true },
      { title: 'Runaway', fave: true },
      { title: 'Hell of a Life', fave: false },
      { title: 'Blame Game', fave: false },
      { title: 'Lost in the World', fave: false },
      { title: 'Who Will Survive in America', fave: false },
    ],
  },
  {
    album: 'OK Computer',
    artist: 'Radiohead',
    year: 1997,
    cover: 'images/ok_computer.png',
    tracks: [
      { title: 'Airbag', fave: true },
      { title: 'Paranoid Android', fave: true },
      { title: 'Subterranean Homesick Alien', fave: false },
      { title: 'Exit Music (For a Film)', fave: false },
      { title: 'Let Down', fave: false },
      { title: 'Karma Police', fave: true },
      { title: 'Fitter Happier', fave: false },
      { title: 'Electioneering', fave: false },
      { title: 'Climbing Up the Walls', fave: false },
      { title: 'No Surprises', fave: true },
      { title: 'Lucky', fave: false },
      { title: 'The Tourist', fave: false },
    ],
  },
  {
    album: 'Channel Orange',
    artist: 'Frank Ocean',
    year: 2012,
    cover: 'images/channel_orange.png',
    tracks: [
      { title: 'Start', fave: false },
      { title: 'Thinkin Bout You', fave: true },
      { title: 'Fertilizer', fave: false },
      { title: 'Sierra Leone', fave: false },
      { title: 'Sweet Life', fave: true },
      { title: 'Not Just Money', fave: false },
      { title: 'Super Rich Kids', fave: true },
      { title: 'Pilot Jones', fave: false },
      { title: 'Crack Rock', fave: false },
      { title: 'Pyramids', fave: true },
      { title: 'Lost', fave: true },
      { title: 'White', fave: false },
      { title: 'Monks', fave: false },
      { title: 'Bad Religion', fave: true },
      { title: 'Pink Matter', fave: true },
      { title: 'Forrest Gump', fave: false },
      { title: 'End', fave: false },
    ],
  },
  {
    album: 'Norman Fucking Rockwell!',
    artist: 'Lana Del Rey',
    year: 2019,
    cover: 'images/nfr.png',
    tracks: [
      { title: 'Norman Fucking Rockwell', fave: false },
      { title: 'Mariners Apartment Complex', fave: true },
      { title: 'Venice Bitch', fave: true },
      { title: "Fuck It I Love You", fave: false },
      { title: 'Doin' Time', fave: true },
      { title: 'Love song', fave: false },
      { title: 'Cinnamon Girl', fave: true },
      { title: 'How to disappear', fave: false },
      { title: 'California', fave: false },
      { title: 'The Next Best American Record', fave: false },
      { title: 'The greatest', fave: true },
      { title: 'Bartender', fave: false },
      { title: 'Happiness is a butterfly', fave: true },
      { title: 'Hope Is a Dangerous Thing for a Woman Like Me to Have – but I Have It', fave: true },
    ],
  },
  {
    album: 'IGOR',
    artist: 'Tyler, the Creator',
    year: 2019,
    cover: 'images/igor.png',
    tracks: [
      { title: "Igor's Theme", fave: false },
      { title: 'Earfquake', fave: true },
      { title: 'I Think', fave: true },
      { title: 'Boyfriend', fave: false },
      { title: 'Running Out of Time', fave: true },
      { title: 'New Magic Wand', fave: true },
      { title: 'A Boy Is a Gun*', fave: false },
      { title: 'Puppet', fave: false },
      { title: "What's Good", fave: false },
      { title: 'Gone, Gone / Thank You', fave: true },
      { title: "I Don't Love You Anymore", fave: false },
      { title: 'Are We Still Friends?', fave: false },
    ],
  },
  {
    album: 'Purple Rain',
    artist: 'Prince',
    year: 1984,
    cover: 'images/purple_rain.png',
    tracks: [
      { title: "Let's Go Crazy", fave: true },
      { title: 'Take Me With U', fave: false },
      { title: 'The Beautiful Ones', fave: true },
      { title: 'Computer Blue', fave: false },
      { title: 'Darling Nikki', fave: false },
      { title: 'When Doves Cry', fave: true },
      { title: 'I Would Die 4 U', fave: false },
      { title: "Baby I'm a Star", fave: false },
      { title: 'Purple Rain', fave: true },
    ],
  },
  {
    album: 'In Rainbows',
    artist: 'Radiohead',
    year: 2007,
    cover: 'images/in_rainbows.png',
    tracks: [
      { title: '15 Step', fave: false },
      { title: 'Bodysnatchers', fave: false },
      { title: 'Nude', fave: false },
      { title: 'Weird Fishes / Arpeggi', fave: true },
      { title: 'All I Need', fave: true },
      { title: 'Faust Arp', fave: false },
      { title: 'Reckoner', fave: true },
      { title: 'House of Cards', fave: true },
      { title: 'Jigsaw Falling Into Place', fave: true },
      { title: 'Videotape', fave: false },
    ],
  },
  {
    album: 'Graduation',
    artist: 'Kanye West',
    year: 2007,
    cover: 'images/graduation.png',
    tracks: [
      { title: 'Good Morning', fave: false },
      { title: 'Champion', fave: false },
      { title: 'Stronger', fave: true },
      { title: 'I Wonder', fave: true },
      { title: 'Good Life', fave: true },
      { title: "Can't Tell Me Nothing", fave: true },
      { title: 'Barry Bonds', fave: false },
      { title: 'Drunk and Hot Girls', fave: false },
      { title: 'Flashing Lights', fave: true },
      { title: 'Everything I Am', fave: false },
      { title: 'The Glory', fave: false },
      { title: 'Homecoming', fave: true },
      { title: 'Big Brother', fave: false },
    ],
  },
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