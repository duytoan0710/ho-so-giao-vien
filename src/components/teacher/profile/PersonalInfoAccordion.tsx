
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CalendarIcon, CheckCircle, XCircle, Shield, RefreshCw, Download } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const PersonalInfoAccordion = () => {
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [idCardDate, setIdCardDate] = React.useState<Date>();
  const [verificationStatus, setVerificationStatus] = React.useState<'none' | 'verifying' | 'success' | 'failed' | 'mismatch'>('none');
  const [isVerified, setIsVerified] = React.useState(false);
  const [showSyncOptions, setShowSyncOptions] = React.useState(false);

  const handleVerification = () => {
    setVerificationStatus('verifying');
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      if (success) {
        setVerificationStatus('success');
        setIsVerified(true);
        setShowSyncOptions(true);
      } else {
        setVerificationStatus('failed');
      }
    }, 2000);
  };

  const handleSync = () => {
    // Simulate data sync from national database
    setShowSyncOptions(false);
    // In real implementation, this would update form fields with verified data
  };

  const getVerificationStatusColor = () => {
    switch (verificationStatus) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'mismatch': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'verifying': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVerificationMessage = () => {
    switch (verificationStatus) {
      case 'success': return 'Xác thực thành công với CSDL Dân cư';
      case 'failed': return 'Xác thực thất bại - Vui lòng kiểm tra lại thông tin';
      case 'mismatch': return 'Thông tin không khớp với CSDL Dân cư';
      case 'verifying': return 'Đang xác thực với CSDL Dân cư...';
      default: return '';
    }
  };

  return (
    <Accordion type="single" defaultValue="personal-info" collapsible>
      <AccordionItem value="personal-info">
        <AccordionTrigger className="accordion-trigger">
          <div className="flex items-center justify-between w-full pr-4">
            <span className="text-base font-medium">Thông tin cá nhân</span>
            {isVerified && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Đã xác thực CSDL Dân cư
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="accordion-content">
          {/* Verification Section */}
          <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-medium text-blue-900">Xác thực với CSDL Quốc gia về Dân cư</h3>
              </div>
              <Button
                onClick={handleVerification}
                disabled={verificationStatus === 'verifying'}
                variant={isVerified ? "outline" : "default"}
                size="sm"
                className={isVerified ? "border-green-500 text-green-700" : "bg-blue-600 hover:bg-blue-700"}
              >
                {verificationStatus === 'verifying' ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Đang xác thực...
                  </>
                ) : isVerified ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Xác thực lại
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Xác thực với CSDL Dân cư
                  </>
                )}
              </Button>
            </div>

            {verificationStatus !== 'none' && (
              <Alert className={`mb-4 ${getVerificationStatusColor()}`}>
                <AlertDescription className="flex items-center gap-2">
                  {verificationStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                  {verificationStatus === 'failed' && <XCircle className="w-4 h-4" />}
                  {verificationStatus === 'mismatch' && <XCircle className="w-4 h-4" />}
                  {verificationStatus === 'verifying' && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {getVerificationMessage()}
                </AlertDescription>
              </Alert>
            )}

            {showSyncOptions && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800 mb-3">
                  Xác thực thành công! Bạn có muốn đồng bộ dữ liệu từ CSDL Dân cư để cập nhật thông tin?
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSync}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Đồng bộ dữ liệu
                  </Button>
                  <Button
                    onClick={() => setShowSyncOptions(false)}
                    variant="outline"
                    size="sm"
                  >
                    Bỏ qua
                  </Button>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-600 mt-3">
              * Chức năng này sẽ xác thực thông tin dựa trên "Số định danh cá nhân" và "Họ và tên" với Cơ sở dữ liệu Quốc gia về Dân cư
            </p>
          </div>

          <div className="form-grid">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Mã định danh/Số hiệu</Label>
                <Input className="form-input" placeholder="Nhập mã định danh" />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày sinh</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !birthDate && "text-text-muted"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {birthDate ? format(birthDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày sinh"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={birthDate}
                      onSelect={setBirthDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label className="form-label">Giới tính</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Dân tộc</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn dân tộc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kinh">Kinh</SelectItem>
                    <SelectItem value="tay">Tày</SelectItem>
                    <SelectItem value="thai">Thái</SelectItem>
                    <SelectItem value="hoa">Hoa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Tôn giáo</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn tôn giáo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Không</SelectItem>
                    <SelectItem value="buddhist">Phật giáo</SelectItem>
                    <SelectItem value="catholic">Công giáo</SelectItem>
                    <SelectItem value="protestant">Tin lành</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Quê quán</Label>
                <Textarea 
                  className="form-input resize-none" 
                  rows={2}
                  placeholder="Nhập thông tin quê quán"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Số CCCD/CMND</Label>
                <Input className="form-input" placeholder="Nhập số CCCD/CMND" />
              </div>

              <div className="form-group">
                <Label className="form-label">Ngày cấp CCCD</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "form-input justify-start text-left font-normal",
                        !idCardDate && "text-text-muted"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {idCardDate ? format(idCardDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày cấp"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={idCardDate}
                      onSelect={setIdCardDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="form-group">
                <Label className="form-label">Nơi cấp CCCD</Label>
                <Input className="form-input" placeholder="Nhập nơi cấp CCCD" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="form-group">
                <Label className="form-label">Họ và tên</Label>
                <Input className="form-input" placeholder="Nhập họ và tên" defaultValue="Nguyễn Văn An" />
              </div>

              <div className="form-group">
                <Label className="form-label">Quốc tịch</Label>
                <Select>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Chọn quốc tịch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vietnam">Việt Nam</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-group">
                <Label className="form-label">Chỗ ở hiện nay</Label>
                <Textarea 
                  className="form-input resize-none" 
                  rows={2}
                  placeholder="Nhập địa chỉ hiện nay"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Email</Label>
                <Input 
                  type="email" 
                  className="form-input" 
                  placeholder="Nhập địa chỉ email"
                  defaultValue="nva@school.edu.vn"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Số điện thoại</Label>
                <Input 
                  className="form-input" 
                  placeholder="Nhập số điện thoại"
                  defaultValue="0912345678"
                />
              </div>

              <div className="form-group">
                <Label className="form-label">Số Sổ bảo hiểm</Label>
                <Input className="form-input" placeholder="Nhập số sổ bảo hiểm" />
              </div>

              <div className="form-group">
                <Label className="form-label">Số tài khoản ngân hàng</Label>
                <Input className="form-input" placeholder="Nhập số tài khoản" />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PersonalInfoAccordion;
