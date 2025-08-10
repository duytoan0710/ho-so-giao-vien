
import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface Teacher {
  id: string;
  code: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    code: 'GV001',
    name: 'Nguyễn Văn An',
    position: 'Giáo viên chính',
    department: 'Tổ Toán-Tin',
    email: 'nva@school.edu.vn',
    phone: '0912345678',
    status: 'active'
  },
  {
    id: '2',
    code: 'GV002',
    name: 'Trần Thị Bình',
    position: 'Giáo viên',
    department: 'Tổ Văn-Sử-Địa',
    email: 'ttb@school.edu.vn',
    phone: '0912345679',
    status: 'active'
  },
  {
    id: '3',
    code: 'GV003',
    name: 'Lê Văn Cường',
    position: 'Tổ trưởng',
    department: 'Tổ Lý-Hóa-Sinh',
    email: 'lvc@school.edu.vn',
    phone: '0912345680',
    status: 'active'
  },
  {
    id: '4',
    code: 'GV004',
    name: 'Phạm Thị Dung',
    position: 'Giáo viên',
    department: 'Tổ Ngoại ngữ',
    email: 'ptd@school.edu.vn',
    phone: '0912345681',
    status: 'inactive'
  },
];

const TeacherList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = mockTeachers.filter(teacher =>
      teacher.name.toLowerCase().includes(value.toLowerCase()) ||
      teacher.code.toLowerCase().includes(value.toLowerCase()) ||
      teacher.department.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };

  const handleTeacherClick = (teacherId: string) => {
    navigate(`/teacher/${teacherId}`);
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <span className="status-badge status-success">Đang làm việc</span>
      : <span className="status-badge status-error">Nghỉ việc</span>;
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h1 className="page-title">Quản lý Giáo viên</h1>
          </div>
          <p className="text-muted-foreground text-lg">Tìm kiếm và quản lý thông tin giáo viên trong trường</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-card p-6 rounded-xl border border-border mb-8 shadow-sm animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Tìm kiếm theo tên, mã giáo viên hoặc tổ chuyên môn..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 form-input text-base"
              />
            </div>
            <Button variant="outline" className="btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>
        </div>

        {/* Teachers Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm animate-slide-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Mã GV</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Họ và tên</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Chức vụ</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Tổ chuyên môn</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Liên hệ</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Trạng thái</th>
                  <th className="w-12 py-4 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr 
                    key={teacher.id}
                    onClick={() => handleTeacherClick(teacher.id)}
                    className="border-b border-border hover:bg-accent cursor-pointer transition-all duration-200"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-primary">{teacher.code}</td>
                    <td className="py-4 px-6">
                      <div className="text-base font-semibold text-foreground">{teacher.name}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground font-medium">{teacher.position}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground font-medium">{teacher.department}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-muted-foreground font-medium space-y-1">
                        <div>{teacher.email}</div>
                        <div>{teacher.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(teacher.status)}
                    </td>
                    <td className="py-4 px-6">
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 text-sm text-muted-foreground font-medium">
          Hiển thị {filteredTeachers.length} trên tổng số {mockTeachers.length} giáo viên
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
