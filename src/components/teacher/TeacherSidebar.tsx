
import React from 'react';
import { ArrowLeft, User, GraduationCap, FileText, BookOpen, Award } from 'lucide-react';
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
  { id: 'profile', title: 'Hồ sơ & Vị trí', icon: User },
  { id: 'qualifications', title: 'Năng lực & Bằng cấp', icon: GraduationCap },
  { id: 'contracts', title: 'Hợp đồng & Lương', icon: FileText },
  { id: 'assignments', title: 'Phân công & Giảng dạy', icon: BookOpen },
  { id: 'evaluations', title: 'Đánh giá & Bồi dưỡng', icon: Award },
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
    <div className="sidebar p-6 flex flex-col h-screen">
      {/* Back Button */}
      <button
        onClick={handleBackToList}
        className="flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors duration-200 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Trở về danh sách
      </button>

      {/* Teacher Info */}
      <div className="mb-8 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-border">
          <AvatarImage src={teacher.avatar} alt={teacher.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
            {teacher.name.split(' ').pop()?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-foreground mb-2">{teacher.name}</h2>
        <p className="text-sm text-primary font-semibold mb-1">{teacher.code}</p>
        <p className="text-sm text-muted-foreground font-medium">{teacher.position}</p>
        <p className="text-sm text-muted-foreground font-medium">{teacher.department}</p>
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
              className={`nav-item w-full text-left ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TeacherSidebar;
