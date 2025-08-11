
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import PersonalInfoAccordion from './PersonalInfoAccordion';
import PartyInfoAccordion from './PartyInfoAccordion';
import PositionInfoAccordion from './PositionInfoAccordion';
import OtherInfoAccordion from './OtherInfoAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface ProfileContentProps {
  teacher: Teacher;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving profile data...');
    // Implementation for saving data
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-title">Hồ sơ Cá nhân & Vị trí công tác</h1>
        <Button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-6">
        <PersonalInfoAccordion />
        <PartyInfoAccordion />
        <PositionInfoAccordion />
        <OtherInfoAccordion />
      </div>
    </div>
  );
};

export default ProfileContent;
