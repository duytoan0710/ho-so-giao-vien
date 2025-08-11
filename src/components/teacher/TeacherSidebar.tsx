
import React from 'react';
import { ArrowLeft, User, Award, FileText, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Teacher {
  id: string;
  name: string;
  code: string;
  avatar: string;
  position: string;
  department: string;
}

interface TeacherSidebarProps {
  teacher: Teacher;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { 
    id: 'profile', 
    title: 'Hồ sơ cá nhân', 
    icon: User,
    description: 'Thông tin cơ bản & vị trí công tác'
  },
  { 
    id: 'qualifications', 
    title: 'Trình độ & Phụ cấp', 
    icon: GraduationCap,
    description: 'Bằng cấp, chứng chỉ & phụ cấp'
  },
  { 
    id: 'training', 
    title: 'Đào tạo & Bồi dưỡng', 
    icon: Award,
    description: 'Quá trình đào tạo & nâng cao'
  },
  { 
    id: 'evaluation', 
    title: 'Đánh giá & Xếp loại', 
    icon: TrendingUp,
    description: 'Kết quả đánh giá năng lực'
  },
  { 
    id: 'contracts', 
    title: 'Hợp đồng & Lương', 
    icon: FileText,
    description: 'Thông tin hợp đồng & lịch sử lương'
  },
  { 
    id: 'assignments', 
    title: 'Phân công Giảng dạy', 
    icon: BookOpen,
    description: 'Quản lý phân công & chủ nhiệm'
  },
];

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ 
  teacher, 
  activeSection, 
  onSectionChange 
}) => {
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <div className="sidebar p-6 flex flex-col h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Back Button */}
      <button
        onClick={handleBackToList}
        className="flex items-center text-muted-foreground hover:text-primary mb-8 transition-all duration-200 font-medium hover:bg-muted/50 px-3 py-2 rounded-lg -mx-3"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Trở về danh sách
      </button>

      {/* Teacher Info Card */}
      <div className="mb-8 p-6 bg-card border rounded-xl shadow-sm">
        <div className="text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-primary/20">
            <AvatarImage src={teacher.avatar} alt={teacher.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              {teacher.name.split(' ').pop()?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold text-foreground mb-1">{teacher.name}</h2>
          <p className="text-sm text-primary font-semibold mb-1">{teacher.code}</p>
          <p className="text-xs text-muted-foreground">{teacher.position}</p>
          <p className="text-xs text-muted-foreground">{teacher.department}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-muted/50 text-foreground'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {item.title}
                  </p>
                  <p className={`text-xs mt-1 ${
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TeacherSidebar;
