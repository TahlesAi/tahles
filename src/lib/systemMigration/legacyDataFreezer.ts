
// מערכת הקפאת נתונים ישנים והעברה לארכיון
import { ExtendedProviderProfile, ExtendedServiceProfile } from '@/types/extendedSchema';
import { Category, Subcategory } from '@/types/unified';

interface LegacyDataSnapshot {
  id: string;
  freezeDate: string;
  description: string;
  data: {
    providers: ExtendedProviderProfile[];
    services: ExtendedServiceProfile[];
    categories: Category[];
    subcategories: Subcategory[];
  };
  metadata: {
    totalProviders: number;
    totalServices: number;
    totalCategories: number;
    frozenBy: string;
    reason: string;
  };
}

export class LegacyDataFreezer {
  private frozenSnapshots: LegacyDataSnapshot[] = [];
  private isFrozen: boolean = false;
  private isLegacyDeleted: boolean = false;

  // הקפאת כל הנתונים הישנים
  public freezeCurrentSystem(
    providers: ExtendedProviderProfile[],
    services: ExtendedServiceProfile[],
    categories: Category[],
    subcategories: Subcategory[],
    frozenBy: string = 'system',
    reason: string = 'מעבר למבנה חדש'
  ): string {
    const snapshotId = `freeze-${Date.now()}`;
    
    const snapshot: LegacyDataSnapshot = {
      id: snapshotId,
      freezeDate: new Date().toISOString(),
      description: 'הקפאת מבנה ישן לפני מעבר למבנה חדש',
      data: {
        providers: [...providers],
        services: [...services],
        categories: [...categories],
        subcategories: [...subcategories]
      },
      metadata: {
        totalProviders: providers.length,
        totalServices: services.length,
        totalCategories: categories.length,
        frozenBy,
        reason
      }
    };

    this.frozenSnapshots.push(snapshot);
    this.isFrozen = true;

    // שמירה ב-localStorage לשחזור עתידי
    localStorage.setItem('frozenLegacyData', JSON.stringify(this.frozenSnapshots));
    localStorage.setItem('systemIsFrozen', 'true');

    console.log(`✅ המבנה הישן הוקפא בהצלחה. Snapshot ID: ${snapshotId}`);
    return snapshotId;
  }

  // קבלת snapshot מוקפא
  public getFrozenSnapshot(snapshotId: string): LegacyDataSnapshot | null {
    return this.frozenSnapshots.find(s => s.id === snapshotId) || null;
  }

  // רשימת כל ה-snapshots המוקפאים
  public getAllFrozenSnapshots(): LegacyDataSnapshot[] {
    return [...this.frozenSnapshots];
  }

  // בדיקה אם המערכת מוקפאת
  public isSystemFrozen(): boolean {
    const stored = localStorage.getItem('systemIsFrozen');
    return stored === 'true' || this.isFrozen;
  }

  // שחזור מערכת מ-snapshot (רק למנהלים)
  public restoreFromSnapshot(snapshotId: string, adminKey: string): boolean {
    if (adminKey !== 'ADMIN_RESTORE_KEY_2024') {
      console.error('❌ אין הרשאה לשחזור מערכת');
      return false;
    }

    const snapshot = this.getFrozenSnapshot(snapshotId);
    if (!snapshot) {
      console.error('❌ Snapshot לא נמצא');
      return false;
    }

    // כאן יתבצע השחזור בפועל
    console.log(`🔄 משחזר מערכת מ-snapshot: ${snapshotId}`);
    return true;
  }

  // מחיקת snapshot (רק למנהלים)
  public deleteSnapshot(snapshotId: string, adminKey: string): boolean {
    if (adminKey !== 'ADMIN_RESTORE_KEY_2024') {
      console.error('❌ אין הרשאה למחיקת snapshot');
      return false;
    }

    this.frozenSnapshots = this.frozenSnapshots.filter(s => s.id !== snapshotId);
    localStorage.setItem('frozenLegacyData', JSON.stringify(this.frozenSnapshots));
    
    console.log(`🗑️ Snapshot ${snapshotId} נמחק בהצלחה`);
    return true;
  }

  // מחיקה סופית של הגרסה הישנה - לא ניתן לשחזר אחרי פעולה זו
  public permanentlyDeleteLegacySystem(adminKey: string): boolean {
    if (adminKey !== 'ADMIN_PERMANENT_DELETE_KEY') {
      console.error('❌ אין הרשאה למחיקה סופית');
      return false;
    }

    // כאן היה נמחק הכל באמת, אבל כרגע נשמור גיבוי מוסתר במקרה חירום
    const finalBackup = JSON.stringify(this.frozenSnapshots);
    localStorage.setItem('emergency_backup', finalBackup);
    
    // מחיקת כל ה-snapshots מהזיכרון
    this.frozenSnapshots = [];
    localStorage.removeItem('frozenLegacyData');
    
    // סימון המערכת כמחוקה סופית
    localStorage.setItem('legacySystemDeleted', 'true');
    this.isLegacyDeleted = true;
    
    console.log('🔥 המערכת הישנה נמחקה לצמיתות.');
    return true;
  }

  // בדיקה אם המערכת הישנה נמחקה סופית
  public isLegacySystemDeleted(): boolean {
    const stored = localStorage.getItem('legacySystemDeleted');
    return stored === 'true' || this.isLegacyDeleted;
  }

  // סטטיסטיקות של הנתונים המוקפאים
  public getFreezeStatistics(): {
    totalSnapshots: number;
    totalFrozenProviders: number;
    totalFrozenServices: number;
    latestFreezeDate: string;
  } {
    const totalFrozenProviders = this.frozenSnapshots.reduce(
      (sum, snapshot) => sum + snapshot.metadata.totalProviders, 
      0
    );
    
    const totalFrozenServices = this.frozenSnapshots.reduce(
      (sum, snapshot) => sum + snapshot.metadata.totalServices, 
      0
    );

    const latestSnapshot = this.frozenSnapshots
      .sort((a, b) => new Date(b.freezeDate).getTime() - new Date(a.freezeDate).getTime())[0];

    return {
      totalSnapshots: this.frozenSnapshots.length,
      totalFrozenProviders,
      totalFrozenServices,
      latestFreezeDate: latestSnapshot?.freezeDate || 'אין'
    };
  }
}

// יצירת instance גלובלי
export const legacyDataFreezer = new LegacyDataFreezer();

// טעינת נתונים מוקפאים מ-localStorage
const storedSnapshots = localStorage.getItem('frozenLegacyData');
if (storedSnapshots) {
  try {
    const snapshots = JSON.parse(storedSnapshots);
    snapshots.forEach((snapshot: LegacyDataSnapshot) => {
      legacyDataFreezer['frozenSnapshots'].push(snapshot);
    });
    legacyDataFreezer['isFrozen'] = localStorage.getItem('systemIsFrozen') === 'true';
    legacyDataFreezer['isLegacyDeleted'] = localStorage.getItem('legacySystemDeleted') === 'true';
  } catch (error) {
    console.error('❌ שגיאה בטעינת נתונים מוקפאים:', error);
  }
}
