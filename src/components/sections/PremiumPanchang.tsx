import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Sun, Sunset, Moon, MoonStar, Star, ChevronDown } from 'lucide-react';
import { COUNTRIES } from '../../utils/countries';
import * as Styles from './styles/premiumPanchangStyles';

export function PremiumPanchang() {
    const [panchangData, setPanchangData] = useState<any>(null);
    const [todayContentData, setTodayContentData] = useState<any>(null);
    const [locationName, setLocationName] = useState<string>('Chennai, India');
    const [coordinates, setCoordinates] = useState({ lat: 13.08784, lng: 80.27847 });
    const [timezone, setTimezone] = useState<string>(() => {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
        } catch (e) {
            return 'Asia/Kolkata';
        }
    });
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Custom Calendar & Location popover states
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
    const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
    const [tempCountry, setTempCountry] = useState('India');
    const [tempCity, setTempCity] = useState('Chennai');
    const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
    const [isSearchingCities, setIsSearchingCities] = useState(false);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const handleOutsideClick = () => {
            setIsCalendarOpen(false);
            setIsLocationOpen(false);
            setCitySuggestions([]);
        };
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    // Fetch city suggestions dynamically as user types with debounce
    useEffect(() => {
        if (!tempCity.trim()) {
            setCitySuggestions([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                setIsSearchingCities(true);
                const response = await fetch(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${encodeURIComponent(tempCountry)}/${encodeURIComponent(tempCity)}`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        // Sort suggestions alphabetically by City name
                        const sorted = [...data].sort((a: any, b: any) => {
                            const cityA = a.City || '';
                            const cityB = b.City || '';
                            return cityA.localeCompare(cityB);
                        });
                        setCitySuggestions(sorted);
                    } else {
                        setCitySuggestions([]);
                    }
                } else {
                    setCitySuggestions([]);
                }
            } catch (err) {
                console.error("Error fetching city autocomplete suggestions:", err);
                setCitySuggestions([]);
            } finally {
                setIsSearchingCities(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [tempCity, tempCountry]);

    /**
     * Formats an ISO string to a readable 12-hour time format.
     * @param {string} [isoString] - The ISO date string to format.
     * @returns {string} - The formatted time string, e.g., '05:51 AM'.
     */
    const formatTime = (isoString?: string) => {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        } catch (e) {
            return '';
        }
    };

    /**
     * Formats a start and end ISO string into a readable date range.
     * @param {string} [start] - The start date ISO string.
     * @param {string} [end] - The end date ISO string.
     * @returns {string} - The formatted date range.
     */
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

    /**
     * Converts camelCase or PascalCase string to spaced text.
     * @param {string} [str] - The string to format.
     * @returns {string} - The formatted readable string.
     */
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
                                const state = geoData.address.state || '';
                                const country = geoData.address.country || 'India';
                                const statePart = state ? `${state}, ` : '';
                                setLocationName(`${city}, ${statePart}${country}`);
                                setTempCity(city);
                                setTempCountry(country);

                                // Retrieve exact timezone & normalized location from Astroved API
                                try {
                                    const astrovedLocResponse = await fetch(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${encodeURIComponent(country)}/${encodeURIComponent(city)}`);
                                    if (astrovedLocResponse.ok) {
                                        const astrovedLocData = await astrovedLocResponse.json();
                                        if (Array.isArray(astrovedLocData) && astrovedLocData.length > 0) {
                                            const match = astrovedLocData[0];
                                            if (match.TimeZone) {
                                                setTimezone(match.TimeZone);
                                            }
                                            const matchStatePart = match.StateorProvince ? `${match.StateorProvince}, ` : '';
                                            setLocationName(`${match.City}, ${matchStatePart}${match.Country}`);
                                        }
                                    }
                                } catch (e) {
                                    console.error("Astroved location API failed during mount geocoding:", e);
                                }
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

    // Fetch when coordinates, date, or timezone changes
    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                let tz = timezone;
                const encodedTz = btoa(tz).replace(/=/g, '');

                const dateObj = new Date(selectedDate);
                const now = new Date();
                dateObj.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
                const tzOffset = dateObj.getTimezoneOffset() * 60000;
                const localISOTime = new Date(dateObj.getTime() - tzOffset).toISOString().split('.')[0];

                const panchangUrl = `https://api.astroved.com/node/newpanchangam/${encodedTz}/${coordinates.lat}/${coordinates.lng}/${localISOTime}`;
                const contentUrl = `https://api.astroved.com/node/todaycontent/${encodedTz}/${coordinates.lat}/${coordinates.lng}/${localISOTime}`;

                const [panchangResponse, contentResponse] = await Promise.all([
                    fetch(panchangUrl),
                    fetch(contentUrl)
                ]);

                if (panchangResponse.ok) {
                    const panchangData = await panchangResponse.json();
                    if (active) {
                        setPanchangData(panchangData);
                    }
                } else {
                    console.error(`Panchang API returned error: ${panchangResponse.status}`);
                }

                if (contentResponse.ok) {
                    const contentData = await contentResponse.json();
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
    }, [coordinates, selectedDate, timezone]);

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

                    // Try resolving timezone via Astroved API since nominatim succeeded
                    if (city && country) {
                        try {
                            const astrovedLocResponse = await fetch(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${encodeURIComponent(country)}/${encodeURIComponent(city)}`);
                            if (astrovedLocResponse.ok) {
                                const astrovedLocData = await astrovedLocResponse.json();
                                if (Array.isArray(astrovedLocData) && astrovedLocData.length > 0) {
                                    const match = astrovedLocData[0];
                                    if (match.TimeZone) {
                                        setTimezone(match.TimeZone);
                                    }
                                    const matchStatePart = match.StateorProvince ? `${match.StateorProvince}, ` : '';
                                    setLocationName(`${match.City}, ${matchStatePart}${match.Country}`);
                                }
                            }
                        } catch (e) {
                            console.error("Astroved location API lookup inside handleLocationSearch failed:", e);
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Geocoding query failed:", err);
        }
    };

    /**
     * Calculates the days to display in the calendar picker for a given month/year.
     * @param {number} year - The target year.
     * @param {number} month - The target month.
     * @returns {Array} - Array of objects representing the days to display.
     */
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
        try {
            // Try Astroved's PopulateCityBycountry API first
            const response = await fetch(`https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry/${encodeURIComponent(tempCountry)}/${encodeURIComponent(tempCity)}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    const match = data[0];
                    const newLat = parseFloat(match.Latitude);
                    const newLng = parseFloat(match.Longitude);
                    setCoordinates({ lat: newLat, lng: newLng });
                    if (match.TimeZone) {
                        setTimezone(match.TimeZone);
                    }
                    const matchStatePart = match.StateorProvince ? `${match.StateorProvince}, ` : '';
                    setLocationName(`${match.City}, ${matchStatePart}${match.Country}`);
                    return;
                }
            }
        } catch (err) {
            console.error("Astroved location API failed, falling back to Nominatim:", err);
        }

        // Fallback: search using OSM Nominatim
        const query = `${tempCity}, ${tempCountry}`;
        await handleLocationSearch(query);
    };

    const planetAbbrs: Record<string, string> = {
        'Sun': 'Su', 'Moon': 'Mo', 'Mars': 'Ma', 'Mercury': 'Me',
        'Jupiter': 'Ju', 'Venus': 'Ve', 'Saturn': 'Sa', 'Rahu': 'Ra', 'Ketu': 'Ke', 'Lagna': 'Asc'
    };

    /**
     * Maps an astrological sign index to the planets occupying it.
     * @param {number} signIndex - The zodiac sign index (0-11).
     * @returns {string[]} - Array of abbreviated planet names in the sign.
     */
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
        <section className={Styles.SECTION_STYLES} id="daily-panchang">
            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.8);
        }
      `}</style>
            {/* Background glow */}
            <div className={Styles.BACKGROUND_GLOW_STYLES} />

            <div className={Styles.CONTENT_WRAPPER_STYLES}>
                <div className={Styles.HEADER_CONTAINER_STYLES}>
                    <p className={Styles.HEADER_SUBTITLE_STYLES}>
                        DAILY TIMINGS
                    </p>
                    <h2 className={Styles.HEADER_TITLE_STYLES}>
                        Today's Panchang — <em className={Styles.HEADER_TITLE_HIGHLIGHT_STYLES}>Your Auspicious Timings.</em>
                    </h2>
                    <p className={Styles.HEADER_DESC_STYLES}>
                        Live for <strong className="font-bold text-gray-700 dark:text-gray-300">{locationName.split(',')[0]}</strong> (auto-detected). Timings update automatically for your location.
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={Styles.MAIN_PANEL_STYLES}
                >
                    {/* Top Astronomical Header Bar */}
                    <div className={Styles.TOP_BAR_STYLES}>
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
                                            className={Styles.DATE_LOCATION_BUTTON_STYLES}
                                        >
                                            <Calendar className="w-3.5 h-3.5 text-purple dark:text-gold" />
                                            <span>
                                                {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </button>

                                        {isCalendarOpen && (
                                            <>
                                                <div
                                                    className={Styles.POPOVER_BACKDROP_STYLES}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsCalendarOpen(false);
                                                    }}
                                                />
                                                <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={Styles.CALENDAR_POPOVER_STYLES}
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
                                                        {getCalendarDays(calendarYear, calendarMonth).map((dayObj, itemIndex) => {
                                                            const isSelected = selectedDate === `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`;
                                                            const today = new Date();
                                                            const isToday = dayObj.day === today.getDate() &&
                                                                dayObj.month === today.getMonth() &&
                                                                dayObj.year === today.getFullYear();
                                                            return (
                                                                <button
                                                                    key={itemIndex}
                                                                    onClick={() => handleSelectDay(dayObj)}
                                                                    className={Styles.getCalendarDayStyles(isSelected, isToday, dayObj.isCurrentMonth)}
                                                                >
                                                                    {dayObj.day}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <span className={Styles.DOT_DIVIDER_STYLES}>&bull;</span>

                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsLocationOpen(!isLocationOpen);
                                                setIsCalendarOpen(false);
                                            }}
                                            className={Styles.DATE_LOCATION_BUTTON_STYLES}
                                        >
                                            <MapPin className="w-3.5 h-3.5 text-indigo dark:text-saffron" />
                                            <span>{locationName}</span>
                                        </button>

                                        {isLocationOpen && (
                                            <>
                                                <div
                                                    className={Styles.POPOVER_BACKDROP_STYLES}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsLocationOpen(false);
                                                        setCitySuggestions([]);
                                                    }}
                                                />
                                                <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={Styles.LOCATION_POPOVER_STYLES}
                                                >
                                                    <h4 className="font-serif font-bold text-base text-midnight dark:text-cream">Update Location</h4>

                                                    {/* Country Dropdown */}
                                                    <div className="flex flex-col gap-1">
                                                        <label className={Styles.LOCATION_INPUT_LABEL_STYLES}>Country</label>
                                                        <div className="relative">
                                                            <select
                                                                value={tempCountry}
                                                                onChange={(e) => setTempCountry(e.target.value)}
                                                                className={Styles.LOCATION_SELECT_STYLES}
                                                            >
                                                                {COUNTRIES.map((c) => (
                                                                    <option key={c.Id} value={c.CountryName1} className="bg-white dark:bg-[#110c1c]">
                                                                        {c.CountryName1}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                        </div>
                                                    </div>

                                                    {/* City Input */}
                                                    <div className="flex flex-col gap-1 relative">
                                                        <label className={Styles.LOCATION_INPUT_LABEL_STYLES}>City</label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                value={tempCity}
                                                                onChange={(e) => setTempCity(e.target.value)}
                                                                className={Styles.LOCATION_INPUT_STYLES}
                                                                placeholder="Enter city"
                                                            />
                                                            {isSearchingCities && (
                                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                                                                    <span className="w-3.5 h-3.5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Autocomplete Suggestions */}
                                                        {citySuggestions.length > 0 && (
                                                            <div className={Styles.SUGGESTIONS_CONTAINER_STYLES}>
                                                                {citySuggestions.map((suggestion: any, itemIndex: number) => (
                                                                    <button
                                                                        key={itemIndex}
                                                                        onClick={() => {
                                                                            setTempCity(suggestion.City);
                                                                            setCoordinates({
                                                                                lat: parseFloat(suggestion.Latitude),
                                                                                lng: parseFloat(suggestion.Longitude)
                                                                            });
                                                                            if (suggestion.TimeZone) {
                                                                                setTimezone(suggestion.TimeZone);
                                                                            }
                                                                            const statePart = suggestion.StateorProvince ? `${suggestion.StateorProvince}, ` : '';
                                                                            setLocationName(`${suggestion.City}, ${statePart}${suggestion.Country}`);
                                                                            setCitySuggestions([]);
                                                                            setIsLocationOpen(false);
                                                                        }}
                                                                        className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-cream hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer font-medium"
                                                                    >
                                                                        {suggestion.City}{suggestion.StateorProvince ? `, ${suggestion.StateorProvince}` : ''}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={handleApplyLocation}
                                                        className={Styles.APPLY_LOCATION_BTN_STYLES}
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
                        <div className={Styles.ASTRO_TICKER_CONTAINER_STYLES}>
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <Sun className="w-5 h-5 text-amber-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunrise</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.SunriseTime) || '5:51 AM'}</span>
                                </div>
                            </div>
                            <div className={Styles.TICKER_DIVIDER_STYLES} />
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <Sunset className="w-5 h-5 text-amber-500" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Sunset</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.SunsetTime) || '6:35 PM'}</span>
                                </div>
                            </div>
                            <div className={Styles.TICKER_DIVIDER_STYLES} />
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <Moon className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonrise</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.MoonriseTime) || '9:54 PM'}</span>
                                </div>
                            </div>
                            <div className={Styles.TICKER_DIVIDER_STYLES} />
                            <div className={Styles.TICKER_ITEM_STYLES}>
                                <MoonStar className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-500">Moonset</span>
                                    <span className="text-xs font-mono font-semibold text-midnight dark:text-cream">{formatTime(panchangData?.MoonsetTime) || '10:00 AM'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={Styles.CONTENT_GRID_STYLES}>

                        {/* Column 1: Detailed Panchang Data */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Auspicious & Inauspicious Timings */}
                            <div className={Styles.DATA_BOX_BASE_STYLES}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[20px] rounded-full pointer-events-none" />
                                <div className="relative z-10 flex justify-between items-center">
                                    <span className={Styles.DATA_ROW_LABEL_STYLES}>Good Time (Gulikai)</span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>
                                        {panchangData?.specialKalas?.GoodTimeStart && panchangData?.specialKalas?.GoodTimeEnd
                                            ? `${formatTime(panchangData.specialKalas.GoodTimeStart)} — ${formatTime(panchangData.specialKalas.GoodTimeEnd)}`
                                            : '09:00 AM — 10:30 AM'}
                                    </span>
                                </div>
                                <div className={Styles.DATA_DIVIDER_STYLES} />
                                <div className="relative z-10 flex justify-between items-center">
                                    <span className={Styles.DATA_ROW_LABEL_STYLES}>Danger Time (Yamagandam)</span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>
                                        {panchangData?.specialKalas?.DangerTimeStart && panchangData?.specialKalas?.DangerTimeEnd
                                            ? `${formatTime(panchangData.specialKalas.DangerTimeStart)} — ${formatTime(panchangData.specialKalas.DangerTimeEnd)}`
                                            : '01:30 PM — 03:00 PM'}
                                    </span>
                                </div>
                                <div className={Styles.DATA_DIVIDER_STYLES} />
                                <div className="relative z-10 flex justify-between items-center">
                                    <span className={Styles.DATA_ROW_LABEL_STYLES}>Poison Time (Rahu Kalam)</span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>
                                        {panchangData?.specialKalas?.PoisonTimeStart && panchangData?.specialKalas?.PoisonTimeEnd
                                            ? `${formatTime(panchangData.specialKalas.PoisonTimeStart)} — ${formatTime(panchangData.specialKalas.PoisonTimeEnd)}`
                                            : '03:00 PM — 04:30 PM'}
                                    </span>
                                </div>
                            </div>

                            {/* Tithi Timings */}
                            <div>
                                <h3 className={Styles.ELEMENT_TITLE_STYLES}>
                                    <Moon className="w-4 h-4 text-purple dark:text-gold" /> Lunar Day (Tithi)
                                </h3>
                                <div className={Styles.ELEMENT_LIST_STYLES}>
                                    <div className="pl-4 relative">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-purple dark:bg-gold" />
                                        <p className={Styles.ACTIVE_ITEM_TITLE_STYLES}>
                                            {formatCamelCase(panchangData?.tithi?.TithiName) || 'Krishna Paksha Chathurthi'}
                                            <span className="w-3 h-3 rounded-full border border-midnight dark:border-cream flex items-center justify-center overflow-hidden">
                                                <span className="w-1.5 h-3 bg-midnight dark:bg-cream block mr-auto" />
                                            </span>
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
                                            {formatDateRange(panchangData?.tithi?.TithiStart, panchangData?.tithi?.TithiEnd) || 'Jul 03, 11:20 AM — Jul 04, 12:40 PM'}
                                        </p>
                                    </div>
                                    <div className="pl-4 relative opacity-80">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <p className={Styles.ACTIVE_ITEM_TITLE_STYLES}>
                                            {formatCamelCase(panchangData?.tithi?.NextTithiName) || 'Krishna Paksha Panchami'}
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
                                            {formatDateRange(panchangData?.tithi?.TithiEnd, panchangData?.tithi?.NextToNextTithiEnd || panchangData?.tithi?.NextTithiEnd) || 'Jul 04, 12:40 PM — Jul 05, 01:31 PM'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Column 2: Nakshatram & Yoga/Karana */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Additional Elements Box */}
                            <div className={Styles.DATA_BOX_ALT_STYLES}>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo/5 blur-[20px] rounded-full pointer-events-none" />
                                <div className="relative z-10 flex justify-between items-center">
                                    <span className={Styles.DATA_ROW_LABEL_STYLES}>Energy (Yoga)</span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>{panchangData?.yoga?.YogaName || 'Siddhi'}</span>
                                </div>
                                <div className={Styles.DATA_DIVIDER_STYLES} />
                                <div className="relative z-10 flex justify-between items-center">
                                    <span className={Styles.DATA_ROW_LABEL_STYLES}>Half-Lunar Day</span>
                                    <span className={Styles.DATA_ROW_VALUE_STYLES}>{panchangData?.karana?.KaranaName || 'Gara'}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className={Styles.ELEMENT_TITLE_STYLES}>
                                    <Star className="w-4 h-4 text-indigo dark:text-saffron" /> Star Details (Nakshatra)
                                </h3>
                                <div className={Styles.ELEMENT_ALT_LIST_STYLES}>
                                    <div className="pl-4 relative">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-indigo dark:bg-saffron" />
                                        <p className={Styles.ACTIVE_ALT_ITEM_TITLE_STYLES}>
                                            {panchangData?.nakshatra?.NakshatraName || 'Avittam'}
                                            <span className="text-[10px] bg-purple-500/10 dark:bg-saffron/10 px-2 py-0.5 rounded text-purple-600 dark:text-saffron/80 uppercase tracking-wider">Active</span>
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
                                            {formatDateRange(panchangData?.nakshatra?.NakshatraStart, panchangData?.nakshatra?.NakshatraEnd) || 'Jul 03, 11:46 AM — Jul 04, 01:43 PM'}
                                        </p>
                                    </div>
                                    <div className="pl-4 relative opacity-80">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <p className="text-[13px] font-semibold text-midnight dark:text-cream">
                                            {panchangData?.nakshatra?.NextNakshatraName || 'Sadhayam'}
                                        </p>
                                        <p className={Styles.ITEM_DATE_STYLES}>
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

                            <div className={Styles.CHART_CONTAINER_STYLES}>
                                {/* Chart ambient glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-purple/10 dark:bg-gold/10 blur-[50px] rounded-full pointer-events-none transition-colors duration-500" />

                                {/* South Indian Chart Grid (4x4) */}
                                <div className={Styles.CHART_GRID_STYLES}>
                                    {/* Row 1 */}
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <div className="absolute top-0 left-0 border-t-2 border-l-2 border-purple/30 dark:border-gold/50 w-2 h-2 opacity-50" />
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(11).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(0).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(1).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(2).join(' ')}</span>
                                    </div>

                                    {/* Row 2 */}
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(10).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CENTER_CHART_CELL_STYLES}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple/5 dark:from-indigo/5 to-transparent pointer-events-none" />
                                        <Clock className="w-5 h-5 text-purple/40 dark:text-gold/30 mb-1" />
                                        <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-cream/30 text-center">Live Sky<br />over {locationName.split(',')[0]}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(3).join(' ')}</span>
                                    </div>

                                    {/* Row 3 */}
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(9).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(4).join(' ')}</span>
                                    </div>

                                    {/* Row 4 */}
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(8).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(7).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(6).join(' ')}</span>
                                    </div>
                                    <div className={Styles.CHART_CELL_STYLES}>
                                        <span className={Styles.CHART_CELL_TEXT_STYLES}>{getPlanetsForSign(5).join(' ')}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center lg:text-right max-w-[280px]">
                                The chart updates in real-time according to Sidereal calculations.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}