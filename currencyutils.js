/**
 * Formats a numeric value into a Euro currency string.
 * @param {number|string} amount - The numeric value to format.
 * @param {boolean} includeSymbol - Whether to append the ' €' symbol (default: true).
 * @returns {string} - The formatted currency string (e.g., "1.234,56 €").
 */
function formatEuro(amount, includeSymbol) {
    // Default value for includeSymbol
    if (includeSymbol === undefined) includeSymbol = true;

    // Ensure the input is a valid number
    var numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return "0,00" + (includeSymbol ? " €" : "");

    // Format to 2 decimal places, convert to string, and swap dot for comma
    var result = numericAmount
        .toFixed(2)
        .toString()
        .replace('.', ',');

    // Add thousands separator (optional but recommended for large numbers)
    // This regex adds a dot every 3 digits before the comma
    result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return includeSymbol ? result + " €" : result;
}