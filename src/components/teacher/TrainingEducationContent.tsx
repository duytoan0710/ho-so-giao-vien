
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import TrainingSpecialtyAccordion from './qualifications/TrainingSpecialtyAccordion';
import LanguageCertificatesAccordion from './qualifications/LanguageCertificatesAccordion';
import ITCertificatesAccordion from './qualifications/ITCertificatesAccordion';
import CompetencyEvaluationAccordion from './qualifications/CompetencyEvaluationAccordion';
import EducationAccordion from './education/EducationAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface TrainingEducationContentProps {
  teacher: Teacher;
}

const TrainingEducationContent: React.FC<TrainingEducationContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving training and education data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Đào tạo, bồi dưỡng</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="space-y-6">
        <EducationAccordion />
        <TrainingSpecialtyAccordion />
        <LanguageCertificatesAccordion />
        <ITCertificatesAccordion />
      </div>
    </div>
  );
};

export default TrainingEducationContent;
