import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Calendar, Clock, Sun, Sunset, Moon, MoonStar, Star, Info } from 'lucide-react';
import { Country } from '../../utils/countries';

import { fetchPanchangData, CITIES } from '../../services/panchangService';
import { ZODIAC_SIGNS } from '../../utils/data';

const NAKSHATRAS = [
  "", "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "PurvaPhalguni", "UttaraPhalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "PurvaAshadha", "UttaraAshadha", "Shravana", "Dhanishta", "Shatabhisha", "PurvaBhadrapada", "UttaraBhadrapada", "Revati"
];

const SIGN_TO_GRID_MAP: Record<number, number> = {
  1: 1,   // Aries
  2: 2,   // Taurus
  3: 3,   // Gemini
  4: 7,   // Cancer
  5: 11,  // Leo
  6: 15,  // Virgo
  7: 14,  // Libra
  8: 13,  // Scorpio
  9: 12,  // Sagittarius
  10: 8,  // Capricorn
  11: 4,  // Aquarius
  12: 0,  // Pisces
};

const CELL_TO_SIGN_MAP: Record<number, number> = {
  0: 12, // Pisces
  1: 1,  // Aries
  2: 2,  // Taurus
  3: 3,  // Gemini
  4: 11, // Aquarius
  7: 4,  // Cancer
  8: 10, // Capricorn
  11: 5, // Leo
  12: 9, // Sagittarius
  13: 8, // Scorpio
  14: 7, // Libra
  15: 6  // Virgo
};

const SIGN_NAMES: Record<number, string> = {
  1: "Aries", 2: "Taurus", 3: "Gemini", 4: "Cancer", 5: "Leo", 6: "Virgo",
  7: "Libra", 8: "Scorpio", 9: "Sagittarius", 10: "Capricorn", 11: "Aquarius", 12: "Pisces"
};

