import eventCorporate from "@/assets/event-corporate.jpg";
import eventCelebrity from "@/assets/event-celebrity.jpg";
import eventAwards from "@/assets/event-awards.jpg";
import eventWedding from "@/assets/event-wedding.jpg";

export const CONTACT = {
  email: "anchorsayantibanerjee@gmail.com",
  phone: "+91 97023 34193",
  phoneHref: "tel:+919702334193",
  whatsapp: "https://wa.me/919702334193",
};

export const featuredMoments = [
  { label: "Corporate Conference", caption: "Why Women Should Always Support Women Entrepreneurs", img: eventCorporate },
  { label: "CELEBRITY EVENTS", caption: "Film premiere red carpet hosting", img: eventCelebrity },
  { label: "TTK Healthcare", caption: "Doctor's Day Celebration 2025", img: eventAwards },
  { label: "Destination Weddings", caption: "Sangeet night in Goa", img: eventWedding },
  { label: "CELEBRITY EVENTS", caption: "In conversation with Ram Gopal Sir", img: eventCelebrity },
];

export const services = [
  { label: "Anchoring Corporate Conference", icon: "Mic" },
  { label: "Dealers Meet", icon: "Users" },
  { label: "Celebrity Events", icon: "Star" },
  { label: "Live Shows", icon: "Calendar" },
  { label: "Team Building Events", icon: "Target" },
  { label: "Theme Parties", icon: "PartyPopper" },
  { label: "Destination Weddings", icon: "Heart" },
  { label: "Product Launches", icon: "Rocket" },
] as const;

export const workTabs = ["Corporate Conference", "Celebrity Events", "Tourism", "Acting Career", "Wedding"] as const;

export const works: Record<string, { title: string; img: string; duration: string }[]> = {
  "Corporate Conference": [
    { title: "Corporate Conference Event", img: eventCorporate, duration: "9:47" },
    { title: "Business Conference Hosting", img: eventAwards, duration: "6:12" },
    { title: "Corporate Event Management", img: eventCelebrity, duration: "4:38" },
    { title: "Professional Conference Host", img: eventAwards, duration: "8:05" },
    { title: "Corporate Conference Video", img: eventCorporate, duration: "3:21" },
    { title: "Corporate Event Video", img: eventWedding, duration: "5:44" },
  ],
  "Celebrity Events": [
    { title: "Film Premiere Red Carpet", img: eventCelebrity, duration: "7:10" },
    { title: "Awards Night Hosting", img: eventAwards, duration: "9:02" },
    { title: "Star Studded Launch", img: eventCelebrity, duration: "4:55" },
    { title: "Music Album Reveal", img: eventAwards, duration: "6:30" },
    { title: "Celebrity Interview Series", img: eventCorporate, duration: "12:18" },
    { title: "Fashion Week Finale", img: eventWedding, duration: "8:41" },
  ],
  Tourism: [
    { title: "Land of Adventure Showcase", img: eventAwards, duration: "5:26" },
    { title: "Tourism Board Roadshow", img: eventCorporate, duration: "7:33" },
    { title: "Heritage Festival Host", img: eventWedding, duration: "3:58" },
    { title: "Destination Reveal Event", img: eventCelebrity, duration: "6:49" },
    { title: "Travel Expo Stage", img: eventCorporate, duration: "4:07" },
    { title: "Coastal Carnival", img: eventAwards, duration: "9:15" },
  ],
  "Acting Career": [
    { title: "Short Film Feature", img: eventCelebrity, duration: "14:02" },
    { title: "Web Series Cameo", img: eventAwards, duration: "8:20" },
    { title: "Brand Commercial", img: eventCorporate, duration: "1:45" },
    { title: "Theatre Monologue", img: eventWedding, duration: "6:11" },
    { title: "Screen Test Reel", img: eventCelebrity, duration: "2:39" },
    { title: "Character Showcase", img: eventAwards, duration: "5:03" },
  ],
  Wedding: [
    { title: "Destination Sangeet Night", img: eventWedding, duration: "10:22" },
    { title: "Reception Grand Entry", img: eventWedding, duration: "7:48" },
    { title: "Mehendi Live Show", img: eventCelebrity, duration: "5:36" },
    { title: "Cocktail Evening Host", img: eventAwards, duration: "4:29" },
    { title: "Wedding Anchoring Reel", img: eventCorporate, duration: "3:12" },
    { title: "Bride & Groom Toast", img: eventWedding, duration: "6:57" },
  ],
};

export const testimonials = [
  { name: "Arjun Reddy", role: "Product Launch Manager", text: "Our product launch was elevated to a whole new level with Sayanti's exceptional hosting skills. Her technical knowledge combined with presentation skills made complex features accessible to everyone." },
  { name: "Kavya Nair", role: "Award Ceremony Organizer", text: "Sayanti hosted our industry awards night phenomenally and created an unforgettable experience for everyone. The perfect balance of humor and formality made the event memorable." },
  { name: "Rajesh Kumar", role: "Corporate Event Manager", text: "As an entrepreneur myself, I appreciate how Sayanti runs her hosting business with such professionalism. She's punctual and brings incredible energy to every corporate event." },
  { name: "Anjali Patel", role: "Fashion Show Organizer", text: "Sayanti's entrepreneurial spirit is inspiring. She doesn't just host, she builds lasting relationships and helped make our fashion week a huge success." },
  { name: "Aditya Verma", role: "Entertainment Industry Professional", text: "Sayanti's hosting skills are truly world-class and set the standard for excellence in the industry. She knows how to read the room perfectly." },
  { name: "Neha Gupta", role: "Event Planning Consultant", text: "Sayanti has transformed the way we approach event hosting with her innovative techniques and exceptional skills. Every event feels special and memorable." },
  { name: "Karan Mehta", role: "Wedding Coordinator", text: "Sayanti made our wedding reception absolutely unforgettable with her incredible energy and charisma. She kept everyone engaged throughout the evening." },
  { name: "Divya Sharma", role: "Corporate Communications", text: "Sayanti's professionalism and ability to connect with diverse audiences is remarkable. Our international conference was engaging for all participants." },
  { name: "Deepika Sharma", role: "Business Consultant", text: "Sayanti's journey is truly inspiring and demonstrates what's possible with dedication and hard work. She understands the value of building relationships." },
  { name: "Amit Patel", role: "Event Entrepreneur", text: "Sayanti has shown me what it means to be a successful entrepreneur in the hosting industry through her consistent excellence." },
  { name: "Rohan Kapoor", role: "Festival Organizer", text: "Sayanti was the backbone of our cultural festival and handled everything with incredible skill. Her multilingual ability kept everyone entertained." },
  { name: "Ananya Das", role: "Event Management Professional", text: "Working with Sayanti is effortless because of her exceptional preparation and ability to handle unexpected moments gracefully." },
];
