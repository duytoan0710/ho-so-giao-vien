
import React from 'react';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import ProfileContent from './profile/ProfileContent';
import QualificationsContent from './qualifications/QualificationsContent';
import ContractsContent from './contracts/ContractsContent';
import AssignmentsContent from './assignments/AssignmentsContent';
import EvaluationsContent from './evaluations/EvaluationsContent';

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
        return <QualificationsContent teacher={teacher} />;
      case 'contracts':
        return <ContractsContent teacher={teacher} />;
      case 'assignments':
        return <AssignmentsContent teacher={teacher} />;
      case 'evaluations':
        return <EvaluationsContent teacher={teacher} />;
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
