
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, TrendingUp } from 'lucide-react';
import AssessmentAccordion from '../assessment/AssessmentAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface EvaluationContentProps {
  teacher: Teacher;
}

const EvaluationContent: React.FC<EvaluationContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving evaluation data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Đánh giá & Xếp loại</h1>
            <p className="text-sm text-muted-foreground">Quản lý kết quả đánh giá năng lực chuyên môn</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
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

export default EvaluationContent;
