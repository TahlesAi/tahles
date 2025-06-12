
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Eye,
  RefreshCw,
  Zap,
  Shield,
  Database,
  Layout,
  GitBranch
} from 'lucide-react';

interface TestStatusIndicatorProps {
  status: 'passed' | 'failed' | 'running' | 'pending';
  testType: 'Forms' | 'UI' | 'Navigation' | 'Accessibility' | 'Data' | 'Performance' | 'Integration';
  onViewDetails?: () => void;
  showDetailsButton?: boolean;
  timestamp?: string;
  errorCode?: string;
  testedRoute?: string;
}

const TestStatusIndicator: React.FC<TestStatusIndicatorProps> = ({
  status,
  testType,
  onViewDetails,
  showDetailsButton = false,
  timestamp,
  errorCode,
  testedRoute
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'running':
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ עבר</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">❌ נכשל</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">🔄 רץ</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">⏳ ממתין</Badge>;
      default:
        return <Badge variant="outline">❓ לא ידוע</Badge>;
    }
  };

  const getTypeIcon = () => {
    switch (testType) {
      case 'Forms':
        return <Layout className="h-4 w-4" />;
      case 'UI':
        return <Eye className="h-4 w-4" />;
      case 'Navigation':
        return <Zap className="h-4 w-4" />;
      case 'Accessibility':
        return <Shield className="h-4 w-4" />;
      case 'Data':
        return <Database className="h-4 w-4" />;
      case 'Performance':
        return <RefreshCw className="h-4 w-4" />;
      case 'Integration':
        return <GitBranch className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <span className="text-sm font-medium">{testType}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {getStatusBadge()}
        
        {status === 'failed' && showDetailsButton && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={onViewDetails}
            className="text-xs h-7"
          >
            <Eye className="h-3 w-3 ml-1" />
            פרטים
          </Button>
        )}
      </div>
      
      {/* מידע נוסף */}
      <div className="text-xs text-gray-500 space-y-1">
        {timestamp && (
          <div className="text-right">{timestamp}</div>
        )}
        {testedRoute && (
          <div className="font-mono text-blue-600">{testedRoute}</div>
        )}
        {errorCode && (
          <div className="font-mono text-red-500">{errorCode}</div>
        )}
      </div>
    </div>
  );
};

export default TestStatusIndicator;
