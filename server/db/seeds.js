use edinburgh;
db.dropDatabase();

db.parks.insertMany([
  {
      name: "Holyrood Park",
      latlng: [55.946183, -3.159678],
      fact: "Arthur's Seat is one of four hill forts, dating from around 2,000 years ago. As well as it's rich cultural heritage, the park offers walks, solace, wildlife, volcanic geology and unparalleled vistas of the city from its many vantage points.",
      image: '/images/as.jpg'
    },
    {
      name: "Inverleith Park",
      latlng: [55.963792, -3.217503],
      fact: 'In late 1823, George Lauder, described as the tenant farmer of Inverleith Mains, agreed with James Rocheid of Inverleith to a reversion of part of his leasehold lands, 11.5 Scots acres, for the site of the Royal Botanic Garden, which had formerly been located on Leith Walk.',
      image: '/images/inverleith.jpg'
    },
    {
      name: "Figgate Park",
      latlng: [55.950860, -3.124805],
      fact: "At the east end the burn is partly diverted into a large pond, which used to be a claypit, supplying clay to the potteries in Portobello. It is now home to a dazzling array of wildlife, including recent visits from otters as the pond has a healthy population of fish",
      image: '/images/figgate.jpg'
    },
    {
      name: "Meadows",
      latlng: [55.941763, -3.191870],
      fact: "In the 1870s the Meadows became an important venue in the early development of football in Edinburgh. Amongst the numerous fledgling teams using the Meadows were Heart of Midlothian F.C. and Hibernian F.C., later to become the city's preeminent sides, and the first derby match between them was played there on 25 December 1875",
      image: '/images/meadows.jpg'
    },
    {
      name: "Dalkeith Country Park",
      latlng: [55.899550, -3.065309],
      fact: "Dalkeith Country Park has been in the Buccleuch family for over 300 years and the site itself can be traced back to Roman times. The woodlands are hundreds of years old and now a Site of Special Scientific Interest (SSSI) with some trees over 900 years of age. The architecture and designed landscape you see today are the result of changes by different generations of the Buccleuch family.",
      image: '/images/dalkeith.jpg'
    },
    {
      name: "Cramond Promenade",
      latlng: [55.980753, -3.298482],
      fact: "The Cramond area has a long history, with evidence of Mesolithic, Bronze Age and Roman activity. In modern times, it was the birthplace of the Scottish economist John Law",
      image: '/images/cramond.jpg'
    },
    {
      name: "Dr. Neil's Hidden Garden",
      latlng: [55.940724, -3.148231],
      fact: "In one corner of the garden is the historic Thomson’s Tower, designed by William Henry Playfair, and built in 1825 for the Duddingston Curling Society to store its stones.",
      image: '/images/neil.jpg'
    }
  ])
