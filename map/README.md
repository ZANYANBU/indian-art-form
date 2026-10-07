# Kala Bhoomi · Interactive Map of Indian Art

**21LEM301T Indian Art Form · CLA-I Assignment 2 · Interactive Art Map (CO1)**

An interactive digital map highlighting key locations in Indian art history. Each location has a photo, description, historical context, art movement, artists and key artworks.

## Locations
1. Ajanta Caves, Maharashtra · Buddhist murals
2. Ellora Caves, Maharashtra · Kailasa rock-cut temple
3. Thanjavur, Tamil Nadu · Chola temples, bronzes, Tanjore painting
4. Khajuraho, Madhya Pradesh · Chandela temple sculpture
5. Madhubani, Bihar · Mithila painting
6. Warli region, Maharashtra · Warli tribal painting
7. Puri & Raghurajpur, Odisha · Pattachitra
8. Jaipur, Rajasthan · Rajput miniatures, blue pottery, block printing

## Features
- Leaflet map with OpenStreetMap tiles and custom colour-coded markers
- Sidebar list of places, category filters and legend
- Popups with photo and a detail panel for each place
- Guided "Take the tour" mode that flies to every location
- Keyboard navigation and mobile-friendly slide-out sidebar

## Run
No build or backend. Open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server
```

## Tech
HTML, CSS, vanilla JavaScript, [Leaflet 1.9](https://leafletjs.com) and [OpenStreetMap](https://www.openstreetmap.org). Photos from Wikimedia Commons. Edit `data.js` to add places.
