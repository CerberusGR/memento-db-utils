/**
 * Formats a date string or timestamp into a readable string.
 * @param {any} dateInput - The date value from Memento (timestamp or string).
 * @param {string} format - The desired format (default: "DD MMMM YYYY").
 * @param {string} locale - The language code (default: "el").
 * @returns {string} - The formatted date string.
 */
function formatDate(dateInput, format, locale) {
    format = format || "DD MMMM YYYY"; 
    locale = locale || "el";

    if (!dateInput) return "";
    var d = new Date(dateInput);
    if (isNaN(d.getTime())) return "Invalid Date";

    var languages = {
        "el": {
            daysFull: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
            daysShort: ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"],
            monthsNom: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
            monthsGen: ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"]
        },
        "en": {
            daysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            monthsNom: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsGen: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }
    };

    var lang = languages[locale] || languages["en"];
    var DD = ("0" + d.getDate()).slice(-2);
    var MM = ("0" + (d.getMonth() + 1)).slice(-2);
    var YYYY = d.getFullYear();
    var YY = String(YYYY).slice(-2);
    
    var dddd = lang.daysFull[d.getDay()];
    var ddd = lang.daysShort[d.getDay()];
    
    var monthName;
    if (locale === "el" && format.indexOf("DD") > -1) {
        monthName = lang.monthsGen[d.getMonth()];
    } else {
        monthName = lang.monthsNom[d.getMonth()];
    }

    return format
        .replace(/dddd/g, dddd)
        .replace(/ddd/g, ddd)
        .replace(/DD/g, DD)
        .replace(/MMMM/g, monthName)
        .replace(/MM/g, MM)
        .replace(/YYYY/g, YYYY)
        .replace(/YY/g, YY);
}

/**
 * Adds a specific number of days to a date.
 * @param {any} dateInput - The starting date.
 * @param {number} days - Number of days to add (can be negative).
 * @returns {Date} - The new Date object.
 */
function addDays(dateInput, days) {
    var result = new Date(dateInput);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Calculates the difference in days between two dates.
 * @param {any} d1 - First date.
 * @param {any} d2 - Second date.
 * @returns {number} - Absolute number of days.
 */
function diffInDays(d1, d2) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Gets the full name of the day in Greek.
 * @param {any} dateInput - The date value.
 * @returns {string} - Full Greek day name (e.g., "Δευτέρα").
 */
function getGreekDay(dateInput) {
    return formatDate(dateInput, "dddd", "el");
}

/**
 * Gets the full name of the month in Greek (Nominative case).
 * @param {any} dateInput - The date value.
 * @returns {string} - Full Greek month name (e.g., "Απρίλιος").
 */
function getGreekMonth(dateInput) {
    return formatDate(dateInput, "MMMM", "el");
}

/**
 * Calculates age in years based on a birth date.
 * @param {any} birthDate - The date of birth.
 * @returns {number} - The age in years.
 */
function getAge(birthDate) {
    if (!birthDate) return 0;
    var today = new Date();
    var birth = new Date(birthDate);
    var age = today.getFullYear() - birth.getFullYear();
    var monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}
