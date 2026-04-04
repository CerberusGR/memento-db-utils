/**
 * MEMENTO DATABASE UTILITIES
 * A collection of helper functions for formatting, UI logic, and array manipulation.
 */

var defaultBackColor = "#434343";

// ==========================================
// DATE UTILITIES
// ==========================================

/**
 * Chainable Date Formatter (Day.js style)
 */
function formatDate(dateInput) {
    var instance = {
        _date: dateInput ? new Date(dateInput) : new Date(),
        _locale: "el",

        locale: function(lang) {
            this._locale = lang;
            return this;
        },

        format: function(formatString) {
            var fmt = formatString || "DD MMMM YYYY";
            if (isNaN(this._date.getTime())) return "Invalid Date";

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

            var lang = languages[this._locale] || languages["en"];
            var d = this._date;
            var DD = ("0" + d.getDate()).slice(-2);
            var MM = ("0" + (d.getMonth() + 1)).slice(-2);
            var YYYY = d.getFullYear();
            var YY = String(YYYY).slice(-2);
            
            var dddd = lang.daysFull[d.getDay()];
            var ddd = lang.daysShort[d.getDay()];
            
            var monthName;
            if (this._locale === "el" && fmt.indexOf("DD") > -1) {
                monthName = lang.monthsGen[d.getMonth()];
            } else {
                monthName = lang.monthsNom[d.getMonth()];
            }

            return fmt
                .replace(/dddd/g, dddd)
                .replace(/ddd/g, ddd)
                .replace(/DD/g, DD)
                .replace(/MMMM/g, monthName)
                .replace(/MM/g, MM)
                .replace(/YYYY/g, YYYY)
                .replace(/YY/g, YY);
        }
    };
    return instance;
}

function addDays(dateInput, days) {
    var result = new Date(dateInput);
    result.setDate(result.getDate() + days);
    return result;
}

function diffInDays(d1, d2) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getGreekDay(dateInput) {
    return formatDate(dateInput).locale("el").format("dddd");
}

function getGreekMonth(dateInput) {
    return formatDate(dateInput).locale("el").format("MMMM");
}

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

// ==========================================
// CURRENCY UTILITIES
// ==========================================

function formatEuro(amount, includeSymbol) {
    if (includeSymbol === undefined) includeSymbol = true;
    var numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return "0,00" + (includeSymbol ? " €" : "");

    var result = numericAmount.toFixed(2).toString().replace('.', ',');
    result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return includeSymbol ? result + " €" : result;
}

// ==========================================
// UI UTILITIES
// ==========================================

function setEntryColor(e, status, colorCode) {
    var finalColor = status ? (colorCode || defaultBackColor) : null;
    e.set("Background Color", finalColor);
}

// ==========================================
// ARRAY UTILITIES
// ==========================================

function sortAndJoin(list, separator, reverse) {
    if (!list || !Array.isArray(list)) return "";
    separator = separator || ", ";
    var sorted = list.sort(function(a, b) {
        return reverse ? b.localeCompare(a, 'el') : a.localeCompare(b, 'el');
    });
    return sorted.join(separator);
}

// ==========================================
// SEARCH & STRING UTILITIES
// ==========================================

/**
 * Removes Greek accents from a string.
 * @param {string} str - The input string.
 * @returns {string} - The string without accents.
 */
function removeAccents(str) {
    if (!str) return "";
    var s = String(str);
    
    // A bulletproof map for Memento's JS engine
    var accents = {
        'ά':'α', 'έ':'ε', 'ή':'η', 'ί':'ι', 'ό':'ο', 'ύ':'υ', 'ώ':'ω',
        'Ά':'Α', 'Έ':'Ε', 'Ή':'Η', 'Ί':'Ι', 'Ό':'Ο', 'Ύ':'Υ', 'Ώ':'Ω',
        'ϊ':'ι', 'ϋ':'υ', 'ΐ':'ι', 'ΰ':'υ'
    };
    
    return s.replace(/[άέήίόύώΆΈΉΊΌΎΏϊϋΐΰ]/g, function(match) {
        return accents[match];
    });
}

/**
 * Builds a search index string from multiple fields.
 * Handles Memento Java Lists, Entry Objects, and strips accents.
 * Joins them with a newline and removes accents.
 * Accepts any number of arguments (Strings, Numbers, Arrays).
 * @returns {string} - The formatted search index.
 */
function buildSearchIndex() {
    var values = [];

    // Εσωτερική συνάρτηση που "ξετυλίγει" σωστά τις λίστες και τα αντικείμενα του Memento
    function extractText(item) {
        if (item === null || item === undefined || item === "") return "";

        // 1. Έλεγχος αν είναι λίστα/Array (Το Memento συχνά επιστρέφει Java List)
        var isList = false;
        var len = 0;
        
        if (Array.isArray(item)) { 
            isList = true; len = item.length; 
        } else if (item && typeof item.size === 'function') { 
            // Ειδικό για Memento Java ArrayList
            isList = true; len = item.size(); 
        } else if (item && typeof item.length === 'number' && typeof item !== 'string') { 
            isList = true; len = item.length; 
        }

        if (isList) {
            var temp = [];
            for (var j = 0; j < len; j++) {
                // Η Java List του Memento διαβάζεται με .get(j)
                var child = (typeof item.get === 'function') ? item.get(j) : item[j];
                var text = extractText(child);
                if (text) temp.push(text);
            }
            return temp.join(", ");
        }

        // 2. Έλεγχος αν είναι Memento Entry Object (Συνδεδεμένη εγγραφή)
        if (typeof item === 'object') {
            // Αν είναι ημερομηνία, την κάνουμε απλό string
            if (item instanceof Date || (item.getTime && typeof item.getTime === 'function')) {
                return item.getDate() + "/" + (item.getMonth() + 1) + "/" + item.getFullYear();
            }
            // Τα Entry objects του Memento έχουν ιδιότητα .title ή .name!
            if (item.title) return String(item.title);
            if (item.name) return String(item.name);

            // Fallback: Αν είναι κάποιο άλλο περίεργο αντικείμενο, αποτρέπουμε τα άσχημα errors
            var s = String(item);
            if (s.indexOf("com.luckydroid") !== -1 || s === "[object Object]") return "";
            return s;
        }

        // 3. Κανονικό κείμενο ή αριθμός
        return String(item);
    }

    // Περνάμε όλα τα arguments στην extractText
    for (var i = 0; i < arguments.length; i++) {
        var val = extractText(arguments[i]);
        if (val) {
            values.push(removeAccents(val));
        }
    }

    // Τα ενώνουμε όλα με νέα γραμμή
    return values.join("\n");
}
