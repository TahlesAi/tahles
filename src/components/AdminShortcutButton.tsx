
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
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
      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
    >
      <Settings className="h-4 w-4" />
      🔧 דשבורד ניהול מתקדם
    </Button>
  );
};

export default AdminShortcutButton;
