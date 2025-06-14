
// Types for testing system
export interface SystemTestReport {
  timestamp: string;
  testSessions: TestSession[];
  overallScore: number;
  criticalIssues: string[];
  recommendations: string[];
  detailedFindings: DetailedFindings;
  performanceMetrics: PerformanceMetrics;
}

export interface TestSession {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'running' | 'completed' | 'failed';
  tests: TestResult[];
  logs: TestLog[];
}

export interface TestResult {
  id: string;
  name: string;
  category: 'ui' | 'functionality' | 'integration' | 'performance' | 'migration';
  status: 'passed' | 'failed' | 'warning' | 'skipped';
  duration: number;
  details: string;
  evidence: string[];
  recommendations: string[];
}

export interface TestLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  category: string;
  message: string;
  data?: any;
}

export interface DetailedFindings {
  migrationReadiness: {
    score: number;
    missingComponents: string[];
    businessRulesStatus: any[];
  };
  userExperience: {
    navigationWorks: boolean;
    formsFunction: boolean;
    errorsHandled: boolean;
    responseTime: number;
  };
  systemIntegrity: {
    dataConsistency: boolean;
    componentsLoaded: boolean;
    routingWorks: boolean;
    apiConnections: boolean;
  };
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  componentRenderTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  errorRate: number;
}
