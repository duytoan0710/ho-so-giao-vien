
import React, { useState } from 'react';
import { Calendar, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AssignmentHistory = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');

  // Mock historical data
  const historyData = [
    {
      academicYear: '2024-2025',
      totalTeachers: 45,
      totalAssignments: 125,
      homeRoomTeachers: 24,
      status: 'Đang thực hiện',
      lastUpdated: '2024-08-15',
    },
    {
      academicYear: '2023-2024',
      totalTeachers: 42,
      totalAssignments: 118,
      homeRoomTeachers: 22,
      status: 'Hoàn thành',
      lastUpdated: '2024-06-30',
    },
    {
      academicYear: '2022-2023',
      totalTeachers: 38,
      totalAssignments: 105,
      homeRoomTeachers: 20,
      status: 'Hoàn thành',
      lastUpdated: '2023-06-30',
    },
    {
      academicYear: '2021-2022',
      totalTeachers: 35,
      totalAssignments: 98,
      homeRoomTeachers: 18,
      status: 'Hoàn thành',
      lastUpdated: '2022-06-30',
    },
  ];

  const yearlyChanges = [
    {
      teacherName: 'Nguyễn Văn An',
      teacherCode: 'GV001',
      changes: [
        { year: '2024-2025', assignment: '6A1 - Toán (4 tiết), Tin học (2 tiết), Chủ nhiệm' },
        { year: '2023-2024', assignment: '5A1 - Toán (4 tiết), Chủ nhiệm' },
        { year: '2022-2023', assignment: '4A2 - Toán (4 tiết)' },
      ],
    },
    {
      teacherName: 'Trần Thị Bình',
      teacherCode: 'GV002',
      changes: [
        { year: '2024-2025', assignment: '7A2 - Ngữ văn (5 tiết), Chủ nhiệm, HSKT' },
        { year: '2023-2024', assignment: '6A2 - Ngữ văn (5 tiết), Chủ nhiệm' },
        { year: '2022-2023', assignment: '5A1 - Ngữ văn (5 tiết)' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Year Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Lịch sử Phân công theo Năm học
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn năm học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
                <SelectItem value="2021-2022">2021-2022</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Năm học</TableHead>
                <TableHead>Số giáo viên</TableHead>
                <TableHead>Tổng phân công</TableHead>
                <TableHead>GV chủ nhiệm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Cập nhật cuối</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((year, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{year.academicYear}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{year.totalTeachers}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{year.totalAssignments}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{year.homeRoomTeachers}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={year.status === 'Đang thực hiện' ? 'default' : 'secondary'}>
                      {year.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {year.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Teacher Assignment Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Lịch sử Thay đổi Phân công của Giáo viên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {yearlyChanges.map((teacher, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{teacher.teacherName}</h4>
                    <p className="text-sm text-muted-foreground">{teacher.teacherCode}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Chi tiết
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {teacher.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{change.year}</Badge>
                        <span className="text-sm">{change.assignment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentHistory;
