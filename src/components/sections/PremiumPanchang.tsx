import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Calendar, Clock, Sun, Sunset, Moon, MoonStar, Star, Info, ChevronDown } from 'lucide-react';

export function PremiumPanchang() {
  const [panchangData, setPanchangData] = useState<any>(null);
  const [todayContentData, setTodayContentData] = useState<any>(null);
  const [locationName, setLocationName] = useState<string>('Chennai, India');
  const [coordinates, setCoordinates] = useState({ lat: 13.08784, lng: 80.27847 });
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Custom Calendar & Location popover states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
  const [tempCountry, setTempCountry] = useState('India');
  const [tempCity, setTempCity] = useState('Chennai');

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsCalendarOpen(false);
      setIsLocationOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch (e) {
      return '';
    }
  };

  const formatDateRange = (start?: string, end?: string) => {
    if (!start || !end) return '';
    try {
      const sDate = new Date(start);
      const eDate = new Date(end);
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
      return `${sDate.toLocaleDateString('en-US', options)} — ${eDate.toLocaleDateString('en-US', options)}`;
    } catch (e) {
      return '';
    }
  };

  const formatCamelCase = (str?: string) => {
    if (!str) return '';
    return str.replace(/([A-Z])/g, ' $1').trim();
  };

  // Sync calendar picker month/year when selectedDate updates
  useEffect(() => {
    const d = new Date(selectedDate);
    setCalendarYear(d.getFullYear());
    setCalendarMonth(d.getMonth());
  }, [selectedDate]);

  // Auto-detect location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoordinates({ lat, lng });

          try {
            const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            if (geoResponse.ok) {
              const geoData = await geoResponse.json();
              if (geoData && geoData.address) {
                const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.municipality || geoData.address.county || geoData.address.city_district || geoData.address.suburb || geoData.address.state || 'Detected Location';
                const country = geoData.address.country || 'India';
                setLocationName(`${city}, ${country}`);
                setTempCity(city);
                setTempCountry(country);
              }
            }
          } catch (err) {
            console.error("Reverse geocoding failed on mount:", err);
            setLocationName(`Lat: ${lat.toFixed(4)}, Lon: ${lng.toFixed(4)}`);
          }
        },
        (error) => {
          console.warn("Geolocation permission denied on mount, using default:", error);
          setLocationName('Chennai, India');
        }
      );
    }
  }, []);

  // Fetch when coordinates or date changes
  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        let tz = 'Asia/Kolkata';
        try {
          tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
        } catch (e) {
          console.error("Failed to detect timezone:", e);
        }
        const encodedTz = btoa(tz).replace(/=/g, '');

        const dateObj = new Date(selectedDate);
        const now = new Date();
        dateObj.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
        const tzOffset = dateObj.getTimezoneOffset() * 60000;
        const localISOTime = new Date(dateObj.getTime() - tzOffset).toISOString().split('.')[0];

        const panchangUrl = `https://api.astroved.com/node/newpanchangam/${encodedTz}/${coordinates.lat}/${coordinates.lng}/${localISOTime}`;
        const contentUrl = `https://api.astroved.com/node/todaycontent/${encodedTz}/${coordinates.lat}/${coordinates.lng}/${localISOTime}`;

        console.log(`[Panchang] Fetching from newpanchangam API: ${panchangUrl}`);
        console.log(`[Panchang] Fetching from todaycontent API: ${contentUrl}`);

        const [panchangResponse, contentResponse] = await Promise.all([
          fetch(panchangUrl),
          fetch(contentUrl)
        ]);

        if (panchangResponse.ok) {
          const panchangData = await panchangResponse.json();
          console.log(`[Panchang] newpanchangam API Response:`, panchangData);
          if (active) {
            setPanchangData(panchangData);
          }
        } else {
          console.error(`Panchang API returned error: ${panchangResponse.status}`);
        }

        if (contentResponse.ok) {
          const contentData = await contentResponse.json();
          console.log(`[Panchang] todaycontent API Response:`, contentData);
          if (active && Array.isArray(contentData) && contentData.length > 0) {
            setTodayContentData(contentData[0]);
          }
        } else {
          console.error(`TodayContent API returned error: ${contentResponse.status}`);
        }
      } catch (err) {
        console.error("[Panchang] API fetch failed:", err);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [coordinates, selectedDate]);

  const handleLocationSearch = async (query: string) => {
    if (!query.trim()) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const newLat = parseFloat(data[0].lat);
          const newLng = parseFloat(data[0].lon);
          setCoordinates({ lat: newLat, lng: newLng });

          const displayName = data[0].display_name;
          const parts = displayName.split(',');
          const city = parts[0]?.trim() || '';
          const country = parts[parts.length - 1]?.trim() || '';
          setLocationName(city && country ? `${city}, ${country}` : displayName);
        }
      }
    } catch (err) {
      console.error("Geocoding query failed:", err);
    }
  };

  const getCalendarDays = (year: number, month: number) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true
      });
    }

    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const handleSelectDay = (dayObj: { day: number; month: number; year: number }) => {
    const pad = (num: number) => String(num).padStart(2, '0');
    const formatted = `${dayObj.year}-${pad(dayObj.month + 1)}-${pad(dayObj.day)}`;
    setSelectedDate(formatted);
    setIsCalendarOpen(false);
  };

  const handleApplyLocation = async () => {
    setIsLocationOpen(false);
    const query = `${tempCity}, ${tempCountry}`;
    await handleLocationSearch(query);
  };

  const planetAbbrs: Record<string, string> = {
    'Sun': 'Su', 'Moon': 'Mo', 'Mars': 'Ma', 'Mercury': 'Me',
    'Jupiter': 'Ju', 'Venus': 'Ve', 'Saturn': 'Sa', 'Rahu': 'Ra', 'Ketu': 'Ke', 'Lagna': 'Asc'
  };

  const getPlanetsForSign = (signIndex: number) => {
    if (!panchangData || !panchangData.PositionList) {
      const staticPositions: Record<number, string[]> = {
        0: [], 1: ['Su'], 2: ['Mo'], 3: ['Me'], 4: ['Ra'], 5: ['Ju'], 6: [], 7: ['Sa'], 8: [], 9: [], 10: ['Ke'], 11: ['Ve']
      };
      return staticPositions[signIndex] || [];
    }

    const list = panchangData.PositionList;
    const result: string[] = [];
    list.forEach((planet: any) => {
      const longVal = parseFloat(planet.LongitudeCalculations?.LongitudeValue || '0');
      const calculatedSignIdx = Math.floor(longVal / 30);
      if (calculatedSignIdx === signIndex) {
        const abbr = planetAbbrs[planet.PlanetPlanetName];
        if (abbr) {
          result.push(abbr);
        }
      }
    });
    return result;
  };
  return (
    <section className="relative py-4 md:py-6 overflow-hidden" id="daily-panchang">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-indigo/5 dark:bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-amber-600 dark:text-amber-400 font-sans text-xs md:text-sm uppercase tracking-widest font-bold mb-3">
            DAILY TIMINGS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight font-bold mb-4">
            Today's Panchang — <em className="text-amber-600 dark:text-amber-400 italic">Your Auspicious Timings.</em>
          </h2>
          <p className="font-sans text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Live for <strong className="font-bold text-gray-700 dark:text-gray-300">{locationName.split(',')[0]}</strong> (auto-detected). Timings update automatically for your location.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#0c0f24] rounded-[2rem] p-6 lg:p-10 relative overflow-hidden shadow-2xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-[#facc15]/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-all duration-500"
        >
          {/* Top Astronomical Header Bar */}
          <div className="flex flex-col xl:flex-row justify-between items-center gap-6 border-b border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] pb-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center shadow-lg shadow-gold/20 shrink-0">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-sans text-2xl md:text-3xl text-midnight dark:text-cream font-bold tracking-wide">
                  Panchang
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCalendarOpen(!isCalendarOpen);
                        setIsLocationOpen(false);
                      }}
                      className="flex items-center gap-1 cursor-pointer hover:underline decoration-dotted text-slate-600 dark:text-slate-400"
                    >
                      <Calendar className="w-3.5 h-3.5 text-purple dark:text-gold" />
                      <span>
                        {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </button>

                    {isCalendarOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-full left-0 mt-2 z-50 w-[280px] p-4 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col text-slate-800 dark:text-cream select-none"
                      >
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4 px-2">
                          <button onClick={handlePrevMonth} className="text-purple-600 dark:text-gold hover:opacity-75 text-lg font-bold">«</button>
                          <span className="font-serif font-bold text-sm text-midnight dark:text-cream">{months[calendarMonth]} {calendarYear}</span>
                          <button onClick={handleNextMonth} className="text-purple-600 dark:text-gold hover:opacity-75 text-lg font-bold">»</button>
                        </div>

                        {/* Weekday Titles */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                            <span key={d} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{d}</span>
                          ))}
                        </div>

                        {/* Grid Days */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {getCalendarDays(calendarYear, calendarMonth).map((dayObj, idx) => {
                            const isSelected = selectedDate === `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`;
                            const today = new Date();
                            const isToday = dayObj.day === today.getDate() &&
                              dayObj.month === today.getMonth() &&
                              dayObj.year === today.getFullYear();
                            return (
                              <button
                                key={idx}
                                onClick={() => handleSelectDay(dayObj)}
                                className={`text-[11px] py-1 rounded-lg transition-all ${isSelected
                                  ? 'bg-[#2b1845] text-white font-bold shadow-md'
                                  : isToday
                                    ? 'border border-[#2b1845]/80 bg-[#ece9f2] dark:bg-[#2b1845]/30 dark:border-amber-500/50 text-[#2b1845] dark:text-amber-400 font-bold'
                                    : dayObj.isCurrentMonth
                                      ? 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                                      : 'text-slate-300 dark:text-slate-600 hover:bg-slate-100/50 dark:hover:bg-white/5'
                                  }`}
                              >
                                {dayObj.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-purple/30 dark:text-gold/30">&bull;</span>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLocationOpen(!isLocationOpen);
                        setIsCalendarOpen(false);
                      }}
                      className="flex items-center gap-1 cursor-pointer hover:underline decoration-dotted text-slate-600 dark:text-slate-400"
                    >
                      <MapPin className="w-3.5 h-3.5 text-indigo dark:text-saffron" />
                      <span>{locationName}</span>
                    </button>

                    {isLocationOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-full left-0 mt-2 z-50 w-[260px] p-5 bg-white dark:bg-[#110c1c] border border-black/10 dark:border-amber-500/40 rounded-2xl shadow-2xl flex flex-col gap-4 text-left"
                      >
                        <h4 className="font-serif font-bold text-base text-midnight dark:text-cream">Update Location</h4>

                        {/* Country Dropdown */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Country</label>
                          <div className="relative">
                            <select
                              value={tempCountry}
                              onChange={(e) => setTempCountry(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none appearance-none cursor-pointer pr-8"
                            >
                              {['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Singapore', 'Malaysia', 'United Arab Emirates', 'Sri Lanka', 'Nepal'].map((c) => (
                                <option key={c} value={c} className="bg-white dark:bg-[#110c1c]">{c}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* City Input */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">City</label>
                          <input
                            type="text"
                            value={tempCity}
                            onChange={(e) => setTempCity(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-700 dark:text-cream focus:outline-none focus:border-purple/50"
                            placeholder="Enter city"
                          />
                        </div>

                        <button
                          onClick={handleApplyLocation}
                          className="w-full bg-[#2b1845] hover:bg-[#3d245f] text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center shadow-md shadow-[#2b1845]/20 mt-1"
                        >
                          Apply Location
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Astronomy Ticker */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white/60 dark:bg-[#0c0f24]/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] w-full xl:w-auto shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunrise</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.SunriseTime) || '5:51 AM'}</span>
                </div>
              </div>
              <div className="w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Sunset className="w-5 h-5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunset</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.SunsetTime) || '6:35 PM'}</span>
                </div>
              </div>
              <div className="w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonrise</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.MoonriseTime) || '9:54 PM'}</span>
                </div>
              </div>
              <div className="w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <MoonStar className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonset</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.MoonsetTime) || '10:00 AM'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Column 1: Detailed Panchang Data */}
            <div className="lg:col-span-4 space-y-8">

              {/* Auspicious & Inauspicious Timings */}
              <div className="bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-purple/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[20px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Good Time (Gulikai)</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">
                    {panchangData?.specialKalas?.GoodTimeStart && panchangData?.specialKalas?.GoodTimeEnd
                      ? `${formatTime(panchangData.specialKalas.GoodTimeStart)} — ${formatTime(panchangData.specialKalas.GoodTimeEnd)}`
                      : '09:00 AM — 10:30 AM'}
                  </span>
                </div>
                <div className="relative z-10 w-full h-px bg-black/5 dark:bg-white/5" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Danger Time (Yamagandam)</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">
                    {panchangData?.specialKalas?.DangerTimeStart && panchangData?.specialKalas?.DangerTimeEnd
                      ? `${formatTime(panchangData.specialKalas.DangerTimeStart)} — ${formatTime(panchangData.specialKalas.DangerTimeEnd)}`
                      : '01:30 PM — 03:00 PM'}
                  </span>
                </div>
                <div className="relative z-10 w-full h-px bg-black/5 dark:bg-white/5" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Poison Time (Rahu Kalam)</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">
                    {panchangData?.specialKalas?.PoisonTimeStart && panchangData?.specialKalas?.PoisonTimeEnd
                      ? `${formatTime(panchangData.specialKalas.PoisonTimeStart)} — ${formatTime(panchangData.specialKalas.PoisonTimeEnd)}`
                      : '03:00 PM — 04:30 PM'}
                  </span>
                </div>
              </div>

              {/* Tithi Timings */}
              <div>
                <h3 className="text-[14px] font-sans font-bold text-midnight dark:text-cream mb-4 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-purple dark:text-gold" /> Lunar Day (Tithi)
                </h3>
                <div className="space-y-3 pl-2 border-l-2 border-purple/20 dark:border-gold/20">
                  <div className="pl-4 relative">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-purple dark:bg-gold" />
                    <p className="text-[13px] font-semibold text-midnight dark:text-cream flex items-center gap-2">
                      {formatCamelCase(panchangData?.tithi?.TithiName) || 'Krishna Paksha Chathurthi'}
                      <span className="w-3 h-3 rounded-full border border-midnight dark:border-cream flex items-center justify-center overflow-hidden">
                        <span className="w-1.5 h-3 bg-midnight dark:bg-cream block mr-auto" />
                      </span>
                    </p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">
                      {formatDateRange(panchangData?.tithi?.TithiStart, panchangData?.tithi?.TithiEnd) || 'Jul 03, 11:20 AM — Jul 04, 12:40 PM'}
                    </p>
                  </div>
                  <div className="pl-4 relative opacity-80">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <p className="text-[13px] font-semibold text-midnight dark:text-cream flex items-center gap-2">
                      {formatCamelCase(panchangData?.tithi?.NextTithiName) || 'Krishna Paksha Panchami'}
                    </p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">
                      {formatDateRange(panchangData?.tithi?.TithiEnd, panchangData?.tithi?.NextToNextTithiEnd || panchangData?.tithi?.NextTithiEnd) || 'Jul 04, 12:40 PM — Jul 05, 01:31 PM'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Nakshatram & Yoga/Karana */}
            <div className="lg:col-span-4 space-y-8">

              {/* Additional Elements Box */}
              <div className="bg-white/70 dark:bg-black/20 p-5 rounded-2xl border border-indigo/10 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] shadow-sm space-y-3 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo/5 blur-[20px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Energy (Yoga)</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{panchangData?.yoga?.YogaName || 'Siddhi'}</span>
                </div>
                <div className="relative z-10 w-full h-px bg-black/5 dark:bg-white/5" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">Half-Lunar Day</span>
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{panchangData?.karana?.KaranaName || 'Gara'}</span>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-sans font-bold text-midnight dark:text-cream mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-indigo dark:text-saffron" /> Star Details (Nakshatra)
                </h3>
                <div className="space-y-3 pl-2 border-l-2 border-indigo/20 dark:border-saffron/20">
                  <div className="pl-4 relative">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-indigo dark:bg-saffron" />
                    <p className="text-[13px] font-semibold text-purple-700 dark:text-saffron flex justify-between items-center">
                      {panchangData?.nakshatra?.NakshatraName || 'Avittam'}
                      <span className="text-[10px] bg-purple-500/10 dark:bg-saffron/10 px-2 py-0.5 rounded text-purple-600 dark:text-saffron/80 uppercase tracking-wider">Active</span>
                    </p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">
                      {formatDateRange(panchangData?.nakshatra?.NakshatraStart, panchangData?.nakshatra?.NakshatraEnd) || 'Jul 03, 11:46 AM — Jul 04, 01:43 PM'}
                    </p>
                  </div>
                  <div className="pl-4 relative opacity-80">
                    <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <p className="text-[13px] font-semibold text-midnight dark:text-cream">
                      {panchangData?.nakshatra?.NextNakshatraName || 'Sadhayam'}
                    </p>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">
                      {formatDateRange(panchangData?.nakshatra?.NakshatraEnd, panchangData?.nakshatra?.NextToNextNakshatraEnd || panchangData?.nakshatra?.NextNakshatraEnd) || 'Jul 04, 01:43 PM — Jul 05, 03:12 PM'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Auspicious Quick Info */}
              <div className="pt-4 space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 min-w-[50px] pt-[2px]">To Do</span>
                  <span className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {todayContentData?.DosDonts?.Dos || 'Monetary transactions, litigation, progressive acts'}
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 min-w-[50px] pt-[2px]">Avoid</span>
                  <span className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {todayContentData?.DosDonts?.Donts || 'Travel, new meetings, important signings'}
                  </span>
                </div>
              </div>

            </div>

            {/* Column 3: Beautiful Live Chart adapted for both themes */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-6">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-cream font-bold mb-6 flex items-center gap-3 w-full justify-center lg:justify-end">
                Chart of Now
                <span className="h-[1px] w-4 bg-purple/20 dark:bg-gold/20" />
              </h3>

              <div className="bg-white/80 dark:bg-[#080b1a] rounded-2xl p-6 w-full max-w-[280px] flex flex-col items-center justify-center relative overflow-hidden border border-purple/10 dark:border-gold/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] dark:shadow-2xl transition-colors duration-500">
                {/* Chart ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-purple/10 dark:bg-gold/10 blur-[50px] rounded-full pointer-events-none transition-colors duration-500" />

                {/* South Indian Chart Grid (4x4) */}
                <div className="grid grid-cols-4 grid-rows-4 gap-[2px] bg-purple/20 dark:bg-gold/30 p-[2px] relative z-10 w-full aspect-square rounded-sm mx-auto shadow-[0_0_20px_rgba(104,105,249,0.05)] dark:shadow-[0_0_30px_rgba(251,191,36,0.05)] transition-colors duration-500">
                  {/* Row 1 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex flex-wrap items-center justify-center p-1 relative overflow-hidden group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <div className="absolute top-0 left-0 border-t-2 border-l-2 border-purple/30 dark:border-gold/50 w-2 h-2 opacity-50" />
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(11).join(' ')}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(0).join(' ')}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(1).join(' ')}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(2).join(' ')}</span>
                  </div>

                  {/* Row 2 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(10).join(' ')}</span>
                  </div>
                  <div className="col-span-2 row-span-2 bg-ivory/50 dark:bg-[#080b1a] flex flex-col items-center justify-center relative border border-purple/5 dark:border-gold/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple/5 dark:from-indigo/5 to-transparent pointer-events-none" />
                    <Clock className="w-5 h-5 text-purple/40 dark:text-gold/30 mb-1" />
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-cream/30 text-center">Live Sky<br />over {locationName.split(',')[0]}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(3).join(' ')}</span>
                  </div>

                  {/* Row 3 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(9).join(' ')}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(4).join(' ')}</span>
                  </div>

                  {/* Row 4 */}
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(8).join(' ')}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(7).join(' ')}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(6).join(' ')}</span>
                  </div>
                  <div className="bg-white dark:bg-[#0c0f24] flex items-center justify-center p-1 relative group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-cream/60 group-hover:text-purple dark:group-hover:text-gold transition-colors font-bold dark:font-semibold text-center">{getPlanetsForSign(5).join(' ')}</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center lg:text-right max-w-[280px]">
                The chart updates in real-time according to Sidereal calculations.
              </p>
            </div>
          </div>

          {/* CTA Footer */}
          {/* <div className="mt-12 pt-8 border-t border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.2)] flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-500 text-white font-sans text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-purple-400 transition-colors shadow-[0_4px_14px_0_rgba(168,85,247,0.39)]"
            >
              Get Your Tamil Horoscope
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div> */}

        </motion.div>
      </div>
    </section>
  );
}