
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminShortcutButton: React.FC = () => {
  const navigate = useNavigate();

  // רק במצב פיתוח או למשתמשי admin
  const isDev = import.meta.env.DEV;
  if (!isDev) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate('/admin/system-dashboard')}
      className="flex items-center gap-2 bg-gradient-to-l from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 font-medium"
    >
      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
        <Zap className="h-3 w-3 text-white" />
      </div>
      <Settings className="h-4 w-4 text-blue-600" />
      <span className="text-blue-700">דשבורד ניהול מתקדם</span>
    </Button>
  );
};

export default AdminShortcutButton;
