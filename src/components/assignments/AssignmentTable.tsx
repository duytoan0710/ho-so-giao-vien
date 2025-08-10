
import React, { useState } from 'react';
import { Edit, Trash2, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Assignment {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherCode: string;
  teacherAvatar: string;
  academicYear: string;
  campus: string;
  className: string;
  mainSubject: string;
  mainHours: number;
  secondarySubject?: string;
  secondaryHours?: number;
  sessionsPerDay: number;
  isHomeRoomTeacher: boolean;
  teachesSpecialNeeds: boolean;
  isYouthLeader: boolean;
  totalHours: number;
}

const AssignmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const assignments: Assignment[] = [
    {
      id: '1',
      teacherId: '1',
      teacherName: 'Nguyễn Văn An',
      teacherCode: 'GV001',
      teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      academicYear: '2024-2025',
      campus: 'Trụ sở chính',
      className: '6A1',
      mainSubject: 'Toán',
      mainHours: 4,
      secondarySubject: 'Tin học',
      secondaryHours: 2,
      sessionsPerDay: 2,
      isHomeRoomTeacher: true,
      teachesSpecialNeeds: false,
      isYouthLeader: false,
      totalHours: 6,
    },
    {
      id: '2',
      teacherId: '2',
      teacherName: 'Trần Thị Bình',
      teacherCode: 'GV002',
      teacherAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
      academicYear: '2024-2025',
      campus: 'Trụ sở chính',
      className: '7A2',
      mainSubject: 'Ngữ văn',
      mainHours: 5,
      sessionsPerDay: 2,
      isHomeRoomTeacher: true,
      teachesSpecialNeeds: true,
      isYouthLeader: false,
      totalHours: 5,
    },
    {
      id: '3',
      teacherId: '3',
      teacherName: 'Lê Văn Cường',
      teacherCode: 'GV003',
      teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      academicYear: '2024-2025',
      campus: 'Phân hiệu 1',
      className: '8A1',
      mainSubject: 'Vật lý',
      mainHours: 3,
      secondarySubject: 'Toán',
      secondaryHours: 2,
      sessionsPerDay: 2,
      isHomeRoomTeacher: false,
      teachesSpecialNeeds: false,
      isYouthLeader: true,
      totalHours: 5,
    },
  ];

  const totalPages = Math.ceil(assignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAssignments = assignments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Danh sách Phân công ({assignments.length} bản ghi)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Giáo viên</TableHead>
                <TableHead>Năm học</TableHead>
                <TableHead>Cơ sở</TableHead>
                <TableHead>Lớp</TableHead>
                <TableHead>Môn chính</TableHead>
                <TableHead>Môn phụ</TableHead>
                <TableHead>Tổng tiết</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={assignment.teacherAvatar} alt={assignment.teacherName} />
                        <AvatarFallback>
                          {assignment.teacherName.split(' ').pop()?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{assignment.teacherName}</div>
                        <div className="text-sm text-muted-foreground">{assignment.teacherCode}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.academicYear}</TableCell>
                  <TableCell>{assignment.campus}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{assignment.className}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{assignment.mainSubject}</div>
                      <div className="text-sm text-muted-foreground">{assignment.mainHours} tiết/tuần</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {assignment.secondarySubject ? (
                      <div>
                        <div>{assignment.secondarySubject}</div>
                        <div className="text-sm text-muted-foreground">{assignment.secondaryHours} tiết/tuần</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{assignment.totalHours} tiết</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {assignment.isHomeRoomTeacher && (
                        <Badge variant="default" className="text-xs">Chủ nhiệm</Badge>
                      )}
                      {assignment.teachesSpecialNeeds && (
                        <Badge variant="outline" className="text-xs">HSKT</Badge>
                      )}
                      {assignment.isYouthLeader && (
                        <Badge variant="outline" className="text-xs">Đoàn đội</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentTable;
