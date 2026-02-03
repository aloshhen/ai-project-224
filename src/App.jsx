import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SafeIcon from './components/SafeIcon'

// News Data
const NEWS_DATA = [
  {
    id: 1,
    title: "CS2 Major Championship Announced",
    excerpt: "Valve reveals the next Major will take place in Copenhagen with a $1.25M prize pool",
    date: "Dec 15, 2024",
    category: "Tournament",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
  },
  {
    id: 2,
    title: "New Operation Update Live",
    excerpt: "Operation Frostbite brings new maps, skins, and game modes to Counter-Strike 2",
    date: "Dec 12, 2024",
    category: "Update",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
  },
  {
    id: 3,
    title: "s1mple Returns to Competitive Play",
    excerpt: "The Ukrainian superstar announces his comeback with a new international roster",
    date: "Dec 10, 2024",
    category: "Players",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
  }
]

// Guides Data
const GUIDES_DATA = [
  {
    id: 1,
    title: "Mirage A Site Execute",
    difficulty: "Intermediate",
    type: "Tactics",
    description: "Complete guide to executing A site on Mirage with proper utility usage",
    icon: "target"
  },
  {
    id: 2,
    title: "Economy Management",
    difficulty: "Beginner",
    type: "Fundamentals",
    description: "Master the economy system and make better buying decisions",
    icon: "dollar-sign"
  },
  {
    id: 3,
    title: "AWP Positioning Guide",
    difficulty: "Advanced",
    type: "Weapons",
    description: "Learn optimal AWP positions on all competitive maps",
    icon: "crosshair"
  },
  {
    id: 4,
    title: "Smoke Lineups 2024",
    difficulty: "Intermediate",
    type: "Utility",
    description: "Essential smokes for every competitive map in the current pool",
    icon: "cloud"
  }
]

// Skin Gallery Data
const SKINS_DATA = [
  {
    id: 1,
    name: "Dragon Lore",
    weapon: "AWP",
    rarity: "Covert",
    price: "$2,450",
    image: "https://images.unsplash.com/photo-1612287230217-969b698c8d13?w=600&q=80",
    color: "from-red-600 to-orange-600"
  },
  {
    id: 2,
    name: "Howl",
    weapon: "M4A4",
    rarity: "Contraband",
    price: "$3,200",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&q=80",
    color: "from-red-700 to-red-500"
  },
  {
    id: 3,
    name: "Fade",
    weapon: "Glock-18",
    rarity: "Restricted",
    price: "$890",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 4,
    name: "Crimson Web",
    weapon: "Karambit",
    rarity: "Covert",
    price: "$1,650",
    image: "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?w=600&q=80",
    color: "from-red-800 to-red-600"
  }
]

// Statistics Data
const STATS_DATA = [
  { label: "Active Players", value: "1.2M", change: "+12%", icon: "users" },
  { label: "Tournaments", value: "156", change: "+8%", icon: "trophy" },
  { label: "Pro Teams", value: "89", change: "+5%", icon: "shield" },
  { label: "Prize Pool 2024", value: "$25M", change: "+23%", icon: "dollar-sign" }
]

// Top Players Data
const PLAYERS_DATA = [
  {
    id: 1,
    name: "ZywOo",
    team: "Vitality",
    rating: 1.35,
    role: "AWPer",
    nationality: "France",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=80"
  },
  {
    id: 2,
    name: "s1mple",
    team: "Falcons",
    rating: 1.32,
    role: "AWPer",
    nationality: "Ukraine",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80"
  },
  {
    id: 3,
    name: "NiKo",
    team: "G2",
    rating: 1.28,
    role: "Rifler",
    nationality: "Bosnia",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80"
  },
  {
    id: 4,
    name: "m0NESY",
    team: "G2",
    rating: 1.26,
    role: "AWPer",
    nationality: "Russia",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80"
  }
]

