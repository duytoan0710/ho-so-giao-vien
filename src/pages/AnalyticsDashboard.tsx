import React from 'react';
import { ArrowLeft, Users, BookOpen, GraduationCap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Mock data cho dashboard
const overviewStats = {
  totalStaff: 45,
  activeTeachers: 38,
  departments: 10,
  teacherClassRatio: 1.8
};

const subjectDistribution = [
  { name: 'Toán', value: 8, color: '#3B82F6' },
  { name: 'Ngữ văn', value: 6, color: '#10B981' },
  { name: 'Tiếng Anh', value: 5, color: '#F59E0B' },
  { name: 'Vật lý', value: 4, color: '#EF4444' },
  { name: 'Hóa học', value: 4, color: '#8B5CF6' },
  { name: 'Sinh học', value: 3, color: '#06B6D4' },
  { name: 'Lịch sử', value: 3, color: '#84CC16' },
  { name: 'Địa lý', value: 2, color: '#F97316' },
  { name: 'Thể dục', value: 2, color: '#EC4899' },
  { name: 'Tin học', value: 1, color: '#6B7280' }
];

const positionDistribution = [
  { position: 'Ban Giám hiệu', count: 3 },
  { position: 'Tổ trưởng chuyên môn', count: 8 },
  { position: 'Giáo viên', count: 32 },
  { position: 'Nhân viên', count: 2 }
];

const teachingCoverage = [
  { subject: 'Toán', required: 120, assigned: 115, percentage: 95.8 },
  { subject: 'Ngữ văn', required: 100, assigned: 85, percentage: 85.0 },
  { subject: 'Tiếng Anh', required: 80, assigned: 82, percentage: 102.5 },
  { subject: 'Vật lý', required: 60, assigned: 58, percentage: 96.7 },
  { subject: 'Hóa học', required: 60, assigned: 60, percentage: 100.0 },
  { subject: 'Sinh học', required: 45, assigned: 48, percentage: 106.7 },
  { subject: 'Lịch sử', required: 45, assigned: 42, percentage: 93.3 },
  { subject: 'Địa lý', required: 30, assigned: 28, percentage: 93.3 }
];

const workloadAnalysis = [
  { subject: 'Toán', avgHours: 18.5, standard: 17, overload: true },
  { subject: 'Ngữ văn', avgHours: 14.2, standard: 17, overload: false },
  { subject: 'Tiếng Anh', avgHours: 16.4, standard: 17, overload: false },
  { subject: 'Vật lý', avgHours: 19.2, standard: 17, overload: true },
  { subject: 'Hóa học', avgHours: 17.0, standard: 17, overload: false },
  { subject: 'Sinh học', avgHours: 16.0, standard: 17, overload: false },
  { subject: 'Lịch sử', avgHours: 14.0, standard: 17, overload: false },
  { subject: 'Địa lý', avgHours: 15.5, standard: 17, overload: false }
];

const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Phân tích Tổng quan</h1>
        </div>

        {/* Phần 1: Các Chỉ số Tổng quan Cốt lõi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số nhân sự</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.totalStaff}</div>
              <p className="text-xs text-muted-foreground">Toàn trường</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Giáo viên đang làm việc</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{overviewStats.activeTeachers}</div>
              <p className="text-xs text-muted-foreground">Đang hoạt động</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Số Tổ chuyên môn</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewStats.departments}</div>
              <p className="text-xs text-muted-foreground">Tổ/bộ môn</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tỉ lệ Giáo viên/Lớp học</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{overviewStats.teacherClassRatio}</div>
              <p className="text-xs text-muted-foreground">GV/lớp</p>
            </CardContent>
          </Card>
        </div>

        {/* Phần 2: Phân bổ và Cơ cấu Đội ngũ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Biểu đồ tròn - Cơ cấu theo Tổ chuyên môn */}
          <Card>
            <CardHeader>
              <CardTitle>Cơ cấu Giáo viên theo Tổ chuyên môn</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Biểu đồ cột - Phân bổ theo Chức vụ */}
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ theo Chức vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={positionDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="position" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Phần 3: Phân tích Chuyên sâu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phân tích Mức độ Đáp ứng Giảng dạy */}
          <Card>
            <CardHeader>
              <CardTitle>Mức độ Đáp ứng Giảng dạy</CardTitle>
              <p className="text-sm text-muted-foreground">So sánh tiết yêu cầu vs tiết đã phân công</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={teachingCoverage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'percentage' ? `${value}%` : value,
                      name === 'percentage' ? 'Tỷ lệ đáp ứng' : 
                      name === 'required' ? 'Tiết yêu cầu' : 'Tiết đã phân'
                    ]}
                  />
                  <Bar dataKey="percentage">
                    {teachingCoverage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentage >= 100 ? "#10B981" : "#EF4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Phân tích Tải lượng Giảng dạy */}
          <Card>
            <CardHeader>
              <CardTitle>Tải lượng Giảng dạy</CardTitle>
              <p className="text-sm text-muted-foreground">So sánh với định mức chuẩn (17 tiết/tuần)</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={workloadAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} tiết/tuần`,
                      name === 'avgHours' ? 'Trung bình thực tế' : 'Định mức chuẩn'
                    ]}
                  />
                  <Bar dataKey="standard" fill="#94A3B8" name="standard" />
                  <Bar dataKey="avgHours" name="avgHours">
                    {workloadAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.overload ? "#EF4444" : "#3B82F6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;