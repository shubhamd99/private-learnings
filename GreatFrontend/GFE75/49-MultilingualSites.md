# Designing and Developing for Multilingual Sites (i18n)

Internationalization (i18n) involves crucial considerations when designing and developing for a global audience. Here are the key aspects to keep in mind:

## 1. Search Engine Optimization (SEO)
- **HTML Tag:** Always use the `lang` attribute on the `<html>` tag.
- **URL Structure:** Include the locale in your URLs (e.g., `en_US`, `zh_CN`).
- **Alternate Pages:** Use `<link rel="alternate" hreflang="local_code" href="url">` to point to localized versions of a page for search engines.
- **Fallback Page:** Use `<link rel="alternate" href="fallback_url" hreflang="x-default" />` for unmatched languages.

## 2. Locale vs. Language
- **Locale:** Controls regional settings like number, time, and date formats. It doesn't strictly follow country borders.
- **Language Variations:** Account for different vocabulary and grammar in the "same" language across regions (e.g., `en-US` vs. `en-GB`, `zh-CN` vs. `zh-TW`).
- **Prediction vs. Choice:** You can predict the user's language via HTTP headers and IP addresses, but always provide an easy, manual way for users to switch their language and country.

## 3. Layouts & Text Variations
- **Text Lengths:** Translated text can expand significantly (e.g., German is often longer than English). Design flexible containers and avoid rigid character limits for headlines, labels, and buttons.
- **Reading Direction:** Ensure your layout accommodates Right-to-Left (RTL) languages like Arabic and Hebrew, mirroring standard Left-to-Right (LTR) designs.

## 4. Development & Assets
- **String Interpolation, Not Concatenation:** Never concatenate strings (e.g., `"Today is " + date`). Different languages have different word orders. Use template strings (e.g., `"I will travel on {date}"`).
- **Avoid Text in Images:** Embedding text inside raster images (JPG, PNG) prevents automated translation and is completely unscalable. Keep text in HTML/CSS.
- **Data Formatting:** Automatically format dates and currencies according to regional conventions (e.g., `May 31, 2012` vs. `31 May 2012`).

## 5. Cultural Perception
- **Color Meaning:** Be mindful of aesthetics. Colors, symbols, and imagery can have vastly different meanings depending on regional culture.
