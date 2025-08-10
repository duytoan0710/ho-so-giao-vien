
import React from 'react';
import { Badge } from '@/components/ui/badge';

const AssignmentSummary = () => {
  const standardHours = 24;
  const assignedHours = 26;
  const status = assignedHours > standardHours ? 'Vượt định mức' : 
                assignedHours < standardHours ? 'Chưa đủ định mức' : 'Đạt định mức';
  
  const statusColor = assignedHours > standardHours ? 'bg-orange-100 text-orange-800' : 
                     assignedHours < standardHours ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Bảng tổng hợp & Cảnh báo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{standardHours}</div>
          <div className="text-sm text-gray-600">Định mức tiết/tuần</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{assignedHours}</div>
          <div className="text-sm text-gray-600">Tổng số tiết đã phân công</div>
        </div>
        <div className="text-center">
          <Badge className={statusColor}>
            {status}
          </Badge>
          <div className="text-sm text-gray-600 mt-1">Trạng thái</div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSummary;
