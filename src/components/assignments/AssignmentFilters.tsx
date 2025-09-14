
import React, { useState } from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddAssignmentModal from './AddAssignmentModal';

const AssignmentFilters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    academicYear: '',
    campus: '',
    grade: '',
    subject: '',
    teacherName: '',
    isHomeRoom: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      academicYear: '',
      campus: '',
      grade: '',
      subject: '',
      teacherName: '',
      isHomeRoom: '',
    });
  };

  const handleAddAssignment = (data: any) => {
    console.log('New assignment data:', data);
    // Here you would typically call your API to save the data
    // and then refresh the table data
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Bộ lọc và Tìm kiếm
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm phân công
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div>
            <Label className="text-sm font-medium">Năm học</Label>
            <Select value={filters.academicYear} onValueChange={(value) => handleFilterChange('academicYear', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn năm học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Cơ sở</Label>
            <Select value={filters.campus} onValueChange={(value) => handleFilterChange('campus', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn cơ sở" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Trụ sở chính</SelectItem>
                <SelectItem value="branch1">Phân hiệu 1</SelectItem>
                <SelectItem value="branch2">Phân hiệu 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Khối lớp</Label>
            <Select value={filters.grade} onValueChange={(value) => handleFilterChange('grade', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn khối" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">Khối 6</SelectItem>
                <SelectItem value="7">Khối 7</SelectItem>
                <SelectItem value="8">Khối 8</SelectItem>
                <SelectItem value="9">Khối 9</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Môn học</Label>
            <Select value={filters.subject} onValueChange={(value) => handleFilterChange('subject', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn môn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toan">Toán</SelectItem>
                <SelectItem value="van">Ngữ văn</SelectItem>
                <SelectItem value="anh">Tiếng Anh</SelectItem>
                <SelectItem value="ly">Vật lý</SelectItem>
                <SelectItem value="hoa">Hóa học</SelectItem>
                <SelectItem value="sinh">Sinh học</SelectItem>
                <SelectItem value="su">Lịch sử</SelectItem>
                <SelectItem value="dia">Địa lý</SelectItem>
                <SelectItem value="gdcd">GDCD</SelectItem>
                <SelectItem value="tin">Tin học</SelectItem>
                <SelectItem value="td">Thể dục</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Chủ nhiệm</Label>
            <Select value={filters.isHomeRoom} onValueChange={(value) => handleFilterChange('isHomeRoom', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Chỉ chủ nhiệm</SelectItem>
                <SelectItem value="false">Không chủ nhiệm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium">Tìm theo tên GV</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Nhập tên giáo viên..."
                value={filters.teacherName}
                onChange={(e) => handleFilterChange('teacherName', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={clearFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      </CardContent>

      <AddAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAssignment}
      />
    </Card>
  );
};

export default AssignmentFilters;
