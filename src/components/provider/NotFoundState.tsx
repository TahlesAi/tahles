
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundState = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">ספק לא נמצא</h1>
      <p className="text-gray-600 mb-6">
        לא הצלחנו למצוא את הספק המבוקש. אנא בדוק את הקישור ונסה שנית.
      </p>
      <Link to="/">
        <Button>חזרה לדף הבית</Button>
      </Link>
    </div>
  );
};

export default NotFoundState;
