
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import TeacherSidebar from './TeacherSidebar';
import ProfileContent from './profile/ProfileContent';
import QualificationsContent from './qualifications/QualificationsContent';
import ContractsContent from './contracts/ContractsContent';
import EvaluationsContent from './evaluations/EvaluationsContent';
import TrainingContent from './training/TrainingContent';
import EvaluationContent from './evaluation/EvaluationContent';

const TeacherProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState('profile');

  // Mock teacher data
  const teacher = {
    id: id || '1',
    name: 'Nguyễn Văn An',
    code: 'GV001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    position: 'Giáo viên chính',
    department: 'Tổ Toán-Tin'
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileContent teacher={teacher} />;
      case 'qualifications':
        return <QualificationsContent teacher={teacher} />;
      case 'training':
        return <TrainingContent teacher={teacher} />;
      case 'evaluation':
        return <EvaluationContent teacher={teacher} />;
      case 'contracts':
        return <ContractsContent teacher={teacher} />;
      case 'assignments':
        return (
          <div className="animate-fade-in">
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Quản lý Phân công Giảng dạy
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Phân công giảng dạy đã được chuyển sang trang riêng để quản lý tập trung và hiệu quả hơn.
              </p>
              <Button 
                onClick={() => navigate('/assignments')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Đi đến Quản lý Phân công
              </Button>
            </div>
          </div>
        );
      default:
        return <ProfileContent teacher={teacher} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <TeacherSidebar
          teacher={teacher}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
