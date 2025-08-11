
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, FileText } from 'lucide-react';
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
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hợp đồng & Lương</h1>
            <p className="text-sm text-muted-foreground">Quản lý thông tin hợp đồng và lịch sử lương</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
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
