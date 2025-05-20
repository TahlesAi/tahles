
import React from "react";

const features = [
  {
    title: "פתרונות מפיקים מקיפים",
    description: "מגוון שירותים לכל צורך: אמנים והרצאות מובילים, ימי כיף וגיבוש, לוקיישנים, הגברה ותאורה, צילום ועוד.",
    icon: "🔍"
  },
  {
    title: "הזמנה מהירה, פשוטה ובטוחה",
    description: "מערכת הזמנות אינטואיטיבית בזמן אמת עם תשלומים מאובטחים והגנה לשני הצדדים.",
    icon: "📅"
  },
  {
    title: "ספקים מאומתים",
    description: "כל ספקי השירות עוברים תהליך אימות קפדני המבטיח איכות ואמינות עבור האירוע שלכם.",
    icon: "✅"
  },
  {
    title: "הכל במקום אחד",
    description: "מתקשורת ועד תשלומים, נהלו את כל היבטי האירוע שלכם בפלטפורמה אחת נוחה וידידותית.",
    icon: "📱"
  }
];

const userBenefits = [
  {
    title: "דף מוצר מקצועי",
    description: "דף מוצר מקצועי לכל חלופה – המאפשר טעימה חווייתית בכל מוצר בו מתעניינים.",
    icon: "📋"
  },
  {
    title: "מערכת שיתוף ביקורות",
    description: "מערכת שיתוף ביקורות פנימית בין הלקוחות – אשר מבטיחה הצלחה בבחירת המוצרים.",
    icon: "⭐"
  },
  {
    title: "5% קשבק להזמנה הבאה",
    description: "לקוחות תכלס חוסכים בכל הזמנה 5% קשבק להזמנה הבאה.",
    icon: "💰"
  }
];

const providerBenefits = [
  {
    title: "מערכת ניהול ושיווק מושלמת",
    description: "מערכת ניהול ושיווק מושלמת להצגת השירותים שלכם בצורה מקצועית.",
    icon: "📊"
  },
  {
    title: "פטור מדמי ניהול",
    description: "פטור מדמי ניהול למשך 5 שנים למצטרפים בתקופת ההרצה.",
    icon: "🎁"
  }
];

const FeaturesBenefits = () => {
  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">למה ת'כל'ס?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-16 mb-8 text-center">יתרונות ללקוחות</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userBenefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 border-brand-100">
              <span className="text-4xl mb-4 block">{benefit.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-16 mb-8 text-center">יתרונות לספקים</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {providerBenefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 border-accent1-100">
              <span className="text-4xl mb-4 block">{benefit.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBenefits;
