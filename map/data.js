/* Kala Bhoomi · location data. Photos hot-linked from Wikimedia Commons. */
const WIKI = (file, w = 900) =>
  "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=" + w;

const TYPES = {
  cave:   { label: "Cave art & rock-cut",   color: "#B52B65", icon: "🪨" },
  temple: { label: "Temple architecture",   color: "#0F7C7A", icon: "🛕" },
  folk:   { label: "Folk & tribal painting", color: "#4C8C3E", icon: "🎨" },
  court:  { label: "Court arts & crafts",    color: "#2E3A87", icon: "👑" }
};

const PLACES = [
  {
    id: "ajanta", name: "Ajanta Caves", state: "Maharashtra", type: "cave",
    coords: [20.5519, 75.7033], period: "2nd c. BCE – 6th c. CE",
    style: "Buddhist mural painting & rock-cut architecture",
    tag: "Thirty Buddhist caves cut into a horseshoe cliff, holding the finest surviving paintings of ancient India.",
    img: WIKI("Bodhisattva Padmapani, cave 1, Ajanta, India.jpg"),
    movement: "Ajanta is the source of the classical Indian painting tradition. Its murals use line, shading (vartana) and graceful posture to narrate the Jataka tales, and their style travelled with Buddhism to Sri Lanka (Sigiriya), Central Asia and China.",
    history: "The early caves were excavated under the Satavahanas around the 2nd century BCE. After a long gap, the Vakataka king Harishena and his court sponsored a burst of activity around 460–480 CE. The site was abandoned soon after and lost to the outside world until 1819, which is why the paintings survived.",
    artists: "Anonymous guilds of monks and professional painters and sculptors; patrons included the minister Varahadeva and the feudatory Upendragupta, both named in inscriptions.",
    works: ["Bodhisattva Padmapani and Vajrapani, Cave 1", "The Dying Princess, Cave 16", "The Great Chaitya hall, Cave 26", "Mahajanaka Jataka murals, Cave 1"],
    dyk: "Pigments included lapis lazuli from Afghanistan, and the ceilings were painted with flowers, birds and fabrics so that they resembled a woven canopy."
  },
  {
    id: "ellora", name: "Ellora Caves", state: "Maharashtra", type: "cave",
    coords: [20.0268, 75.1790], period: "6th – 10th c. CE",
    style: "Rock-cut monolithic architecture: Buddhist, Hindu & Jain",
    tag: "Thirty-four caves and the Kailasa temple, the largest single rock-cut monument on earth.",
    img: WIKI("Ellora Caves, India, Kailasa Temple.jpg"),
    movement: "Ellora marks the shift from painting to monumental sculpture. Its three groups of caves, Buddhist, Hindu and Jain, sit side by side, showing the religious tolerance of the Rashtrakuta period.",
    history: "The Kailasa temple (Cave 16) was commissioned by the Rashtrakuta king Krishna I around 756–773 CE. Workers cut down into the basalt from the top, removing an estimated 200,000 tonnes of rock to free a complete temple with courtyards, shrines and life-size elephants.",
    artists: "Rashtrakuta royal workshops; the Kailasa carvers are unnamed. A legend recorded in the Katha-Kalpataru says the architect was named Kokasa.",
    works: ["Kailasa temple, Cave 16", "Ravana shaking Mount Kailasa relief", "Tin Thal three-storey Buddhist vihara, Cave 12", "Indra Sabha Jain cave, Cave 32"],
    dyk: "The Kailasa temple was carved from a single rock, top-down, with no possibility of correcting a mistake."
  },
  {
    id: "thanjavur", name: "Thanjavur", state: "Tamil Nadu", type: "temple",
    coords: [10.7828, 79.1318], period: "9th – 19th c. CE",
    style: "Chola temple architecture, bronze casting & Tanjore painting",
    tag: "Capital of the imperial Cholas, home of the Brihadeeswarar Temple, and birthplace of gold-leaf Tanjore painting.",
    img: WIKI("Brihadeeswarar Temple 02.jpg"),
    movement: "Thanjavur defines Dravidian art. The Cholas perfected the vimana-tower temple and the lost-wax bronze (Nataraja is the icon), and later Maratha rulers of the city sponsored Tanjore painting: gods on wood panels with gesso relief, gold leaf and glass gems.",
    history: "Rajaraja Chola I completed the Brihadeeswarar Temple in 1010 CE. Its inscriptions list 400 temple dancers and hundreds of musicians. In the 17th–19th centuries the Nayaka and Maratha courts made Thanjavur a centre of music, dance, manuscript painting and the Saraswati Mahal library.",
    artists: "Chola sthapatis (master sculptors) following the Shilpa Shastras; Maratha-era painter families; the queen Sembiyan Mahadevi as an early patron of bronzes.",
    works: ["Brihadeeswarar Temple and its Chola frescoes", "Chola Nataraja bronzes", "Tanjore paintings of Krishna and Gajalakshmi", "Thanjavur veena and Thanjavur dolls"],
    dyk: "The capstone of the temple tower weighs about 80 tonnes; it was probably dragged up a 6 km earthen ramp."
  },
  {
    id: "khajuraho", name: "Khajuraho", state: "Madhya Pradesh", type: "temple",
    coords: [24.8318, 79.9199], period: "c. 950 – 1050 CE",
    style: "Nagara (North Indian) temple architecture & sculpture",
    tag: "Chandela temples whose soaring shikharas are wrapped in some of the most famous sculpture in India.",
    img: WIKI("Kandariya Mahadeva Temple, Khajuraho, Madhya Pradesh, India 002.jpg"),
    movement: "Khajuraho is the high point of Nagara architecture: temples rise like mountain ranges of stacked spires, and every surface carries bands of gods, dancers, musicians, couples and animals carved in deep relief.",
    history: "Built by the Chandela Rajputs between about 950 and 1050 CE. Of some 85 temples, 25 survive. The site was overgrown by jungle after the 13th century and documented again by T. S. Burt in 1838. It became a UNESCO World Heritage Site in 1986.",
    artists: "Chandela court sculptors and architects; the finest temple, Kandariya Mahadeva, was built under King Vidyadhara around 1030 CE.",
    works: ["Kandariya Mahadeva Temple", "Lakshmana Temple", "Vishvanatha Temple", "Apsara and surasundari figures"],
    dyk: "Only around ten percent of the sculptures are erotic; the majority show everyday life, music, dance and the divine."
  },
  {
    id: "madhubani", name: "Madhubani", state: "Bihar", type: "folk",
    coords: [26.3530, 86.0715], period: "Ancient roots · on paper since 1966",
    style: "Mithila (Madhubani) painting",
    tag: "Village women of Mithila paint gods, weddings and the natural world in dense line and colour.",
    img: WIKI("Madhubani painting by Bhuvana Meenakshi.jpg"),
    movement: "Madhubani painting fills every inch of the surface with fish-eyed figures, flowers, birds and geometric borders. Sub-styles include Bharni (filled colour), Kachni (line hatching), Tantrik, Godna and Kohbar.",
    history: "Traditionally painted on the walls of the wedding chamber (kohbar ghar). W. G. Archer documented it after the 1934 earthquake. During the 1966 drought, the All India Handicrafts Board encouraged women to paint on paper for income, launching the art onto the world market. It holds a GI tag.",
    artists: "Sita Devi, Ganga Devi, Baua Devi, Mahasundari Devi and Jagdamba Devi, several honoured with the Padma Shri; villages of Jitwarpur and Ranti.",
    works: ["Kohbar (wedding) paintings", "Ganga Devi's 'Cycle of Life' series", "Painted Madhubani railway station (2018)"],
    dyk: "In Madhubani painting, empty space is considered inauspicious, so the background is filled with flowers, birds and patterns."
  },
  {
    id: "warli", name: "Warli Region", state: "Palghar–Dahanu, Maharashtra", type: "folk",
    coords: [19.9707, 72.7326], period: "Tribal tradition · recognised 1970s",
    style: "Warli tribal painting",
    tag: "Adivasi painters reduce the whole of life to circles, triangles and lines in white rice paste on mud walls.",
    img: WIKI("Warli painting.jpg"),
    movement: "Warli art is a minimal visual language: a circle for the sun and moon, a triangle for mountains and trees, two triangles for a human body. Its most famous motif is the tarpa dance, a spiral of hand-holding dancers around a musician.",
    history: "Painted for centuries by married women during weddings and harvests in the villages of the Sahyadri foothills north of Mumbai. In the 1970s Jivya Soma Mashe began painting on paper and cloth, and the style, promoted by Bhaskar Kulkarni, reached galleries in India and Europe.",
    artists: "Jivya Soma Mashe (Padma Shri 2011), his sons Sadashiv and Balu Mashe, and village painters of Ganjad and Dahanu. The community registered Warli art as collective intellectual property in 2014.",
    works: ["Tarpa dance murals", "Palghat (wedding god) chauk paintings", "Jivya Soma Mashe's canvases", "Warli murals on Mumbai stations"],
    dyk: "The traditional brush is a bamboo twig chewed at one end to soften the fibres."
  },
  {
    id: "puri", name: "Puri & Raghurajpur", state: "Odisha", type: "folk",
    coords: [19.8135, 85.8312], period: "12th c. CE – present",
    style: "Pattachitra painting, Kalinga temple architecture",
    tag: "The Jagannath temple and the nearby craft village of Raghurajpur keep the scroll-painting tradition of Odisha alive.",
    img: WIKI("Pattachitra of Jagannath.jpg"),
    movement: "Pattachitra ('cloth picture') paints Jagannath, Krishna and epic scenes on cloth stiffened with tamarind glue and chalk, using natural colours and bold black outlines. The temple itself is a masterpiece of the Kalinga style with its towering deul.",
    history: "The Jagannath temple was built in the 12th century by the Eastern Ganga king Anantavarman Chodaganga. Chitrakara families painted substitute images of the deities during the Anasara period when the idols are hidden, and their village Raghurajpur is now a heritage crafts village.",
    artists: "Chitrakara families of Raghurajpur and Puri; Jagannath Mahapatra (Padma Shri), and palm-leaf engravers who make talapatra chitra.",
    works: ["Pattachitra of Jagannath, Balabhadra and Subhadra", "Palm-leaf manuscripts (talapatra)", "Jagannath Temple, Puri", "Gotipua dance costumes and masks"],
    dyk: "Every household in Raghurajpur is an artist's studio; the village walls are painted with murals."
  },
  {
    id: "jaipur", name: "Jaipur", state: "Rajasthan", type: "court",
    coords: [26.9239, 75.8267], period: "1727 CE – present",
    style: "Rajput miniature painting, blue pottery, block printing & architecture",
    tag: "The pink planned city of the Kachwaha Rajputs, where court painters, potters and printers still work.",
    img: WIKI("Hawa Mahal (The Palace of Winds) in Jaipur, 20191218 1201 9174.jpg"),
    movement: "Jaipur is the capital of Rajput court art: miniature painting in the Jaipur (Dhundhar) school blended Mughal realism with Rajasthani colour; blue pottery arrived from Persia; Sanganer and Bagru villages nearby are famous for block-printed textiles.",
    history: "Founded in 1727 by Sawai Jai Singh II and laid out on a grid by the architect Vidyadhar Bhattacharya. Maharaja Ram Singh II had the city painted pink in 1876 to welcome the Prince of Wales. The Hawa Mahal (1799) was designed so palace women could watch street life unseen.",
    artists: "Court painter Sahib Ram (18th c.), the Jaipur miniature ateliers, potter Kripal Singh Shekhawat who revived blue pottery, and the Chhipa block-printing community of Sanganer.",
    works: ["Hawa Mahal", "Jaipur school miniatures of Radha-Krishna", "Blue pottery vases", "Sanganeri block prints", "Jantar Mantar observatory"],
    dyk: "Jaipur blue pottery uses no clay at all; it is made from quartz stone powder, glass and gum."
  }
];
