// components/GoogleTranslate.tsx
"use client";

import React, { useEffect } from 'react';

declare global {
  interface Window {
    google?: any;
  }
}

const GoogleTranslate: React.FC = () => {
    useEffect(() => {
        // Load the Google Translate script
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js';
        script.async = true;

        // Set up a callback for when the script loads
        script.onload = () => {
            if (window.google) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: '',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    },
                    'google_translate_element'
                );
            }
        };

        // Append the script to the document
        document.body.appendChild(script);

        return () => {
            // Clean up the script and any side effects on unmount
            document.body.removeChild(script);
        };
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
