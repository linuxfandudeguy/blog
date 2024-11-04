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
        const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: '',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        
        window.googleTranslateElementInit = googleTranslateElementInit;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            delete window.googleTranslateElementInit;
        };
    }, []);

    return <div id="google_translate_element" className="flex justify-center mt-4"></div>;
};

export default GoogleTranslate;
