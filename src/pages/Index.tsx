
import React, { useState } from 'react';
import { Calendar, Users, Plus, Download, Upload, Search, Filter, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

interface Teacher {
  id: string;
  name: string;
  code: string;
  position: string;
  subject: string;
  homeroom: string;
  assignedClasses: string[];
  status: 'active' | 'inactive';
  initials: string;
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    code: 'GV001234567890',
    position: 'Giáo viên',
    subject: 'Toán',
    homeroom: '10A1',
    assignedClasses: ['10A1', '10A2', '10B1'],
    status: 'active',
    initials: 'NV'
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    code: 'GV002345678901',
    position: 'Tổ trưởng tổ chuyên môn',
    subject: 'Ngữ văn',
    homeroom: '10A2',
    assignedClasses: ['10A2', '10A3', '10B2'],
    status: 'active',
    initials: 'TT'
  },
  {
    id: '3',
    name: 'Lê Minh Cường',
    code: 'GV003456789012',
    position: 'Tổ trưởng tổ chuyên môn',
    subject: 'Vật lý',
    homeroom: '10B1',
    assignedClasses: ['10B1', '10B2', '10C1'],
    status: 'active',
    initials: 'LM'
  },
  {
    id: '4',
    name: 'Phạm Thu Diệu',
    code: 'GV004567890123',
    position: 'Giáo viên',
    subject: 'Tiếng Anh',
    homeroom: '10A3',
    assignedClasses: ['10A3', '10C1', '10C2'],
    status: 'active',
    initials: 'PT'
  },
  {
    id: '5',
    name: 'Hoàng Đức Minh',
    code: 'GV005678901234',
    position: 'Giáo viên',
    subject: 'Thể dục',
    homeroom: '',
    assignedClasses: ['10A1', '10A2', '10A3', '10B1', '10B2'],
    status: 'inactive',
    initials: 'HD'
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterTeachers(value, selectedClass, selectedStatus);
  };

  const filterTeachers = (search: string, classFilter: string, statusFilter: string) => {
    let filtered = mockTeachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(search.toLowerCase()) ||
                           teacher.code.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === 'all' || teacher.homeroom === classFilter || teacher.assignedClasses.includes(classFilter);
      const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
      
      return matchesSearch && matchesClass && matchesStatus;
    });
    setFilteredTeachers(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Đang làm việc</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Đã nghỉ việc</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleTeacherClick = (teacherId: string) => {
    navigate(`/teacher/${teacherId}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Academic Year Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-900">Năm học hiện tại</h2>
                <p className="text-blue-700 text-sm">Tất cả thông tin và thao tác dưới đây áp dụng cho năm học được chọn</p>
              </div>
            </div>
            <Select defaultValue="2024-2025">
              <SelectTrigger className="w-40 bg-white border-blue-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-xl border border-border p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Danh sách Giáo viên</h1>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <Users className="w-4 h-4 mr-2" />
                Phân công giảng dạy
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import từ Excel
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export ra Excel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm mới một giáo viên
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc mã giáo viên..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={(value) => {
              setSelectedClass(value);
              filterTeachers(searchTerm, value, selectedStatus);
            }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn lớp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả lớp</SelectItem>
                <SelectItem value="10A1">10A1</SelectItem>
                <SelectItem value="10A2">10A2</SelectItem>
                <SelectItem value="10A3">10A3</SelectItem>
                <SelectItem value="10B1">10B1</SelectItem>
                <SelectItem value="10B2">10B2</SelectItem>
                <SelectItem value="10C1">10C1</SelectItem>
                <SelectItem value="10C2">10C2</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={(value) => {
              setSelectedStatus(value);
              filterTeachers(searchTerm, selectedClass, value);
            }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang làm việc</SelectItem>
                <SelectItem value="inactive">Đã nghỉ việc</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Teachers Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tên giáo viên</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mã số đăng bộ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Chức vụ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Dạy môn</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Chủ nhiệm lớp</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phân công giảng dạy</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trạng thái làm việc</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                          {teacher.initials}
                        </div>
                        <span className="font-medium text-foreground">{teacher.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground font-mono">{teacher.code}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{teacher.position}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{teacher.subject}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {teacher.homeroom || '—'}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      <div className="flex flex-wrap gap-1">
                        {teacher.assignedClasses.map((className, index) => (
                          <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {className}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(teacher.status)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTeacherClick(teacher.id)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Phân công giảng dạy
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-muted-foreground">
            Hiển thị {filteredTeachers.length} trên tổng số {mockTeachers.length} giáo viên
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
