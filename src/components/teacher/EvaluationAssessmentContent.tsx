
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import AssessmentAccordion from './assessment/AssessmentAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface EvaluationAssessmentContentProps {
  teacher: Teacher;
}

const EvaluationAssessmentContent: React.FC<EvaluationAssessmentContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving evaluation and assessment data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Đánh giá, phân loại</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="space-y-6">
        <AssessmentAccordion />
      </div>
    </div>
  );
};

export default EvaluationAssessmentContent;
