
import React from 'react';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AssignmentSummary = () => {
  // Mock summary data
  const summaryData = {
    totalTeachers: 45,
    totalAssignments: 125,
    homeRoomTeachers: 24,
    specialNeedsTeachers: 8,
    youthLeaders: 6,
    totalHours: 580,
  };

  const campusSummary = [
    {
      campus: 'Trụ sở chính',
      teachers: 25,
      classes: 16,
      totalHours: 340,
      homeRoomTeachers: 16,
    },
    {
      campus: 'Phân hiệu 1',
      teachers: 12,
      classes: 8,
      totalHours: 150,
      homeRoomTeachers: 8,
    },
    {
      campus: 'Phân hiệu 2',
      teachers: 8,
      classes: 6,
      totalHours: 90,
      homeRoomTeachers: 6,
    },
  ];

  const subjectSummary = [
    { subject: 'Toán', teachers: 8, hours: 96 },
    { subject: 'Ngữ văn', teachers: 7, hours: 84 },
    { subject: 'Tiếng Anh', teachers: 6, hours: 72 },
    { subject: 'Vật lý', teachers: 4, hours: 48 },
    { subject: 'Hóa học', teachers: 4, hours: 48 },
    { subject: 'Sinh học', teachers: 3, hours: 36 },
    { subject: 'Lịch sử', teachers: 3, hours: 36 },
    { subject: 'Địa lý', teachers: 3, hours: 36 },
    { subject: 'GDCD', teachers: 2, hours: 24 },
    { subject: 'Tin học', teachers: 3, hours: 36 },
    { subject: 'Thể dục', teachers: 2, hours: 24 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số giáo viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              Đang có phân công
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng phân công</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalAssignments}</div>
            <p className="text-xs text-muted-foreground">
              Bản ghi phân công
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chủ nhiệm</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.homeRoomTeachers}</div>
            <p className="text-xs text-muted-foreground">
              Giáo viên chủ nhiệm
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng tiết dạy</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalHours}</div>
            <p className="text-xs text-muted-foreground">
              Tiết/tuần
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campus Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng hợp theo cơ sở</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cơ sở</TableHead>
                <TableHead>Số giáo viên</TableHead>
                <TableHead>Số lớp</TableHead>
                <TableHead>Tổng tiết</TableHead>
                <TableHead>GV chủ nhiệm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campusSummary.map((campus, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{campus.campus}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{campus.teachers}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{campus.classes}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{campus.totalHours} tiết</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{campus.homeRoomTeachers}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subject Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng hợp theo môn học</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Môn học</TableHead>
                <TableHead>Số giáo viên</TableHead>
                <TableHead>Tổng tiết</TableHead>
                <TableHead>Trung bình tiết/GV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectSummary.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{subject.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{subject.teachers}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{subject.hours} tiết</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {(subject.hours / subject.teachers).toFixed(1)} tiết
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentSummary;