// Animation Components
function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'News', href: '#news' },
    { name: 'Guides', href: '#guides' },
    { name: 'Statistics', href: '#stats' },
    { name: 'Skins', href: '#skins' },
    { name: 'Players', href: '#players' }
  ]

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-orange-900/30' : 'bg-transparent'}`}>
      <nav className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="bg-orange-600 p-2 rounded-lg group-hover:bg-orange-500 transition-colors">
              <SafeIcon name="target" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              CS<span className="text-orange-500">GO</span>HUB
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-orange-500 font-semibold transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2">
              <SafeIcon name="steam" className="w-4 h-4" />
              Connect Steam
            </button>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <SafeIcon name="x" size={28} /> : <SafeIcon name="menu" size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-orange-900/30 pt-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-300 hover:text-orange-500 font-semibold transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors w-full">
                  Connect Steam
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80" 
          alt="CS:GO Gaming Setup" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-orange-600/10 z-10" />
      </div>

      <div className="relative z-20 container mx-auto max-w-7xl px-4 md:px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-orange-600/20 border border-orange-600/40 text-orange-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Counter-Strike 2
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter text-glow"
          >
            DOMINATE THE
            <span className="block text-orange-500">COMPETITION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Your ultimate destination for CS2 news, pro statistics, tactical guides, and the rarest skins marketplace
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#news"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#news').scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-orange-600/30"
            >
              Explore News
              <SafeIcon name="chevron-right" className="w-5 h-5" />
            </a>
            <a 
              href="#guides"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#guides').scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-10 py-5 rounded-xl text-lg font-bold transition-all backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <SafeIcon name="play" className="w-5 h-5" />
              Watch Guides
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 flex items-center justify-center gap-8 text-gray-500"
          >
            <div className="flex items-center gap-2">
              <SafeIcon name="users" className="w-5 h-5" />
              <span className="text-sm font-semibold">1.2M+ Players</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2">
              <SafeIcon name="trophy" className="w-5 h-5" />
              <span className="text-sm font-semibold">Pro Stats</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2">
              <SafeIcon name="zap" className="w-5 h-5" />
              <span className="text-sm font-semibold">Live Updates</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <SafeIcon name="chevron-down" className="w-6 h-6 text-orange-500" />
      </div>
    </section>
  )
}

