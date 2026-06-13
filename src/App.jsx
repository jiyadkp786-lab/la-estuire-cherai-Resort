import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Waves, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  Wifi, 
  UtensilsCrossed, 
  Activity, 
  Maximize2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Car,
  Bird,
  PartyPopper,
  Building2,
  ChevronDown
} from 'lucide-react';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Logo Component
const ResortLogo = ({ className = "h-10 w-10" }) => (
  <img 
    src="/logo.jpeg" 
    alt="La Estuaire Cherai Logo" 
    className={`${className} object-contain rounded-full`}
  />
);

// Custom Date Input Component for Manual Entry + Calendar Selection
const DateInput = ({ id, value, onChange, placeholder = "YYYY-MM-DD", className = "" }) => {
  const hiddenInputRef = useRef(null);

  const handleIconClick = () => {
    if (hiddenInputRef.current) {
      try {
        if (typeof hiddenInputRef.current.showPicker === 'function') {
          hiddenInputRef.current.showPicker();
        } else {
          hiddenInputRef.current.click();
        }
      } catch (e) {
        hiddenInputRef.current.click();
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className={className}
      />
      <button
        type="button"
        onClick={handleIconClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-text/40 hover:text-ocean transition-colors cursor-pointer flex items-center justify-center"
        aria-label="Open calendar"
      >
        <Calendar size={15} />
      </button>
      {/* Hidden native date input to trigger calendar picker */}
      <input
        ref={hiddenInputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute pointer-events-none opacity-0 w-0 h-0 bottom-0 right-0"
      />
    </div>
  );
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border border-sand/40 rounded-2xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-sand-light transition-colors duration-200"
      aria-expanded={isOpen}
    >
      <span className="font-sans font-semibold text-sm text-dark-text pr-4">{question}</span>
      <ChevronDown 
        size={18} 
        className={`text-ocean flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="px-6 py-4 bg-sand-light text-dark-text/70 text-sm font-light leading-relaxed border-t border-sand/30">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

function App() {
  // Page Loading State
  const [isLoading, setIsLoading] = useState(true);
  
  // Header state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Booking Form state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('Super Deluxe Room');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, submitting, success
  
  // Testimonial Carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Accommodations Showcase state
  const [activeSanctuaryIdx, setActiveSanctuaryIdx] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  // Dining Slideshow state
  const [activeDiningImgIdx, setActiveDiningImgIdx] = useState(0);
  const diningImages = ['/pool-1.jpeg', '/pool-2.jpeg', '/pool-3.jpeg', '/pool-4.jpeg'];

  // Mouse Position for glow effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs for animations
  const statsSectionRef = useRef(null);
  const heroImageRef = useRef(null);

  // Gallery 3D state
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation dynamic classes
  const navBgClass = isScrolled 
    ? 'top-4 py-3 bg-white/85 backdrop-blur-lg border border-sand/40 shadow-lg w-[85%] max-w-6xl rounded-[30px]' 
    : 'top-0 py-6 bg-transparent border-transparent shadow-none w-full px-6 md:px-12 rounded-none';
  const navTextClass = isScrolled ? 'text-dark-text/85' : 'text-white/90';
  const navTextHoverClass = isScrolled ? 'hover:text-ocean' : 'hover:text-[#B8E0E0]';
  const navUnderlineClass = isScrolled ? 'bg-ocean' : 'bg-[#B8E0E0]';
  const navBrandClass = isScrolled ? 'text-dark-text' : 'text-white';
  const navSubClass = isScrolled ? 'text-ocean' : 'text-[#B8E0E0]';
  const navHamburgerClass = isScrolled ? 'text-dark-text hover:text-ocean' : 'text-white hover:text-[#B8E0E0]';

  const galleryItems = [
    {
      id: "best-resort",
      num: "01",
      title: "Best Resort in Cherai",
      image: "/explore/best-resort-in-cherai.jpg",
      desc: "Experience top-tier hospitality and scenic beauty at one of the finest resorts in the Cherai region."
    },
    {
      id: "cherai-night",
      num: "02",
      title: "Cherai Night View",
      image: "/explore/cherai-nigh-view.jpg",
      desc: "Marvel at the spectacular and peaceful nocturnal landscape of Cherai, sparkling under the stars."
    },
    {
      id: "couple-friendly",
      num: "03",
      title: "Couple Friendly Stays",
      image: "/explore/couple-friendly-resort-cherai.jpg",
      desc: "A cozy and intimate environment, perfect for couples looking for a romantic retreat."
    },
    {
      id: "couples-resort",
      num: "04",
      title: "Romantic Getaways",
      image: "/explore/couples-resort-in-cherai.jpg",
      desc: "Create unforgettable memories with premium services designed for romantic getaways."
    },
    {
      id: "kids-friendly",
      num: "05",
      title: "Kids Friendly Spaces",
      image: "/explore/kids-friendly-resort-in-cherai.jpg",
      desc: "Fun and safe environments for children to play, making it the perfect destination for family holidays."
    },
    {
      id: "night-life",
      num: "06",
      title: "Cherai Night Life",
      image: "/explore/night-life-in-cherai.jpg",
      desc: "Experience the calming yet vibrant night life around the resort and coastal areas."
    },
    {
      id: "night-resort",
      num: "07",
      title: "Resort at Night",
      image: "/explore/night-resort-in-cherai.jpg",
      desc: "Enjoy the beautifully lit resort property, offering a serene and magical atmosphere after sunset."
    },
    {
      id: "pool-river",
      num: "08",
      title: "Riverside Pool",
      image: "/explore/pool-near-river.jpg",
      desc: "Take a dip in our pool situated right next to the peaceful river, combining luxury and nature."
    },
    {
      id: "pool-view",
      num: "09",
      title: "Pool View to River",
      image: "/explore/pool-view-to-river.jpg",
      desc: "Relax by the poolside while enjoying the stunning, uninterrupted views of the calm river waters."
    },
    {
      id: "premium-resort",
      num: "10",
      title: "Premium Amenities",
      image: "/explore/primiume-resort-in-cherai.jpg",
      desc: "Indulge in premium facilities and high-end services crafted to make your stay extraordinary."
    },
    {
      id: "river-sea-view",
      num: "11",
      title: "River & Sea Views",
      image: "/explore/river-view-and-sea-view-reosrt-cherai.jpg",
      desc: "A unique location offering the best of both worlds with breathtaking views of the river and the sea."
    },
    {
      id: "resort-near-beach",
      num: "12",
      title: "Beach & River Proximity",
      image: "/explore/resort-near-cherai-beach-and-river.jpg",
      desc: "Conveniently located near both the pristine Cherai Beach and the peaceful backwater river."
    },
    {
      id: "river-view",
      num: "13",
      title: "Tranquil River Views",
      image: "/explore/river-view-resort-in-cherai.jpg",
      desc: "Soak in the calming vistas of the winding river directly from the comfort of our resort."
    },
    {
      id: "south-indian-food",
      num: "14",
      title: "South Indian Delicacies",
      image: "/explore/sounth-indian-food-in-cherai.jpg",
      desc: "Savor authentic South Indian and traditional Kerala dishes prepared by our expert chefs."
    },
    {
      id: "top-resort",
      num: "15",
      title: "Top Resort Experience",
      image: "/explore/top-5-resort-in-cherai.jpg",
      desc: "Consistently rated as one of the top resorts in Cherai for cleanliness, service, and location."
    }
  ];

  // Scroll Progress calculations for parallax
  const { scrollY, scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 800], [0, 300]);

  // Accommodations data
  const accommodations = [
    {
      id: "super-deluxe",
      title: "Super Deluxe Room",
      image: "/super-deluxe.jpeg",
      size: "55 sq m",
      capacity: "Up to 2 Guests",
      price: "",
      description: "Our most spacious room, perfect for couples or solo travelers seeking the finest comfort in Cherai. Enjoy premium furnishings, a king bed, high speed WiFi, and a relaxing ambiance just minutes from Cherai Beach and the backwaters of Vypin Island.",
      tags: ["King Bed", "High Speed WiFi", "Scenic Surroundings"]
    },
    {
      id: "lake-view-deluxe",
      title: "Lake View Premium Deluxe",
      image: "/lake-view-deluxe.jpeg",
      size: "50 sq m",
      capacity: "Up to 2 Guests",
      price: "",
      description: "Wake up to breathtaking backwater views from your window. Our Lake View Deluxe Room is ideal for couples and nature lovers who want to experience Kerala's iconic backwater landscapes from the comfort of a well-appointed room in Cherai.",
      tags: ["Backwater View", "Couple Friendly", "Morning Serenity"]
    },
    {
      id: "deluxe",
      title: "Deluxe Room",
      image: "/deluxe.jpeg",
      size: "40 sq m",
      capacity: "Up to 2 Guests",
      price: "",
      description: "A beautifully designed room offering modern comforts in a peaceful Cherai setting. Ideal for weekend getaways from Kochi, family trips, or couple stays. Enjoy garden views, rain shower, and easy access to our swimming pool and resort facilities.",
      tags: ["Garden View", "Rain Shower", "Pool Access"]
    },
    {
      id: "deluxe-double",
      title: "Deluxe Double Sharing Room",
      image: "/deluxe-double.jpeg",
      size: "45 sq m",
      capacity: "Up to 2 Guests",
      price: "",
      description: "Our most value friendly option, a cozy well-furnished room perfect for friends, siblings, or budget-conscious families visiting Cherai. Twin beds, thoughtful amenities, and access to all resort facilities including the swimming pool and dining at Joe's Cuisine.",
      tags: ["Twin Beds", "Family Friendly", "Best Value"]
    }
  ];

  const amenities = [
    { name: "Swimming Pool", icon: Waves, desc: "Take a refreshing dip in our resort pool. A perfect escape from the coastal heat of Cherai." },
    { name: "Kayaking", icon: Activity, desc: "Explore the calm backwaters of Vypin Island by kayak. Arrangements available for all experience levels." },
    { name: "Event Hall", icon: Building2, desc: "A dedicated event hall for birthday parties, anniversaries, engagements, corporate meetings, and family gatherings in Cherai." },
    { name: "Bird Watching", icon: Bird, desc: "Vypin Island is home to rich birdlife. Enjoy guided bird watching experiences right from our resort." },
    { name: "Restaurant", icon: UtensilsCrossed, desc: "Authentic Kerala and South Indian cuisine at Joe's Cuisine. Fresh seafood, traditional breakfast, and family dining." },
    { name: "Free WiFi", icon: Wifi, desc: "Seamless high speed internet coverage across all areas of our Cherai resort." },
    { name: "Free Parking", icon: Car, desc: "Complimentary parking available for all resort guests. Easy hassle free arrival from Kochi and beyond." },
    { name: "Celebrations", icon: PartyPopper, desc: "Birthday celebrations, anniversary dinners, and special occasion arrangements made memorable at La Estuaire." }
  ];

  const testimonials = [
    {
      name: "Adam",
      location: "Verified Guest",
      initials: "A",
      rating: 5,
      text: "La Estuaire exceeded all of my expectations during my recent stay. The resort's serene ambiance, coupled with its impeccable amenities and breathtaking views, made for an unforgettable experience. Whether I was lounging by the pool or enjoying the backwater views, every moment felt like a dream. Without a doubt, La Estuaire is among the best resorts in Cherai Beach, and I would highly recommend it to anyone looking for a comfortable retreat near Kochi."
    },
    {
      name: "John",
      location: "Verified Guest",
      initials: "J",
      rating: 5,
      text: "As a frequent traveler, I've had the opportunity to stay at many resorts around the world, and I can confidently say that La Estuaire ranks among the best. From the moment I arrived, I was impressed by the resort's attention to detail and commitment to guest satisfaction. The staff was attentive and friendly, and the location was simply breathtaking. If you're looking for the ultimate beach getaway in Cherai near Kochi, look no further than La Estuaire."
    },
    {
      name: "Antony",
      location: "Verified Guest",
      initials: "A",
      rating: 5,
      text: "I recently celebrated my anniversary at La Estuaire, and it was truly a magical experience. The resort's romantic ambiance, coupled with its stunning backwater setting and proximity to Cherai Beach, was perfect. From the moment we arrived, we were greeted warmly, setting the tone for a weekend of relaxation and romance. Without a doubt, La Estuaire is one of the best resorts in Cherai Beach, and I can't wait to return for another unforgettable stay."
    },
    {
      name: "Rachel",
      location: "Verified Guest",
      initials: "R",
      rating: 5,
      text: "I cannot speak highly enough of my experience at La Estuaire. From the moment I stepped foot onto the property, I was enveloped in a sense of tranquility and warmth. The accommodations were beautifully appointed, the staff attentive and friendly, and the views of the backwaters simply breathtaking. La Estuaire truly exceeded all of my expectations and stands as one of the best resorts in Cherai, Kochi, Kerala. I can't wait to return for another unforgettable stay."
    },
    {
      name: "David",
      location: "Verified Guest",
      initials: "D",
      rating: 5,
      text: "My recent stay at La Estuaire was nothing short of magical. The resort's serene ambiance, coupled with its beautiful backwater views and just 500 metres from Cherai Beach, made for the perfect backdrop to my vacation. From pool sessions to delicious meals at Joe's Cuisine and kayaking in the backwaters, every moment was a delight. La Estuaire is a true gem in Cherai, and I would highly recommend it to anyone looking for a retreat in Kerala."
    }
  ];

  // FAQ data - SEO-focused
  const faqs = [
    {
      question: "Which is the best resort in Cherai near the beach?",
      answer: "La Estuaire Cherai is widely regarded as one of the best resorts in Cherai. We are a boutique beach and backwater resort located just 500 metres from Cherai Beach on Vypin Island, Kochi. Our resort offers a swimming pool, restaurant, event hall, kayaking, and comfortable rooms for families, couples, and corporate guests."
    },
    {
      question: "How far is La Estuaire Cherai from Cherai Beach?",
      answer: "La Estuaire Cherai is located just 500 metres from Cherai Beach. You can easily walk to the beach from our resort in a few minutes. We are also close to Kuzhippally Beach, making us one of the most conveniently located resorts near multiple beaches in the Cherai area."
    },
    {
      question: "Does La Estuaire Cherai have a swimming pool?",
      answer: "Yes! La Estuaire Cherai has a well-maintained swimming pool available for all resort guests. The pool is set amidst lush tropical greenery and is perfect for a refreshing dip during your stay in Cherai. It's one of the highlights of our resort experience."
    },
    {
      question: "Does La Estuaire Cherai have an event hall?",
      answer: "Yes, La Estuaire Cherai has a dedicated event hall available for various occasions including birthday parties, anniversary celebrations, engagements, corporate meetings, and family gatherings. Our team will help you customize the setup to make your event memorable in Cherai."
    },
    {
      question: "Can I celebrate a birthday party at La Estuaire Cherai?",
      answer: "Absolutely! La Estuaire Cherai is one of the popular birthday party and celebration venues in Cherai. Our event hall and outdoor spaces can be arranged for birthday celebrations with personalized decor, special menus from Joe's Cuisine, and a warm, festive atmosphere. Contact us to plan your birthday event."
    },
    {
      question: "Is La Estuaire Cherai family friendly?",
      answer: "Yes, La Estuaire Cherai is a family-friendly resort. We offer spacious rooms accommodating families, a swimming pool, authentic South Indian dining, free parking, and a welcoming environment for guests of all ages. Our Deluxe Double Sharing Room and Deluxe Room are popular choices for family stays."
    },
    {
      question: "Is La Estuaire Cherai couple friendly?",
      answer: "Yes, La Estuaire Cherai is a couple-friendly resort. Our Lake View Premium Deluxe and Super Deluxe rooms are popular with couples. The romantic backwater views, peaceful ambiance, proximity to Cherai Beach, and personalized hospitality make La Estuaire an ideal couple getaway near Kochi."
    },
    {
      question: "Is parking available at La Estuaire Cherai?",
      answer: "Yes, La Estuaire Cherai offers free parking for all resort guests. You can drive down from Kochi, Ernakulam, Thrissur, or anywhere in Kerala and park your vehicle safely at our resort premises."
    },
    {
      question: "Does La Estuaire Cherai offer kayaking?",
      answer: "Yes! La Estuaire Cherai offers kayaking arrangements in the Cherai backwaters. The calm backwaters of Vypin Island are perfect for kayaking, allowing you to explore the natural waterways at your own pace. Bird watching opportunities are also available in the area."
    },
    {
      question: "What are the nearby attractions to La Estuaire Cherai?",
      answer: "La Estuaire Cherai is conveniently located near several key attractions. Cherai Beach (500m), Kuzhippally Beach (5 min), Munambam Harbour (15 min), Vypin Island backwaters (on-site access), Fort Kochi (30 min), Marine Drive Kochi (45 min), and Cochin International Airport (approx. 35 km)."
    },
    {
      question: "What type of food is served at La Estuaire Cherai?",
      answer: "Joe's Cuisine, our in-house restaurant, serves authentic Kerala and South Indian cuisine. The menu features fresh seafood, traditional Kerala breakfast, vegetarian and non-vegetarian South Indian dishes, and a range of beverages. We also accommodate special dietary requests for guests."
    },
    {
      question: "How many rooms does La Estuaire Cherai have?",
      answer: "La Estuaire Cherai is a boutique resort with 7 carefully designed rooms. Our room categories include Super Deluxe Room, Lake View Premium Deluxe, Deluxe Room, and Deluxe Double Sharing Room, suitable for couples, families, and solo travelers."
    },
    {
      question: "Is La Estuaire a good resort for a weekend getaway from Kochi?",
      answer: "Yes! La Estuaire Cherai is one of the top resorts for a weekend getaway from Kochi. Located just 30 to 45 minutes from Ernakulam via the Vypin Island ferry or road, our resort offers a peaceful escape with beach access, backwater views, swimming pool, kayaking, and authentic Kerala dining. Perfect for a 2 night or 3 night stay."
    },
    {
      question: "Can corporate teams stay or host meetings at La Estuaire Cherai?",
      answer: "Yes, La Estuaire Cherai welcomes corporate groups. Our event hall is available for corporate meetings, offsite sessions, and team retreats. Combined with comfortable room accommodations, authentic dining, and activities like kayaking and bird watching, we offer a refreshing corporate retreat experience near Kochi."
    },
    {
      question: "How can I book a stay or inquire at La Estuaire Cherai?",
      answer: "You can book your stay at La Estuaire Cherai by filling out the reservation form on this website, or by contacting us directly via WhatsApp at +91 9567758080 or email at Laestuaire@gmail.com. Our team typically responds within a few hours to confirm availability and assist with your booking."
    }
  ];

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);
    
    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);

    // Disable initial loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Track mouse movement for glow overlay
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll trigger for header shadow & transparent state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Counter Animations
  useEffect(() => {
    if (isLoading) return;

    const stats = [
      { id: '#stat-years', target: 3, suffix: '+' },
      { id: '#stat-guests', target: 1000, suffix: '+' },
      { id: '#stat-bookings', target: 600, suffix: '+' },
      { id: '#stat-satisfaction', target: 99, suffix: '%' }
    ];

    stats.forEach(stat => {
      const el = document.querySelector(stat.id);
      if (el) {
        gsap.fromTo(el,
          { textContent: "0" },
          {
            textContent: stat.target.toString(),
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true
            },
            snap: { textContent: 1 },
            onUpdate: function() {
              el.innerHTML = Math.ceil(this.targets()[0].textContent) + stat.suffix;
            }
          }
        );
      }
    });
  }, [isLoading]);

  // Testimonial Autoplay Carousel Hook
  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  // Booking action: select room & scroll
  const handleSelectRoom = (roomName) => {
    setRoomType(roomName);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextSanctuary = () => {
    setActiveSanctuaryIdx((prev) => (prev + 1) % accommodations.length);
  };

  const handlePrevSanctuary = () => {
    setActiveSanctuaryIdx((prev) => (prev - 1 + accommodations.length) % accommodations.length);
  };

  // Auto-slide for room carousel - pauses on hover
  useEffect(() => {
    if (isSliderHovered) return;
    const interval = setInterval(() => {
      setActiveSanctuaryIdx((prev) => (prev + 1) % accommodations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isSliderHovered, accommodations.length]);

  // Auto-slide for dining images slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDiningImgIdx((prev) => (prev + 1) % diningImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide for 3D curved gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGalleryIdx((prev) => (prev + 1) % galleryItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [galleryItems.length]);

  // Booking action: scroll to booking
  const handleSelectOffer = (targetRoom) => {
    setRoomType(targetRoom);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Booking Form Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus('submitting');
    
    // Construct WhatsApp message with dates, guests, and room type
    const message = `Hello, I would like to request a reservation at La Estuaire Cherai.\n\n` +
      `Check In: ${checkIn}\n` +
      `Check Out: ${checkOut}\n` +
      `Guests: ${guests}\n` +
      `Preferred Room: ${roomType}` +
      (specialRequests ? `\nSpecial Requests: ${specialRequests}` : '');
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919567758080?text=${encodedMessage}`;
    
    setTimeout(() => {
      setBookingStatus('success');
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="relative font-sans antialiased text-dark-text bg-white selection:bg-sand selection:text-dark-text">
      
      {/* 1. Page Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <ResortLogo className="h-20 w-20 text-ocean animate-float" />
              <h1 className="mt-4 font-display text-2xl font-light tracking-[0.3em] uppercase text-ocean">LA ESTUAIRE</h1>
              <p className="mt-1 text-xs tracking-[0.4em] uppercase text-sand-dark">Cherai, Kerala</p>
              <div className="mt-8 h-[2px] w-24 overflow-hidden bg-sand-light rounded-full">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="h-full w-12 bg-ocean rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Top Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-ocean origin-left z-50" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* 3. Mouse Following Subtle Glow Layer */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-50 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 107, 143, 0.04), transparent 80%)`
        }}
      />

      {/* 4. Floating Header Navigation */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 right-0 mx-auto z-40 transition-all duration-500 ${navBgClass}`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 w-full">
          {/* Mobile Header Layout */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <a href="#" className="flex items-center gap-2 group">
              <ResortLogo className="h-9 w-9 group-hover:rotate-12 transition-transform duration-500" />
              <div className="flex flex-col leading-none">
                <span className={`font-display text-sm font-light tracking-[0.2em] transition-colors duration-300 ${navBrandClass}`}>LA ESTUAIRE</span>
                <span className={`text-[0.55rem] tracking-[0.35em] font-medium mt-0.5 transition-colors duration-300 ${navSubClass}`}>CHERAI</span>
              </div>
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${navHamburgerClass}`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop Header Layout */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Left Nav links */}
            <div className="flex items-center gap-8 justify-end w-[42%]">
              {['About', 'Gallery'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className={`font-sans font-semibold text-[10px] tracking-widest uppercase transition-colors duration-300 relative group ${navTextClass} ${navTextHoverClass}`}
                >
                  {item}
                  <span className={`absolute bottom-[-4px] left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${navUnderlineClass}`} />
                </a>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex items-center justify-center w-[16%]">
              <a href="#" className="flex flex-col items-center gap-1 group text-center">
                <ResortLogo className="h-8 w-8 group-hover:rotate-12 transition-transform duration-500" />
                <div className="flex flex-col leading-none items-center">
                  <span className={`font-display text-xs font-light tracking-[0.2em] transition-colors duration-300 ${navBrandClass}`}>LA ESTUAIRE</span>
                  <span className={`text-[0.45rem] tracking-[0.3em] font-medium mt-0.5 transition-colors duration-300 ${navSubClass}`}>CHERAI</span>
                </div>
              </a>
            </div>

            {/* Right Nav links & CTA */}
            <div className="flex items-center gap-8 justify-start w-[42%]">
              {['Dining', 'Portfolio'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className={`font-sans font-semibold text-[10px] tracking-widest uppercase transition-colors duration-300 relative group ${navTextClass} ${navTextHoverClass}`}
                >
                  {item}
                  <span className={`absolute bottom-[-4px] left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${navUnderlineClass}`} />
                </a>
              ))}
              <a 
                href="https://wa.me/919567758080?text=Hello%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20La%20Estuaire%20Cherai."
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-5 py-2 rounded-full bg-ocean hover:bg-ocean-dark text-dark-text hover:text-white text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-40 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-12">
                <span className="font-display font-light tracking-[0.2em] text-dark-text">LA ESTUAIRE</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 hover:text-ocean"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {['About', 'Gallery', 'Dining', 'Portfolio', 'Booking'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans text-sm font-semibold tracking-wider uppercase text-dark-text hover:text-ocean border-b border-light-gray pb-2 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <a 
                href="https://wa.me/919567758080?text=Hello%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20La%20Estuaire%20Cherai."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-ocean text-dark-text hover:text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-ocean-dark transition-colors"
              >
                Book Your Stay
              </a>
              <p className="text-center text-xs text-dark-text/40">Cherai Beach Rd, Vypin Island, Kochi</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Hero Section */}
      <section id="hero" className="relative h-screen w-full overflow-hidden bg-white" aria-label="La Estuaire Cherai - Best Resort in Cherai">
        {/* Background Video Container */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className="w-full h-full object-cover select-none pointer-events-none"
            aria-hidden="true"
          >
            <source src="/Keep_the_exact_same_video_comp.mp4" type="video/mp4" />
          </video>
          {/* Bottom black fade gradient to blend seamlessly into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-black to-transparent pointer-events-none" />
          {/* Resort logo overlay */}
          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3 bg-black/45 backdrop-blur-md px-5 py-3.5 rounded-full border border-white/10 shadow-lg select-none pointer-events-none">
            <ResortLogo className="h-11 w-11" />
            <div className="flex flex-col leading-none text-left">
              <span className="font-display text-[12px] font-light tracking-[0.2em] text-white">LA ESTUAIRE</span>
              <span className="text-[8.5px] tracking-[0.3em] font-medium text-[#B8E0E0] mt-0.5">CHERAI</span>
            </div>
          </div>
          {/* SEO H1 - visually hidden, present for search engines */}
          <div className="absolute inset-0 flex items-end justify-start px-8 md:px-16 pb-32 sm:pb-24 md:pb-20 z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight drop-shadow-lg">
                Best Resort in Cherai<br />
                <span className="font-light text-2xl md:text-3xl text-[#B8E0E0]">Near Beach, Backwaters &amp; Kochi</span>
              </h1>
              {/* <p className="mt-3 text-white/80 text-sm md:text-base font-light max-w-lg drop-shadow">
                A Boutique Beach &amp; Backwater Resort &middot; 500m from Cherai Beach &middot; Vypin Island, Kochi
              </p> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5b. Booking Bar Section - between Hero and About */}
      <section className="relative z-20 w-full bg-white py-8 px-6 border-b border-light-gray shadow-sm" aria-label="Quick Booking">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white border border-ocean/20 rounded-[20px] p-5 shadow-lg w-full text-dark-text">
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end w-full">
                {/* Check In */}
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="widget-check-in" className="text-[9px] font-bold uppercase tracking-wider text-dark-text/80">Check In</label>
                  <DateInput
                    id="widget-check-in"
                    value={checkIn}
                    onChange={setCheckIn}
                    placeholder="YYYY-MM-DD"
                    className="w-full px-4 py-2 pr-10 bg-white border border-ocean/20 rounded-xl text-xs text-dark-text focus:outline-none focus:border-ocean-dark transition-all"
                  />
                </div>

                {/* Check Out */}
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="widget-check-out" className="text-[9px] font-bold uppercase tracking-wider text-dark-text/80">Check Out</label>
                  <DateInput
                    id="widget-check-out"
                    value={checkOut}
                    onChange={setCheckOut}
                    placeholder="YYYY-MM-DD"
                    className="w-full px-4 py-2 pr-10 bg-white border border-ocean/20 rounded-xl text-xs text-dark-text focus:outline-none focus:border-ocean-dark transition-all"
                  />
                </div>

                {/* Guests */}
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="widget-guests" className="text-[9px] font-bold uppercase tracking-wider text-dark-text/80">Guests</label>
                  <select
                    id="widget-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-ocean/20 rounded-xl text-xs text-dark-text focus:outline-none focus:border-ocean-dark transition-all cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                {/* Room Type */}
                <div className="flex flex-col gap-1 text-left">
                  <label htmlFor="widget-room-type" className="text-[9px] font-bold uppercase tracking-wider text-dark-text/80">Room Type</label>
                  <select
                    id="widget-room-type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-ocean/20 rounded-xl text-xs text-dark-text focus:outline-none focus:border-ocean-dark transition-all cursor-pointer"
                  >
                    <option value="Super Deluxe Room">Super Deluxe Room</option>
                    <option value="Lake View Premium Deluxe">Lake View Premium Deluxe</option>
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Deluxe Double Sharing Room">Deluxe Double Sharing Room</option>
                  </select>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-ocean hover:bg-ocean-dark text-dark-text hover:text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Book Now</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FACILITIES Section */}
      <section id="facilities" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12 border-b border-light-gray" aria-label="Resort Facilities">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-ocean" />
            <span className="text-ocean text-xs font-semibold tracking-[0.2em] uppercase">FACILITIES</span>
            <span className="w-12 h-[1px] bg-ocean" />
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.5rem] font-medium leading-tight tracking-tight text-dark-text max-w-2xl">
            Why Choose La Estuaire: Best Pool Resort in Cherai
          </h2>

          <p className="text-dark-text/70 text-sm md:text-[0.95rem] font-light leading-relaxed max-w-xl mb-4">
            La Estuaire Cherai offers a complete resort experience: swimming pool, kayaking, event hall, authentic Kerala dining, backwater views, and warm personalized hospitality, all just 500 metres from Cherai Beach on Vypin Island.
          </p>

          {/* List of facilities - centered grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-left mt-2">
            {amenities.map((facility, index) => (
              <div key={index} className="flex gap-3 items-start bg-sand-light p-4 rounded-2xl border border-ocean/5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-ocean/15 flex items-center justify-center text-ocean flex-shrink-0 mt-0.5">
                  <facility.icon size={14} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-dark-text/90 text-xs sm:text-sm font-semibold">{facility.name}</span>
                  <span className="text-dark-text/60 text-xs font-light leading-snug">{facility.desc}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Internal links to landing pages */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a href="/pool-resort-in-cherai" className="text-xs font-semibold text-ocean hover:text-ocean-dark underline underline-offset-2 transition-colors">Pool Resort in Cherai &rarr;</a>
            <span className="text-dark-text/20">|</span>
            <a href="/event-hall-in-cherai" className="text-xs font-semibold text-ocean hover:text-ocean-dark underline underline-offset-2 transition-colors">Event Hall in Cherai &rarr;</a>
            <span className="text-dark-text/20">|</span>
            <a href="/resort-near-cherai-beach" className="text-xs font-semibold text-ocean hover:text-ocean-dark underline underline-offset-2 transition-colors">Resort Near Cherai Beach &rarr;</a>
          </div>
        </div>
      </section>

      {/* 6. About Section - Our Heritage */}
      <section id="about" className="relative w-full scroll-mt-12 overflow-hidden flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]" aria-label="Our Heritage - La Estuaire Cherai">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/ChatGPT Image Jun 6, 2026, 07_34_50 PM.png" 
            alt="La Estuaire Cherai - boutique backwater resort on Vypin Island, Kochi" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        </div>
        
        {/* Content overlay - centred */}
        <div className="relative z-10 flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl text-white flex flex-col items-center gap-5 text-center"
          >
            {/* Eyebrow label */}
            <span className="text-[#B8E0E0] text-[10px] font-bold tracking-[0.5em] uppercase">
              Our Heritage
            </span>

            {/* Headline */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-white">
              A Hidden Escape<br />
              <span className="font-normal">Between Sea &amp; Backwaters</span>
            </h2>

            {/* Thin decorative rule */}
            <div className="flex items-center gap-3 my-1">
              <div className="w-10 h-[1px] bg-white/40" />
              <div className="w-2 h-2 rounded-full bg-[#B8E0E0]" />
              <div className="w-10 h-[1px] bg-white/40" />
            </div>

            {/* Body paragraphs */}
            <p className="text-white/85 text-sm md:text-[0.95rem] leading-relaxed font-light max-w-lg">
              Nestled on Vypin Island, where the Arabian Sea meets Kerala's serene backwaters, La Estuaire Cherai is a boutique resort just 500 metres from Cherai Beach. We offer a perfect escape for families, couples, and weekend travelers from Kochi seeking comfort, nature, and coastal charm.
            </p>
            <p className="text-white/85 text-sm md:text-[0.95rem] leading-relaxed font-light max-w-lg">
              Whether you're planning a romantic couple getaway, a family vacation, a monsoon escape, or a quick weekend trip from Kochi, La Estuaire Cherai welcomes you with 7 beautiful rooms, a swimming pool, kayaking, and heartfelt Kerala hospitality.
            </p>

            {/* CTA */}
            <div className="pt-3">
              <a
                href="https://wa.me/919567758080?text=Hello%2C%20I%20would%20like%20to%20reserve%20an%20experience%20at%20La%20Estuaire%20Cherai."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-3.5 border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm"
              >
                <span>Reserve Your Experience</span>
                <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats bar pinned at the bottom of this section */}
        <div
          ref={statsSectionRef}
          className="relative z-10 w-full bg-black/60 backdrop-blur-sm border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10"
        >
          {[
            { id: 'stat-years', label: 'Years of Hospitality', note: 'Delivering memorable stays with personalized service and authentic Kerala warmth.' },
            { id: 'stat-guests', label: 'Happy Guests', note: 'Welcoming guests from across India and around the world to Cherai.' },
            { id: 'stat-bookings', label: 'Events Hosted', note: 'Creating unforgettable celebrations, gatherings, and special occasions in Cherai.' },
            { id: 'stat-satisfaction', label: 'Guest Satisfaction', note: 'Driven by exceptional experiences, comfort, and dedicated guest care.' },
          ].map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-6 py-8 gap-1"
            >
              <h3 id={stat.id} className="font-sans text-3xl md:text-4xl font-light text-[#B8E0E0] tracking-tight">0</h3>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/60">{stat.label}</p>
              <p className="text-xs text-white/40 font-light leading-relaxed max-w-[180px]">{stat.note}</p>
            </motion.div>
          ))}
        </div>

      </section>

      {/* WHY STAY IN CHERAI Section */}
      <section id="why-cherai" className="py-12 md:py-16 px-6 md:px-12 bg-sand-light scroll-mt-12 border-b border-light-gray" aria-label="Why Stay in Cherai">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-ocean" />
              <span className="text-ocean text-xs font-semibold tracking-[0.2em] uppercase">Why Cherai</span>
              <span className="w-12 h-[1px] bg-ocean" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-dark-text mb-4">
              Why Stay in Cherai, Vypin Island?
            </h2>
            <p className="text-dark-text/70 text-sm font-light leading-relaxed">
              Cherai is Kerala's most treasured coastal escape, a narrow strip of paradise where the Arabian Sea meets the backwaters on Vypin Island, just 30 minutes from Kochi. Here's why thousands of travelers choose Cherai every year.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Beach & Backwater Together",
                desc: "Cherai is one of Kerala's rare destinations where you can experience both the Arabian Sea beach and serene backwaters within minutes of each other. A unique dual coastal experience."
              },
              {
                title: "Close to Kochi",
                desc: "Located just 30 to 45 minutes from Ernakulam (Kochi), Cherai is the perfect quick escape for a weekend getaway without long travel. Accessible via the Vypin Island road."
              },
              {
                title: "Peaceful & Uncrowded",
                desc: "Unlike crowded tourist hotspots, Cherai remains refreshingly peaceful and unhurried. Ideal for families, couples, and solo travelers seeking genuine relaxation in Kerala."
              },
              {
                title: "Rich Birdlife & Nature",
                desc: "Vypin Island's backwaters and wetlands are home to a rich variety of migratory and resident birds, making Cherai a paradise for bird watchers and nature lovers."
              },
              {
                title: "Monsoon Magic",
                desc: "Cherai's monsoon season (June to September) transforms the landscape into lush green beauty. The best time to experience Kerala's backwaters in their full glory."
              },
              {
                title: "Authentic Kerala Culture",
                desc: "Experience authentic Kerala culture, traditional food, local fishing villages, and warm hospitality. A genuine slice of Kerala life on Vypin Island, Kochi."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-ocean/10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-ocean/15 flex items-center justify-center text-ocean mb-4">
                  <Sparkles size={14} />
                </div>
                <h3 className="font-sans font-semibold text-sm text-dark-text mb-2">{item.title}</h3>
                <p className="text-dark-text/65 text-xs font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="/weekend-getaway-near-kochi" className="inline-flex items-center gap-2 text-xs font-bold text-ocean hover:text-ocean-dark uppercase tracking-widest transition-colors">
              Plan Your Weekend Getaway Near Kochi <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Promo Video Section */}
      <section id="promo-video" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12 border-b border-light-gray w-full overflow-hidden" aria-label="Resort Ad Film">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Left: Content Details */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              {/* Eyebrow with Line */}
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-ocean" />
                <span className="text-ocean text-xs font-bold tracking-[0.2em] uppercase">
                  RESORT AD FILM
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-[2.6rem] font-medium leading-tight tracking-tight text-dark-text">
                A Visual Journey of Cherai
              </h2>

              {/* Description */}
              <p className="text-dark-text/70 text-sm md:text-[1rem] font-light leading-relaxed max-w-xl">
                Watch our official resort ad film to catch a glimpse of the beauty, serenity, and experiences that await you at La Estuaire Cherai. From the gentle waves of the Arabian Sea to the calm backwaters of Vypin Island, this is Cherai at its finest.
              </p>

              {/* Bullet Points */}
              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Stunning Cherai beach and backwater views from Vypin Island
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Swimming pool, kayaking, and outdoor resort experiences
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Authentic Kerala &amp; South Indian dining at Joe's Cuisine
                  </span>
                </li>
              </ul>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-3.5 bg-ocean hover:bg-ocean-dark text-dark-text hover:text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Your Stay in Cherai</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right: Video Player */}
            <div className="lg:col-span-7 aspect-video w-full relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg bg-light-gray">
              <video 
                src="/resort-ad-final.mp4" 
                controls 
                playsInline 
                className="w-full h-full object-cover"
                poster="/hero-resort.jpeg"
                aria-label="La Estuaire Cherai Resort Ad Film - Best Resort in Cherai"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. Gallery / Accommodations Section */}
      <section id="gallery" className="pt-12 pb-8 md:pt-16 md:pb-10 bg-white border-y border-light-gray scroll-mt-12 overflow-hidden w-full" aria-label="Rooms & Accommodations">

        {/* Section Header */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-12 h-[1px] bg-ocean" />
              <span className="text-ocean text-xs font-semibold tracking-[0.2em] uppercase">Rooms</span>
              <span className="w-12 h-[1px] bg-ocean" />
            </div>
            <h2 className="font-display text-2xl md:text-[1.9rem] font-normal leading-snug tracking-wide text-dark-text mb-5 uppercase">
              Comfortable Rooms for Families, Couples &amp; Corporate Stays in Cherai
            </h2>
            <p className="text-dark-text/60 text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto">
              Choose from 7 thoughtfully designed rooms. From our spacious Super Deluxe to the scenic Lake View Deluxe, each offering comfort, style, and easy access to our pool, backwaters, and Cherai Beach nearby.
            </p>
          </div>
        </div>

        {/* Center-Focused Slider Component */}
        {(() => {
          const prevIdx = (activeSanctuaryIdx - 1 + accommodations.length) % accommodations.length;
          const activeIdx = activeSanctuaryIdx;
          const nextIdx = (activeSanctuaryIdx + 1) % accommodations.length;

          return (
            <div 
              className="w-full overflow-hidden"
              onMouseEnter={() => setIsSliderHovered(true)}
              onMouseLeave={() => setIsSliderHovered(false)}
            >
              <div className="relative w-full max-w-[1400px] mx-auto px-2">
                {/* Left Arrow Button */}
                <button
                  onClick={handlePrevSanctuary}
                  className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-dark-text/15 hover:border-dark-text/40 bg-white/90 backdrop-blur-sm text-dark-text hover:bg-dark-text hover:text-white flex items-center justify-center transition-all duration-300 z-30 cursor-pointer shadow-md"
                  aria-label="Previous room"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Slider Row */}
                <motion.div 
                  drag={windowWidth < 1024 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => {
                    if (windowWidth >= 1024) return;
                    const swipeThreshold = 50;
                    if (info.offset.x < -swipeThreshold) {
                      handleNextSanctuary();
                    } else if (info.offset.x > swipeThreshold) {
                      handlePrevSanctuary();
                    }
                  }}
                  className="relative flex justify-center items-center gap-3 sm:gap-4 md:gap-6 w-full max-w-[1400px] mx-auto py-4 px-2 select-none touch-pan-y no-scrollbar"
                >
                  {/* Left (Previous) Slide */}
                  <motion.div 
                    layout
                    key={accommodations[prevIdx].id}
                    onClick={handlePrevSanctuary}
                    className="relative w-[15vw] sm:w-[18vw] md:w-[22%] h-[240px] sm:h-[300px] md:h-[400px] lg:h-[480px] rounded-xl overflow-hidden cursor-pointer opacity-50 hover:opacity-75 transition-opacity duration-300 flex-shrink-0 group"
                  >
                    <img 
                      src={accommodations[prevIdx].image} 
                      alt={`${accommodations[prevIdx].title} - La Estuaire Cherai`} 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                    
                    {/* Book Now Button Overlay (Hover only on desktop) */}
                    <div className="absolute inset-0 hidden md:flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRoom(accommodations[prevIdx].title);
                        }}
                        className="px-5 py-2.5 bg-white/95 backdrop-blur-sm text-dark-text hover:bg-ocean hover:text-white rounded-full text-[9px] font-bold tracking-widest uppercase shadow-md transition-all duration-300 cursor-pointer pointer-events-auto"
                      >
                        Book Now
                      </button>
                    </div>
                  </motion.div>

                  {/* Center (Active) Slide */}
                  <motion.div 
                    layout
                    key={accommodations[activeIdx].id}
                    className="relative w-[60vw] sm:w-[54vw] md:w-[50%] h-[240px] sm:h-[300px] md:h-[400px] lg:h-[480px] rounded-xl overflow-hidden shadow-2xl flex-shrink-0 group"
                  >
                    <img 
                      src={accommodations[activeIdx].image} 
                      alt={`${accommodations[activeIdx].title} - Resort in Cherai`} 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    
                    {/* Book Now Button Overlay (Always visible at the bottom) */}
                    <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-8">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRoom(accommodations[activeIdx].title);
                        }}
                        className="px-5 py-2.5 md:px-6 md:py-3 bg-white/95 backdrop-blur-sm text-dark-text hover:bg-ocean hover:text-white rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase shadow-lg transition-all duration-300 cursor-pointer pointer-events-auto flex items-center gap-1.5"
                      >
                        <span>Book Now</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </motion.div>

                  {/* Right (Next) Slide */}
                  <motion.div 
                    layout
                    key={accommodations[nextIdx].id}
                    onClick={handleNextSanctuary}
                    className="relative w-[15vw] sm:w-[18vw] md:w-[22%] h-[240px] sm:h-[300px] md:h-[400px] lg:h-[480px] rounded-xl overflow-hidden cursor-pointer opacity-50 hover:opacity-75 transition-opacity duration-300 flex-shrink-0 group"
                  >
                    <img 
                      src={accommodations[nextIdx].image} 
                      alt={`${accommodations[nextIdx].title} - Cherai Resort Room`} 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                    
                    {/* Book Now Button Overlay (Hover only on desktop) */}
                    <div className="absolute inset-0 hidden md:flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectRoom(accommodations[nextIdx].title);
                        }}
                        className="px-5 py-2.5 bg-white/95 backdrop-blur-sm text-dark-text hover:bg-ocean hover:text-white rounded-full text-[9px] font-bold tracking-widest uppercase shadow-md transition-all duration-300 cursor-pointer pointer-events-auto"
                      >
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNextSanctuary}
                  className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-dark-text/15 hover:border-dark-text/40 bg-white/90 backdrop-blur-sm text-dark-text hover:bg-dark-text hover:text-white flex items-center justify-center transition-all duration-300 z-30 cursor-pointer shadow-md"
                  aria-label="Next room"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Active Room Details Area */}
              <div className="w-full max-w-4xl mx-auto px-6 mt-10 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={accommodations[activeIdx].id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center animate-fade-in"
                  >
                    {/* Title */}
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-widest text-dark-text mb-3">
                      {accommodations[activeIdx].title}
                    </h3>
                    
                    {/* Details Row: Capacity */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold tracking-wider text-sand-dark uppercase mb-4">
                      <span>{accommodations[activeIdx].capacity}</span>
                    </div>

                    {/* Description */}
                    <p className="text-dark-text/70 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                      {accommodations[activeIdx].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          );
        })()}

      </section>

      {/* Dining Section */}
      <section id="dining" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12" aria-label="Joe's Cuisine - Kerala and South Indian Restaurant in Cherai">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Left: Restaurant Image Slideshow */}
            <div className="lg:col-span-7 aspect-[16/10] w-full relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg bg-light-gray">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeDiningImgIdx}
                  src={diningImages[activeDiningImgIdx]} 
                  alt="Joe's Cuisine - Authentic Kerala and South Indian Restaurant at La Estuaire Cherai" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Right: Dining Details */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              {/* Eyebrow with Line */}
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-ocean" />
                <span className="text-ocean text-xs font-bold tracking-[0.2em] uppercase">
                  DINING
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-[2.6rem] font-medium leading-tight tracking-tight text-dark-text">
                Authentic Kerala &amp; South Indian Dining at Joe's Cuisine
              </h2>

              {/* Description */}
              <p className="text-dark-text/70 text-sm md:text-[1rem] font-light leading-relaxed max-w-xl">
                Joe's Cuisine is our restaurant offering an authentic Kerala and South Indian culinary experience. From a traditional Kerala breakfast to freshly prepared seafood and family dinner spreads, every meal is crafted with local ingredients and genuine flavors.
              </p>

              {/* Bullet Points */}
              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Traditional Kerala breakfast, lunch &amp; dinner services
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Fresh seafood, Kerala curries &amp; South Indian specialties
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Vegetarian and non vegetarian options for the whole family
                  </span>
                </li>
              </ul>
              
              <a href="/south-indian-restaurant-in-cherai" className="text-xs font-semibold text-ocean hover:text-ocean-dark underline underline-offset-2 transition-colors inline-flex items-center gap-1">
                South Indian Restaurant in Cherai <ArrowRight size={12} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* EVENTS & CELEBRATIONS Section */}
      <section id="events" className="py-12 md:py-16 px-6 md:px-12 bg-sand-light scroll-mt-12 border-y border-light-gray" aria-label="Event Hall & Birthday Party Venue in Cherai">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-ocean" />
              <span className="text-ocean text-xs font-semibold tracking-[0.2em] uppercase">Events & Celebrations</span>
              <span className="w-12 h-[1px] bg-ocean" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-dark-text mb-4">
              Event Hall &amp; Celebration Venue in Cherai
            </h2>
            <p className="text-dark-text/70 text-sm font-light leading-relaxed">
              La Estuaire Cherai is more than a resort. It's a premier event and celebration destination on Vypin Island. Our dedicated event hall and outdoor spaces are available for a wide range of occasions, from intimate birthday celebrations to corporate retreats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: PartyPopper,
                title: "Birthday Party Hall in Cherai",
                desc: "Celebrate your birthday in style at La Estuaire Cherai. Our event hall can be decorated and customized with your theme, combined with a special menu from Joe's Cuisine and a memorable resort setting."
              },
              {
                icon: Star,
                title: "Anniversaries & Engagements",
                desc: "Mark your special milestones in a beautiful backwater resort setting. We arrange romantic setups, custom dining experiences, and personalized touches to make your anniversary or engagement unforgettable."
              },
              {
                icon: Users,
                title: "Corporate Meetings & Team Retreats",
                desc: "Host your next corporate meeting, offsite, or team retreat at La Estuaire Cherai. Our event hall, comfortable accommodation, and activity options including kayaking make for a productive and refreshing retreat."
              },
              {
                icon: Sparkles,
                title: "Family Gatherings",
                desc: "Reunite with family in a peaceful resort environment. With spacious rooms, a swimming pool, authentic Kerala dining, and backwater surroundings, La Estuaire is perfect for family get-togethers of all sizes."
              },
              {
                icon: Building2,
                title: "Function Hall in Cherai",
                desc: "Our function hall in Cherai accommodates small to medium-sized gatherings. Equipped with basic audio-visual facilities, the space can be arranged for various event formats and celebrations."
              },
              {
                icon: Activity,
                title: "Activities & Experiences",
                desc: "Elevate any event with our additional experiences. Kayaking in the Cherai backwaters, bird watching on Vypin Island, poolside gatherings, and authentic Kerala cuisine at Joe's Cuisine."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-ocean/10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-ocean/15 flex items-center justify-center text-ocean mb-4">
                  <item.icon size={18} />
                </div>
                <h3 className="font-sans font-semibold text-sm text-dark-text mb-2">{item.title}</h3>
                <p className="text-dark-text/65 text-xs font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://wa.me/919567758080?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20event%20bookings%20at%20La%20Estuaire%20Cherai."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ocean hover:bg-ocean-dark text-dark-text hover:text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
            >
              Enquire About Events <ArrowRight size={14} />
            </a>
            <a href="/birthday-party-hall-in-cherai" className="text-xs font-semibold text-ocean hover:text-ocean-dark underline underline-offset-2 transition-colors">
              Birthday Party Hall in Cherai &rarr;
            </a>
            <a href="/event-hall-in-cherai" className="text-xs font-semibold text-ocean hover:text-ocean-dark underline underline-offset-2 transition-colors">
              Event Hall in Cherai &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 3D Curved Gallery Section */}
      <section id="portfolio" className="pt-16 pb-6 md:pt-20 md:pb-16 px-6 md:px-12 bg-white overflow-hidden scroll-mt-12 w-full" aria-label="Resort Gallery">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-10 md:mb-12 flex flex-col items-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-dark-text mb-4">
              Explore La Estuaire Cherai
            </h2>
            <p className="text-dark-text/60 text-xs sm:text-sm font-light leading-relaxed max-w-xl mb-6">
              From Cherai Beach access and backwater views to our swimming pool, kayaking, and Kerala dining, every corner of La Estuaire tells a story.
            </p>
            
            {/* CTA Link with Cohesive Circle */}
            <a 
              href="#booking"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-dark-text hover:text-ocean transition-colors group"
            >
              <span>Book Your Stay in Cherai</span>
              <span className="w-6 h-6 rounded-full bg-ocean flex items-center justify-center text-white text-[10px] group-hover:scale-110 transition-transform">
                &rarr;
              </span>
            </a>
          </div>

          {/* 3D Carousel Slider */}
          {(() => {
            const getCardDimensions = () => {
              if (windowWidth < 480) {
                return { widthClass: "w-[135px]", heightClass: "h-[200px]" };
              }
              if (windowWidth < 768) {
                return { widthClass: "w-[185px]", heightClass: "h-[265px]" };
              }
              if (windowWidth < 1024) {
                return { widthClass: "w-[230px]", heightClass: "h-[320px]" };
              }
              return { widthClass: "w-[280px]", heightClass: "h-[380px]" };
            };
            const { widthClass, heightClass } = getCardDimensions();

            return (
              <div className="relative w-full h-[260px] sm:h-[340px] md:h-[480px] flex items-center justify-center overflow-visible select-none px-4 md:px-12">
                {/* Left Arrow Button */}
                <button
                  onClick={() => setActiveGalleryIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                  className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-dark-text/15 hover:border-dark-text/40 bg-white/90 backdrop-blur-sm text-dark-text hover:bg-dark-text hover:text-white flex items-center justify-center transition-all duration-300 z-30 cursor-pointer shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* 3D Stage Container */}
                <motion.div 
                  drag={windowWidth < 1024 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => {
                    if (windowWidth >= 1024) return;
                    const swipeThreshold = 40;
                    const velocityThreshold = 200;
                    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                      setActiveGalleryIdx((prev) => (prev + 1) % galleryItems.length);
                    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                      setActiveGalleryIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
                    }
                  }}
                  className="relative flex items-center justify-center w-full h-full touch-pan-y"
                  style={{ perspective: 1200, transformStyle: "preserve-3d" }}
                >
                  {galleryItems.map((item, idx) => {
                    const offset = idx - activeGalleryIdx;
                    let circularOffset = offset;
                    const len = galleryItems.length;
                    if (circularOffset < -len / 2) circularOffset += len;
                    if (circularOffset > len / 2) circularOffset -= len;

                    // Calculate responsive 3D transforms (side cards recede back in 3D space)
                    let rotateY = circularOffset * -22;
                    let scale = Math.max(0.4, 1.0 - Math.abs(circularOffset) * 0.12);
                    let z = -Math.abs(circularOffset) * 100;
                    let x = circularOffset * 280;

                    if (windowWidth < 480) {
                      x = circularOffset * 135;
                      z = -Math.abs(circularOffset) * 40;
                      rotateY = circularOffset * -18;
                      scale = Math.max(0.5, 1.0 - Math.abs(circularOffset) * 0.15);
                    } else if (windowWidth < 768) {
                      x = circularOffset * 150;
                      z = -Math.abs(circularOffset) * 60;
                      rotateY = circularOffset * -22;
                      scale = Math.max(0.45, 1.0 - Math.abs(circularOffset) * 0.14);
                    } else if (windowWidth < 1024) {
                      x = circularOffset * 210;
                      z = -Math.abs(circularOffset) * 80;
                      rotateY = circularOffset * -22;
                      scale = Math.max(0.42, 1.0 - Math.abs(circularOffset) * 0.13);
                    }
                    
                    const isActive = circularOffset === 0;
                    const isVisible = Math.abs(circularOffset) <= 2;

                    return (
                      <motion.div
                        key={item.id}
                        drag={windowWidth >= 1024 ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(event, info) => {
                          if (windowWidth < 1024) return;
                          const swipeThreshold = 50;
                          if (info.offset.x < -swipeThreshold) {
                            setActiveGalleryIdx((prev) => (prev + 1) % galleryItems.length);
                          } else if (info.offset.x > swipeThreshold) {
                            setActiveGalleryIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
                          }
                        }}
                        animate={{
                          x: x,
                          z: z,
                          rotateY: rotateY,
                          scale: scale,
                          opacity: isVisible ? (isActive ? 1 : (Math.abs(circularOffset) === 1 ? 0.85 : 0.45)) : 0,
                          zIndex: 10 - Math.abs(circularOffset)
                        }}
                        transition={{ duration: 0.6, ease: [0.32, 0.94, 0.6, 1] }}
                        onClick={() => {
                          if (isVisible) {
                            setActiveGalleryIdx(idx);
                          }
                        }}
                        className={`absolute ${widthClass} ${heightClass} rounded-2xl overflow-hidden shadow-xl cursor-pointer group flex-shrink-0 origin-center`}
                        style={{ 
                          transformStyle: "preserve-3d",
                          pointerEvents: isVisible ? "auto" : "none"
                        }}
                      >
                        {/* Image */}
                        <img 
                          src={item.image} 
                          alt={`${item.title} - La Estuaire Cherai Resort`}
                          className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle dark overlay for inactive cards */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-black/10 transition-colors" />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Right Arrow Button */}
                <button
                  onClick={() => setActiveGalleryIdx((prev) => (prev + 1) % galleryItems.length)}
                  className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-dark-text/15 hover:border-dark-text/40 bg-white/90 backdrop-blur-sm text-dark-text hover:bg-dark-text hover:text-white flex items-center justify-center transition-all duration-300 z-30 cursor-pointer shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })()}

          {/* Active Gallery Item Details Area */}
          <div className="w-full max-w-4xl mx-auto px-6 mt-12 text-center min-h-[90px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryItems[activeGalleryIdx].id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {/* Title */}
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-widest text-dark-text mb-3">
                  {galleryItems[activeGalleryIdx].title}
                </h3>
                
                {/* Description */}
                <p className="text-dark-text/70 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                  {galleryItems[activeGalleryIdx].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* EXPLORE CHERAI Section */}
      <section id="explore-cherai" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12 border-b border-light-gray" aria-label="Explore Cherai - Nearby Attractions">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-ocean" />
              <span className="text-ocean text-xs font-semibold tracking-[0.2em] uppercase">Explore Cherai</span>
              <span className="w-12 h-[1px] bg-ocean" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-dark-text mb-4">
              Nearby Attractions from La Estuaire Cherai
            </h2>
            <p className="text-dark-text/70 text-sm font-light leading-relaxed">
              La Estuaire Cherai is perfectly positioned as your base to explore the best of Cherai, Vypin Island, and the greater Kochi region. Here's what you can discover during your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Cherai Beach",
                distance: "500 metres",
                desc: "One of Kerala's most beautiful beaches, a stunning stretch of golden sand where the Arabian Sea meets the backwaters. Walk there in minutes from La Estuaire Cherai."
              },
              {
                name: "Kuzhippally Beach",
                distance: "5 minutes",
                desc: "A quieter, less crowded beach near Cherai with pristine sands and clear waters. La Estuaire is one of the closest resorts to Kuzhippally Beach on Vypin Island."
              },
              {
                name: "Munambam Harbour",
                distance: "15 minutes",
                desc: "A scenic fishing harbour at the northern tip of Vypin Island where the Periyar River meets the Arabian Sea. Watch traditional Kerala fishing boats and enjoy fresh fish markets."
              },
              {
                name: "Vypin Island Backwaters",
                distance: "On-site",
                desc: "The serene backwaters of Vypin Island are accessible right from our resort. Explore by kayak, spot migratory birds, and experience the peaceful Kerala backwater ecosystem."
              },
              {
                name: "Fort Kochi",
                distance: "30 minutes",
                desc: "Explore the historic charm of Fort Kochi. Chinese fishing nets, colonial architecture, art galleries, spice markets, and the famous Jew Town. A must visit from Cherai."
              },
              {
                name: "Marine Drive, Kochi",
                distance: "45 minutes",
                desc: "The iconic waterfront promenade of Kochi city, perfect for an evening walk, with stunning views of Kochi Harbour, houseboats, and the cityscape of Ernakulam."
              }
            ].map((place, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-sand-light p-6 rounded-2xl border border-ocean/10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-sans font-semibold text-sm text-dark-text">{place.name}</h3>
                  <span className="text-[10px] font-bold text-ocean bg-ocean/10 px-2.5 py-1 rounded-full">{place.distance}</span>
                </div>
                <p className="text-dark-text/65 text-xs font-light leading-relaxed">{place.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="/resort-near-kuzhippally-beach" className="inline-flex items-center gap-2 text-xs font-bold text-ocean hover:text-ocean-dark uppercase tracking-widest transition-colors">
              Resort Near Kuzhippally Beach <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* 10. Testimonial Section */}
      <section className="pt-6 md:pt-16 pb-16 px-6 md:px-12 bg-white overflow-hidden" aria-label="Guest Reviews">
        <div className="max-w-5xl mx-auto relative px-4 md:px-12">
          
          <div className="text-center mb-16">
            <span className="text-ocean text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">Guest Stories</span>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight text-dark-text mb-4">
              Memories from Cherai
            </h2>
            
            {/* Google Rating */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs font-semibold text-dark-text/60">
              <span className="text-amber-500 flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </span>
              <span><strong>4.9 / 5</strong> average rating on TripAdvisor &amp; Google Reviews</span>
            </div>
          </div>

          <div 
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            className="relative bg-sand-light rounded-[24px] md:rounded-[32px] p-5 md:p-16 border border-sand/30 shadow-sm overflow-hidden"
          >
            <div className="absolute top-4 left-4 text-4xl md:top-8 md:left-8 md:text-6xl font-serif text-ocean/15 select-none pointer-events-none">"</div>
            
            <motion.div 
              drag={windowWidth < 1024 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (windowWidth >= 1024) return;
                const swipeThreshold = 40;
                const velocityThreshold = 200;
                if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                  setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
                } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                  setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                }
              }}
              className="min-h-[140px] md:min-h-[160px] flex flex-col justify-between touch-pan-y"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: windowWidth < 1024 ? 40 : 0, y: windowWidth >= 1024 ? 15 : 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: windowWidth < 1024 ? -40 : 0, y: windowWidth >= 1024 ? -15 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <p className="font-sans text-[13px] sm:text-base md:text-lg text-dark-text/80 italic font-normal leading-relaxed mb-4 md:mb-8 pr-4 line-clamp-3 md:line-clamp-none">
                    {testimonials[activeTestimonial].text}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-sand/40 pt-4 md:pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-ocean text-dark-text flex items-center justify-center font-sans font-bold text-xs md:text-sm shadow-sm flex-shrink-0">
                        {testimonials[activeTestimonial].initials}
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-dark-text text-sm md:text-base flex items-center flex-wrap gap-x-2 gap-y-0.5">
                          <span>{testimonials[activeTestimonial].name}</span>
                          <span className="text-amber-500 flex gap-0.5 ml-1">
                            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                              <Star key={i} size={10} fill="currentColor" className="text-amber-500" />
                            ))}
                          </span>
                        </h4>
                        <span className="text-xs text-dark-text/40">{testimonials[activeTestimonial].location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6 md:mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'w-6 bg-ocean' : 'bg-sand-dark/50'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slider Controls */}
            <button 
              onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-ocean hover:text-white flex items-center justify-center text-dark-text shadow-md hover:shadow-lg transition-all duration-300 hidden md:flex"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-ocean hover:text-white flex items-center justify-center text-dark-text shadow-md hover:shadow-lg transition-all duration-300 hidden md:flex"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 px-6 md:px-12 bg-sand-light scroll-mt-12 border-y border-light-gray" aria-label="Frequently Asked Questions">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-[1px] bg-ocean" />
              <span className="text-ocean text-xs font-semibold tracking-[0.2em] uppercase">FAQ</span>
              <span className="w-12 h-[1px] bg-ocean" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight text-dark-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-dark-text/70 text-sm font-light leading-relaxed max-w-xl mx-auto">
              Everything you need to know about staying at La Estuaire Cherai, the best resort near Cherai Beach, Kochi.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIdx === idx}
                onToggle={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-dark-text/60 text-sm font-light mb-4">Still have questions? We're here to help.</p>
            <a
              href="https://wa.me/919567758080?text=Hello%2C%20I%20have%20a%20question%20about%20La%20Estuaire%20Cherai."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:bg-[#20ba59]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 12. Booking Section */}
      <section id="booking" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12" aria-label="Book Your Stay at La Estuaire Cherai">
        <div className="max-w-4xl mx-auto bg-sand-light p-8 md:p-16 rounded-[32px] border border-sand/30 shadow-md">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-ocean text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">Secure Booking</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-dark-text mb-4">
              Book Your Stay at La Estuaire Cherai
            </h2>
            <p className="text-dark-text/60 text-xs md:text-sm font-light">
              Submit your preferred dates and our team will respond within 2 hours to confirm your room at this boutique resort near Cherai Beach, Vypin Island, Kochi.
            </p>
          </div>

          {bookingStatus === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-ocean text-dark-text rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-display text-2xl font-light text-dark-text mb-2">Reservation Request Received</h3>
              <p className="text-dark-text/60 text-sm max-w-md mx-auto mb-8 font-light">
                Thank you for choosing La Estuaire Cherai. We are verifying availability for the <span className="font-semibold text-ocean">{roomType}</span> and will reach out to you shortly on WhatsApp.
              </p>
              <button 
                onClick={() => setBookingStatus('idle')}
                className="px-8 py-3 bg-dark-text text-white hover:bg-ocean rounded-full text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Check In Date */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="check-in" className="text-[10px] font-bold uppercase tracking-wider text-dark-text/70">
                    Check In
                  </label>
                  <DateInput
                    id="check-in"
                    value={checkIn}
                    onChange={setCheckIn}
                    placeholder="YYYY-MM-DD"
                    className="w-full px-5 py-3.5 pr-12 bg-white border border-sand/40 rounded-2xl text-xs text-dark-text focus:outline-none focus:border-ocean transition-colors"
                  />
                </div>

                {/* Check Out Date */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="check-out" className="text-[10px] font-bold uppercase tracking-wider text-dark-text/70">
                    Check Out
                  </label>
                  <DateInput
                    id="check-out"
                    value={checkOut}
                    onChange={setCheckOut}
                    placeholder="YYYY-MM-DD"
                    className="w-full px-5 py-3.5 pr-12 bg-white border border-sand/40 rounded-2xl text-xs text-dark-text focus:outline-none focus:border-ocean transition-colors"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Guests */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="guests" className="text-[10px] font-bold uppercase tracking-wider text-dark-text/70">
                    Guests Count
                  </label>
                  <select 
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white border border-sand/40 rounded-2xl text-xs text-dark-text focus:outline-none focus:border-ocean transition-colors appearance-none cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                {/* Room Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="room-type" className="text-[10px] font-bold uppercase tracking-wider text-dark-text/70">
                    Preferred Room
                  </label>
                  <select 
                    id="room-type"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white border border-sand/40 rounded-2xl text-xs text-dark-text focus:outline-none focus:border-ocean transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Super Deluxe Room">Super Deluxe Room</option>
                    <option value="Lake View Premium Deluxe">Lake View Premium Deluxe</option>
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Deluxe Double Sharing Room">Deluxe Double Sharing Room</option>
                  </select>
                </div>

              </div>

              {/* Special Requests */}
              <div className="flex flex-col gap-2">
                <label htmlFor="special-requests" className="text-[10px] font-bold uppercase tracking-wider text-dark-text/70">
                  Special Requests / Inquiries
                </label>
                <textarea 
                  id="special-requests"
                  rows="3"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="E.g., Birthday celebration setup, event hall booking, kayaking arrangements, dietary preferences..."
                  className="w-full px-5 py-3.5 bg-white border border-sand/40 rounded-2xl text-xs text-dark-text focus:outline-none focus:border-ocean transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={bookingStatus === 'submitting'}
                  className="w-full py-4 bg-ocean hover:bg-ocean-dark text-dark-text hover:text-white rounded-full text-xs font-bold tracking-widest uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {bookingStatus === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-text border-t-transparent rounded-full animate-spin" />
                      Verifying Room Availability...
                    </>
                  ) : (
                    'Submit Reservation Request'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-dark-text text-white py-16 px-6 md:px-12 border-t border-white/5" role="contentinfo">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Logo & Contact details */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ResortLogo className="h-10 w-10 text-sand" />
                <div className="flex flex-col">
                  <span className="font-display text-lg font-light tracking-[0.2em] text-white">LA ESTUAIRE</span>
                  <span className="text-[10px] tracking-[0.3em] text-[#B8E0E0]">CHERAI, KERALA</span>
                </div>
              </div>
              <p className="text-xs font-light text-white/60 leading-relaxed max-w-xs mb-6">
                A boutique beach &amp; backwater resort on Vypin Island, just 500 metres from Cherai Beach. The best resort in Cherai for families, couples, and weekend getaways from Kochi.
              </p>
            </div>

            <div className="space-y-4 text-xs font-light text-white/70">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-sand mb-1">CONTACT &amp; LOCATION</h4>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-sand mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span>Cherai Beach, Cherai P.O Vypin, Kerala, India PIN: 683514</span>
                  <a 
                    href="https://maps.app.goo.gl/2oPK7iH2XtbiTupL8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-ocean hover:text-ocean-light text-[10px] font-semibold tracking-wider uppercase underline transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-sand" />
                <a href="tel:+919567758080" className="hover:text-white transition-colors">+91 9567758080</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-sand" />
                <a href="mailto:Laestuaire@gmail.com" className="hover:text-white transition-colors">Laestuaire@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col justify-start gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-sand mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-2 text-xs font-light text-white/60">
                <a href="/resort-near-cherai-beach" className="hover:text-white transition-colors">Resort Near Cherai Beach</a>
                <a href="/pool-resort-in-cherai" className="hover:text-white transition-colors">Pool Resort in Cherai</a>
                <a href="/event-hall-in-cherai" className="hover:text-white transition-colors">Event Hall in Cherai</a>
                <a href="/birthday-party-hall-in-cherai" className="hover:text-white transition-colors">Birthday Party Hall in Cherai</a>
                <a href="/south-indian-restaurant-in-cherai" className="hover:text-white transition-colors">South Indian Restaurant in Cherai</a>
                <a href="/resort-near-kuzhippally-beach" className="hover:text-white transition-colors">Resort Near Kuzhippally Beach</a>
                <a href="/weekend-getaway-near-kochi" className="hover:text-white transition-colors">Weekend Getaway Near Kochi</a>
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-sand mb-4">Follow Us &amp; Connect</h4>
              <div className="flex gap-4 text-xs font-light text-white/60 mb-4">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
              </div>
              <a 
                href="https://wa.me/919567758080"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#20ba59] transition-all duration-300 shadow-sm"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Google Map */}
          <div className="lg:col-span-5 rounded-[24px] overflow-hidden h-64 border border-white/10 shadow-sm">
            <iframe 
              title="La Estuaire Cherai Map Location - Resort near Cherai Beach, Vypin Island"
              src="https://maps.google.com/maps?q=La%20Estuaire%20Cherai%20Cherai%20Vypin%20Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center text-[10px] text-white/40 font-light gap-4">
          <p>&copy; {new Date().getFullYear()} La Estuaire Cherai. All rights reserved. | Best Resort in Cherai, Vypin Island, Kochi, Kerala</p>
        </div>
      </footer>

    </div>
  );
}

export default App;


