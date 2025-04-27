import React from "react";
import { useAppDispatch } from "@/store/store";
import { showSnackBar } from "@/store/snackBarSlice";
export default function AboutWidget() {
  const dispatch = useAppDispatch();

  const showSuccessMessage = () => {
    dispatch(
      showSnackBar({
        show: true,
        message: "הפעולה הושלמה בהצלחה!",
        severity: "success",
      })
    );
  };

  const showErrorMessage = () => {
    dispatch(
      showSnackBar({
        show: true,
        message: "שגיאה בביצוע הפעולה",
        severity: "error",
      })
    );
  };
  return (
    <div className="relative min-h-screen w-full">
      {/* Main content container */}
      <div className="max-w-4xl mx-auto pt-16 px-6 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-500 mb-4">אודות</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        {/* Content cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="h-3 bg-amber-500"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-600 mb-4 text-right">
                מי אנחנו
              </h2>
              <p className="text-gray-700 text-right">
                אנו קבוצה של אוהדי כדורגל נלהבים שהחליטו להקים מועדון שמשלב את
                האהבה למשחק עם ערכים של קהילה וספורטיביות. המועדון שלנו הוקם
                בשנת 2018 ומאז צמח והתפתח לקהילה תוססת ומגובשת.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="h-3 bg-amber-500"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-600 mb-4 text-right">
                החזון שלנו
              </h2>
              <p className="text-gray-700 text-right">
                אנו שואפים להיות יותר מסתם מועדון כדורגל - אנו רוצים להיות מקום
                שבו אנשים מכל הגילאים והרקעים יכולים להתחבר, ללמוד ולצמוח יחד.
                אנו מאמינים שספורט הוא כלי לשינוי חברתי ולבניית קהילה חזקה.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="h-3 bg-amber-500"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-600 mb-4 text-right">
                ההישגים שלנו
              </h2>
              <p className="text-gray-700 text-right">
                במהלך השנים, המועדון שלנו זכה במספר תחרויות אזוריות וארציות. אך
                ההישגים האמיתיים שלנו נמדדים בהתפתחות האישית של השחקנים שלנו
                ובתרומה שלנו לקהילה המקומית.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="h-3 bg-amber-500"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-600 mb-4 text-right">
                הצטרפו אלינו
              </h2>
              <p className="text-gray-700 text-right">
                אנו תמיד מחפשים חברים חדשים להצטרף למשפחה שלנו. בין אם אתם
                שחקנים מנוסים, מתחילים, או פשוט אוהדים - יש מקום לכולם במועדון
                שלנו. צרו קשר עוד היום כדי לגלות כיצד תוכלו להשתתף.
              </p>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="mt-16 bg-amber-500 bg-opacity-90 rounded-lg shadow-lg p-8 text-white text-right">
          <h2 className="text-3xl font-bold mb-4">צרו קשר</h2>
          <p className="mb-6">נשמח לשמוע מכם ולענות על כל שאלה</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={showErrorMessage}
              className="bg-white text-amber-500 font-bold py-2 px-6 rounded-full hover:bg-amber-600 hover:text-white transition duration-300"
            >
              התקשרו עכשיו
            </button>
            <button
              onClick={showSuccessMessage}
              className="bg-transparent border-2 border-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-amber-500 transition duration-300"
            >
              שלחו הודעה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
