# Multilingual System Documentation

## Overview

This website now supports three languages:
- **EN** - English (default)
- **FR** - Français (French)
- **VN** - Tiếng Việt (Vietnamese)

## How It Works

### Translation File
All translations are centralized in `/data/translations.json`. This file contains:
- UI labels (navigation, buttons, form labels)
- Page titles and descriptions
- System messages (success, error messages)
- Accessibility labels (ARIA labels)

### Technical Content Strategy
Technical content (skills, projects, resources) remains in English as this is industry standard. This approach:
- Minimizes translation overhead
- Maintains consistency with professional standards
- Keeps technical terms accurate and universally understood

### Language Switcher
- Located in bottom-right corner (opposite to theme toggle)
- Shows current language code (EN, FR, VN)
- Click to open dropdown menu with all languages
- Language preference saved to localStorage

### How to Add New Translations

1. **For UI Text**:
   - Add the translation key to `/data/translations.json`
   - Example structure:
   ```json
   {
     "en": {
       "mySection": {
         "title": "My Title",
         "description": "My Description"
       }
     },
     "fr": { ... },
     "vn": { ... }
   }
   ```

2. **In HTML**:
   - Add `data-i18n` attribute with the translation key:
   ```html
   <h1 data-i18n="mySection.title">My Title</h1>
   ```
   - For placeholders (input fields):
   ```html
   <input placeholder="Default" data-i18n="mySection.placeholder" />
   ```

3. **In JavaScript**:
   - Use the `translate()` function:
   ```javascript
   const text = translate('mySection.title');
   ```

### Files Modified

**Core System:**
- `/data/translations.json` - Translation dictionary
- `/scripts/main.js` - Translation system and language switcher
- `/components/scripts/components.js` - Translation initialization
- `/styles.css` - Language switcher styles

**HTML Pages:**
- `/index.html` - Home page with data-i18n attributes
- `/contact.html` - Contact page with data-i18n attributes
- `/portfolio.html` - Portfolio page with data-i18n attributes
- `/links.html` - Links page with data-i18n attributes
- `/components/layout/header.html` - Navigation with data-i18n attributes

## Features

✅ Persistent language selection (localStorage)
✅ Clean dropdown UI matching site design
✅ Smooth language switching without page reload
✅ Automatic HTML lang attribute update
✅ Support for placeholders and ARIA labels
✅ Fallback to English if translation missing
✅ Minimal translation overhead strategy

## Testing

To test the language switcher:
1. Open the website
2. Click the language button (bottom-right)
3. Select a language from the dropdown
4. Verify all UI text updates
5. Refresh the page - language preference should persist

## Future Enhancements

If you want to translate more content:
- Add keys to `translations.json`
- Add `data-i18n` attributes to HTML elements
- The system automatically handles the translation

For translating dynamic content (skills, projects):
- Create separate data files per language (e.g., `skills-fr.json`)
- Update template engine to load language-specific files
- This is only recommended if truly needed