export function PremiumPanchang() {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [isLocationOpen, setIsLocationOpen] = React.useState(false);
  const [country, setCountry] = React.useState('India');
  const [city, setCity] = React.useState('Chennai');
  const [tempCountry, setTempCountry] = React.useState('IN');
  const [tempCity, setTempCity] = React.useState('Chennai');

  const [apiCities, setApiCities] = React.useState<{ name: string; displayName: string; latitude: number; longitude: number; timezone: string }[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isValidCity, setIsValidCity] = React.useState(true); // Default Chennai is valid
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showCountrySuggestions, setShowCountrySuggestions] = React.useState(false);
  const [selectedCityData, setSelectedCityData] = React.useState<{ name: string; country: string; latitude: number; longitude: number; timezone: string } | null>({
    name: "Chennai",
    country: "India",
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: "Asia/Kolkata"
  });

  const [panchangData, setPanchangData] = React.useState<any>(null);
  const [todayPanchangData, setTodayPanchangData] = React.useState<any>(null);
  const [todayContent, setTodayContent] = React.useState<any>(null);

  const [customCoordinates, setCustomCoordinates] = React.useState<{ latitude: number; longitude: number; timezone: string } | null>(null);

  React.useEffect(() => {
    if (!tempCountry || !tempCity || tempCity.length < 3 || isValidCity) {
      setApiCities([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(tempCity)}&count=20&language=en&format=json`);
        const dataJson = await response.json();

        if (!dataJson.results) {
          setApiCities([]);
          return;
        }

        // Filter by selected country and ensure it's a Populated Place
        const filteredByCountry = dataJson.results.filter((item: any) =>
          item.country_code.toLowerCase() === tempCountry.toLowerCase() &&
          (!item.feature_code || item.feature_code.startsWith('PPL'))
        );

        const formattedCities = filteredByCountry.map((item: any) => ({
          name: item.name,
          displayName: [item.name, item.admin1, item.country].filter(Boolean).join(", "),
          latitude: item.latitude,
          longitude: item.longitude,
          timezone: item.timezone
        }));

        // Remove duplicates by displayName
        const uniqueCities = Array.from(new Map(formattedCities.map((item: any) => [item.displayName, item])).values()) as any[];

        setApiCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [tempCity, tempCountry, isValidCity]);

  // Auto-detect location on mount
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          setCustomCoordinates({ latitude, longitude, timezone });

          // Reverse geocode to get city and country names
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            if (data && data.address) {
              const detectedCity = data.address.city || data.address.town || data.address.village || "Detected Location";
              const detectedCountry = data.address.country || "";
              setCity(detectedCity);
              setCountry(detectedCountry);
            }
          } catch (err) {
            console.error("Error reverse geocoding location:", err);
            setCity("Detected Location");
            setCountry("");
          }
        },
        (error) => {
          console.log("Geolocation permission denied or failed, falling back to default city:", error.message);
        }
      );
    }
  }, []);

  React.useEffect(() => {
    const fetchTodayPanchang = async () => {
      try {
        const { panchangData: dataPanchang } = await fetchPanchangData(city, new Date(), customCoordinates || undefined);
        setTodayPanchangData(dataPanchang);
      } catch (err) {
        console.error("Error fetching today's panchang data:", err);
      }
    };
    fetchTodayPanchang();
  }, [city, country, customCoordinates]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { panchangData: dataPanchang, todayContent: dataContent } = await fetchPanchangData(city, selectedDate, customCoordinates || undefined);
        setPanchangData(dataPanchang);
        setTodayContent(dataContent);
      } catch (err) {
        console.error("Error fetching Panchangam data:", err);
      }
    };
    fetchData();
  }, [selectedDate, city, country, customCoordinates]);


  const getCityTimeZone = () => {
    if (customCoordinates) {
      return customCoordinates.timezone;
    }
    const cityTrimmed = city.trim().toLowerCase();
    const cityKey = Object.keys(CITIES).find(k => {
      const keyLower = k.toLowerCase();
      return cityTrimmed === keyLower || cityTrimmed.includes(keyLower) || keyLower.includes(cityTrimmed);
    }) || "Chennai";
    return CITIES[cityKey as keyof typeof CITIES]?.timezone || "Asia/Kolkata";
  };

  const formatTimeStr = (isoStr: string, isSunset: boolean = false) => {
    if (!isoStr) return "--:--";
    try {
      let date = new Date(isoStr);
      return date.toLocaleTimeString('en-US', {
        timeZone: getCityTimeZone(),
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return "--:--";
    }
  };

  const formatDateTimeRange = (startStr: string, endStr: string) => {
    if (!startStr || !endStr) return "";
    try {
      const start = new Date(startStr);
      const end = new Date(endStr);
      const tz = getCityTimeZone();
      const optDate = { timeZone: tz, month: 'short', day: '2-digit' } as const;
      const optTime = { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true } as const;
      return `${start.toLocaleDateString('en-US', optDate)}, ${start.toLocaleTimeString('en-US', optTime)} — ${end.toLocaleDateString('en-US', optDate)}, ${end.toLocaleTimeString('en-US', optTime)}`;
    } catch {
      return "";
    }
  };

  const formatTithiName = (name: string) => {
    if (!name) return "";
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^Krishna\s+/i, 'Krishna Paksha ')
      .replace(/^Shukla\s+/i, 'Shukla Paksha ')
      .trim();
  };

  const getPlanetDisplayName = (name: string) => {
    const names: Record<string, string> = { Lagna: 'As', Mercury: 'Me', Venus: 'Ve', Saturn: 'Sa', Jupiter: 'Ju', Rahu: 'Ra', Ketu: 'Ke', Sun: 'Su', Moon: 'Mo', Mars: 'Ma' };
    return names[name] || name.substring(0, 2);
  };

  const getNakshatraShortName = (name: string) => {
    const shortNames: Record<string, string> = {
      "Ashwini": "Ash",
      "Bharani": "Bha",
      "Krittika": "Kri",
      "Rohini": "Roh",
      "Mrigashira": "Mrig",
      "Ardra": "Ard",
      "Punarvasu": "Pun",
      "Pushya": "Pus",
      "Ashlesha": "Ashl",
      "Magha": "Mag",
      "PurvaPhalguni": "P.Pha",
      "UttaraPhalguni": "U.Pha",
      "Hasta": "Has",
      "Chitra": "Chit",
      "Swati": "Swa",
      "Vishakha": "Vis",
      "Anuradha": "Anu",
      "Jyeshtha": "Jye",
      "Mula": "Mul",
      "PurvaAshadha": "P.Ash",
      "UttaraAshadha": "U.Ash",
      "Shravana": "Shr",
      "Dhanishta": "Dha",
      "Shatabhisha": "Sha",
      "PurvaBhadrapada": "P.Bha",
      "UttaraBhadrapada": "U.Bha",
      "Revati": "Rev"
    };
    return shortNames[name] || name.substring(0, 3);
  };

  const getPlanetDegreesAndMinutes = (longValStr: string) => {
    try {
      const longVal = parseFloat(longValStr);
      const degWithinSign = longVal % 30;
      const deg = Math.floor(degWithinSign);
      const min = Math.floor((degWithinSign - deg) * 60);
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${pad(deg)}:${pad(min)}`;
    } catch {
      return "";
    }
  };



  const gridPlanets = Array.from({ length: 16 }, () => [] as any[]);
  const positionList = todayPanchangData?.PositionList || [];
  const retrogations = todayPanchangData?.RetrogationPlanetList || [];

  positionList.forEach((p: any) => {
    const longVal = parseFloat(p.LongitudeCalculations.LongitudeValue);
    const signIndex = Math.floor(longVal / 30) + 1;
    const gridIndex = SIGN_TO_GRID_MAP[signIndex];
    if (gridIndex !== undefined) {
      gridPlanets[gridIndex].push(p);
    }
  });

  const getZodiacImage = (label: string) => {
    const sign = ZODIAC_SIGNS.find(s => s.name.toLowerCase() === label.toLowerCase());
    return sign?.imageUrl || "";
  };

  const renderCellContent = (cellIdx: number) => {
    const planets = gridPlanets[cellIdx] || [];
    if (planets.length === 0) return null;
    const isMulti = planets.length > 1;

    return (
      <div className={`w-full h-full z-10 px-0.5 pb-0.5 ${isMulti ? 'grid grid-cols-2 gap-x-[1px] gap-y-[1px] pt-3 sm:pt-4 items-center justify-items-center' : 'flex flex-col items-center justify-center pt-3 sm:pt-4'}`}>
        {planets.map((p: any) => {
          const isRetro = retrogations.includes(p.PlanetPlanetName);
          const displayName = getPlanetDisplayName(p.PlanetPlanetName);
          const nakIndex = parseInt(p.LongitudeCalculations.nakshatraNumValue);
          const nakName = NAKSHATRAS[nakIndex] || "";
          const pada = p.LongitudeCalculations.nakshatraPadaValue;

          // Premium high contrast text coloring matching official charts
          const degColor = "text-blue-600 dark:text-blue-400";
          const nameColor = "text-red-750 dark:text-amber-400";
          const nakColor = "text-emerald-700 dark:text-emerald-400";

          const degMin = getPlanetDegreesAndMinutes(p.LongitudeCalculations.LongitudeValue);

          return (
            <div key={p.PlanetPlanetName} className="flex flex-col items-center leading-none text-center shrink-0">
              <span className={`font-mono font-bold ${degColor} text-[6px] sm:text-[7px] md:text-[8px]`}>
                {degMin}
              </span>
              <span className={`font-mono font-extrabold ${nameColor} text-[9px] sm:text-[10px] md:text-[11px] lg:text-[10px] xl:text-[12px] my-[0.5px]`}>
                {displayName}{isRetro ? ' R' : ''}
              </span>
              <span className={`font-semibold ${nakColor} text-[6.5px] sm:text-[7px] md:text-[8px]`}>
                {getNakshatraShortName(nakName)} {pada}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCell = (cellIdx: number) => {
    const signId = CELL_TO_SIGN_MAP[cellIdx];
    const signName = SIGN_NAMES[signId];
    return (
      <div className="bg-white dark:bg-[#0c0f24] flex flex-col items-center justify-center relative overflow-hidden group hover:bg-purple/5 dark:hover:bg-indigo/20 transition-colors cursor-default aspect-square w-full border border-purple/5 dark:border-white/5">
        {signName && (
          <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1.5 flex items-center gap-[2px] sm:gap-1 select-none z-20">
            <img src={getZodiacImage(signName)} alt={signName} className="w-3 h-3 sm:w-4 sm:h-4 object-contain" />
            <span className="text-[7.5px] sm:text-[9px] font-sans font-extrabold text-slate-700 dark:text-slate-350 uppercase tracking-wider">{signName.substring(0, 3)}</span>
          </div>
        )}
        {renderCellContent(cellIdx)}
      </div>
    );
  };

  const renderDetailItem = (
    title: React.ReactNode,
    timeRange: string,
    bulletColor: string,
    isNext = false,
    extraIcon?: React.ReactNode
  ) => (
    <div className={`pl-3.5 relative ${isNext ? 'opacity-70' : ''}`}>
      <div className={`absolute top-1.5 -left-[4.5px] w-2 h-2 rounded-full ${bulletColor}`} />
      <p className="text-[12px] font-semibold text-midnight dark:text-cream flex items-center gap-2">
        {title}
        {extraIcon}
      </p>
      <p className="text-[10px] font-mono text-slate-650 dark:text-slate-350 font-semibold mt-0.5">
        {timeRange}
      </p>
    </div>
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    const prevDays = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      prevDays.push({
        day: prevMonthTotalDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthTotalDays - i)
      });
    }

    const currentDays = [];
    for (let i = 1; i <= totalDays; i++) {
      currentDays.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }

    const remainingCells = 42 - (prevDays.length + currentDays.length);
    const nextDays = [];
    for (let i = 1; i <= remainingCells; i++) {
      nextDays.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return [...prevDays, ...currentDays, ...nextDays];
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  return (
    <section className="relative py-2 md:py-4 overflow-hidden" id="daily-panchang">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-indigo/5 dark:bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 px-2 sm:px-0">
          <p className="font-sans text-[11px] sm:text-xs font-bold tracking-widest text-amber-600 dark:text-amber-500 uppercase mb-3">
            DAILY TIMINGS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight dark:text-cream leading-tight mb-4 font-bold">
            Today's Panchang <br className="hidden sm:block" />
            <em className="text-amber-600 dark:text-amber-500 italic mt-1 inline-block">Your Auspicious Timings.</em>
          </h2>
          <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Live for <strong className="font-bold text-slate-800 dark:text-slate-200">New Delhi</strong> (auto-detected). Timings update automatically for your location.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#0c0f24] rounded-[1.5rem] p-3 lg:p-4.5 relative overflow-hidden shadow-xl border border-black/5 dark:border-amber-500/40 dark:shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:border-[#facc15]/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-all duration-500"
        >
          {/* Top Astronomical Header Bar */}
          <div className="flex flex-col xl:flex-row justify-between items-center gap-4 border-b border-black/5 dark:border-amber-500/40 pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-orange-500 flex items-center justify-center shadow-lg shadow-gold/20 shrink-0">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-sans text-xl md:text-2xl text-midnight dark:text-cream font-bold tracking-wide">
                  Panchang
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                  <div className="relative">
                    <button
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="flex items-center gap-1.5 hover:text-purple dark:hover:text-gold transition-colors font-semibold text-slate-600 dark:text-slate-300"
                    >
                      <Calendar className="w-3.5 h-3.5 text-purple dark:text-gold" />
                      {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </button>

                    {isCalendarOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsCalendarOpen(false)} />
                        <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 mt-2 w-64 bg-white dark:bg-[#0c0f24] rounded-2xl border border-black/10 dark:border-amber-500/30 shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="flex justify-between items-center mb-3">
                            <button
                              type="button"
                              onClick={() => changeMonth(-1)}
                              className="w-6 h-6 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold"
                            >
                              &laquo;
                            </button>
                            <span className="font-sans font-bold text-midnight dark:text-cream text-xs">
                              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                            <button
                              type="button"
                              onClick={() => changeMonth(1)}
                              className="w-6 h-6 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold"
                            >
                              &raquo;
                            </button>
                          </div>

                          <div className="grid grid-cols-7 gap-0.5 text-center mb-1.5">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                              <span key={day} className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                                {day}
                              </span>
                            ))}
                          </div>

                          <div className="grid grid-cols-7 gap-0.5">
                            {getDaysInMonth(currentMonth).map((cell, idx) => {
                              const isSelected = selectedDate.getDate() === cell.date.getDate() &&
                                selectedDate.getMonth() === cell.date.getMonth() &&
                                selectedDate.getFullYear() === cell.date.getFullYear();
                              const today = new Date();
                              const isToday = today.getDate() === cell.date.getDate() &&
                                today.getMonth() === cell.date.getMonth() &&
                                today.getFullYear() === cell.date.getFullYear();
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDate(cell.date);
                                    setIsCalendarOpen(false);
                                  }}
                                  className={`aspect-square text-[11px] font-sans font-semibold rounded-md flex items-center justify-center transition-all ${isSelected
                                    ? 'bg-purple text-white dark:bg-gold dark:text-black font-bold'
                                    : isToday
                                      ? 'border border-purple/60 dark:border-gold/60 bg-purple/10 dark:bg-gold/10 text-purple dark:text-gold font-bold'
                                      : cell.isCurrentMonth
                                        ? 'text-slate-700 dark:text-cream hover:bg-slate-100 dark:hover:bg-white/10'
                                        : 'text-slate-300 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-white/5'
                                    }`}
                                >
                                  {cell.day}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-purple/30 dark:text-gold/30">&bull;</span>
                  <div className="relative">
                    <button
                      onClick={() => {
                        if (!isLocationOpen) {
                          setTempCity(city);
                          const foundCountry = Country.getAllCountries().find(c => c.name.toLowerCase() === country.toLowerCase());
                          setTempCountry(foundCountry ? foundCountry.isoCode : 'IN');
                          setIsValidCity(true);
                        }
                        setIsLocationOpen(!isLocationOpen);
                      }}
                      className="flex items-center gap-1.5 hover:text-indigo dark:hover:text-saffron transition-colors font-semibold text-slate-600 dark:text-slate-300"
                    >
                      <MapPin className="w-3.5 h-3.5 text-indigo dark:text-saffron" />
                      {city ? `${city}, ${country || 'India'}` : 'Chennai, India'}
                    </button>

                    {isLocationOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsLocationOpen(false)} />
                        <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 mt-2 w-64 bg-white dark:bg-[#0c0f24] rounded-2xl border border-black/10 dark:border-amber-500/30 shadow-2xl p-4 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          <h4 className="text-[12px] font-bold text-slate-500 dark:text-slate-400 font-sans">Update Location</h4>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Country</label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setShowCountrySuggestions(!showCountrySuggestions)}
                                className="w-full text-left text-xs bg-slate-50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg p-2 text-slate-700 dark:text-cream focus:outline-none focus:border-indigo flex justify-between items-center"
                              >
                                {tempCountry ? Country.getCountryByCode(tempCountry)?.name : '--Select Country--'}
                                <span className="text-[10px] opacity-50">▼</span>
                              </button>
                              <AnimatePresence>
                                {showCountrySuggestions && (
                                  <motion.ul
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#0c0f24] border border-black/10 dark:border-amber-500/30 rounded-lg shadow-xl py-1 text-xs"
                                  >
                                    {Country.getAllCountries().map((c) => (
                                      <li
                                        key={c.isoCode}
                                        onClick={() => {
                                          setTempCountry(c.isoCode);
                                          setTempCity('');
                                          setIsValidCity(false);
                                          setShowCountrySuggestions(false);
                                        }}
                                        className="px-3 py-1.5 text-left text-slate-700 dark:text-slate-350 font-medium hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
                                      >
                                        {c.name}
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 relative">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">City</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={tempCity}
                                placeholder="Enter City"
                                onChange={(e) => {
                                  setTempCity(e.target.value);
                                  setIsValidCity(false);
                                  setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                disabled={!tempCountry}
                                className="w-full text-xs bg-slate-50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg p-2 text-slate-700 dark:text-cream focus:outline-none focus:border-indigo disabled:opacity-50"
                                autoComplete="off"
                              />
                              <AnimatePresence>
                                {showSuggestions && tempCity.length >= 3 && (
                                  <motion.ul
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#0c0f24] border border-black/10 dark:border-amber-500/30 rounded-lg shadow-xl py-1 text-xs"
                                  >
                                    {isSearching ? (
                                      <li className="px-3 py-2 text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-3.5 w-3.5 text-indigo dark:text-saffron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Searching...
                                      </li>
                                    ) : apiCities.length > 0 ? (
                                      apiCities.map((cityData, idx) => (
                                        <li
                                          key={`${cityData.displayName}-${idx}`}
                                          onMouseDown={(e) => e.preventDefault()}
                                          onClick={() => {
                                            setTempCity(cityData.name);
                                            setSelectedCityData({
                                              name: cityData.name,
                                              country: Country.getCountryByCode(tempCountry)?.name || tempCountry,
                                              latitude: cityData.latitude,
                                              longitude: cityData.longitude,
                                              timezone: cityData.timezone
                                            });
                                            setIsValidCity(true);
                                            setShowSuggestions(false);
                                          }}
                                          className="px-3 py-1.5 text-left text-slate-700 dark:text-slate-350 font-medium hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
                                        >
                                          <span className="block font-bold text-slate-900 dark:text-cream">{cityData.name}</span>
                                          <span className="block text-[9px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{cityData.displayName}</span>
                                        </li>
                                      ))
                                    ) : (
                                      <li className="px-3 py-2 text-slate-500 dark:text-slate-400 text-center">
                                        No cities found.
                                      </li>
                                    )}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (tempCountry && (!tempCity || !isValidCity)) {
                                alert("Please select a valid city from the suggested list.");
                                return;
                              }
                              setCity(tempCity);
                              const countryObj = Country.getCountryByCode(tempCountry);
                              setCountry(countryObj ? countryObj.name : tempCountry);

                              if (selectedCityData && selectedCityData.name === tempCity) {
                                setCustomCoordinates({
                                  latitude: selectedCityData.latitude,
                                  longitude: selectedCityData.longitude,
                                  timezone: selectedCityData.timezone
                                });
                              } else {
                                setCustomCoordinates(null);
                              }
                              setIsLocationOpen(false);
                            }}
                            className="mt-1 w-full bg-purple hover:bg-purple-600 text-white font-sans text-xs py-2 rounded-lg font-bold transition-colors"
                          >
                            Apply Location
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Astronomy Ticker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/60 dark:bg-[#0c0f24]/50 backdrop-blur-md px-4 py-2.5 rounded-xl border border-purple/10 dark:border-amber-500/30 w-full xl:w-auto shadow-sm dark:shadow-none items-center">
              <div className="flex items-center gap-1.5 w-full justify-center sm:justify-start">
                <Sun className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-slate-650 dark:text-slate-350">Sunrise</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTimeStr(panchangData?.SunriseTime)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-center sm:justify-start">
                <Sunset className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-slate-650 dark:text-slate-350">Sunset</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTimeStr(panchangData?.SunsetTime, true)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-center sm:justify-start">
                <Moon className="w-4.5 h-4.5 text-purple-500 dark:text-purple-300 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-slate-650 dark:text-slate-350">Moonrise</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTimeStr(panchangData?.MoonsetTime)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-center sm:justify-start">
                <MoonStar className="w-4.5 h-4.5 text-purple-500 dark:text-purple-300 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-slate-650 dark:text-slate-350">Moonset</span>
                  <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTimeStr(panchangData?.MoonriseTime)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

            {/* Left Side: Interactive Panchang Dashboard (7 columns) */}
            <div className="lg:col-span-7 flex flex-col justify-start bg-white dark:bg-[#0c0f24]/30 p-3.5 rounded-[1.5rem] border border-black/5 dark:border-amber-500/30 shadow-sm space-y-3.5">

              {/* Day Key Attributes Header */}
              <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-black/5 dark:border-white/5">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-650 dark:text-slate-450 pr-1">Attributes:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-purple/10 dark:bg-gold/10 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-purple dark:text-gold border border-purple/20 dark:border-gold/20">
                    <Moon className="w-3.5 h-3.5" /> Phase: {panchangData?.tithi?.MoonPhase || "--"}{panchangData?.tithi?.TithiEnd ? ` Up to ${new Date(panchangData.tithi.TithiEnd).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}, ${formatTimeStr(panchangData.tithi.TithiEnd)}` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-indigo/10 dark:bg-saffron/10 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-indigo dark:text-saffron border border-indigo/20 dark:border-saffron/20">
                    <Star className="w-3.5 h-3.5" /> Yoga: {panchangData?.yoga ? `${panchangData.yoga.YogaName} Up to ${new Date(panchangData.yoga.YogaEnd).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}, ${formatTimeStr(panchangData.yoga.YogaEnd)}` : "--"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/20 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5" /> Karana: {panchangData?.karana ? `${panchangData.karana.KaranaName} Up to ${new Date(panchangData.karana.KaranaEnd).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}, ${formatTimeStr(panchangData.karana.KaranaEnd)}` : "--"}
                  </span>
                </div>
              </div>

              {/* Tithi & Nakshatra Grid (Original Design Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
                {/* Lunar Day (Tithi) */}
                <div className="space-y-3">
                  <h3 className="text-[13px] font-sans font-bold text-midnight dark:text-cream flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5 text-purple dark:text-gold" /> Lunar Day (Tithi)
                  </h3>
                  <div className="space-y-3.5 pl-2 border-l border-purple/20 dark:border-gold/20">
                    {renderDetailItem(
                      panchangData?.tithi?.TithiName ? formatTithiName(panchangData.tithi.TithiName) : "--",
                      formatDateTimeRange(panchangData?.tithi?.TithiStart, panchangData?.tithi?.TithiEnd),
                      "bg-purple dark:bg-gold",
                      false,
                      <span className="w-3 h-3 rounded-full border border-midnight dark:border-cream flex items-center justify-center overflow-hidden">
                        <span className="w-1.5 h-3 bg-midnight dark:bg-cream block mr-auto"></span>
                      </span>
                    )}
                    {renderDetailItem(
                      panchangData?.tithi?.NextTithiName ? formatTithiName(panchangData.tithi.NextTithiName) : "--",
                      formatDateTimeRange(panchangData?.tithi?.TithiEnd, panchangData?.tithi?.NextTithiEnd),
                      "bg-slate-300 dark:bg-slate-700",
                      true
                    )}
                  </div>
                </div>

                {/* Star Details (Nakshatra) */}
                <div className="space-y-3">
                  <h3 className="text-[13px] font-sans font-bold text-midnight dark:text-cream flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-indigo dark:text-saffron" /> Star Details (Nakshatra)
                  </h3>
                  <div className="space-y-3.5 pl-2 border-l border-indigo/20 dark:border-saffron/20">
                    {renderDetailItem(
                      panchangData?.nakshatra?.NakshatraName || "--",
                      formatDateTimeRange(panchangData?.nakshatra?.NakshatraStart, panchangData?.nakshatra?.NakshatraEnd),
                      "bg-indigo dark:bg-saffron"
                    )}
                    {renderDetailItem(
                      panchangData?.nakshatra?.NextNakshatraName || "--",
                      formatDateTimeRange(panchangData?.nakshatra?.NakshatraEnd, panchangData?.nakshatra?.NextNakshatraEnd),
                      "bg-slate-300 dark:bg-slate-700",
                      true
                    )}
                  </div>
                </div>
              </div>

              {/* Timings Grid (styled exactly like Lunar & Star columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left border-t border-black/5 dark:border-white/5 pt-6">

                {/* Timings (Hora) */}
                <div className="space-y-3">
                  <h3 className="text-[13px] font-sans font-bold text-midnight dark:text-cream flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple dark:text-gold" /> Daily Timings (Hora)
                  </h3>
                  <div className="space-y-3.5 pl-2 border-l border-purple/20 dark:border-gold/20">
                    {/* Hora */}
                    <div className="pl-3.5 relative">
                      <div className="absolute top-1.5 -left-[4.5px] w-2 h-2 rounded-full bg-purple dark:bg-gold" />
                      <p className="text-[12px] font-semibold text-midnight dark:text-cream flex items-center gap-2">
                        Current Hora
                      </p>
                      <p className="text-[10px] text-slate-650 dark:text-slate-300 mt-0.5">
                        {todayPanchangData?.Horas ? (() => {
                          const now = new Date();
                          const current = todayPanchangData.Horas.find((h: any) => {
                            const start = new Date(h.StartTime);
                            const end = new Date(h.EndTime);
                            return now >= start && now <= end;
                          });
                          if (!current) return "--";
                          const endDate = new Date(current.EndTime);
                          const dateStr = `${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, `;
                          return `${current.HoraName} Up to ${dateStr}${formatTimeStr(current.EndTime)}`;
                        })() : "--"}
                      </p>
                    </div>
                  </div>

                  {/* To Do & Avoid Guidelines */}
                  <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 text-left">
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-purple dark:text-gold bg-purple/10 dark:bg-gold/10 border border-purple/20 dark:border-gold/20 px-1.5 py-0.5 rounded shrink-0">To Do</span>
                      <p className="text-[11px] text-slate-750 dark:text-slate-250 mt-0.5 leading-relaxed font-semibold">
                        {todayContent?.DosDonts?.Dos || "Spiritual Practices, Competition, Campaign"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-purple dark:text-gold bg-purple/10 dark:bg-gold/10 border border-purple/20 dark:border-gold/20 px-1.5 py-0.5 rounded shrink-0">Avoid</span>
                      <p className="text-[11px] text-slate-750 dark:text-slate-250 mt-0.5 leading-relaxed font-semibold">
                        {todayContent?.DosDonts?.Donts || "Contract Signing, Doctors Visits, Auspicious Events"}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Kalas (Rahu, Yama, Kuligai) */}
                <div className="space-y-2">
                  <h3 className="text-[13px] font-sans font-bold text-midnight dark:text-cream flex items-center gap-2">
                    <Sun className="w-3.5 h-3.5 text-indigo dark:text-saffron" /> Kalas (Auspicious / Inauspicious)
                  </h3>
                  <div className="space-y-2.5 pl-2 border-l border-indigo/20 dark:border-saffron/20">
                    {renderDetailItem(
                      "Rahu Kalam (Poison Time)",
                      panchangData?.specialKalas ? `${formatTimeStr(panchangData.specialKalas.PoisonTimeStart)} to ${formatTimeStr(panchangData.specialKalas.PoisonTimeEnd)}` : "--",
                      "bg-purple dark:bg-gold"
                    )}
                    {renderDetailItem(
                      "Yamagandam (Danger Time)",
                      panchangData?.specialKalas ? `${formatTimeStr(panchangData.specialKalas.DangerTimeStart)} to ${formatTimeStr(panchangData.specialKalas.DangerTimeEnd)}` : "--",
                      "bg-purple dark:bg-gold"
                    )}
                    {renderDetailItem(
                      "Kuligai (Good Time)",
                      panchangData?.specialKalas ? `${formatTimeStr(panchangData.specialKalas.GoodTimeStart)} to ${formatTimeStr(panchangData.specialKalas.GoodTimeEnd)}` : "--",
                      "bg-purple dark:bg-gold"
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Right Side: Live Sky Chart (5 columns) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white dark:bg-[#0c0f24]/30 p-2 sm:p-4 rounded-[1.5rem] border border-black/5 dark:border-amber-500/30 shadow-sm self-center w-full">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-cream font-bold mb-2 flex items-center gap-2 justify-center w-full">
                Chart of Now
                <span className="h-[1px] w-3 bg-purple/20 dark:bg-gold/20"></span>
              </h3>

              <div className="bg-white/85 dark:bg-[#080b1a] rounded-2xl p-2 sm:p-4 w-full max-w-[430px] flex flex-col items-center justify-center relative overflow-hidden border border-black/5 dark:border-gold/10 shadow-sm transition-colors duration-500">
                {/* South Indian Chart Grid (4x4) */}
                <div className="grid grid-cols-4 grid-rows-4 gap-[2px] bg-purple/40 dark:bg-gold/50 p-[2px] relative z-10 w-full aspect-square rounded-sm mx-auto shadow-sm">
                  {/* Row 1 */}
                  {/* Pisces (top-left) */}
                  {renderCell(0)}
                  {/* Aries (top-second) */}
                  {renderCell(1)}
                  {/* Taurus (top-third) */}
                  {renderCell(2)}
                  {/* Gemini (top-right) */}
                  {renderCell(3)}

                  {/* Row 2 */}
                  {/* Aquarius (left-second) */}
                  {renderCell(4)}
                  {/* Center Box */}
                  <div className="col-span-2 row-span-2 bg-[#fdfbf7] dark:bg-[#080b1a] flex flex-col items-center justify-center relative border border-purple/5 dark:border-gold/10 p-2">
                    <span className="text-[10px] font-sans font-bold text-indigo dark:text-gold text-center leading-tight">Birth Chart<br />(Rasi Chart)</span>
                    <span className="text-[7.5px] font-mono uppercase tracking-wider text-slate-650 dark:text-slate-400 text-center mt-1">{city}</span>
                  </div>
                  {/* Cancer (right-second) */}
                  {renderCell(7)}

                  {/* Row 3 */}
                  {/* Capricorn (left-third) */}
                  {renderCell(8)}
                  {/* Leo (right-third) */}
                  {renderCell(11)}

                  {/* Row 4 */}
                  {/* Sagittarius (bottom-left) */}
                  {renderCell(12)}
                  {/* Scorpio (bottom-second) */}
                  {renderCell(13)}
                  {/* Libra (bottom-third) */}
                  {renderCell(14)}
                  {/* Virgo (bottom-right) */}
                  {renderCell(15)}
                </div>
              </div>
            </div>
          </div>



        </motion.div>
      </div>
    </section>
  );
}