function NewsSection() {
  return (
    <section id="news" className="py-24 bg-gradient-to-b from-slate-950 to-black">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <FadeIn>
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Latest Updates</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2">News & Updates</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors font-semibold">
              View All <SafeIcon name="arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_DATA.map((news, index) => (
            <FadeIn key={news.id} delay={index * 0.1}>
              <article className="csgo-card group cursor-pointer hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {news.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <SafeIcon name="calendar" className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {news.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read More <SafeIcon name="chevron-right" className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function GuidesSection() {
  return (
    <section id="guides" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-600/5" />
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Improve Your Game</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Tactical Guides</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Master the fundamentals and advanced strategies from professional players and coaches</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {GUIDES_DATA.map((guide, index) => (
            <FadeIn key={guide.id} delay={index * 0.1}>
              <div className="csgo-card p-6 group hover:border-orange-600/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="bg-orange-600/20 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600/30 transition-colors">
                    <SafeIcon name={guide.icon} className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${guide.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' : guide.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-red-600/20 text-red-400'}`}>
                        {guide.difficulty}
                      </span>
                      <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{guide.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                      Start Learning <SafeIcon name="arrow-right" className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <button className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center gap-3">
              <SafeIcon name="book-open" className="w-5 h-5" />
              Browse All Guides
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section id="stats" className="py-24 bg-gradient-to-b from-black to-slate-950">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Live Data</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Game Statistics</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real-time metrics from competitive CS2 matches and player performance</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS_DATA.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div className="csgo-card p-6 text-center group hover:border-orange-600/50 transition-all duration-300">
                <div className="bg-orange-600/20 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600/30 transition-colors">
                  <SafeIcon name={stat.icon} className="w-7 h-7 text-orange-500" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm font-semibold mb-2">{stat.label}</div>
                <div className="text-green-500 text-xs font-bold flex items-center justify-center gap-1">
                  <SafeIcon name="trending-up" className="w-3 h-3" />
                  {stat.change} this month
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="csgo-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Recent Tournament Results</h3>
              <button className="text-orange-500 hover:text-orange-400 font-semibold text-sm flex items-center gap-2">
                View All <SafeIcon name="external-link" className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { event: "BLAST Premier World Final", winner: "Vitality", score: "2-1", loser: "FaZe Clan", prize: "$500,000" },
                { event: "IEM Katowice 2024", winner: "Spirit", score: "3-1", loser: "FaZe Clan", prize: "$400,000" },
                { event: "PGL Major Copenhagen", winner: "NAVI", score: "2-1", loser: "FaZe Clan", prize: "$500,000" }
              ].map((match, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4 mb-3 md:mb-0">
                    <SafeIcon name="trophy" className="w-5 h-5 text-orange-500" />
                    <span className="text-white font-semibold">{match.event}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-orange-500 font-bold">{match.winner}</span>
                      <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">{match.score}</span>
                      <span className="text-gray-400">{match.loser}</span>
                    </div>
                    <span className="text-green-400 font-semibold text-sm">{match.prize}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function SkinsSection() {
  return (
    <section id="skins" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Marketplace</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2">Skin Gallery</h2>
            </div>
            <button className="hidden md:flex bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-all items-center gap-2">
              <SafeIcon name="shopping-cart" className="w-5 h-5" />
              Browse Market
            </button>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKINS_DATA.map((skin, index) => (
            <FadeIn key={skin.id} delay={index * 0.1}>
              <div className="csgo-card group cursor-pointer hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className={`relative h-48 bg-gradient-to-br ${skin.color} p-6 flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <img 
                    src={skin.image} 
                    alt={skin.name}
                    className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-bold">{skin.rarity}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{skin.weapon}</div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">{skin.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-black text-xl">{skin.price}</span>
                    <button className="bg-white/10 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors">
                      <SafeIcon name="shopping-cart" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 md:hidden text-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all w-full">
              Browse Market
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function PlayersSection() {
  return (
    <section id="players" className="py-24 bg-gradient-to-b from-slate-950 to-black">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Pro Scene</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Top Players</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Current rankings of the world's best Counter-Strike 2 professionals</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLAYERS_DATA.map((player, index) => (
            <FadeIn key={player.id} delay={index * 0.1}>
              <div className="csgo-card overflow-hidden group hover:border-orange-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={player.image} 
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white mb-1">{player.name}</h3>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <SafeIcon name="shield" className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold">{player.team}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Rating 2.0</div>
                      <div className="text-2xl font-black text-orange-500">{player.rating}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Role</div>
                      <div className="text-white font-semibold">{player.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm pt-4 border-t border-white/10">
                    <SafeIcon name="map-pin" className="w-4 h-4" />
                    <span>{player.nationality}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <button className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center gap-3">
              <SafeIcon name="bar-chart" className="w-5 h-5" />
              View Full Rankings
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 bg-orange-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-600" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              READY TO RANK UP?
            </h2>
            <p className="text-xl text-orange-100 mb-10 leading-relaxed">
              Join millions of players worldwide. Get the latest strategies, track your stats, and dominate the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-5 rounded-xl text-lg font-black transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl">
                <SafeIcon name="gamepad" className="w-6 h-6" />
                Start Playing Now
              </button>
              <button className="bg-orange-700 hover:bg-orange-800 text-white border-2 border-white/30 px-10 py-5 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3">
                <SafeIcon name="users" className="w-6 h-6" />
                Join Community
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-orange-900/30 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-orange-600 p-2 rounded-lg">
                <SafeIcon name="target" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">
                CS<span className="text-orange-500">GO</span>HUB
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your ultimate destination for Counter-Strike 2 news, statistics, guides, and community.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <SafeIcon name="twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <SafeIcon name="youtube" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <SafeIcon name="twitch" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <SafeIcon name="discord" className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#news" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Latest News</a></li>
              <li><a href="#guides" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Tactical Guides</a></li>
              <li><a href="#stats" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Statistics</a></li>
              <li><a href="#skins" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Skin Market</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Community</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Forums</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Discord Server</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Steam Group</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Reddit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest CS2 updates delivered to your inbox.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-colors">
                <SafeIcon name="send" className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2024 CSGOHUB. Not affiliated with Valve Corporation.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <NewsSection />
        <GuidesSection />
        <StatsSection />
        <SkinsSection />
        <PlayersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App