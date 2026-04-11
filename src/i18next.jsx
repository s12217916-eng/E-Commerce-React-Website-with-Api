import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) 
  .init({
  resources: {
      en: {
        translation: {
          "Home": "Home",
          "Categories": "Categories",
          "Cart": "Cart",
          "Profile": "Profile",
          "Logout": "Logout",
          "Login": "Login",
          "Register": "Register",
          "Dark Mode": "Dark Mode",
          "Light Mode": "Light Mode",
          "Change Language":"Change Language"

        }
      },
      ar :{
        translation:{
          "Home":"الرئيسية",
          "Categories":"الفئات",
          "Cart":"السلة",
          "Profile":"الملف الشخصي",
          "Logout":"تسجيل الخروج",
          "Login":"تسجيل الدخول",
          "Register":"التسجيل",
          "Dark Mode":"الوضع الداكن",
          "Light Mode":"الوضع الفاتح",
          "Change Language":"تغيير اللغة"
        }
      }
    },
    lng: "en", 
    fallbackLng: "en",
  });

  export default i18n ; 