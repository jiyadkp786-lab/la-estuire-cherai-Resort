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
  Calendar
} from 'lucide-react';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Logo Component
const ResortLogo = ({ className = "h-10 w-10" }) => (
  <img 
    src="/logo.jpeg" 
    alt="La Estuaire Logo" 
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
    { id: "beach", num: "01", title: "Arabian Sea Waves", image: "/hero-resort.jpeg", desc: "Enjoy stunning, continuous beach views directly from the resort." },
    { id: "spa", num: "02", title: "Ayurvedic Spa Sanctuary", image: "/heritage-2.jpeg", desc: "Rejuvenate with traditional treatments by certified Ayurvedic healers." },
    { id: "dining", num: "03", title: "Joe's Cuisine Dining", image: "/heritage-1.jpeg", desc: "Savor gourmet coastal curries and fresh seafood at our pool-side restaurant." },
    { id: "pool", num: "04", title: "Infinity Pool Sunset", image: "/pool-1.jpeg", desc: "Witness breathtaking sunsets as the infinity pool merges with the sea." },
    { id: "lake", num: "05", title: "Silent Kerala Backwaters", image: "/lake-view-deluxe.jpeg", desc: "Experience the calm backwaters of Cherai island with kayaking and canoeing." },
    { id: "suites", num: "06", title: "Suites & Cottages", image: "/super-deluxe.jpeg", desc: "Unwind in minimalist, modern spaces designed with local wood and organic textures." }
  ];

  // Scroll Progress calculations for parallax
  const { scrollY, scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 800], [0, 300]);

  // Sample data
  const accommodations = [
    {
      id: "super-deluxe",
      title: "Super Deluxe Room",
      image: "/super-deluxe.jpeg",
      size: "55 sq m",
      capacity: "Up to 2 Guests",
      price: "₹12,000",
      description: "Indulge in luxury with our Super Deluxe Room, offering premium features and an elevated level of sophistication for a truly memorable experience.",
      tags: ["Premium Amenities", "King Bed", "High-Speed WiFi"]
    },
    {
      id: "lake-view-deluxe",
      title: "Lake View Premium Deluxe",
      image: "/lake-view-deluxe.jpeg",
      size: "50 sq m",
      capacity: "Up to 2 Guests",
      price: "₹10,000",
      description: "Enjoy breathtaking views of the serene lake from our Lake View Deluxe Room, combining comfort with a picturesque setting for a tranquil escape.",
      tags: ["Lake View", "Private Balcony", "Morning Mist"]
    },
    {
      id: "deluxe",
      title: "Deluxe Room",
      image: "/deluxe.jpeg",
      size: "40 sq m",
      capacity: "Up to 2 Guests",
      price: "₹8,000",
      description: "Experience comfort and style in our Deluxe Room, where modern amenities and a relaxing ambiance redefine your stay in Cherai.",
      tags: ["Modern Interiors", "Rain Shower", "Garden View"]
    },
    {
      id: "deluxe-double",
      title: "Deluxe Double Sharing Room",
      image: "/deluxe-double.jpeg",
      size: "45 sq m",
      capacity: "Up to 2 Guests",
      price: "₹7,500",
      description: "Perfect for couples or friends, our Deluxe Double Sharing Room provides a cozy and intimate space with all the comforts of home.",
      tags: ["Twin Beds", "Cozy Ambiance", "Shared Lounge Access"]
    }
  ];



  const amenities = [
    { name: "Private Beach", icon: Waves, desc: "Secluded beachfront access with custom cabanas and refreshments." },
    { name: "Infinity Pool", icon: Compass, desc: "A temperature-controlled pool merging directly with the sea horizon." },
    { name: "Restaurant", icon: UtensilsCrossed, desc: "Local coastal Keralan curries and global gourmet seafood by top chefs." },
    { name: "Spa", icon: Sparkles, desc: "Authentic rejuvenative Ayurvedic massages guided by certified healers." },
    { name: "Water Sports", icon: Activity, desc: "Kayaking, windsurfing, speed boating, and peaceful backwater canoe rides." },
    { name: "Free WiFi", icon: Wifi, desc: "Seamless high-speed internet coverage across the resort grounds." },
    { name: "Yoga", icon: Compass, desc: "Guided morning yoga and mindfulness sessions in our open-air beach pavilion." },
    { name: "Event Hall", icon: Users, desc: "Premium facilities for intimate destination weddings and corporate retreats." }
  ];

  const testimonials = [
    {
      name: "Adam",
      location: "Verified Guest",
      initials: "A",
      rating: 5,
      text: "La Estuaire exceeded all of my expectations during my recent stay. The resort's serene ambiance, coupled with its impeccable amenities and breathtaking views, made for an unforgettable experience. Whether I was lounging by the pool, indulging in a spa treatment,, every moment felt like a dream. Without a doubt, La Estuaire is among the best resorts in Cherai Beach, and I would highly recommend it to anyone looking for a luxurious retreat in Kerala."
    },
    {
      name: "John",
      location: "Verified Guest",
      initials: "J",
      rating: 5,
      text: "As a frequent traveler, I've had the opportunity to stay at many resorts around the world, and I can confidently say that La Estuaire ranks among the best. From the moment I arrived, I was impressed by the resort's attention to detail and commitment to guest satisfaction. The staff was attentive and friendly, and the location was simply breathtaking. If you're looking for the ultimate beach getaway in Cherai, look no further than La Estuaire."
    },
    {
      name: "Antony",
      location: "Verified Guest",
      initials: "A",
      rating: 5,
      text: "I recently celebrated my anniversary at La Estuaire, and it was truly a magical experience. The resort's romantic ambiance, coupled with its stunning beachfront setting. I arrived at the hotel From the moment we arrived, we were greeted with champagne and roses, setting the tone for a weekend of luxury and romance. Without a doubt, La Estuaire is one of the best resorts in Cherai Beach, and I can't wait to return for another unforgettable stay."
    },
    {
      name: "Rachel",
      location: "Verified Guest",
      initials: "R",
      rating: 5,
      text: "I cannot speak highly enough of my experience at La Estuaire. From the moment I stepped foot onto the property, I was enveloped in a sense of tranquility and luxury. The accommodations were beautifully appointed, the staff attentive and friendly, and the views of Cherai Beach simply breathtaking. La Estuaire truly exceeded all of my expectations and stands as one of the best resorts in Cherai, Kochi, Kerala. I can't wait to return for another unforgettable stay."
    },
    {
      name: "David",
      location: "Verified Guest",
      initials: "D",
      rating: 5,
      text: "My recent stay at La Estuaire was nothing short of magical. The resort's serene ambiance, coupled with its stunning beachfront location, made for the perfect backdrop to my vacation. From sunrise yoga sessions on the beach to indulgent spa treatments and delicious meals at the on-site restaurants, every moment was a delight. La Estuaire is a true gem in Cherai Beach, and I would highly recommend it to anyone looking for a luxurious retreat in Kerala."
    }
  ];

  const offers = [
    {
      title: "Honeymoon Sanctuary",
      price: "₹65,000 / 3 Nights",
      desc: "Celebrate love with a beachfront villa upgrade, a private candlelight dinner, a couple's Ayurvedic massage, and daily champagne breakfast.",
      inclusions: ["3 Nights in Beachfront Cottage", "Romantic candlelit dinner", "Couples spa therapy"],
      targetRoom: "Beachfront Cottage"
    },
    {
      title: "Weekend Escape",
      price: "₹32,000 / 2 Nights",
      desc: "Break away from the city. Enjoy early check-in, late check-out, floating pool breakfast, and custom yoga sessions.",
      inclusions: ["2 Nights in Deluxe Ocean Room", "Floating Pool Breakfast", "Flexible Check-In / Out"],
      targetRoom: "Deluxe Ocean View Room"
    },
    {
      title: "Family Holiday",
      price: "₹88,000 / 4 Nights",
      desc: "Create timeless memories with complimentary meals for children, private backwater cruise, and an afternoon pottery class.",
      inclusions: ["4 Nights in Family Suite", "Complimentary child dining", "Guided backwater boat tour"],
      targetRoom: "Premium Family Suite"
    },
    {
      title: "Corporate Retreat",
      price: "₹1,20,000 / 3 Nights",
      desc: "Re-energize your team with sea-facing conference settings, team-building watersports, and mindfulness sessions.",
      inclusions: ["Full board coastal dining", "Exclusive meeting hall access", "Team wellness workshops"],
      targetRoom: "Luxury Private Villa"
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

  // Auto-slide for room carousel — pauses on hover
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



  // Booking action: select offer & scroll
  const handleSelectOffer = (offer) => {
    setRoomType(offer.targetRoom);
    setSpecialRequests(`Interested in: ${offer.title} Package`);
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
      `• Check In: ${checkIn}\n` +
      `• Check Out: ${checkOut}\n` +
      `• Guests: ${guests}\n` +
      `• Preferred Room: ${roomType}` +
      (specialRequests ? `\n• Special Requests: ${specialRequests}` : '');
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918943573519?text=${encodedMessage}`;
    
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
                href="https://wa.me/918943573519?text=Hello%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20La%20Estuaire%20Cherai."
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
                href="https://wa.me/918943573519?text=Hello%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20La%20Estuaire%20Cherai."
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
      <section id="hero" className="relative h-screen w-full overflow-hidden bg-white">
        {/* Background Video Container */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <motion.video 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: "easeOut" }}
            style={{ y: heroParallax }}
            src="/Also_back_side_is_the_backwate.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none filter contrast-[1.02] saturate-[1.03]"
          />
          {/* Bottom black fade gradient to blend seamlessly into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 5b. Booking Bar Section — between Hero and About */}
      <section className="relative z-20 w-full bg-white py-8 px-6 border-b border-light-gray shadow-sm">
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
      <section id="facilities" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12 border-b border-light-gray">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-ocean" />
            <span className="text-ocean text-xs font-semibold tracking-[0.2em] uppercase">FACILITIES</span>
            <span className="w-12 h-[1px] bg-ocean" />
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.5rem] font-medium leading-tight tracking-tight text-dark-text max-w-2xl">
            Why Choose La Estuaire - The Best Beach Resort
          </h2>

          <p className="text-dark-text/70 text-sm md:text-[0.95rem] font-light leading-relaxed max-w-xl mb-4">
            Choosing a resort involves considering various factors, and La Estuaire may have unique features that make it an appealing choice for certain travelers.
          </p>

          {/* List of facilities - centered grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-left mt-2">
            {[
              "Accommodation Variety",
              "Dining Experience",
              "Free Wi-Fi in common areas",
              "Parking facilities for guests",
              "24-hour front desk assistance",
              "Daily housekeeping",
              "Travel assistance and tour arrangements"
            ].map((facility, index) => (
              <div key={index} className="flex gap-3 items-center bg-sand-light p-4 rounded-2xl border border-ocean/5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-ocean/15 flex items-center justify-center text-ocean flex-shrink-0">
                  <Sparkles size={14} />
                </div>
                <span className="text-dark-text/80 text-xs sm:text-sm font-medium">
                  {facility}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. About Section — Our Heritage */}
      <section id="about" className="relative w-full scroll-mt-12 overflow-hidden flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/ChatGPT Image Jun 6, 2026, 07_34_50 PM.png" 
            alt="La Estuaire heritage background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        </div>
        
        {/* Content overlay — centred */}
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

            {/* Headline — elegant light display serif */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-white">
              A Hidden Escape<br />
              <span className="font-normal italic">Between Sea &amp; Backwaters</span>
            </h2>

            {/* Thin decorative rule */}
            <div className="flex items-center gap-3 my-1">
              <div className="w-10 h-[1px] bg-white/40" />
              <div className="w-2 h-2 rounded-full bg-[#B8E0E0]" />
              <div className="w-10 h-[1px] bg-white/40" />
            </div>

            {/* Body paragraphs */}
            <p className="text-white/85 text-sm md:text-[0.95rem] leading-relaxed font-light max-w-lg">
              Perfectly located in Cherai, where the Arabian Sea meets serene backwaters, La Estuaire Cherai offers a unique stay surrounded by nature, comfort, and coastal charm. Our boutique resort combines modern luxury with warm Kerala hospitality.
            </p>
            <p className="text-white/85 text-sm md:text-[0.95rem] leading-relaxed font-light max-w-lg">
              Each of our seven rooms is uniquely crafted — from poolside moments and kayaking adventures to breathtaking sunsets and birdwatching, every corner is designed for rejuvenation and connection with nature.
            </p>

            {/* CTA */}
            <div className="pt-3">
              <a
                href="https://wa.me/918943573519?text=Hello%2C%20I%20would%20like%20to%20reserve%20an%20experience%20at%20La%20Estuaire%20Cherai."
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
            { id: 'stat-guests', label: 'Successful Bookings', note: 'Welcoming guests from across India and around the world.' },
            { id: 'stat-bookings', label: 'Events Hosted', note: 'Creating unforgettable celebrations, gatherings, and special occasions.' },
            { id: 'stat-satisfaction', label: 'Guest Satisfaction', note: 'Driven by exceptional experiences, comfort, and guest care.' },
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

      {/* Promo Video Section */}
      <section id="promo-video" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12 border-b border-light-gray w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Left: Video Player */}
            <div className="lg:col-span-7 aspect-video w-full relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg bg-light-gray">
              <video 
                src="/resort-ad-final.mp4" 
                controls 
                playsInline 
                className="w-full h-full object-cover"
                poster="/hero-resort.jpeg"
              />
            </div>

            {/* Right: Content Details */}
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
                A Visual Journey of Serenity
              </h2>

              {/* Description */}
              <p className="text-dark-text/70 text-sm md:text-[1rem] font-light leading-relaxed max-w-xl">
                Watch our official resort ad film to catch a glimpse of the luxury, serenity, and beautiful moments that await you at Cherai. Experience the gentle waves of the Arabian Sea and the calm of the backwaters.
              </p>

              {/* Bullet Points */}
              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Spectacular beach and backwater views
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Authentic Ayurvedic wellness treatments
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Premium coastal dining at Joe's Cuisine
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
                  <span>Book Your Stay</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Gallery / Accommodations Section */}
      <section id="gallery" className="pt-12 pb-8 md:pt-16 md:pb-10 bg-white border-y border-light-gray scroll-mt-12 overflow-hidden w-full">

        {/* Section Header */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Removed Accommodations Subtitle */}
            <h2 className="font-display text-2xl md:text-[1.9rem] font-normal leading-snug tracking-wide text-dark-text mb-5 uppercase">
              Choose from a variety of serene spaces to enjoy your holiday
            </h2>
            <p className="text-dark-text/60 text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto">
              Step into elegant, spacious spaces designed with glass panels, light local woods, and organic textures overlooking the Arabian Sea waves.
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
                      alt={accommodations[prevIdx].title} 
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
                      alt={accommodations[activeIdx].title} 
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
                      alt={accommodations[nextIdx].title} 
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
      <section id="dining" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Left: Restaurant Image Slideshow */}
            <div className="lg:col-span-7 aspect-[16/10] w-full relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg bg-light-gray">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeDiningImgIdx}
                  src={diningImages[activeDiningImgIdx]} 
                  alt="Joe's Cuisine pool view slideshow" 
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
                Savor South Indian Flavors at Joe's Cuisine
              </h2>

              {/* Description */}
              <p className="text-dark-text/70 text-sm md:text-[1rem] font-light leading-relaxed max-w-xl">
                Embark on a culinary journey with Joe's Cuisine. From hearty breakfasts to delectable dinners, our restaurant offers an array of authentic South Indian delights.
              </p>

              {/* Bullet Points */}
              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Breakfast, lunch, and dinner services
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-ocean flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm">
                    <ChevronRight size={10} strokeWidth={4} />
                  </div>
                  <span className="text-dark-text/75 text-sm md:text-base font-light">
                    Both vegetarian and non-vegetarian South Indian cuisine
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3D Curved Gallery Section */}
      <section id="portfolio" className="pt-16 pb-6 md:pt-20 md:pb-16 px-6 md:px-12 bg-white overflow-hidden scroll-mt-12 w-full">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-10 md:mb-12 flex flex-col items-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-dark-text mb-4">
              Curious What Else We've Created?
            </h2>
            <p className="text-dark-text/60 text-xs sm:text-sm font-light leading-relaxed max-w-xl mb-6">
              Explore visual identities, Yoga therapies, and dining delights in our resort portfolio.
            </p>
            
            {/* CTA Link with Cohesive Circle */}
            <a 
              href="#booking"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-dark-text hover:text-ocean transition-colors group"
            >
              <span>See more Projects</span>
              <span className="w-6 h-6 rounded-full bg-ocean flex items-center justify-center text-white text-[10px] group-hover:scale-110 transition-transform">
                →
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
              <div className="relative w-full h-[260px] sm:h-[340px] md:h-[480px] flex items-center justify-center overflow-visible select-none">
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

                    // Calculate responsive 3D transforms
                    let rotateY = circularOffset * -22;
                    let scale = 0.82 + Math.abs(circularOffset) * 0.07;
                    let z = Math.abs(circularOffset) * 45;
                    let x = circularOffset * 260;

                    if (windowWidth < 480) {
                      x = circularOffset * 135;
                      z = Math.abs(circularOffset) * 20;
                      rotateY = circularOffset * -18;
                      scale = 0.85 + Math.abs(circularOffset) * 0.05;
                    } else if (windowWidth < 768) {
                      x = circularOffset * 130;
                      z = Math.abs(circularOffset) * 40;
                      rotateY = circularOffset * -22;
                      scale = 0.82 + Math.abs(circularOffset) * 0.08;
                    } else if (windowWidth < 1024) {
                      x = circularOffset * 200;
                      z = Math.abs(circularOffset) * 45;
                      rotateY = circularOffset * -22;
                      scale = 0.82 + Math.abs(circularOffset) * 0.07;
                    }
                    
                    const isActive = circularOffset === 0;

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
                          opacity: Math.abs(circularOffset) > 2 ? 0.3 : 1,
                          zIndex: 10 - Math.abs(circularOffset)
                        }}
                        transition={{ duration: 0.6, ease: [0.32, 0.94, 0.6, 1] }}
                        onClick={() => setActiveGalleryIdx(idx)}
                        className={`absolute ${widthClass} ${heightClass} rounded-2xl overflow-hidden shadow-xl cursor-pointer group flex-shrink-0 origin-center`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Image */}
                        <img 
                          src={item.image} 
                          alt={item.title} 
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
              </div>
            );
          })()}

        </div>
      </section>



      {/* 10. Testimonial Section */}
      <section className="pt-6 md:pt-16 pb-16 px-6 md:px-12 bg-white overflow-hidden">
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
              <span><strong>4.9 / 5</strong> average rating on TripAdvisor & Google Reviews</span>
            </div>
          </div>

          <div 
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            className="relative bg-sand-light rounded-[24px] md:rounded-[32px] p-5 md:p-16 border border-sand/30 shadow-sm overflow-hidden"
          >
            <div className="absolute top-4 left-4 text-4xl md:top-8 md:left-8 md:text-6xl font-serif text-ocean/15 select-none pointer-events-none">“</div>
            
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



      {/* 12. Booking Section */}
      <section id="booking" className="py-12 md:py-16 px-6 md:px-12 bg-white scroll-mt-12">
        <div className="max-w-4xl mx-auto bg-sand-light p-8 md:p-16 rounded-[32px] border border-sand/30 shadow-md">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-ocean text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">Secure Booking</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-dark-text mb-4">
              Request Your Reservation
            </h2>
            <p className="text-dark-text/60 text-xs md:text-sm font-light">
              Submit your preferred dates, and our resort guest relations coordinator will contact you within 2 hours to finalize room configurations.
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
                Thank you for choosing La Estuaire Cherai. We are verifying availability for the <span className="font-semibold text-ocean">{roomType}</span> and will reach out to you shortly.
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
                  placeholder="E.g., Airport transfer, Ayurvedic package preference, dietary options..."
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
      <footer className="bg-dark-text text-white py-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Logo & Contact details */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ResortLogo className="h-10 w-10 text-sand" />
                <span className="font-display text-lg font-light tracking-[0.2em] text-white">LA ESTUAIRE</span>
              </div>
            </div>

            <div className="space-y-4 text-xs font-light text-white/70">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-sand mb-1">BOOK NOW</h4>
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
                <span>+91 8943573519</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-sand" />
                <span>Laestuaire@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social Links & Info links */}
          <div className="lg:col-span-3 flex flex-col justify-start gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-sand mb-6">Follow Us</h4>
              <div className="flex gap-4 text-xs font-light text-white/60">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-sand mb-4">Quick WhatsApp Connect</h4>
              <a 
                href="https://wa.me/918943573519"
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
              title="La Estuaire Cherai Map Location"
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
          <p>© {new Date().getFullYear()} La Estuaire Cherai. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
