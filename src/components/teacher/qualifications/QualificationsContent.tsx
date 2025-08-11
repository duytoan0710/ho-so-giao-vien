
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Award } from 'lucide-react';
import SalaryAccordion from './SalaryAccordion';
import CompetencyEvaluationAccordion from './CompetencyEvaluationAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface QualificationsContentProps {
  teacher: Teacher;
}

const QualificationsContent: React.FC<QualificationsContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving qualifications data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trình độ & Phụ cấp</h1>
            <p className="text-sm text-muted-foreground">Quản lý bằng cấp, chứng chỉ và thông tin phụ cấp</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="space-y-6">
        <SalaryAccordion />
        <CompetencyEvaluationAccordion />
      </div>
    </div>
  );
};

export default QualificationsContent;
