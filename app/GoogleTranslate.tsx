// components/GoogleTranslate.tsx
import React, { useEffect } from 'react';

const GoogleTranslate: React.FC = () => {
    useEffect(() => {
        // Initialize Google Translate
        const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en', // Default language of the page
                    includedLanguages: '', // Leave blank to include all languages
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        // Load the Google Translate script
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        
        // Attach the init function to the window object
        window.googleTranslateElementInit = googleTranslateElementInit;

        // Add the script to the document
        document.body.appendChild(script);

        // Clean up script and function on unmount
        return () => {
            document.body.removeChild(script);
            delete window.googleTranslateElementInit;
        };
    }, []);

    return <div id="google_translate_element" className="flex justify-center mt-4"></div>;
};

export default GoogleTranslate;
