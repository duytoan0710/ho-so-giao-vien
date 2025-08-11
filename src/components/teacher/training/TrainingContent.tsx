
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, GraduationCap } from 'lucide-react';
import EducationAccordion from '../education/EducationAccordion';
import TrainingSpecialtyAccordion from '../qualifications/TrainingSpecialtyAccordion';
import LanguageCertificatesAccordion from '../qualifications/LanguageCertificatesAccordion';
import ITCertificatesAccordion from '../qualifications/ITCertificatesAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface TrainingContentProps {
  teacher: Teacher;
}

const TrainingContent: React.FC<TrainingContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving training data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Đào tạo & Bồi dưỡng</h1>
            <p className="text-sm text-muted-foreground">Quản lý quá trình đào tạo và nâng cao trình độ</p>
          </div>
        </div>
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

export default TrainingContent;
