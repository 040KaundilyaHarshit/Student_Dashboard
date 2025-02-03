import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const assignments = [
  { subject: "Math", submitted: false },
  { subject: "Science", submitted: false },
  { subject: "History", submitted: false },
  { subject: "English", submitted: false },
  { subject: "Physics", submitted: false },
];

const HomeworkCard = () => {
  const [homework, setHomework] = useState(assignments);

  const handleSubmit = (index) => {
    setHomework((prev) =>
      prev.map((hw, i) => (i === index ? { ...hw, submitted: true } : hw))
    );
  };

  const completedCount = homework.filter((hw) => hw.submitted).length;
  const totalCount = homework.length;

  return (
    <Card className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300">
      <CardContent>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">📚 Homework</h3>
        <ul className="space-y-4">
          {homework.map((hw, index) => (
            <li
              key={hw.subject}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="text-lg font-medium text-gray-700">{hw.subject}</span>
              <div className="flex items-center space-x-3">
                {hw.submitted ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleSubmit(index)}
                      className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Submit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors duration-300"
                    >
                      Upload
                    </Button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center text-gray-600 font-semibold text-xl">
          <p className="text-indigo-600">
            ✅ {completedCount} / {totalCount} Assignments Completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeworkCard;