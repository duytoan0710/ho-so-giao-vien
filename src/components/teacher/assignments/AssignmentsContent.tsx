
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import AssignmentSummary from './AssignmentSummary';
import CampusAssignmentsAccordion from './CampusAssignmentsAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface AssignmentsContentProps {
  teacher: Teacher;
}

const AssignmentsContent: React.FC<AssignmentsContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving assignments data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Phân công Giảng dạy và Chủ nhiệm</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="space-y-6">
        <AssignmentSummary />
        <CampusAssignmentsAccordion campusName="TRỤ SỞ CHÍNH" />
        <CampusAssignmentsAccordion campusName="PHÂN HIỆU 1" />
        <CampusAssignmentsAccordion campusName="PHÂN HIỆU 2" />
      </div>
    </div>
  );
};

export default AssignmentsContent;
