
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import TrainingSpecialtyAccordion from './TrainingSpecialtyAccordion';
import LanguageCertificatesAccordion from './LanguageCertificatesAccordion';
import ITCertificatesAccordion from './ITCertificatesAccordion';
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
        <h1 className="text-2xl font-bold text-gray-900">Năng lực chuyên môn và Bằng cấp</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="space-y-6">
        <TrainingSpecialtyAccordion />
        <LanguageCertificatesAccordion />
        <ITCertificatesAccordion />
        <CompetencyEvaluationAccordion />
      </div>
    </div>
  );
};

export default QualificationsContent;
