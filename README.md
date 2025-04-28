# Bakong KHQR Generator

This module provides functionality to generate Bakong KHQR codes for individual transactions. It uses the `bakong-khqr` package to create QR codes that can be used for payments through the Bakong system.

## Installation

First, install the required packages:

```bash
npm install bakong-khqr dotenv
```

## Configuration

Create a `.env` file in your project root with the following variables:

```env
ACCOUNT_ID=dummy_account@bakong.com
CURRENCY=USD
NAME=John Smith
CITY=PHNOM PENH
AMOUNT=10.50
MOBILE_NUMBER=85510123456
STORE_LABEL=SAMPLE STORE
TERMINAL_LABEL=POS_001
PURPOSE_OF_TRANSACTION=payment
LANGUAGE_PREFERENCE=en
MERCHANT_NAME_ALT_LANG=km
MERCHANT_CITY_ALT_LANG=ភ្នំពេញ
UPI_MERCHANT_ACCOUNT=1234567890123456ABCDEFGHIJKLMN
```

## Usage

### Basic Usage

```javascript
const generateIndividualKHQR = require('./index.js');

// Generate KHQR with default parameters from .env
const result = generateIndividualKHQR();
console.log(result);
```

### Configuration Options

The `generateIndividualKHQR` function accepts an object with the following parameters. If not provided, values will be taken from the .env file:

| Parameter | Type | Environment Variable | Description |
|-----------|------|----------------------|-------------|
| accountID | string | ACCOUNT_ID | The account ID for the transaction |
| currency | string | CURRENCY | Currency type ("USD" or "KHR") |
| name | string | NAME | Name of the account holder |
| city | string | CITY | City of the account holder |
| amount | number | AMOUNT | Transaction amount |
| mobileNumber | string | MOBILE_NUMBER | Mobile number |
| storeLabel | string | STORE_LABEL | Store label |
| terminalLabel | string | TERMINAL_LABEL | Terminal label |
| purposeOfTransaction | string | PURPOSE_OF_TRANSACTION | Purpose of the transaction |
| languagePreference | string | LANGUAGE_PREFERENCE | Language preference |
| merchantNameAlternateLanguage | string | MERCHANT_NAME_ALT_LANG | Alternate language for merchant name |
| merchantCityAlternateLanguage | string | MERCHANT_CITY_ALT_LANG | Alternate language for merchant city |
| upiMerchantAccount | string | UPI_MERCHANT_ACCOUNT | UPI merchant account (required for KHR currency) |

### Example with Custom Parameters

```javascript
const params = {
    accountID: "your_account@aclb",
    currency: "KHR",
    name: "Your Name",
    city: "Your City",
    amount: 1000,
    mobileNumber: "85512345678",
    storeLabel: "Your Store",
    terminalLabel: "Terminal_1",
    purposeOfTransaction: "payment",
    languagePreference: "en",
    merchantNameAlternateLanguage: "km",
    merchantCityAlternateLanguage: "Your City",
    upiMerchantAccount: "your_upi_account"
};

const result = generateIndividualKHQR(params);
console.log(result);
```

### Command Line Usage

You can also use the script from the command line:

```bash
node index.js --accountID your_account@aclb --currency USD --amount 10
```

## Return Value

The function returns an object with the following properties:

```javascript
{
    qr: "base64_encoded_qr_code",
    md5: "md5_hash_of_qr_code"
}
```

## Error Handling

The function will throw errors in the following cases:
- If the `bakong-khqr` module fails to load
- If required currency data is missing
- If invalid currency is specified (defaults to USD)
- If KHQR generation fails
- If the result is invalid or missing required properties
- If required environment variables are missing

## Notes

- The QR code is valid for 2 minutes from generation (expirationTimestamp is set to current time + 2 minutes)
- For KHR currency, the `upiMerchantAccount` parameter is required
- The default configuration is set for USD transactions
- The module includes extensive error checking and validation
- Environment variables take precedence over hardcoded defaults
- Make sure to add `.env` to your `.gitignore` file to keep sensitive information secure

## Dependencies

- bakong-khqr
- dotenv 