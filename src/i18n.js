import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "history": "History",
        "logout": "Logout",
        "login": "Login",
        "signup": "Sign Up",
        "hi": "Hi"
      },
      "dashboard": {
        "title": "Diagnostic Center",
        "subtitle": "Upload an image of a crop leaf and our AI will detect possible diseases instantly.",
        "select_crop": "Select Crop Type:",
        "upload_title": "Upload Leaf Image",
        "click_upload": "Click to upload",
        "or_drag": "or drag and drop",
        "formats": "PNG, JPG, JPEG up to 10MB",
        "choose_another": "Choose Another",
        "analyze": "Analyze Image",
        "analyzing": "Analyzing...",
        "results": "Analysis Results",
        "running_diagnostic": "Running diagnostic models...",
        "diagnosis": "Diagnosis",
        "confidence": "Confidence Score",
        "treatment": "Recommended Treatment",
        "placeholder": "Upload an image and click analyze to see disease predictions and treatment recommendations here.",
        "error_analyze": "Failed to analyze the image. Please try again.",
        "download_report": "Download PDF Report"
      },
      "history": {
        "title": "Prediction History",
        "subtitle": "Review your past crop diagnostic results and treatment plans.",
        "no_history": "No history found. Start by analyzing a crop leaf image!",
        "date": "Date",
        "crop": "Crop",
        "disease": "Disease",
        "confidence": "Confidence"
      },
      "login": {
        "title": "Sign in to your account",
        "subtitle": "Or",
        "create_account": "create a new account",
        "username": "Username",
        "password": "Password",
        "signing_in": "Signing in...",
        "sign_in": "Sign in"
      },
      "register": {
        "title": "Create your account",
        "subtitle": "Or",
        "sign_in": "sign in to your existing account",
        "username": "Username",
        "email": "Email address",
        "password": "Password",
        "creating": "Creating account...",
        "create": "Create account"
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "home": "होम",
        "history": "इतिहास",
        "logout": "लॉगआउट",
        "login": "लॉगिन",
        "signup": "साइन अप",
        "hi": "नमस्ते"
      },
      "dashboard": {
        "title": "नैदानिक केंद्र",
        "subtitle": "फसल की पत्ती की एक छवि अपलोड करें और हमारा एआई तुरंत संभावित बीमारियों का पता लगाएगा।",
        "select_crop": "फसल का प्रकार चुनें:",
        "upload_title": "पत्ती की छवि अपलोड करें",
        "click_upload": "अपलोड करने के लिए क्लिक करें",
        "or_drag": "या खींचें और छोड़ें",
        "formats": "PNG, JPG, JPEG 10MB तक",
        "choose_another": "दूसरा चुनें",
        "analyze": "छवि का विश्लेषण करें",
        "analyzing": "विश्लेषण हो रहा है...",
        "results": "विश्लेषण के परिणाम",
        "running_diagnostic": "नैदानिक मॉडल चल रहे हैं...",
        "diagnosis": "निदान",
        "confidence": "विश्वास स्कोर",
        "treatment": "अनुशंसित उपचार",
        "placeholder": "छवि अपलोड करें और बीमारी की भविष्यवाणी और उपचार सिफारिशें देखने के लिए विश्लेषण पर क्लिक करें।",
        "error_analyze": "छवि का विश्लेषण करने में विफल। कृपया पुन: प्रयास करें।",
        "download_report": "पीडीएफ रिपोर्ट डाउनलोड करें"
      },
      "history": {
        "title": "भविष्यवाणी इतिहास",
        "subtitle": "अपने पिछले फसल नैदानिक परिणामों और उपचार योजनाओं की समीक्षा करें।",
        "no_history": "कोई इतिहास नहीं मिला। फसल की पत्ती की छवि का विश्लेषण करके शुरू करें!",
        "date": "तारीख",
        "crop": "फसल",
        "disease": "बीमारी",
        "confidence": "विश्वास"
      },
      "login": {
        "title": "अपने खाते में साइन इन करें",
        "subtitle": "या",
        "create_account": "नया खाता बनाएँ",
        "username": "उपयोगकर्ता नाम",
        "password": "पासवर्ड",
        "signing_in": "साइन इन हो रहा है...",
        "sign_in": "साइन इन करें"
      },
      "register": {
        "title": "अपना खाता बनाएँ",
        "subtitle": "या",
        "sign_in": "अपने मौजूदा खाते में साइन इन करें",
        "username": "उपयोगकर्ता नाम",
        "email": "ईमेल पता",
        "password": "पासवर्ड",
        "creating": "खाता बन रहा है...",
        "create": "खाता बनाएँ"
      }
    }
  },
  te: {
    translation: {
      "nav": {
        "home": "హోమ్",
        "history": "చరిత్ర",
        "logout": "లాగ్అవుట్",
        "login": "లాగిన్",
        "signup": "సైన్ అప్",
        "hi": "నమస్తే"
      },
      "dashboard": {
        "title": "నిర్ధారణ కేంద్రం",
        "subtitle": "పంట ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి మరియు మా AI తక్షణమే సాధ్యమయ్యే వ్యాధులను గుర్తిస్తుంది.",
        "select_crop": "పంట రకాన్ని ఎంచుకోండి:",
        "upload_title": "ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి",
        "click_upload": "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
        "or_drag": "లేదా డ్రాగ్ అండ్ డ్రాప్ చేయండి",
        "formats": "10MB వరకు PNG, JPG, JPEG",
        "choose_another": "మరొకటి ఎంచుకోండి",
        "analyze": "చిత్ర విశ్లేషణ",
        "analyzing": "విశ్లేషిస్తోంది...",
        "results": "విశ్లేషణ ఫలితాలు",
        "running_diagnostic": "రోగ నిర్ధారణ నమూనాలు నడుస్తున్నాయి...",
        "diagnosis": "రోగ నిర్ధారణ",
        "confidence": "విశ్వాస స్కోరు",
        "treatment": "సిఫార్సు చేసిన చికిత్స",
        "placeholder": "వ్యాధి అంచనాలు మరియు చికిత్స సిఫార్సులను చూడటానికి చిత్రాన్ని అప్‌లోడ్ చేసి, విశ్లేషణపై క్లిక్ చేయండి.",
        "error_analyze": "చిత్రాన్ని విశ్లేషించడం విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
        "download_report": "PDF నివేదికను డౌన్‌లోడ్ చేయండి"
      },
      "history": {
        "title": "అంచనా చరిత్ర",
        "subtitle": "మీ గత పంట నిర్ధారణ ఫలితాలు మరియు చికిత్స ప్రణాళికలను సమీక్షించండి.",
        "no_history": "చరిత్ర దొరకలేదు. పంట ఆకు చిత్రాన్ని విశ్లేషించడం ద్వారా ప్రారంభించండి!",
        "date": "తేదీ",
        "crop": "పంట",
        "disease": "వ్యాధి",
        "confidence": "విశ్వాసం"
      },
      "login": {
        "title": "ఖాతాలోకి సైన్ ఇన్ చేయండి",
        "subtitle": "లేదా",
        "create_account": "కొత్త ఖాతాను సృష్టించండి",
        "username": "వినియోగదారు పేరు",
        "password": "పాస్‌వర్డ్",
        "signing_in": "సైన్ ఇన్ అవుతోంది...",
        "sign_in": "సైన్ ఇన్ చేయండి"
      },
      "register": {
        "title": "ఖాతాను సృష్టించండి",
        "subtitle": "లేదా",
        "sign_in": "మీ ప్రస్తుత ఖాతాకు సైన్ ఇన్ చేయండి",
        "username": "వినియోగదారు పేరు",
        "email": "ఈమెయిల్ చిరునామా",
        "password": "పాస్‌వర్డ్",
        "creating": "ఖాతాను సృష్టిస్తోంది...",
        "create": "ఖాతాను సృష్టించండి"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
