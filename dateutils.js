var days = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];

// Ονομαστική (για σκέτο μήνα)
var monthsNom = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", 
                 "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
    
// Γενική (για ημερομηνίες τύπου "15 Ιανουαρίου")
var monthsGen = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", 
                 "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"];


function getGreekDay(dateObj) {
    if (!dateObj) return "";
    return days[dateObj.getDay()];
}


function getGreekMonth(dateObj) {
    if (!dateObj) return "";
    return monthsNom[dateObj.getMonth()];
}


function formatDate(dateInput, format) {
    if (!dateInput) return "";
    var d = new Date(dateInput);
    if (isNaN(d.getTime())) return "Άκυρη Ημερομηνία";

    // Λίστες για Ελληνικά
    var daysFull = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];
    var daysShort = ["Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ"];
    
    var monthsNom = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", 
                     "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
    var monthsGen = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", 
                     "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"];

    // Προετοιμασία τιμών
    var DD = ("0" + d.getDate()).slice(-2);         // 04
    var MM = ("0" + (d.getMonth() + 1)).slice(-2);  // 05
    var YYYY = d.getFullYear();                     // 2026
    var YY = String(YYYY).slice(-2);                // 26
    
    var dddd = daysFull[d.getDay()];  // Παρασκευή
    var ddd = daysShort[d.getDay()];  // Παρ
    
    // Επιλογή πτώσης μήνα (Γενική αν υπάρχει το DD στο format)
    var hasDay = format.indexOf("DD") > -1;
    var MMMM = hasDay ? monthsGen[d.getMonth()] : monthsNom[d.getMonth()];

    // Αντικατάσταση (Προσοχή στη σειρά: το dddd πρέπει να αντικατασταθεί ΠΡΙΝ το ddd)
    var result = format
        .replace(/dddd/g, dddd)
        .replace(/ddd/g, ddd)
        .replace(/DD/g, DD)
        .replace(/MMMM/g, MMMM)
        .replace(/MM/g, MM)
        .replace(/YYYY/g, YYYY)
        .replace(/YY/g, YY);

    return result;
}
