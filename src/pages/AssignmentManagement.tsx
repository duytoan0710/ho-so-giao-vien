
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AssignmentFilters from '@/components/assignments/AssignmentFilters';
import AssignmentTable from '@/components/assignments/AssignmentTable';
import AssignmentSummary from '@/components/assignments/AssignmentSummary';
import AssignmentHistory from '@/components/assignments/AssignmentHistory';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AssignmentManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={handleBackToList}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Trở về danh sách
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              Quản lý Phân công Giảng dạy
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Phân công hiện tại</TabsTrigger>
            <TabsTrigger value="summary">Tổng hợp</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <AssignmentFilters />
            <AssignmentTable />
          </TabsContent>

          <TabsContent value="summary">
            <AssignmentSummary />
          </TabsContent>

          <TabsContent value="history">
            <AssignmentHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssignmentManagement;
