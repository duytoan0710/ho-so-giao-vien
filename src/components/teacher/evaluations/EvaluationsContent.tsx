
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Award } from 'lucide-react';
import YearlyEvaluationsAccordion from './YearlyEvaluationsAccordion';
import TrainingAccordion from './TrainingAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface EvaluationsContentProps {
  teacher: Teacher;
}

const EvaluationsContent: React.FC<EvaluationsContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving evaluations data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch sử Đánh giá</h1>
            <p className="text-sm text-muted-foreground">Theo dõi lịch sử đánh giá và bồi dưỡng qua các năm</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="space-y-6">
        <YearlyEvaluationsAccordion />
        <TrainingAccordion />
      </div>
    </div>
  );
};

export default EvaluationsContent;
