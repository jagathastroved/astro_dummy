import { ZodiacSign, LiveMomentCard } from '../types';
import { aquarius, aries, cancer, capricorn, gemini, leo, libra, pisces, sagittarius, scorpio, taurus, virgo } from '../assets/Signs/index';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Aries', sanskrit: 'Mesha', ruler: 'Mars (Mangala)', element: 'Fire', description: 'Guided by active energy, you naturally lead and start new things. Your true power unlocks when you balance quick actions with patience.', imageUrl: aries },
  { name: 'Taurus', sanskrit: 'Vrishabha', ruler: 'Venus (Shukra)', element: 'Earth', description: 'You build stability and lasting comfort. Your quiet strength brings success, and true growth happens when you openly embrace new changes.', imageUrl: taurus },
  { name: 'Gemini', sanskrit: 'Mithuna', ruler: 'Mercury (Budha)', element: 'Air', description: 'Gifted with a sharp mind, you connect ideas and people easily. Focus your scattered thoughts to find deeper meaning in everyday life.', imageUrl: gemini },
  { name: 'Cancer', sanskrit: 'Karka', ruler: 'Moon (Chandra)', element: 'Water', description: 'Deeply connected to feelings, you heal and protect those around you. Trusting your inner voice will safely guide you through life’s emotional waves.', imageUrl: cancer },
  { name: 'Leo', sanskrit: 'Simha', ruler: 'Sun (Surya)', element: 'Fire', description: 'Blessed with a warm heart, your light inspires others to shine. Real confidence comes from sharing your gifts without seeking approval.', imageUrl: leo },
  { name: 'Virgo', sanskrit: 'Kanya', ruler: 'Mercury (Budha)', element: 'Earth', description: 'You have a natural talent for fixing and organizing the world. Let go of the need for perfection to discover the beauty in life as it is.', imageUrl: virgo },
  { name: 'Libra', sanskrit: 'Tula', ruler: 'Venus (Shukra)', element: 'Air', description: 'You seek harmony and bring people together peacefully. Learning to make firm choices will help you build the balanced life you truly desire.', imageUrl: libra },
  { name: 'Scorpio', sanskrit: 'Vrishchika', ruler: 'Mars / Ketu', element: 'Water', description: 'Driven by deep passion, you have the power to transform your life. Letting go of past hurts opens the door to your immense spiritual strength.', imageUrl: scorpio },
  { name: 'Sagittarius', sanskrit: 'Dhanus', ruler: 'Jupiter (Guru)', element: 'Fire', description: 'A seeker of truth, you expand your mind through travel and learning. Grounding your big dreams in daily habits turns them into reality.', imageUrl: sagittarius },
  { name: 'Capricorn', sanskrit: 'Makara', ruler: 'Saturn (Shani)', element: 'Earth', description: 'Patient and hardworking, you slowly climb to great heights. Remember to celebrate your small wins instead of only focusing on the final goal.', imageUrl: capricorn },
  { name: 'Aquarius', sanskrit: 'Kumbha', ruler: 'Saturn / Rahu', element: 'Air', description: 'A forward-thinker, you care deeply about humanity’s future. Balancing your big ideas with warm, personal connections brings you true joy.', imageUrl: aquarius },
  { name: 'Pisces', sanskrit: 'Meena', ruler: 'Jupiter / Ketu', element: 'Water', description: 'Highly intuitive and gentle, you naturally understand the unseen world. Setting healthy boundaries protects your peaceful and giving energy.', imageUrl: pisces }
];

import { ChandraMoon, guru_pushya_yoga, pradosham, Rahu_Ketu_Node_shift, sun_transit } from '../assets/Auspicious_portal/index';

