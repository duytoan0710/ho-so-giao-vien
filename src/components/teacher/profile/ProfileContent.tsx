
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, User } from 'lucide-react';
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
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
            <p className="text-sm text-muted-foreground">Quản lý thông tin cơ bản và vị trí công tác</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

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
