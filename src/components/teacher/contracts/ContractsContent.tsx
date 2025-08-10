
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import ContractsAccordion from './ContractsAccordion';
import SalaryHistoryAccordion from './SalaryHistoryAccordion';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface ContractsContentProps {
  teacher: Teacher;
}

const ContractsContent: React.FC<ContractsContentProps> = ({ teacher }) => {
  const handleSave = () => {
    console.log('Saving contracts data...');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin Hợp đồng và Lịch sử Lương</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="space-y-6">
        <ContractsAccordion />
        <SalaryHistoryAccordion />
      </div>
    </div>
  );
};

export default ContractsContent;