export const LIVE_MOMENTS: LiveMomentCard[] = [
  { id: '1', title: 'Guru Pushya Yoga Portal', tag: 'Double Wealth Transit', urgency: 'Limited Seats', image: guru_pushya_yoga },
  { id: '2', title: 'Rahu-Ketu Node Shift', tag: '18-Month Cycle Launch', urgency: 'Auspicious Portal', image: Rahu_Ketu_Node_shift },
  { id: '3', title: 'Pradosham Karma Cleansing', tag: 'Twilight Energy Peak', urgency: 'Next 24 Hours', image: pradosham },
  { id: '4', title: 'Surya Sun Transit in Gemini', tag: 'Intellectual Solar Inflow', urgency: 'This Week', image: sun_transit },
  { id: '5', title: 'Saturn Retrograde Pivot', tag: 'Dharma Alignment Check', urgency: 'Closes in 3 days', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=600' },
  { id: '6', title: 'Chandra Moon Nakshatra Pushya', tag: 'Highest Healing Day', urgency: 'Auspicious Portal', image: ChandraMoon }
];

export const HOROSCOPES: Record<string, { Today: string; Week: string; Month: string; hours: string; obstacle: string }> = {
  Aries: {
    Today: "You have a lot of energy today. Speak your mind, but try to stay polite and kind. Channel this sudden burst of enthusiasm into a creative project or long-term goal, and you will accomplish truly great things before the day ends.",
    Week: "Focus on your daily routines. Getting some exercise and planning your week will help you a lot. By Friday, you'll find that staying organized gives you the freedom to relax and enjoy the weekend fully.",
    Month: "Great things are coming for your career! Keep an eye out for new opportunities. An unexpected conversation with a mentor or colleague could open a door you didn't even know existed.",
    hours: "09:00 AM - 10:45 AM",
    obstacle: "Being too impatient with others"
  },
  Taurus: {
    Today: "It's a great day to review your finances. Double-check your budget to ensure you are on track. Finding small ways to save today will bring you a sense of lasting peace and security tomorrow.",
    Week: "You'll have smooth interactions with your friends. It's a good time to focus on your home or garden. Simple, grounding activities will recharge your spirit for the busier days ahead.",
    Month: "You're entering a lucky phase. Take some time to rest and gather your strength. The patience you show now will pay off handsomely when big rewards arrive later this month.",
    hours: "11:30 AM - 01:15 PM",
    obstacle: "Resisting helpful changes"
  },
  Gemini: {
    Today: "Your mind is very sharp today. You might suddenly figure out a solution to a problem at home. Trust your quick instincts and share your brilliant ideas with those around you.",
    Week: "Keep your communication clear and honest. Writing down your ideas will prove very useful. A casual chat with an old friend could spark your next big creative adventure.",
    Month: "Things are moving forward quickly now. It's a great time for travel and clear thinking. Embrace the rapid pace and don't be afraid to explore subjects completely outside your comfort zone.",
    hours: "02:00 PM - 03:45 PM",
    obstacle: "Getting distracted easily"
  },
  Cancer: {
    Today: "Take a break and focus on your home today. Cook a nice meal and relax away from your screens. Creating a safe, cozy haven will do wonders for your emotional well-being.",
    Week: "Spend time near water or connect with your family history to find a sense of peace. Nurturing those closest to you will strengthen bonds that last a lifetime.",
    Month: "This is a quiet, reflective month for you. Meditation and spiritual practices will bring you joy. Take this beautiful opportunity to gently wash away old worries and hit the reset button.",
    hours: "07:30 AM - 09:15 AM",
    obstacle: "Worrying too much about the past"
  },
  Leo: {
    Today: "You are shining bright today! Lead conversations in your community, but remember to stay humble. Your natural warmth will attract wonderful people who want to support your vision.",
    Week: "It's a great time to meet new people. Help your friends and be generous with your time. Your big-hearted nature is your greatest asset and will open unexpected doors.",
    Month: "Your creativity is at an all-time high. Just make sure to avoid arguments to keep things smooth. Focus your fiery passion into a personal project, and the results will be spectacular.",
    hours: "08:15 AM - 10:00 AM",
    obstacle: "Seeking too much approval"
  },
  Virgo: {
    Today: "Planning ahead will bring you success at work. Your career is looking very strong right now. Trust in your meticulous nature, as your attention to detail is truly unmatched.",
    Week: "Organize your living space. Cleaning up your room or desk can help you think more clearly. A tidy environment will act as a launchpad for your most productive ideas.",
    Month: "This is a great month to build your career. Make careful plans and move forward with confidence. The solid foundation you lay down now will support you for years to come.",
    hours: "10:30 AM - 12:00 PM",
    obstacle: "Overthinking small details"
  },
  Libra: {
    Today: "Take some time to learn something new. Reading a good book or taking a walk will calm you. Seeking balance in small ways will restore your beautiful inner harmony.",
    Week: "Teamwork is key this week. If you need to sign any important papers, do it in the afternoon. Collaboration flows easily, so lean on your partners for support and inspiration.",
    Month: "Relationships are blooming! It's a wonderful month to spend time with the people you love. Focus on creating mutual joy and your connections will grow deeper than ever.",
    hours: "03:15 PM - 05:00 PM",
    obstacle: "Struggling to make decisions"
  },
  Scorpio: {
    Today: "You might discover some deep truths today. Spend a little time in quiet reflection. Allowing yourself to process these intense feelings will lead to profound personal clarity.",
    Week: "Old memories might come up. Lighting a candle or taking a peaceful walk can help you relax. Don't be afraid to gently let go of whatever is no longer serving your highest good.",
    Month: "This is a time to let go of old emotional baggage. You will feel refreshed and much lighter. Embrace this powerful period of transformation and step boldly into your new skin.",
    hours: "06:00 PM - 07:45 PM",
    obstacle: "Holding on to old grudges"
  },
  Sagittarius: {
    Today: "Your relationships are in focus today. Being a good listener will help you build strong bonds. While you love to teach, today you will find great wisdom in what others have to say.",
    Week: "It's time to expand your horizons. A short trip or a walk in nature will clear your mind. Let your natural optimism guide you toward exciting new experiences and fresh perspectives.",
    Month: "A big phase of growth is here! Dive into new subjects and share your ideas with others. Your enthusiasm is highly contagious, making this the perfect time to inspire the world around you.",
    hours: "12:15 PM - 02:00 PM",
    obstacle: "Sounding too bossy"
  },
  Capricorn: {
    Today: "Consistency is key today. Focus on finishing your daily chores and tasks with a positive attitude. Your incredible discipline is silently paving the way for your next big success.",
    Week: "Organize your finances and accounts. Being responsible with your money will pay off soon. A little bit of strategic planning now will save you a tremendous amount of stress later.",
    Month: "This is a slow but steady month. Keep working hard and you will build a solid foundation. Remember that the tallest mountains are climbed one careful, determined step at a time.",
    hours: "04:30 PM - 06:15 PM",
    obstacle: "Being too negative under stress"
  },
  Aquarius: {
    Today: "You're full of unique ideas today! Write down any sudden thoughts about helping your community. Your visionary mindset is exactly what the people around you need right now.",
    Week: "Talk to your friends. They will be very supportive and eager to hear your creative ideas. Group collaborations will bring out the absolute best in your inventive, forward-thinking spirit.",
    Month: "It's time to focus on your own personal growth. Don't worry too much about what others expect. By staying fiercely authentic, you will effortlessly attract the right opportunities.",
    hours: "01:30 PM - 03:00 PM",
    obstacle: "Acting too distant from family"
  },
  Pisces: {
    Today: "Your intuition is very strong today. Pay attention to your dreams as they might hold helpful clues. Trust that inner, quiet voice—it knows exactly which direction you need to walk.",
    Week: "Take care of your energy. A warm bath and some deep breathing exercises will feel wonderful. Protecting your sensitive spirit allows you to give your best to the world.",
    Month: "This is a peaceful and spiritual month for you. Trust that things will happen at the right time. Surrender your worries to the universe and beautifully flow with the cosmic currents.",
    hours: "06:30 AM - 08:00 AM",
    obstacle: "Ignoring reality"
  }
};

export const TESTIMONIALS = [
  {
    name: "Senthil Kumar",
    role: "Business Owner",
    quote: "The timing suggestions were incredibly helpful! I was able to avoid starting a new project during a stressful week and instead waited for a better time. It saved me a lot of money and headache.",
    stats: "Joined 2024 · 18 Consultations"
  },
  {
    name: "Muthukumar Natarajan",
    role: "Architect",
    quote: "I love the straightforward daily guidance. Knowing that I was in a great period for 'building' gave me the confidence to pitch a huge design project, and it got approved!",
    stats: "Joined 2025 · 4 Custom Reports"
  },
  {
    name: "Karan Johar",
    role: "Software Developer",
    quote: "The app is so easy to use! I check my best hours every morning before planning my day. It has completely changed how I organize my work and keeps my stress levels low.",
    stats: "Joined 2026 · Premium Member"
  }
];
