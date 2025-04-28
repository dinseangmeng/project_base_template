// Import the bakong-khqr module
let BakongKHQR, khqrData, IndividualInfo;
try {
  ({ BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr"));
} catch (error) {
  console.error("Error: Failed to load bakong-khqr module. Ensure it is installed with 'npm install bakong-khqr'.");
  console.error("Error details:", error.message);
  process.exit(1);
}

// Load environment variables
require('dotenv').config();

// Function to generate KHQR for an individual with parameters
function generateIndividualKHQR(params) {
  // Default values from environment variables
  const defaults = {
    accountID: process.env.ACCOUNT_ID,
    currency: process.env.CURRENCY,
    name: process.env.NAME,
    city: process.env.CITY,
    amount: parseFloat(process.env.AMOUNT),
    mobileNumber: process.env.MOBILE_NUMBER,
    storeLabel: process.env.STORE_LABEL,
    terminalLabel: process.env.TERMINAL_LABEL,
    purposeOfTransaction: process.env.PURPOSE_OF_TRANSACTION,
    languagePreference: process.env.LANGUAGE_PREFERENCE,
    merchantNameAlternateLanguage: process.env.MERCHANT_NAME_ALT_LANG,
    merchantCityAlternateLanguage: process.env.MERCHANT_CITY_ALT_LANG,
    upiMerchantAccount: process.env.UPI_MERCHANT_ACCOUNT
  };

  // Merge defaults with provided parameters
  const config = { ...defaults, ...params };

  // Validate khqrData and currency
  if (!khqrData || !khqrData.currency) {
    throw new Error("khqrData or currency values are not available. Check bakong-khqr module exports.");
  }
  if (!khqrData.currency.usd || !khqrData.currency.khr) {
    throw new Error("khqrData.currency is missing usd or khr values. Check bakong-khqr module.");
  }

  // Convert currency string to khqrData currency value
  let currencyValue;
  if (config.currency.toLowerCase() === "usd") {
    currencyValue = khqrData.currency.usd;
  } else if (config.currency.toLowerCase() === "khr") {
    currencyValue = khqrData.currency.khr;
  } else {
    console.warn(`Warning: Invalid currency "${config.currency}". Using USD instead.`);
    currencyValue = khqrData.currency.usd;
  }

  // Create optional data object
  const optionalData = {
    currency: currencyValue,
    amount: config.amount,
    mobileNumber: config.mobileNumber,
    storeLabel: config.storeLabel,
    terminalLabel: config.terminalLabel,
    purposeOfTransaction: config.purposeOfTransaction,
    languagePreference: config.languagePreference,
    merchantNameAlternateLanguage: config.merchantNameAlternateLanguage,
    merchantCityAlternateLanguage: config.merchantCityAlternateLanguage,
    expirationTimestamp: Date.now() + (2 * 60 * 1000),
    ...(currencyValue === khqrData.currency.khr ? { upiMerchantAccount: config.upiMerchantAccount } : {})
  };

  // Create individual info
  let individualInfo;
  try {
    individualInfo = new IndividualInfo(
      config.accountID,
      config.name,
      config.city,
      optionalData
    );
  } catch (error) {
    throw new Error(`Failed to create IndividualInfo: ${error.message}`);
  }

  // Generate KHQR
  let individual;
  try {
    const KHQR = new BakongKHQR();
    individual = KHQR.generateIndividual(individualInfo);
  } catch (error) {
    throw new Error(`Failed to generate KHQR in generateIndividual: ${error.message}`);
  }

  // Validate result
  if (!individual || !individual.data || !individual.data.qr || !individual.data.md5) {
    throw new Error("Failed to generate KHQR. Result is invalid or missing qr/md5. Check input parameters and bakong-khqr module.");
  }

  return {
    qr: individual.data.qr,
    md5: individual.data.md5
  };
}

// Command-line execution
if (require.main === module) {
  // Parse command-line arguments
  const args = process.argv.slice(2);
  const params = {};
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith("--") && i + 1 < args.length) {
      const key = args[i].slice(2);
      let value = args[i + 1];
      // Convert numeric strings to numbers (except for specific fields)
      if (!isNaN(value) && key !== "accountID" && key !== "currency") {
        value = Number(value);
      }
      params[key] = value;
    }
  }
  
  try {
    const result = generateIndividualKHQR(params);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

module.exports = generateIndividualKHQR;