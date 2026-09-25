/**
 * Wander Rajasthan - Curated Travel Data
 * Preserves all original data from Claude version and enhances with coordinates, images, and tips.
 */

const RAJASTHAN_DATA = {
  itin: {
    id: "itin",
    label: "Itineraries & maps",
    badge: "Routes",
    icon: "🗺️",
    intro: "Two routes starting in Jaipur, with drive times and named places to eat on the way. Direct roads: Jaipur to Jodhpur about 336 km (6 h), Jaipur to Udaipur about 397 km (6.5 h).",
    items: []
  },
  places: {
    id: "places",
    label: "Places to visit",
    badge: "Destinations",
    icon: "🏯",
    intro: "Tap any city card to explore its famous sights, historic forts, palaces, and best seasons to visit.",
    color: "#a8431f",
    accentLight: "#fbf0ec",
    items: [
      {
        id: "jaipur",
        n: "Jaipur",
        e: "🏯",
        t: "City",
        img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
        d: "The Pink City: forts, palaces and bazaars, and the usual start of a Rajasthan trip.",
        m: { Best: "Oct–Mar", Time: "2–3 days", Region: "Eastern Rajasthan" },
        tip: "Visit Amber Fort before 10 AM to beat tour buses, and Hawa Mahal right at sunrise when morning rays illuminate the sandstone facade.",
        spots: [
          ["Amber Fort", "Hilltop fort above Maota Lake, reached by jeep or on foot; the Sheesh Mahal mirror-work is the highlight."],
          ["City Palace", "A working palace complex with courtyards, museums and the Peacock Gate."],
          ["Hawa Mahal", "The five-storey 'Palace of Winds' with 953 small windows, best seen early morning."],
          ["Jantar Mantar", "An 18th-century observatory with giant stone astronomical instruments."],
          ["Nahargarh Fort", "A hill fort above the city, popular for sunset views."],
          ["Johari Bazaar & Bapu Bazaar", "Old-city markets for jewellery, textiles and leather juttis."]
        ]
      },
      {
        id: "udaipur",
        n: "Udaipur",
        e: "🌇",
        t: "Lakes",
        img: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=900&q=80",
        d: "The lake city, with the City Palace above Lake Pichola and some of the state's best sunsets.",
        m: { Best: "Oct–Mar", Time: "2 days", Region: "Mewar" },
        tip: "Book an evening sunset boat cruise from Rameshwar Ghat at Lake Pichola for magical views of Taj Lake Palace and Jag Mandir.",
        spots: [
          ["City Palace", "A sprawling palace complex overlooking Lake Pichola, with courtyards and museums."],
          ["Lake Pichola boat ride", "An evening boat ride past Jag Mandir and the Lake Palace."],
          ["Jagdish Temple", "A carved 17th-century Indo-Aryan temple in the old city."],
          ["Saheliyon ki Bari", "A garden of fountains built for royal ladies-in-waiting."],
          ["Bagore ki Haveli", "A lakeside haveli-museum with an evening folk-dance show."]
        ]
      },
      {
        id: "jodhpur",
        n: "Jodhpur",
        e: "🔵",
        t: "City",
        img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=80",
        d: "The Blue City, watched over by the huge Mehrangarh Fort.",
        m: { Best: "Oct–Mar", Time: "2 days", Region: "Marwar" },
        tip: "Take a walking tour through the Navchokiya quarter early morning for the most striking cobalt-blue Brahmin houses.",
        spots: [
          ["Mehrangarh Fort", "One of India's largest forts, with a museum and panoramic ramparts."],
          ["Jaswant Thada", "A white marble memorial with landscaped gardens, near the fort."],
          ["Clock Tower & Sardar Market", "The old city's spice, textile and craft market."],
          ["Umaid Bhawan Palace", "A 20th-century palace, part museum and part hotel."],
          ["Blue city old town", "Narrow indigo-painted lanes, best explored on foot."]
        ]
      },
      {
        id: "jaisalmer",
        n: "Jaisalmer",
        e: "🐪",
        t: "Desert",
        img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=900&q=80",
        d: "A golden sandstone fort city and the base for camel safaris in the Thar Desert.",
        m: { Best: "Nov–Feb", Time: "2 days", Region: "Thar Desert" },
        tip: "Explore the living fort at sunrise; Sonar Qila contains authentic jain temples, cafes, and generational artisan workshops.",
        spots: [
          ["Jaisalmer Fort", "A living fort with homes, shops and temples still inside its walls."],
          ["Patwon ki Haveli", "A cluster of ornately carved merchant mansions."],
          ["Sam Sand Dunes", "Desert dunes about 40 km out, popular for sunset camel or jeep safaris."],
          ["Gadisar Lake", "A scenic lake with carved ghats and an arched gateway."],
          ["Kuldhara", "An abandoned village a short drive away, tied to local legend."]
        ]
      },
      {
        id: "pushkar",
        n: "Pushkar",
        e: "🪷",
        t: "Sacred",
        img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80",
        d: "A holy lake town, famous for its camel fair around October–November.",
        m: { Best: "Oct–Mar", Time: "1 day", Region: "Ajmer District" },
        tip: "Take the ropeway (cable car) up to Savitri Temple around 4:30 PM for panoramic views of the holy lake and sunset over the desert hills.",
        spots: [
          ["Pushkar Lake", "A sacred lake ringed by ghats; modest dress is expected."],
          ["Brahma Temple", "One of very few temples in India dedicated to Brahma."],
          ["Pushkar Bazaar", "Lanes of textiles, silver jewellery and cafés."],
          ["Savitri Temple viewpoint", "A hilltop temple reached by cable car or a steep climb, with lake views."]
        ]
      },
      {
        id: "ranthambore",
        n: "Ranthambore",
        e: "🐅",
        t: "Wildlife",
        img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80",
        d: "A national park with a real chance of tiger sightings on safari.",
        m: { Best: "Oct–Apr", Time: "2 days", Region: "Sawai Madhopur" },
        tip: "Zones 1 to 5 are traditionally best for big cat sightings. Book safaris at least 90 days ahead through the official Rajasthan forest portal.",
        spots: [
          ["Jeep or canter safari", "Morning and afternoon drives through the park zones."],
          ["Ranthambore Fort", "A 10th-century fort inside the park, reachable on some safari routes."],
          ["Padam Talao", "A lake in the park, often good for wildlife sightings."]
        ]
      },
      {
        id: "mount-abu",
        n: "Mount Abu",
        e: "🌲",
        t: "Hills",
        img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
        d: "Rajasthan's only hill station, with a cooler climate and Jain marble temples.",
        m: { Best: "Oct–Jun", Time: "1–2 days", Region: "Sirohi" },
        tip: "Photography is prohibited inside Dilwara Temples, so take your time examining the impossibly translucent marble lace ceiling carvings.",
        spots: [
          ["Dilwara Temples", "Jain temples famed for intricate marble carving."],
          ["Nakki Lake", "A small lake in the town centre, popular for boating."],
          ["Guru Shikhar", "Rajasthan's highest point, with a viewpoint nearby."]
        ]
      },
      {
        id: "chittorgarh",
        n: "Chittorgarh",
        e: "⚔️",
        t: "Fort",
        img: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=900&q=80",
        d: "A vast hilltop fort with layers of Rajput history and legend.",
        m: { Best: "Oct–Mar", Time: "1 day", Region: "Southern Rajasthan" },
        tip: "The fort complex spans nearly 700 acres; hire an auto-rickshaw or car with a licensed guide at the main gate to cover all monuments comfortably.",
        spots: [
          ["Chittorgarh Fort", "One of India's largest forts, spread across a hilltop."],
          ["Vijay Stambh", "A nine-storey Tower of Victory with carved figures."],
          ["Rani Padmini's Palace", "A palace linked to the legend of Rani Padmini."]
        ]
      },
      {
        id: "bundi",
        n: "Bundi",
        e: "🏛️",
        t: "Heritage",
        img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80",
        d: "A faded palace town with painted murals and stepwells, with far fewer visitors than Jaipur.",
        m: { Best: "Oct–Mar", Time: "1–2 days", Region: "Hadoti" },
        tip: "Ask the caretaker at Garh Palace to unlock the Chitrashala (art gallery) to view pristine turquoise and gold Bundi school miniatures.",
        spots: [
          ["Taragarh Fort", "A hilltop fort with sweeping views over the town."],
          ["Bundi Palace", "Famous for its miniature wall paintings."],
          ["Raniji ki Baori", "An elaborately carved stepwell in the town centre."]
        ]
      }
    ]
  },
  stays: {
    id: "stays",
    label: "Top stays",
    badge: "Hotels & Haveli",
    icon: "🏨",
    intro: "Real properties by traveller-site rating, split by star category, highest rated first. Ratings are out of 10 as shown on booking sites and change over time — check current scores before booking.",
    color: "#7a2e14",
    accentLight: "#f9efec",
    three: [
      { id: "h1", n: "Hotel Lal Garh Fort And Palace", area: "Jaisalmer", score: "9.6/10", reviews: 157, stars: 3, price: "₹₹", tag: "Fort Heritage", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", amenities: ["Rooftop Restaurant", "Fort View", "Free Wi-Fi", "Safari Desk"], d: "A fort-style heritage hotel on the edge of the old city with traditional jharokha balconies and rooftop Thar views." },
      { id: "h2", n: "Gaji Hotel", area: "Jaisalmer", score: "9.4/10", reviews: 29, stars: 3, price: "₹", tag: "Fort Close", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", amenities: ["Walking Distance to Fort", "Air Conditioned", "Desert Tours"], d: "A small, well-reviewed hotel close to the fort known for welcoming staff and desert safari coordination." },
      { id: "h3", n: "PADMAA Jaipur", area: "Pink City, Jaipur", score: "9.2/10", reviews: 27, stars: 3, price: "₹₹", tag: "Boutique", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", amenities: ["Boutique Design", "Breakfast Included", "Old City Center"], d: "A boutique stay praised for food, service and location, walking distance from old-city bazaars." },
      { id: "h4", n: "Arya Niwas", area: "Pink City, Jaipur", score: "9.0/10", reviews: 324, stars: 3, price: "₹₹", tag: "Traveller Classic", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", amenities: ["Lush Courtyard Lawn", "Pure Veg Cafe", "Library", "Eco Friendly"], d: "A long-running travellers' favourite with a big lawn and good vegetarian food in an eco-friendly converted haveli." },
      { id: "h5", n: "Fairfield by Marriott Jaipur", area: "Bani Park, Jaipur", score: "9.0/10", reviews: 160, stars: 3, price: "₹₹₹", tag: "Modern Comfort", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", amenities: ["Fitness Center", "All-Day Dining", "Business Center"], d: "A dependable mid-range chain hotel with a restaurant on site, reliable Wi-Fi, and fitness center." },
      { id: "h6", n: "Hotel Shahi Palace", area: "Jaisalmer", score: "9.0/10", reviews: 20, stars: 3, price: "₹", tag: "Budget Heritage", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", amenities: ["Stone Carved Rooms", "Rooftop Terrace", "Free Chai"], d: "A budget-friendly heritage-style stay near the fort with stone-carved bedrooms and rooftop terrace dining." },
      { id: "h7", n: "Om Niwas Suite Hotel", area: "Bani Park, Jaipur", score: "8.6/10", reviews: 47, stars: 3, price: "₹₹", tag: "Aparthotel", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", amenities: ["Kitchenettes", "Terrace Garden", "Family Suites"], d: "A family-run aparthotel known for its breakfast, peaceful garden, and breezy rooftop terrace." },
      { id: "h8", n: "Royal Rawal – Luxury Boutique Hotel", area: "Jaipur", score: "9.0/10", reviews: 48, stars: 3, price: "₹₹", tag: "Boutique", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", amenities: ["Heritage Decor", "24/7 Front Desk", "Room Service"], d: "A boutique stay praised for clean rooms, Rajasthani hospitality, and warm personalized service." },
      { id: "h9", n: "Fairfield By Marriott Jaipur Tonk Road", area: "Tonk Road, Jaipur", score: "8.8/10", reviews: 14, stars: 3, price: "₹₹", tag: "Modern", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", amenities: ["Airport Express Access", "Modern Suites", "Buffet"], d: "A newer Marriott property on Tonk Road, well reviewed early on with swift airport access." },
      { id: "h10", n: "ibis Jaipur City Centre", area: "Civil Lines, Jaipur", score: "7.6/10", reviews: 317, stars: 3, price: "₹₹", tag: "Metro Adjacent", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", amenities: ["Rooftop Pool", "Metro Station 200m", "Soundproofed"], d: "A reliable international budget chain, central and consistent with a rooftop swimming pool." }
    ],
    four: [
      { id: "h11", n: "Fort Rajwada", area: "Jaisalmer", score: "9.4/10", reviews: 12, stars: 4, price: "₹₹₹₹", tag: "Luxury Sandstone", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", amenities: ["Outdoor Pool", "Spa & Wellness", "Bespoke Dining", "Bar"], d: "A sandstone hotel built in fort style, close to the town centre with handcrafted stone filigree and an outdoor pool." },
      { id: "h12", n: "Daspan House", area: "Jodhpur", score: "9.2/10", reviews: 204, stars: 4, price: "₹₹₹", tag: "Heritage Charm", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", amenities: ["Courtyard Pool", "Artisanal Cafe", "Vintage Suites"], d: "A heritage-style property with a pool, peaceful courtyard, and fine dining a short drive from Mehrangarh Fort." },
      { id: "h13", n: "Novotel Jodhpur ITI Circle", area: "Jodhpur", score: "8.8/10", reviews: 35, stars: 4, price: "₹₹₹", tag: "Full Service", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", amenities: ["Multiple Restaurants", "Temperature Pool", "Kids Play Area"], d: "A modern international hotel with multiple restaurants, a temperature-controlled pool, and spa." },
      { id: "h14", n: "WelcomHeritage Mandir Palace", area: "Jaisalmer", score: "8.4/10", reviews: 48, stars: 4, price: "₹₹₹₹", tag: "Living Palace", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", amenities: ["200-Year-Old Palace", "Museum On-Site", "Royal Courtyard"], d: "A 200-year-old heritage palace-turned-hotel with courtyards, ornamental arches, and preserved period rooms." },
      { id: "h15", n: "Fairfield by Marriott Jodhpur", area: "Jodhpur", score: "8.2/10", reviews: 126, stars: 4, price: "₹₹₹", tag: "Business & Leisure", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", amenities: ["Cocktail Lounge", "Fitness Center", "Valet Parking"], d: "A comfortable chain hotel with a restaurant, gym, cocktail bar, and quick airport connectivity." },
      { id: "h16", n: "The Fern Residency Jodhpur", area: "Jodhpur", score: "8.0/10", reviews: 111, stars: 4, price: "₹₹", tag: "Eco Hotel", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", amenities: ["Eco Certified", "2 Restaurants", "Children Pool"], d: "An environmentally sensitive hotel with two restaurants, soundproof rooms, and a children's pool." },
      { id: "h17", n: "Indana Palace Jodhpur", area: "Jodhpur", score: "7.8/10", reviews: 108, stars: 4, price: "₹₹₹₹", tag: "Royal Architecture", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", amenities: ["Grand Inner Colonnades", "Luxury Spa", "Banqueting Hall"], d: "A grand palace-style resort with inner colonnades, a grand pool, and multiple international dining options." }
    ]
  },
  food: {
    id: "food",
    label: "Restaurants",
    badge: "Dining",
    icon: "🍽️",
    intro: "Sit-down restaurants only, grouped by city — about 10 per main stop, plus named highway halts. Filter by city, and check current reviews and hours before you go.",
    color: "#b5560f",
    accentLight: "#fbf3eb",
    items: [
      { id: "f1", n: "Laxmi Misthan Bhandar (LMB)", e: "🍽️", t: "Jaipur", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A Johari Bazaar institution for a full vegetarian thali, open since the 1950s.", m: { City: "Jaipur", Area: "Johari Bazaar", Known: "Thali", Type: "Pure Veg" } },
      { id: "f2", n: "1135 AD", e: "🏰", t: "Jaipur", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "Royal Rajasthani dining inside Amber Fort, with candlelit courtyards and live classical music.", m: { City: "Jaipur", Area: "Amber Fort", Known: "Laal maas", Type: "Non-Veg & Veg" } },
      { id: "f3", n: "Suvarna Mahal", e: "👑", t: "Jaipur", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", d: "Fine dining in the Rambagh Palace under crystal chandeliers, widely rated among the city's finest thali experiences.", m: { City: "Jaipur", Area: "Rambagh Palace", Known: "Fine dining", Type: "Luxury Royal" } },
      { id: "f4", n: "The Verandah", e: "🌿", t: "Jaipur", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", d: "A calm palace restaurant inside Rambagh Palace overlooking Mughal gardens, mixing Rajasthani and international dishes.", m: { City: "Jaipur", Area: "Rambagh Palace", Known: "Palace dining", Type: "High Tea & Dinner" } },
      { id: "f5", n: "Peshawri", e: "🍢", t: "Jaipur", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "Part of the ITC chain, famed for kebabs, Dal Bukhara simmered for 18 hours, and North-West Frontier dishes.", m: { City: "Jaipur", Area: "ITC Rajputana", Known: "Kebabs & Dal", Type: "Mughlai & Frontier" } },
      { id: "f6", n: "Chokhi Dhani", e: "🎪", t: "Jaipur", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "Village-themed cultural dinner with puppet shows, fire dancers, and an endless traditional Rajasthani thali served on floor cushions.", m: { City: "Jaipur", Area: "Tonk Road", Known: "Dal baati churma", Type: "Cultural Experience" } },
      { id: "f7", n: "Cinnamon – Jai Mahal Palace", e: "🍵", t: "Jaipur", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", d: "Refined Rajasthani and Awadhi cuisine in a 1745 palace setting, popular for royal recipes and masala chai.", m: { City: "Jaipur", Area: "Jai Mahal Palace", Known: "Vegetarian Thali", Type: "Royal Heritage" } },
      { id: "f8", n: "Bar Palladio", e: "🔵", t: "Jaipur", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A striking cobalt-blue restaurant and cocktail lounge serving Italian food inside Narain Niwas Palace gardens.", m: { City: "Jaipur", Area: "Narain Niwas Palace", Known: "Italian & Cocktails", Type: "Chic Lounge" } },
      { id: "f9", n: "Sheesha", e: "🍖", t: "Jaipur", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "A stylish rooftop known for tandoor-cooked meat dishes, spicy curries, and panoramic city lights.", m: { City: "Jaipur", Area: "C-Scheme", Known: "Tandoori & Grills", Type: "Rooftop Grill" } },
      { id: "f10", n: "Handi Restaurant", e: "🍢", t: "Jaipur", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "Serving tandoori handi meat, roomali rotis, and Mughlai food since 1967, a long-standing local favourite.", m: { City: "Jaipur", Area: "MI Road", Known: "Mughlai Handi", Type: "Non-Veg Classic" } },
      { id: "f11", n: "Sunder Palace Restaurant", e: "🍛", t: "Jaipur", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A relaxed, plant-filled rooftop with good-value Indian and continental comfort food.", m: { City: "Jaipur", Area: "Old city", Known: "Rooftop Dining", Type: "Casual Cafe" } },

      { id: "f12", n: "Ambrai", e: "🌊", t: "Udaipur", img: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80", d: "Lakeside dining opposite the City Palace at Amet Haveli; one of the most romantic dinner tables in all of India.", m: { City: "Udaipur", Area: "Amet Haveli", Known: "Lake view & Mutton", Type: "Romantic Waterfront" } },
      { id: "f13", n: "Natraj Dining Hall", e: "🍛", t: "Udaipur", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "Unlimited traditional Rajasthani and Gujarati thali in a bustling, no-frills setting beloved by locals.", m: { City: "Udaipur", Area: "Old city", Known: "Unlimited Thali", Type: "Pure Veg" } },
      { id: "f14", n: "Upre by 1559 AD", e: "🌅", t: "Udaipur", img: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80", d: "Rooftop terrace restaurant with elevated panoramic views of Lake Pichola, Gangaur Ghat, and City Palace.", m: { City: "Udaipur", Area: "Lake Pichola", Known: "Rooftop Vista", Type: "Fine Dining" } },
      { id: "f15", n: "Millets of Mewar", e: "🌾", t: "Udaipur", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", d: "Health-first menu built around indigenous millets, organic vegetables, and local slow-cooked Mewari recipes.", m: { City: "Udaipur", Area: "Old city", Known: "Millet dishes", Type: "Healthy & Vegan" } },
      { id: "f16", n: "Jagat Niwas Palace Hotel", e: "🏯", t: "Udaipur", img: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80", d: "A classy rooftop haveli restaurant overlooking Lake Pichola and Hanuman Ghat with soothing folk sitar music.", m: { City: "Udaipur", Area: "Lal Ghat", Known: "Rooftop views", Type: "Heritage Terrace" } },
      { id: "f17", n: "Udai Kothi", e: "🏊", t: "Udaipur", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", d: "Rooftop terrace dining around a glowing pool, combining candlelit candle lamps with Rajasthani curries.", m: { City: "Udaipur", Area: "Hanuman Ghat", Known: "Romantic setting", Type: "Poolside Rooftop" } },
      { id: "f18", n: "Savage Garden", e: "🌳", t: "Udaipur", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A secluded blue-walled courtyard restaurant serving handmade pastas, espresso, and gentle curries.", m: { City: "Udaipur", Area: "Old city", Known: "Garden dining", Type: "Boho Courtyard" } },
      { id: "f19", n: "Mayur Rooftop Café", e: "🕌", t: "Udaipur", img: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80", d: "A rooftop café offering direct view angles of the illuminated Jagdish Temple evening aarti.", m: { City: "Udaipur", Area: "Near Jagdish Temple", Known: "Temple views", Type: "Budget View" } },
      { id: "f20", n: "Paantya Restaurant", e: "🍷", t: "Udaipur", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", d: "Semi-formal dining at Shiv Niwas Palace decorated with Mewar royal family portraits and antique chandeliers.", m: { City: "Udaipur", Area: "Shiv Niwas Palace", Known: "Royal Cuisine", Type: "Palace Dining" } },
      { id: "f21", n: "Jheel's Ginger Coffee Bar & Bakery", e: "☕", t: "Udaipur", img: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80", d: "A breezy waterfront café right at water level on Lake Pichola, famed for freshly baked pies, cold brew, and sunrise snacks.", m: { City: "Udaipur", Area: "Old city", Known: "Lakeside Café", Type: "Bakery & Coffee" } },

      { id: "f22", n: "Indique", e: "🌙", t: "Jodhpur", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80", d: "Rooftop dining with an unmatched close-up view of Mehrangarh Fort lit up at night from Pal Haveli.", m: { City: "Jodhpur", Area: "Pal Haveli", Known: "Fort views", Type: "Rooftop Heritage" } },
      { id: "f23", n: "Gypsy Vegetarian Restaurant", e: "🥘", t: "Jodhpur", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "One of Rajasthan's most celebrated grand vegetarian thalis, boasting up to 29 freshly made regional items.", m: { City: "Jodhpur", Area: "Sardarpura", Known: "29-Dish Veg Thali", Type: "Pure Veg Legend" } },
      { id: "f24", n: "Risala", e: "👑", t: "Jodhpur", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", d: "An opulent dining room inside Umaid Bhawan Palace, showcasing recipes from royal hunt expeditions and military banquets.", m: { City: "Jodhpur", Area: "Umaid Bhawan Palace", Known: "Palace dining", Type: "Royal Heritage" } },
      { id: "f25", n: "On the Rocks", e: "🌳", t: "Jodhpur", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "An open-air garden restaurant at Ajit Bhawan with rock fixtures, live music, barbecue tandoors, and vibrant bar.", m: { City: "Jodhpur", Area: "Ajit Bhawan", Known: "Garden dining", Type: "Open Air Bar & Grill" } },
      { id: "f26", n: "Stepwell Café", e: "🏛️", t: "Jodhpur", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80", d: "Multi-level balconies overlooking Toorji Ka Jhalra stepwell, pairing iced coffees with Rajasthani finger foods.", m: { City: "Jodhpur", Area: "Near RAAS Hotel", Known: "Stepwell Views", Type: "Scenic Cafe" } },
      { id: "f27", n: "Jharokha 360°", e: "🍷", t: "Jodhpur", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80", d: "Rooftop restaurant at Stepwell House offering curated Indian wines, kebabs, and views of the blue city clock tower.", m: { City: "Jodhpur", Area: "Stepwell House", Known: "Rooftop Drinks", Type: "Lounge & Dining" } },
      { id: "f28", n: "Panorama 360°", e: "🏰", t: "Jodhpur", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80", d: "A cozy rooftop at Haveli Inn Pal with front-row seats to Mehrangarh Fort ramparts and sunset photography.", m: { City: "Jodhpur", Area: "Haveli Inn Pal", Known: "Fort views", Type: "Sunset Terrace" } },
      { id: "f29", n: "Nirvana", e: "🕉️", t: "Jodhpur", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "An artistic heritage café with hand-painted Ramayana wall frescoes, antique seating, and a breezy terrace.", m: { City: "Jodhpur", Area: "Old city", Known: "Themed café", Type: "Art & Heritage" } },
      { id: "f30", n: "Cafe La Casetta", e: "🏡", t: "Jodhpur", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", d: "A restored haveli courtyard combining comforting Marwari home cooking with thin-crust Italian pizzas.", m: { City: "Jodhpur", Area: "Old city", Known: "Haveli setting", Type: "Fusion Cafe" } },
      { id: "f31", n: "Cafe Mehran", e: "☕", t: "Jodhpur", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80", d: "A shaded stone terrace inside Mehrangarh Fort, perfect for fresh pomegranate juice and snacks after fort rampart exploration.", m: { City: "Jodhpur", Area: "Near Mehrangarh", Known: "Fortside Café", Type: "Refreshments" } },

      { id: "f32", n: "Saffron", e: "🕌", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80", d: "Rooftop dining inside the golden fort perimeter serving spicy ker sangri, mutton curries, and desert views.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Fort Rooftop", Type: "Rajasthani Special" } },
      { id: "f33", n: "Trio", e: "🎶", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80", d: "Under an open-sided tented pavilion with live Manganiyar desert folk music and authentic desert tandoori dishes.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Live Folk Music", Type: "Desert Dining" } },
      { id: "f34", n: "Jaisal Italy", e: "🍝", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "Vegetarian Italian food on a terrace built right into the fort's ancient bastion wall, overlooking the city below.", m: { City: "Jaisalmer", Area: "Fort wall", Known: "Bastion Wall Terrace", Type: "Italian & Continental" } },
      { id: "f35", n: "Free Tibet", e: "🥟", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "Travel-favorite rooftop with steamy vegetable momos, thukpa noodle soup, and laid-back fort vistas.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Tibetan & Momos", Type: "Traveller Cafe" } },
      { id: "f36", n: "Monica Restaurant", e: "🍽️", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80", d: "An airy open-air dining room overlooking the fort gateway serving fresh rotis and spiced vegetable curries.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Open-air dining", Type: "Family Kitchen" } },
      { id: "f37", n: "KB Cafe", e: "🏯", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80", d: "A stylish rooftop vantage point facing Patwon ki Haveli's intricate sandstone carvings directly across the street.", m: { City: "Jaisalmer", Area: "Near Patwa-ki-Haveli", Known: "Haveli views", Type: "Coffee & Shakes" } },
      { id: "f38", n: "Sun Set Palace", e: "🌇", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80", d: "Low tables and colorful bolster cushions on the fort's western terrace; best spot to watch golden dunes melt into dusk.", m: { City: "Jaisalmer", Area: "Fort, west side", Known: "Sunset views", Type: "Bohemian Sunset" } },
      { id: "f39", n: "Natraj Restaurant (Jaisalmer)", e: "🥘", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A clean rooftop pure-veg spot known for quick service, dal tadka, crispy papad, and wallet-friendly meals.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Pure veg", Type: "Budget Thali" } },
      { id: "f40", n: "Chandan Shree Restaurant", e: "🍛", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A busy vegetarian dining hall serving South Indian masala dosas, Gujarati thalis, and Rajasthani specialties.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Thali, dosas", Type: "Vegetarian Multi-cuisine" } },
      { id: "f41", n: "Gaji's Restaurant", e: "🍗", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "A warm dhaba-style spot famous for tandoori chicken, butter naan, and spiced kebabs on a budget.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Tandoori & Curries", Type: "Dhaba Style" } },

      { id: "f42", n: "Honey & Spice", e: "☕", t: "Pushkar", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80", d: "A calm courtyard cafe popular with travellers for healthy organic breakfasts, herbal teas, and vegan desserts.", m: { City: "Pushkar", Area: "Pushkar", Known: "Healthy Organic", Type: "Healthy Cafe" } },
      { id: "f43", n: "Sunset Café", e: "🌇", t: "Pushkar", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80", d: "Lakeside steps on the eastern ghats with sublime evening views of water rituals, drum circles, and the sinking sun.", m: { City: "Pushkar", Area: "Pushkar Lake", Known: "Sunset views", Type: "Lakeside Ghat" } },
      { id: "f44", n: "Mango Masala Pure Veg Family Restro", e: "🥘", t: "Pushkar", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A popular vegetarian family restaurant with air conditioning, great dosas, and hearty morning thalis.", m: { City: "Pushkar", Area: "Pushkar", Known: "Veg breakfast", Type: "Family Restro" } },
      { id: "f45", n: "Silver Leaf Restaurant", e: "🍲", t: "Pushkar", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A quiet, welcoming spot for a late lunch after browsing through Pushkar's labyrinth bazaar stalls.", m: { City: "Pushkar", Area: "Pushkar", Known: "Multicuisine", Type: "Casual Dining" } },
      { id: "f46", n: "Out of the Blue", e: "🍜", t: "Pushkar", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A reliable all-rounder with terrace cushions, from wok-tossed noodles and momos to Indian curries.", m: { City: "Pushkar", Area: "Pushkar", Known: "Multicuisine", Type: "Terrace Chillout" } },
      { id: "f47", n: "Sixth Sense", e: "🍕", t: "Pushkar", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A chilled rooftop surrounded by bougainvillea, known for thin-crust pizza, apple crumble, and seasonal specials.", m: { City: "Pushkar", Area: "Pushkar", Known: "Rooftop Garden", Type: "Woodfired & Cafe" } },
      { id: "f48", n: "Om Shiva Garden Restaurant", e: "🍝", t: "Pushkar", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A long-running favourite for wood-fired oven pizzas, pasta, and rich Italian espresso in an open garden.", m: { City: "Pushkar", Area: "Near Naya Rangji Temple", Known: "Italian & Woodfire", Type: "Garden Pizzeria" } },
      { id: "f49", n: "Little Italy (Pushkar)", e: "🍕", t: "Pushkar", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "Authentic wood-fired pizza and imported Italian cheeses, run in partnership with Italian travellers.", m: { City: "Pushkar", Area: "Pushkar", Known: "Italian Wood-fired", Type: "Authentic Pizzeria" } },
      { id: "f50", n: "Naryan Café", e: "☕", t: "Pushkar", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80", d: "A bustling morning stop for espresso, ginger honey lemon tea, fresh juices, and people-watching.", m: { City: "Pushkar", Area: "Pushkar", Known: "Breakfast & Brew", Type: "Street Cafe" } },
      { id: "f51", n: "Garden Cafe & Restaurant", e: "🌿", t: "Pushkar", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A serene garden haven shaded by neem and bougainvillea trees, ideal for peaceful candlelit dining.", m: { City: "Pushkar", Area: "Pushkar", Known: "Café dinner", Type: "Garden Retreat" } },

      { id: "f52", n: "Rasoi – The Vegetarian Kitchen", e: "🥗", t: "Ajmer", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A traditional Rajasthani breakfast stop, handy after visiting Ajmer Sharif Dargah.", m: { City: "Ajmer", Area: "Ajmer", Known: "Breakfast thali", Type: "Pure Veg" } },
      { id: "f53", n: "Kesar Heritage Restaurant", e: "🍛", t: "Ajmer", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A heritage-styled dining room for a hearty north Indian meal while exploring the lake city of Ajmer.", m: { City: "Ajmer", Area: "Ajmer", Known: "North Indian", Type: "Heritage Indian" } },
      { id: "f54", n: "Ambrosia", e: "🍴", t: "Ajmer", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A dependable multi-cuisine restaurant, ideal for family lunches and cooling respite from highway travel.", m: { City: "Ajmer", Area: "Ajmer", Known: "Multicuisine", Type: "Casual Restro" } },
      { id: "f55", n: "The Royal Melange Beacon", e: "🌙", t: "Ajmer", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "Known for fragrant Rajasthani curries and courteous service; a reliable dinner choice in central Ajmer.", m: { City: "Ajmer", Area: "Ajmer", Known: "Rajasthani Curries", Type: "City Hotel" } },
      { id: "f56", n: "Pehli Manzil", e: "🍽️", t: "Ajmer", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A family restaurant suggested for a comfortable lunch stop between Jaipur and Pushkar.", m: { City: "Ajmer", Area: "Ajmer", Known: "Highway Lunch", Type: "Family Multi-cuisine" } },
      { id: "f57", n: "Rajbhog Restaurant", e: "🍛", t: "Nagaur", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "A recommended halt on the Jaipur–Jodhpur highway for a full Rajasthani thali and ghee-topped rotis.", m: { City: "Nagaur", Area: "Nagaur (highway)", Known: "Highway Thali", Type: "Highway Dhaba Halt" } },
      { id: "f58", n: "Food Court & Café", e: "🍔", t: "Nagaur", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80", d: "A modern multi-cuisine highway stop with clean facilities, Indian, sandwiches, and fast food options.", m: { City: "Nagaur", Area: "Nagaur (highway)", Known: "Multicuisine Stop", Type: "Highway Plaza" } },
      { id: "f59", n: "Old Town Café & Lounge", e: "🛋️", t: "Phalodi", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", d: "A quirky, vintage-themed café with refreshing drinks and snacks, a welcomed break between Jodhpur and Jaisalmer.", m: { City: "Phalodi", Area: "Phalodi (highway)", Known: "Café stop", Type: "Highway Oasis" } },
      { id: "f60", n: "Hotel Lal Niwas", e: "🚗", t: "Phalodi", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", d: "A 250-year-old red sandstone haveli hotel serving traditional Rajasthani food between Jodhpur and Jaisalmer.", m: { City: "Phalodi", Area: "Phalodi (highway)", Known: "Heritage Haveli Halt", Type: "Heritage Lunch" } }
    ]
  },
  snacks: {
    id: "snacks",
    label: "Sweets & lassi",
    badge: "Street & Sweet",
    icon: "🥟",
    intro: "Counters for a sweet, a kachori or a lassi between meals — not places for a full sit-down lunch or dinner.",
    color: "#9a6b0f",
    accentLight: "#fcf6ea",
    items: [
      { id: "s1", n: "Rawat Misthan Bhandar", e: "🥟", t: "Jaipur", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "The go-to spot for hot pyaaz kachori and sweet mawa kachori; hundreds sold fresh every hour.", m: { City: "Jaipur", Area: "Sindhi Camp", Known: "Pyaaz Kachori", MustTry: "Steaming hot Pyaaz Kachori" } },
      { id: "s2", n: "Mishri Lal Hotel", e: "🥛", t: "Jodhpur", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80", d: "A legendary 1927 shop under the Clock Tower arches, world-famous for rabri-topped Makhaniya Lassi.", m: { City: "Jodhpur", Area: "Clock Tower", Known: "Makhaniya Lassi", MustTry: "Clay kulhad Lassi" } },
      { id: "s3", n: "Janta Sweet Home", e: "🥮", t: "Jodhpur", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "A buzzing local institution for Mirchi Bada, spicy Pyaaz Kachori, and syrupy Mawa Kachori.", m: { City: "Jodhpur", Area: "Nayi Sarak", Known: "Mirchi Bada & Sweets", MustTry: "Mirchi Bada with Kadhi" } },
      { id: "s4", n: "Chhotu Motu Joshi", e: "🍬", t: "Bikaner", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "A famed sweet and snack shop in the old quarter, worth a stop for freshly fried Bikaneri Bhujia, rasgullas, and poori-bhaji.", m: { City: "Bikaner", Area: "Old city", Known: "Sweets, bhujia", MustTry: "Bikaneri Bhujia & Rasgulla" } },
      { id: "s5", n: "Dhanraj Bhatia Sweets", e: "🍯", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", d: "Ten generations of traditional sweet-makers in Bhatia Market, known for golden Ghotua laddoos.", m: { City: "Jaisalmer", Area: "Bhatia Market", Known: "Ghotua Laddoos", MustTry: "Ghotua (melt-in-mouth laddu)" } },
      { id: "s6", n: "Kanchan Shree Ice Cream", e: "🍨", t: "Jaisalmer", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80", d: "Homemade creamy ice cream, saffron-infused kulfi, and a rich, chilled Makhaniya Lassi.", m: { City: "Jaisalmer", Area: "Fort area", Known: "Kulfi & Lassi", MustTry: "Badam Pista Kulfi" } }
    ]
  },
  dishes: {
    id: "dishes",
    label: "Recommended dishes",
    badge: "Food Bucket List",
    icon: "🍛",
    intro: "Twelve iconic things worth ordering at least once across your travels in Rajasthan.",
    color: "#9a3b2a",
    accentLight: "#faecea",
    items: [
      { id: "d1", n: "Dal baati churma", e: "🥣", t: "Main", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", d: "Baked wheat balls drowned in pure desi ghee, served with spiced mixed lentils and sweet crumbled wheat churma.", m: { Type: "Veg", Course: "Thali Highlight" } },
      { id: "d2", n: "Laal maas", e: "🌶️", t: "Main", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", d: "A fiery red tender mutton curry slow-cooked with pungent Mathania chilies, garlic, and smoky spices; a Rajput warrior specialty.", m: { Type: "Non-veg", Course: "Signature Curry" } },
      { id: "d3", n: "Gatte ki sabzi", e: "🍲", t: "Main", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", d: "Steamed gram-flour (besan) dumplings simmered in a spiced tangy yogurt and mustard seed gravy.", m: { Type: "Veg", Course: "Curry" } },
      { id: "d4", n: "Ker sangri", e: "🌿", t: "Side", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "An authentic desert dish made with dried wild desert capers (ker) and bean pods (sangri) tossed with whole red chilies and amchur.", m: { Type: "Veg", Course: "Traditional Side" } },
      { id: "d5", n: "Pyaaz kachori", e: "🥟", t: "Street", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "A crisp, flaky puffed pastry stuffed with spiced onion and potato mash, best eaten fresh with tamarind and mint chutneys.", m: { Type: "Veg", Course: "Breakfast & Street" } },
      { id: "d6", n: "Ghevar", e: "🍯", t: "Dessert", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", d: "A disc-shaped honeycomb sweet made of flour soaked in fragrant saffron sugar syrup, often crowned with malai rabri and pistachio.", m: { Type: "Veg", Course: "Royal Sweet" } },
      { id: "d7", n: "Makhaniya lassi", e: "🥛", t: "Drink", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80", d: "A dense, velvety saffron-and-cardamom-scented churned yogurt drink topped with a dollop of white butter (makhan).", m: { Type: "Veg", Course: "Refreshing Drink" } },
      { id: "d8", n: "Mawa kachori", e: "🥮", t: "Dessert", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", d: "A flaky golden pastry stuffed with rich sweetened condensed milk (mawa), dry fruits, and dipped in warm saffron syrup.", m: { Type: "Veg", Course: "Sweet Delicacy" } },
      { id: "d9", n: "Mirchi bada", e: "🌶️", t: "Street", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "A large mild green pepper stuffed with spiced potato filling, dipped in besan batter and fried crisp until golden.", m: { Type: "Veg", Course: "Spicy Street Snack" } },
      { id: "d10", n: "Malpua", e: "🥞", t: "Dessert", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", d: "Deep-fried syrupy pancakes infused with fennel seeds and mawa, traditionally served hot with thick rabri in Pushkar.", m: { Type: "Veg", Course: "Pushkar Sweet" } },
      { id: "d11", n: "Bikaneri bhujia", e: "🍜", t: "Snack", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", d: "A crispy, spicy gram-flour and moth bean noodle snack flavored with black pepper and cardamom; a quintessential take-home gift.", m: { Type: "Veg", Course: "Crispy Savory" } },
      { id: "d12", n: "Bajre ki roti with lasan chutney", e: "🫓", t: "Main", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", d: "Rustic pearl millet flatbread slathered with homemade white butter and served alongside fiery crushed garlic and red chili chutney.", m: { Type: "Veg", Course: "Village Comfort" } }
    ]
  },
  hidden: {
    id: "hidden",
    label: "Less explored",
    badge: "Offbeat Gems",
    icon: "💎",
    intro: "Quieter, breathtaking corners of Rajasthan away from tourist crowds.",
    color: "#5a4a9a",
    accentLight: "#f2effa",
    items: [
      {
        id: "kumbhalgarh",
        n: "Kumbhalgarh",
        e: "🧱",
        t: "Fort",
        img: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=900&q=80",
        d: "A mountain fortress featuring the Great Wall of India — second longest continuous wall in the world after China.",
        m: { Best: "Oct–Mar", Time: "1 day", Highlight: "36 km rampart wall" },
        hot: 1,
        tip: "Stay for the evening sound-and-light show when the entire 36-kilometer stone wall is illuminated."
      },
      {
        id: "shekhawati",
        n: "Shekhawati (Mandawa)",
        e: "🎨",
        t: "Heritage",
        img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80",
        d: "Grand merchant havelis completely painted in colorful outdoor and indoor frescoes, celebrated as Rajasthan's open-air art gallery.",
        m: { Best: "Oct–Mar", Time: "1–2 days", Highlight: "Frescoed Havelis" },
        hot: 1,
        tip: "Hire a local walking guide in Mandawa town square to view hidden courtyards of Chokhani and Ladia havelis."
      },
      {
        id: "bikaner",
        n: "Bikaner",
        e: "🐀",
        t: "City",
        img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
        d: "Unconquered Junagarh Fort, camel breeding farm, and the extraordinary Karni Mata rat temple at Deshnok.",
        m: { Best: "Oct–Mar", Time: "1–2 days", Highlight: "Junagarh & Karni Mata" },
        hot: 1,
        tip: "Spotting one of the rare white holy rats at Karni Mata temple is considered an auspicious blessing for travellers."
      },
      {
        id: "jawai",
        n: "Jawai",
        e: "🐆",
        t: "Wildlife",
        img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80",
        d: "Dramatic granite rock formations where wild leopards coexist in harmony with Rabari shepherd tribes near Jawai Bandh.",
        m: { Best: "Oct–Mar", Time: "1–2 days", Highlight: "Leopard Hill Safaris" },
        hot: 1,
        tip: "Sunset open-top 4x4 safaris across the granite boulder hills yield remarkable leopard sighting odds without sanctuary fences."
      },
      {
        id: "bishnoi",
        n: "Bishnoi Village",
        e: "🦌",
        t: "Culture",
        img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=80",
        d: "Eco-conscious villages where the Bishnoi community has fiercely protected trees and blackbuck antelopes for over 500 years.",
        m: { Best: "Oct–Mar", Time: "Half day", Highlight: "Blackbuck & Pottery" },
        hot: 1,
        tip: "Participate in an authentic opium tea hospitality ritual (Amal Sabha) and watch master potters at Salawas village."
      },
      {
        id: "nawalgarh",
        n: "Nawalgarh",
        e: "🖼️",
        t: "Heritage",
        img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=80",
        d: "A quieter Shekhawati town packed with hundreds of preserved frescoed havelis with far fewer crowds than Mandawa.",
        m: { Best: "Oct–Mar", Time: "1 day", Highlight: "Podar Haveli Museum" },
        hot: 1,
        tip: "The Anandilal Poddar Haveli has been meticulously converted into a museum explaining the natural dyes used in the fresco art."
      },
      {
        id: "sariska",
        n: "Sariska",
        e: "🐯",
        t: "Wildlife",
        img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80",
        d: "An Aravalli tiger reserve featuring medieval Kankwari Fort, ancient Shiva temples, and easy proximity to Delhi and Jaipur.",
        m: { Best: "Oct–Apr", Time: "1 day", Highlight: "Tigers & Ruins" },
        hot: 1,
        tip: "Pair your morning tiger safari with a mid-day visit to the legendary 17th-century haunted town of Bhangarh nearby."
      }
    ]
  }
};

/**
 * Coordinate dictionary for schematic maps and distance calculations
 */
const C = {
  Jaipur: [26.9124, 75.7873],
  Pushkar: [26.4897, 74.5511],
  Jodhpur: [26.2918, 73.0169],
  Jaisalmer: [26.9157, 70.9083],
  Bikaner: [28.0229, 73.3119],
  Udaipur: [24.5854, 73.7125],
  Ranakpur: [25.1167, 73.4722],
  Kumbhalgarh: [25.1479, 73.5828],
  Chittorgarh: [24.8887, 74.6269],
  Bundi: [25.4415, 75.6441],
  Ranthambore: [26.0173, 76.5026]
};

/**
 * Curated Road Trip Itineraries
 */
const ITINERARIES = [
  {
    id: "itin-desert-loop",
    name: "9-day desert loop: Jaipur to Udaipur via Jaisalmer",
    color: "#a8431f",
    route: ["Jaipur", "Pushkar", "Jodhpur", "Jaisalmer", "Udaipur"],
    badge: "Most Popular",
    duration: "9 Days / 8 Nights",
    stats: "5 Stops · 1,250 km Total · 22 hrs Scenic Driving",
    bestFor: "First-time visitors wanting iconic forts, desert dunes, and royal lakes",
    note: "The last leg, Jaisalmer to Udaipur, is a long haul (≈10–11 h by road). Consider a short flight or a train for that stretch instead of driving it in one go.",
    legs: [
      ["2.5–3 h", "≈145 km", "Lunch in Ajmer: Rasoi – The Vegetarian Kitchen", "f52"],
      ["3.5–4 h", "≈190 km", "Breakfast in Pushkar: Mango Masala Pure Veg Family Restro", "f44"],
      ["5–5.5 h", "≈285 km", "Lunch on the way in Phalodi: Old Town Café & Lounge", "f59"],
      ["≈10–11 h road, or ≈1 h flight", "≈630 km", "Breakfast in Jaisalmer before departing", "s5"]
    ],
    days: [
      ["Jaipur", "Amber Fort, City Palace, Hawa Mahal.", "Dinner: 1135 AD (Amber) or LMB", "f2"],
      ["Jaipur", "Nahargarh sunset, Johari Bazaar shopping.", "Chokhi Dhani dinner, Rawat Misthan Bhandar for kachori", "f6"],
      ["Jaipur → Pushkar", "Drive ≈2.5–3 h. Lake ghats and Brahma Temple.", "Rasoi (Ajmer lunch), Sunset Café (Pushkar dinner)", "f43"],
      ["Pushkar → Jodhpur", "Drive ≈3.5–4 h. Evening at Mehrangarh.", "Indique (rooftop dinner)", "f22"],
      ["Jodhpur", "Fort, Jaswant Thada, Clock Tower market.", "Gypsy Vegetarian lunch, Mishri Lal for lassi", "f23"],
      ["Jodhpur → Jaisalmer", "Drive ≈5–5.5 h via Phalodi.", "Old Town Café & Lounge (lunch), Saffron (dinner)", "f32"],
      ["Jaisalmer", "Fort, havelis, sunset camel or jeep safari at Sam dunes.", "Trio", "f33"],
      ["Jaisalmer → Udaipur", "Long transfer — fly or take an overnight train if possible.", "Natraj Dining Hall (Udaipur, dinner)", "f13"],
      ["Udaipur", "City Palace and a Lake Pichola boat ride, then depart.", "Ambrai", "f12"]
    ]
  },
  {
    id: "itin-grand-loop",
    name: "14-day grand loop: back to Jaipur",
    color: "#5a4a9a",
    route: ["Jaipur", "Ranthambore", "Bundi", "Chittorgarh", "Udaipur", "Kumbhalgarh", "Ranakpur", "Jodhpur", "Jaisalmer", "Bikaner", "Jaipur"],
    badge: "The Ultimate Epic",
    duration: "14 Days / 13 Nights",
    stats: "11 Stops · 2,120 km Total · Comprehensive Royal Circuit",
    bestFor: "Travellers seeking wildlife tigers, offbeat stepwells, and the complete royal circuit",
    note: "This comprehensive circle covers both the royal Aravalli hill forts and the deep Thar desert sands, ending back at Jaipur airport.",
    legs: [
      ["3.5–4 h", "≈180 km", "Breakfast in Jaipur: Rawat Misthan Bhandar", "s1"],
      ["≈3.5 h", "≈200 km", "Hotel restaurant or highway dhaba", ""],
      ["≈3 h", "≈150 km", "Hotel restaurant in Bundi", ""],
      ["≈2.5 h", "≈115 km", "Dinner in Udaipur: Ambrai", "f12"],
      ["≈2 h", "≈85 km", "Breakfast in Udaipur before leaving", "f21"],
      ["≈1 h", "≈35 km", "Ranakpur temple-side thali", ""],
      ["≈3.5 h", "≈165 km", "Lunch in Jodhpur: Gypsy Vegetarian", "f23"],
      ["5–5.5 h", "≈285 km", "Breakfast: Janta Sweet Home (Jodhpur)", "s3"],
      ["5.5–6 h", "≈330 km", "Lunch stop in Phalodi: Old Town Café & Lounge", "f59"],
      ["≈5.5 h", "≈334 km", "Sweets and kachori: Chhotu Motu Joshi (Bikaner)", "s4"]
    ],
    days: [
      ["Jaipur", "Amber Fort, City Palace, Hawa Mahal.", "1135 AD or LMB", "f2"],
      ["Jaipur", "Nahargarh sunset, bazaars.", "Chokhi Dhani", "f6"],
      ["Jaipur → Ranthambore", "Drive ≈3.5–4 h.", "Hotel dinner", ""],
      ["Ranthambore", "Two safari drives, fort visit.", "Hotel restaurant", ""],
      ["Ranthambore → Bundi", "Palace, stepwells and painted rooms.", "Local thali", ""],
      ["Bundi → Chittorgarh → Udaipur", "Chittorgarh Fort stop, then Udaipur (≈6 h total).", "Ambrai", "f12"],
      ["Udaipur", "City Palace, boat ride.", "Upre by 1559 AD", "f14"],
      ["Udaipur → Kumbhalgarh → Ranakpur", "Fort wall, then Jain temples. Overnight at Ranakpur.", "Ranakpur thali", ""],
      ["Ranakpur → Jodhpur", "Drive ≈3.5 h. Mehrangarh at sunset.", "Indique", "f22"],
      ["Jodhpur", "Fort, Jaswant Thada, blue-city lanes.", "Mishri Lal, Janta Sweet Home", "s2"],
      ["Jodhpur → Jaisalmer", "Drive ≈5–5.5 h. Fort at dusk.", "Saffron", "f32"],
      ["Jaisalmer", "Fort, havelis, Sam dunes camp at sunset.", "Trio", "f33"],
      ["Jaisalmer → Bikaner", "Drive ≈5.5–6 h via Phalodi. Junagarh Fort.", "Old Town Café & Lounge (lunch)", "f59"],
      ["Bikaner → Jaipur", "Drive ≈5.5 h. Trip ends in Jaipur.", "Chhotu Motu Joshi", "s4"]
    ]
  }
];

// Quick search tags for one-tap discovery
const POPULAR_TAGS = ["Amber Fort", "Lake Pichola", "Mehrangarh", "Sam Dunes", "Thali", "Laal Maas", "Lassi", "Jaisalmer", "Kachori"];

/**
 * Generates an elegant SVG data URI for resilient offline/fallback imagery
 */
function getVectorPattern(color, emoji, title) {
  const safeTitle = (title || "Rajasthan").replace(/[^a-zA-Z0-9 ]/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color || '#0e5c52'}" />
        <stop offset="100%" stop-color="#06201b" />
      </linearGradient>
      <pattern id="mesh" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="12" cy="12" r="1.5" fill="#ffffff" fill-opacity="0.12"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect width="100%" height="100%" fill="url(#mesh)" />
    <!-- Palace Arch Silhouette -->
    <path d="M180,380 V220 Q300,120 420,220 V380 Z" fill="#ffffff" fill-opacity="0.05" />
    <path d="M220,380 V240 Q300,160 380,240 V380 Z" fill="#ffffff" fill-opacity="0.08" />
    <text x="50%" y="42%" font-size="64" text-anchor="middle" dominant-baseline="middle">${emoji || '🏰'}</text>
    <text x="50%" y="68%" font-size="20" font-weight="700" fill="#fed88b" font-family="sans-serif" text-anchor="middle" letter-spacing="1">${safeTitle}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
