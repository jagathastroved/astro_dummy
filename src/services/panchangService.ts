export const CITIES = {
    "Chennai": { latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata", country: "India" },
    "Mumbai": { latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata", country: "India" },
    "Delhi": { latitude: 28.6139, longitude: 77.2090, timezone: "Asia/Kolkata", country: "India" },
    "Kolkata": { latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata", country: "India" },
    "Bengaluru": { latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata", country: "India" },
    "Bangalore": { latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata", country: "India" },
    "London": { latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", country: "United Kingdom" },
    "New York": { latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York", country: "United States" },
    "Sydney": { latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", country: "Australia" },
    "Toronto": { latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto", country: "Canada" }
};

export interface PanchangServiceResult {
    panchangData: any;
    todayContent: any;
}

// Helper to get formatted date time in target city's timezone
const getFormattedDateTimeInTimezone = (date: Date, timezone: string) => {
    const padNumber = (num: number) => String(num).padStart(2, '0');

    const now = new Date();
    const timezoneFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    });

    const timezoneParts = timezoneFormatter.formatToParts(now);
    const getPartValue = (type: string) => timezoneParts.find(p => p.type === type)?.value || '00';

    const hours = getPartValue('hour');
    const minutes = getPartValue('minute');
    const seconds = getPartValue('second');

    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export async function fetchPanchangData(
    city: string,
    date: Date,
    customCoordinates?: { latitude: number; longitude: number; timezone: string }
): Promise<PanchangServiceResult> {
    let latitude: number;
    let longitude: number;
    let timezone: string;

    if (customCoordinates) {
        latitude = customCoordinates.latitude;
        longitude = customCoordinates.longitude;
        timezone = customCoordinates.timezone;
    } else {
        const cityTrimmed = city.trim().toLowerCase();
        const cityKey = Object.keys(CITIES).find(k => {
            const keyLower = k.toLowerCase();
            return cityTrimmed === keyLower || cityTrimmed.includes(keyLower) || keyLower.includes(cityTrimmed);
        }) || "Chennai";
        const cityCoordinates = CITIES[cityKey as keyof typeof CITIES] || CITIES.Chennai;
        latitude = cityCoordinates.latitude;
        longitude = cityCoordinates.longitude;
        timezone = cityCoordinates.timezone;
    }

    const formattedDateTime = getFormattedDateTimeInTimezone(date, timezone);
    const base64Timezone = btoa(timezone);

    const urlPanchang = `https://api.astroved.com/node/newpanchangam/${base64Timezone}/${latitude}/${longitude}/${formattedDateTime}`;
    const urlContent = `https://api.astroved.com/node/todaycontent/${base64Timezone}/${latitude}/${longitude}/${formattedDateTime}`;

    const [panchangResponse, todayContentResponse] = await Promise.all([
        fetch(urlPanchang),
        fetch(urlContent)
    ]);

    const panchangData = await panchangResponse.json();
    const todayContentData = await todayContentResponse.json();

    return {
        panchangData: panchangData,
        todayContent: todayContentData[0] || null
    };
}