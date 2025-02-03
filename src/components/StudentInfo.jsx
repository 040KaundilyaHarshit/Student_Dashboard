import React from "react";

const StudentInfo = () => {
  return (
    <div className="flex items-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-2xl transform hover:scale-105 transition-transform duration-300">
      {/* Student Image */}
      <img
        src="/student.png" 
        alt="Student"
        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        onError={(e) => (e.target.src = "https://via.placeholder.com/96")} // Fallback if image not found
      />
      
      {/* Student Details */}
      <div className="ml-6">
        <h2 className="text-2xl font-bold">Kaundilya</h2>
        <p className="text-lg opacity-90">Roll No: 205123118</p>
        <p className="text-lg opacity-90">Email: kaundilyasharma123@gmail.com</p>
      </div>
    </div>
  );
};

export default StudentInfo;