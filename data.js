/* ------------------------------------------------------------------
   Artifact data for the Chitra Kaal timeline.
   Images are hot-linked from Wikimedia Commons (free licences).
   ------------------------------------------------------------------ */
const WIKI = (file, w = 900) =>
  "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=" + w;

const ERAS = [
  {
    id: "indus",
    name: "Indus Valley",
    dates: "c. 2600 – 1900 BCE",
    color: "#C4502F",
    tagline: "The Bronze Age cities of Harappa and Mohenjo-daro produce India's earliest known sculpture, seals and jewellery.",
    artifacts: [
      {
        title: "The Dancing Girl of Mohenjo-daro",
        date: "c. 2500 BCE",
        place: "Mohenjo-daro, Sindh (now Pakistan)",
        material: "Bronze, lost-wax (cire perdue) casting",
        size: "10.5 cm tall",
        location: "National Museum, New Delhi",
        img: WIKI("Dancing Girl of Mohenjo-daro.jpg"),
        credit: "Wikimedia Commons",
        desc: "A slender, confident young woman stands with one hand on her hip and the other resting on her thigh, her left arm stacked with bangles from wrist to shoulder. Her head is tilted back and her weight rests on one leg, giving the tiny figure an unmistakable swagger.",
        context: "Excavated in 1926 by Ernest Mackay, the figure was made in a city with planned streets, drainage and standardised bricks. The Harappans traded with Mesopotamia and worked copper, bronze, gold, carnelian and faience. Writing on their seals is still undeciphered, so objects like this are our main window into their world.",
        sig: "It is the earliest known example of lost-wax bronze casting in South Asia, a technique that would later reach its height in Chola bronzes. The naturalistic pose, expressive face and self-assured stance make it one of the most celebrated small sculptures of the ancient world.",
        dyk: "The figure is only about the height of a smartphone, yet archaeologist Mortimer Wheeler described her as a girl 'perfectly, for the moment, confident of herself and the world.'"
      },
      {
        title: "The Pashupati Seal",
        date: "c. 2350 – 2000 BCE",
        place: "Mohenjo-daro",
        material: "Steatite (soapstone), carved and fired",
        size: "3.5 × 3.5 cm",
        location: "National Museum, New Delhi",
        img: WIKI("Pashupati seal impression.jpg"),
        credit: "Wikimedia Commons",
        desc: "A horned, seated figure in a yogic posture is surrounded by animals: an elephant, tiger, rhinoceros and buffalo, with two antelopes below the seat. A line of undeciphered Indus script runs across the top.",
        context: "Thousands of small square seals were used by Harappan merchants to stamp clay tags on goods. Most show a single animal, especially the 'unicorn'. This seal is unusual for its complex composition and has been linked by some scholars to a proto-Shiva, 'Lord of Beasts' (Pashupati).",
        sig: "It demonstrates the miniature carving skill of Indus artisans and shows that religious iconography, animal symbolism and a writing system were already interwoven in India's first urban culture.",
        dyk: "Seals were carved in reverse so that the stamped impression read correctly. The image shown here is a modern impression, not the seal itself."
      }
    ]
  },
  {
    id: "ajanta",
    name: "Ajanta",
    dates: "2nd c. BCE – 6th c. CE",
    color: "#B52B65",
    tagline: "Buddhist monks carve thirty caves into a horseshoe cliff and cover them with the finest surviving paintings of ancient India.",
    artifacts: [
      {
        title: "Bodhisattva Padmapani, Cave 1",
        date: "c. 475 – 500 CE (Vakataka period)",
        place: "Ajanta Caves, Aurangabad district, Maharashtra",
        material: "Tempera on mud-and-lime plaster (mural)",
        size: "Life-size figure, wall painting",
        location: "In situ, Cave 1, Ajanta",
        img: WIKI("Bodhisattva Padmapani, cave 1, Ajanta, India.jpg"),
        credit: "Wikimedia Commons",
        desc: "The 'lotus-bearer' Bodhisattva stands in a graceful tribhanga (three-bend) pose, holding a blue lotus. His downcast eyes, jewelled crown and gentle sway express karuna, the compassion at the heart of Mahayana Buddhism.",
        context: "Ajanta's later caves were sponsored by the Vakataka king Harishena and his ministers. Artists first plastered the rock with a mixture of mud, straw and lime, then drew outlines in red ochre and painted with mineral pigments such as lapis lazuli imported from Afghanistan.",
        sig: "This is the most famous image at Ajanta and a benchmark for classical Indian painting: shading (vartana) to model volume, elegant line, and emotion conveyed through posture rather than facial drama. It influenced Buddhist painting from Sri Lanka to Central Asia and Japan.",
        dyk: "Ajanta was 'rediscovered' in 1819 by a British officer, John Smith, while hunting a tiger; his graffiti is still visible on a pillar in Cave 10."
      },
      {
        title: "The Ajanta Cave Complex",
        date: "Phase I c. 2nd c. BCE · Phase II c. 460–480 CE",
        place: "Waghora river gorge, Maharashtra",
        material: "Rock-cut basalt architecture with murals and sculpture",
        size: "30 caves along a 550 m cliff",
        location: "UNESCO World Heritage Site (1983)",
        img: WIKI("Ajanta caves panorama 2010.jpg"),
        credit: "Wikimedia Commons",
        desc: "A crescent of chaitya (prayer halls) and vihara (monasteries) cut directly into a volcanic cliff above a river bend. Inside, the walls narrate Jataka tales, the previous lives of the Buddha, in continuous painted scenes.",
        context: "Work began under the Satavahanas and resumed centuries later under the Vakatakas. The site was abandoned soon after Harishena's death, which is why the paintings survived largely untouched for over a thousand years.",
        sig: "Ajanta is the best-preserved gallery of ancient Indian painting anywhere, and its architecture is the model for later rock-cut sites such as Ellora and Elephanta.",
        dyk: "The horseshoe-shaped chaitya windows at Ajanta became such a strong motif that they appear as decorative 'gavaksha' arches on stone temples for the next thousand years."
      }
    ]
  },
  {
    id: "chola",
    name: "Chola Bronzes",
    dates: "c. 850 – 1250 CE",
    color: "#0F7C7A",
    tagline: "Under the imperial Cholas of Tamil Nadu, temple building and bronze casting reach a perfection never surpassed.",
    artifacts: [
      {
        title: "Shiva as Nataraja, Lord of the Dance",
        date: "c. 10th – 11th century CE",
        place: "Tamil Nadu, Chola empire",
        material: "Copper alloy (bronze), solid lost-wax casting",
        size: "Typically 60 – 110 cm tall",
        location: "Los Angeles County Museum of Art (this example)",
        img: WIKI("Shiva as the Lord of Dance LACMA edit.jpg"),
        credit: "Wikimedia Commons / LACMA",
        desc: "Shiva dances inside a ring of flames, one foot crushing the dwarf of ignorance (Apasmara), the other raised in release. His four hands hold the drum of creation and the fire of destruction, and gesture 'fear not'. His matted locks fly outwards with the force of the dance.",
        context: "Chola bronzes were utsava murtis, portable processional images carried out of the temple during festivals, dressed in silk and flowers. Queen Sembiyan Mahadevi was a great patron of the form in the 10th century. Sculptors (sthapatis) followed proportions set out in the Shilpa Shastras yet achieved remarkably lifelike bodies.",
        sig: "The Nataraja is the most recognised icon of Indian art worldwide, a complete cosmology in a single figure: creation, preservation, destruction, illusion and grace. Rodin called it 'the most perfect representation of rhythmic movement in the world'.",
        dyk: "Because each bronze was cast from a unique wax model that melted away in the process, no two Chola bronzes are identical. A replica Nataraja stands outside CERN in Geneva."
      },
      {
        title: "Brihadeeswarar Temple, Thanjavur",
        date: "Completed 1010 CE, built by Rajaraja Chola I",
        place: "Thanjavur, Tamil Nadu",
        material: "Granite, with painted interiors",
        size: "Vimana (tower) about 66 m high",
        location: "UNESCO World Heritage Site: 'Great Living Chola Temples'",
        img: WIKI("Brihadeeswarar Temple 02.jpg"),
        credit: "Wikimedia Commons",
        desc: "A 13-storey pyramidal tower rises over the sanctum of Shiva, capped by an 80-tonne granite block. Inside are 11th-century Chola frescoes rediscovered in 1930 beneath later Nayaka paintings.",
        context: "Rajaraja I funded the temple with plunder from his conquests and recorded every gift, dancer, musician and jeweller in long inscriptions on its walls, an extraordinary economic record of the Chola state.",
        sig: "It is the grandest example of Dravidian temple architecture and set the model for the later temples at Gangaikonda Cholapuram and Darasuram. Its frescoes are the finest surviving Chola paintings.",
        dyk: "The temple is often called the 'Big Temple' (Periya Kovil). Its shadow supposedly never falls on the ground at noon, a popular myth about its perfect geometry."
      }
    ]
  },
  {
    id: "mughal",
    name: "Mughal Miniatures",
    dates: "c. 1560 – 1750 CE",
    color: "#2E3A87",
    tagline: "Persian refinement meets Indian colour in the imperial ateliers of Akbar, Jahangir and Shah Jahan.",
    artifacts: [
      {
        title: "Jahangir Preferring a Sufi Shaikh to Kings",
        date: "c. 1615 – 1618 CE, by Bichitr",
        place: "Mughal court (Agra / Ajmer)",
        material: "Opaque watercolour, gold and ink on paper",
        size: "25.3 × 18.1 cm (painting)",
        location: "Freer Gallery of Art, Washington DC",
        img: WIKI("Bichitr - Jahangir preferring a sufi sheikh to kings.jpg"),
        credit: "Wikimedia Commons / Freer Gallery",
        desc: "Emperor Jahangir sits on an hourglass throne inside a blazing sun-and-moon halo, handing a book to the Sufi saint Shaikh Husain, while the Ottoman sultan and King James I of England wait below. At the bottom, the artist Bichitr paints himself holding a tiny picture.",
        context: "Jahangir was the most discerning connoisseur of the Mughal emperors and boasted that he could identify any painter's hand. His ateliers absorbed European engravings brought by Jesuit missionaries, which explains the putti and the Renaissance-style portrait of James I.",
        sig: "This allegorical portrait shows Mughal painting at its most sophisticated: political propaganda, spiritual message, realism and symbolism combined in a single small page.",
        dyk: "The Latin-inscribed cherubs write 'O King, may your life be a thousand years' on the hourglass, a witty play on the throne's shape."
      },
      {
        title: "Akbarnama: Akbar Tames the Elephant Hawa'i",
        date: "c. 1590 – 1595 CE, composition by Basawan, colouring by Chetar",
        place: "Fatehpur Sikri / Lahore, Mughal court",
        material: "Opaque watercolour and gold on paper",
        size: "Double-page manuscript folio",
        location: "Victoria and Albert Museum, London",
        img: WIKI("Basawan. Akbar Taming Mad Elephant Hawai. Composition by Basawan, coloring by Chitra. (right part) Akbarnama, ca. 1590, Victoria and Albert Museum, London.. (2).jpg"),
        credit: "Wikimedia Commons / V&A",
        desc: "The young Akbar rides the wild elephant Hawa'i across a bridge of boats as it charges another elephant, while boatmen and courtiers scatter in panic. Diagonal lines and swirling water give the page a dramatic energy.",
        context: "The Akbarnama is the official chronicle of Akbar's reign written by Abu'l Fazl. Over a hundred artists, Hindu and Muslim, worked together in Akbar's tasvir khana (painting workshop), which is why Persian composition blends with Indian colour and observation of nature.",
        sig: "It marks the birth of a distinctly Mughal style: dynamic movement, individual portraiture and naturalistic detail, replacing the flat decorative surfaces of Persian painting.",
        dyk: "Akbar himself could not read but had books read aloud to him and personally inspected the paintings, rewarding artists by the quality of their work."
      }
    ]
  },
  {
    id: "madhubani",
    name: "Madhubani",
    dates: "Ancient roots · recognised 1934 · art market from 1966",
    color: "#F2B632",
    tagline: "The women of Mithila in Bihar paint gods, weddings and the natural world in a dense web of line and colour.",
    artifacts: [
      {
        title: "Madhubani (Mithila) Painting",
        date: "Living tradition; paper works since the 1960s",
        place: "Madhubani district, Mithila region, Bihar",
        material: "Natural pigments and ink on handmade paper (originally mud walls)",
        size: "Varies, often 55 × 75 cm on paper",
        location: "Private and museum collections worldwide",
        img: WIKI("Madhubani painting by Bhuvana Meenakshi.jpg"),
        credit: "Wikimedia Commons",
        desc: "Figures with large fish-shaped eyes and profile faces, framed by double-line borders, fill every inch of the surface with flowers, fish, birds and geometric patterns. Nothing is left empty; blank space is considered inauspicious.",
        context: "Traditionally painted by women on the walls of the kohbar (nuptial chamber) and courtyards during weddings and festivals. The tradition was noted by British officer W. G. Archer after the 1934 Bihar earthquake exposed the painted interiors of damaged houses. During the 1966 drought, the All India Handicrafts Board encouraged women to paint on paper for sale, creating a new livelihood.",
        sig: "Madhubani is one of India's most recognisable folk styles and holds a Geographical Indication (GI) tag. Artists such as Sita Devi, Ganga Devi, Baua Devi and Mahasundari Devi received national honours, turning a domestic ritual into a celebrated art form.",
        dyk: "Styles are named after the tools and communities that used them: Bharni (filled colour), Kachni (fine line hatching), Tantrik, Godna (tattoo-like) and Kohbar (wedding)."
      },
      {
        title: "Mithila Artist at Work",
        date: "Contemporary practice",
        place: "Dilli Haat, New Delhi (craft bazaar)",
        material: "Acrylic and natural dyes on paper and cloth",
        size: "—",
        location: "Craft markets and galleries",
        img: WIKI("Dilli Haat Madhubani Mithila Painting Artist.jpg"),
        credit: "Wikimedia Commons",
        desc: "A painter works on a sheet with a fine bamboo nib and brush, building up the picture in stages: outline, fill, then the hatched borders that give Madhubani its signature texture.",
        context: "Government emporia, craft fairs like Dilli Haat and export markets have connected village painters with national and international buyers since the 1970s, while villages such as Jitwarpur and Ranti have become recognised centres of the art.",
        sig: "It shows a ritual art surviving by adapting: from mud walls to paper, sarees, tote bags and even train carriages, without losing its iconography.",
        dyk: "In 2018 the Madhubani railway station was painted entirely in Mithila style by local artists and became one of the most photographed stations in India."
      }
    ]
  },
  {
    id: "warli",
    name: "Warli",
    dates: "Tribal tradition, c. 10th c. CE origins · recognised 1970s",
    color: "#4C8C3E",
    tagline: "Tribal painters of Maharashtra reduce the whole of life to circles, triangles and lines in rice-paste white on mud walls.",
    artifacts: [
      {
        title: "Warli Painting",
        date: "Living tradition; on paper and canvas since the 1970s",
        place: "Palghar, Dahanu and Thane region, Maharashtra",
        material: "Rice paste on cow-dung and red-earth (geru) coated walls; now acrylic on cloth",
        size: "Wall murals to small canvases",
        location: "Village homes, galleries, public murals",
        img: WIKI("Warli painting.jpg"),
        credit: "Wikimedia Commons",
        desc: "Stick-like figures made from two triangles joined at the waist dance, farm, hunt and marry across a rust-coloured ground. A spiralling circle of dancers, the tarpa dance, is the most characteristic motif, along with the sun, moon, trees and the wedding god Palghat.",
        context: "The Warli are an Adivasi (tribal) community whose painting was a ritual performed by married women (suvasinis) during weddings and harvest. It was largely unknown outside the villages until the 1970s, when artist Jivya Soma Mashe began painting on paper and the style was promoted by Bhaskar Kulkarni of the Handicrafts Board.",
        sig: "Warli is prized for its minimalism: a complete visual language using only basic geometric forms. Its rhythmic, communal scenes influenced contemporary Indian design, and Jivya Soma Mashe received the Padma Shri in 2011.",
        dyk: "The circle in Warli art represents the sun and moon, the triangle mountains and trees, and the square a sacred enclosure; the human figure itself is built from an inverted triangle balanced on an upright one."
      },
      {
        title: "Warli Mural, Borivali Station",
        date: "Contemporary public art",
        place: "Borivali railway station, Mumbai",
        material: "Acrylic paint on wall",
        size: "Large-scale mural",
        location: "Public space",
        img: WIKI("Warli art at Borivali Stn 01.jpg"),
        credit: "Wikimedia Commons",
        desc: "A city-scale version of the village mural: rows of dancers, farmers and animals painted in white on ochre panels bring the tribal idiom into a busy suburban station.",
        context: "Since the 2000s, Warli motifs have been widely used in public murals, textiles and branding, raising questions of credit and copyright that led the Warli community to register their art as a collective intellectual property in 2014.",
        sig: "It demonstrates how a tribal art form has become part of India's mainstream visual identity while the community works to keep ownership of its heritage.",
        dyk: "Warli painters traditionally used a chewed bamboo twig as a brush; the softened fibres made a fine line for the tiny figures."
      }
    ]
  }
];
