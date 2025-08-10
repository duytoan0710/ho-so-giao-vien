
import React from 'react';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import ProfileContent from './profile/ProfileContent';

const TeacherProfile = () => {
  const { id } = useParams<{ id: string }>();
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
        return <div className="animate-fade-in">Nội dung Năng lực & Bằng cấp sẽ được phát triển</div>;
      case 'contracts':
        return <div className="animate-fade-in">Nội dung Hợp đồng & Lương sẽ được phát triển</div>;
      case 'assignments':
        return <div className="animate-fade-in">Nội dung Phân công & Giảng dạy sẽ được phát triển</div>;
      case 'evaluations':
        return <div className="animate-fade-in">Nội dung Đánh giá & Bồi dưỡng sẽ được phát triển</div>;
      default:
        return <ProfileContent teacher={teacher} />;
    }
  };

  return (
    <div className="teacher-profile-layout flex">
      <TeacherSidebar
        teacher={teacher}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherProfile;
