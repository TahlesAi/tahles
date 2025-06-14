
import { TestSession, TestResult, TestLog } from './testTypes';

export class TestSessionManager {
  private currentSession: TestSession | null = null;
  private testHistory: TestSession[] = [];

  public startTestSession(sessionName: string): string {
    const sessionId = `test-session-${Date.now()}`;
    
    this.currentSession = {
      id: sessionId,
      name: sessionName,
      startTime: new Date().toISOString(),
      endTime: '',
      duration: 0,
      status: 'running',
      tests: [],
      logs: []
    };

    this.log('info', 'session', `התחיל סשן בדיקות: ${sessionName}`, { sessionId });
    return sessionId;
  }

  public addTestResult(result: Omit<TestResult, 'id'>): void {
    if (!this.currentSession) {
      console.error('אין סשן בדיקות פעיל');
      return;
    }

    const testResult: TestResult = {
      id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...result
    };

    this.currentSession.tests.push(testResult);
    this.log('info', 'test', `בדיקה הושלמה: ${result.name} - ${result.status}`, testResult);
  }

  public log(level: TestLog['level'], category: string, message: string, data?: any): void {
    const logEntry: TestLog = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data
    };

    if (this.currentSession) {
      this.currentSession.logs.push(logEntry);
    }

    console.log(`[${level.toUpperCase()}] [${category}] ${message}`, data || '');
  }

  public endTestSession(): TestSession | null {
    if (!this.currentSession) {
      console.error('אין סשן בדיקות פעיל');
      return null;
    }

    const endTime = new Date().toISOString();
    const startTime = new Date(this.currentSession.startTime);
    const duration = new Date(endTime).getTime() - startTime.getTime();

    this.currentSession.endTime = endTime;
    this.currentSession.duration = duration;
    this.currentSession.status = this.calculateSessionStatus();

    this.testHistory.push(this.currentSession);
    const completedSession = this.currentSession;
    this.currentSession = null;

    return completedSession;
  }

  private calculateSessionStatus(): TestSession['status'] {
    if (!this.currentSession) return 'failed';
    
    const failedTests = this.currentSession.tests.filter(t => t.status === 'failed');
    if (failedTests.length > 0) return 'failed';
    
    return 'completed';
  }

  public getTestHistory(): TestSession[] {
    return this.testHistory;
  }
}
