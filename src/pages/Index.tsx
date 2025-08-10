
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Hệ thống Quản lý Giáo viên
          </h1>
          <p className="text-muted-foreground text-lg">
            Quản lý thông tin và phân công giảng dạy một cách hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/1')}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                Quản lý Giáo viên
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Quản lý hồ sơ, thông tin cá nhân, bằng cấp, hợp đồng và đánh giá của giáo viên
              </p>
              <Button className="w-full">
                Xem danh sách giáo viên
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/assignments')}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-green-600" />
                Phân công Giảng dạy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Quản lý phân công giảng dạy tập trung với khả năng tìm kiếm, lọc và xem tổng hợp
              </p>
              <Button className="w-full" variant="outline">
                Quản lý phân công
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <p className="text-sm text-muted-foreground">Tổng số giáo viên</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">125</div>
              <p className="text-sm text-muted-foreground">Phân công hiện tại</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <p className="text-sm text-muted-foreground">Giáo viên chủ nhiệm</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">580</div>
              <p className="text-sm text-muted-foreground">Tổng tiết dạy/tuần</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
