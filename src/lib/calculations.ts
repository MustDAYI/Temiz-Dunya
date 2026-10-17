/**
 * Dumana Giden Fırsatlar - Hesaplama Motoru (Pure Functions)
 * Tüm hesaplamalar arayüzden bağımsız, saf ve test edilebilir fonksiyonlar halindedir.
 */

// 2025 TADAB Yıllık Hasılatı (TL)
export const TADAB_2025_ANNUAL_REVENUE = 695_220_183_645;
export const DAYS_IN_YEAR = 365;

// Tek merkezden türetilen süre karşılıkları (tam hassasiyetle tutulur, en son yuvarlanır)
export const DAILY_REVENUE = TADAB_2025_ANNUAL_REVENUE / DAYS_IN_YEAR; // ≈ 1.904.712.831,90 TL
export const WEEKLY_REVENUE = DAILY_REVENUE * 7;                     // ≈ 13.332.989.823,33 TL
export const MONTHLY_30_REVENUE = DAILY_REVENUE * 30;                 // ≈ 57.141.384.957,12 TL

export type CalculationPeriod = '1day' | '7days' | '30days';

/**
 * Seçilen döneme ait hasılatı döndürür
 */
export function getNationalRevenueForPeriod(period: CalculationPeriod): number {
  switch (period) {
    case '1day':
      return DAILY_REVENUE;
    case '7days':
      return WEEKLY_REVENUE;
    case '30days':
      return MONTHLY_30_REVENUE;
  }
}

/**
 * Sayıyı Türkçe para birimi formatında tam sayı olarak biçimlendirir (Örn: 1.904.712.832 TL)
 */
export function formatCurrencyFull(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return '0 TL';
  const rounded = Math.round(amount);
  return `${new Intl.NumberFormat('tr-TR').format(rounded)} TL`;
}

/**
 * Sayıyı yaklaşık milyar TL formatında biçimlendirir (Örn: ≈1,90 milyar TL)
 */
export function formatRevenueShort(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return '≈0 TL';
  const billions = amount / 1_000_000_000;
  const formatted = billions.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `≈${formatted} milyar TL`;
}

/**
 * İki tutar arasındaki oranı hesaplar
 */
export function calculateRatio(nationalRevenue: number, projectCost: number): number {
  if (projectCost <= 0 || isNaN(projectCost) || !isFinite(projectCost)) return 0;
  if (nationalRevenue < 0 || isNaN(nationalRevenue) || !isFinite(nationalRevenue)) return 0;
  return nationalRevenue / projectCost;
}

/**
 * Türkçe ses uyumuna göre yüzde yönelme ekini ('ına, 'ine, 'una, 'üne) belirler
 */
export function getTurkishPercentageSuffix(percent: number): string {
  const n = Math.abs(Math.round(percent));
  const lastDigit = n % 10;
  
  // 10, 20, 30... gibi 10'un katları için özel sonlar
  if (n === 10 || n === 30) return "'una";
  if (n === 20 || n === 50 || n === 70 || n === 80) return "'ine";
  if (n === 40 || n === 60 || n === 90) return "'ına";
  if (n === 100) return "'üne";
  if (n === 0) return "'ına";

  // Son basamağa göre
  switch (lastDigit) {
    case 1: // bir
    case 2: // iki
    case 5: // beş
    case 7: // yedi
    case 8: // sekiz
      return "'ine";
    case 3: // üç
    case 4: // dört
      return "'üne";
    case 6: // altı
      return "'sına";
    case 9: // dokuz
      return "'una";
    default:
      return "'ine";
  }
}

/**
 * Proje oranını belirlenen kılavuz kurallarına göre metne dönüştürür.
 * Oran 1'in altındaysa: "Açıklanan maliyetin %79'una eşit"
 * Oran 1 veya üstündeyse: "Açıklanan tutarın 1,27 katı"
 * Kural: Asla "bu tesis yapılır" denmez; kapasite çarparak mahalleye dönüştürülmez.
 */
export function formatRatioSentence(ratio: number): string {
  if (isNaN(ratio) || !isFinite(ratio) || ratio <= 0) {
    return 'Karşılaştırma hesaplanamıyor';
  }

  if (ratio < 1) {
    const percent = Math.round(ratio * 100);
    const suffix = getTurkishPercentageSuffix(percent);
    return `Açıklanan maliyetin %${percent}${suffix} eşit`;
  } else {
    const times = ratio.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `Açıklanan tutarın ${times} katı`;
  }
}

/**
 * Karapınar GES Sabitleri ve Hesaplamaları
 * Tarihsel yatırım bedeli: 1.000.000.000 ABD Doları
 * 16.10.2026 TCMB döviz satış kuru: 49.4463 TL/USD
 * TL Karşılığı: 49.446.300.000 TL
 */
export const KARAPINAR_GES_USD = 1_000_000_000;
export const TCMB_USD_TRY_RATE_2026_10_16 = 49.4463;
export const KARAPINAR_GES_TL = KARAPINAR_GES_USD * TCMB_USD_TRY_RATE_2026_10_16; // 49.446.300.000 TL

export interface KarapinarRatioResult {
  sentence: string;
  ratio: number;
  highlightMessage?: string;
  percentageExact: number;
}

export function formatKarapinarRatioSentence(period: CalculationPeriod): KarapinarRatioResult {
  const revenue = getNationalRevenueForPeriod(period);
  const ratio = revenue / KARAPINAR_GES_TL;
  const percentageExact = ratio * 100;

  if (period === '1day') {
    return {
      sentence: 'Açıklanan yatırımın kurla çevrilmiş karşılığının yaklaşık %3,9’una eşit.',
      ratio,
      percentageExact,
    };
  } else if (period === '7days') {
    return {
      sentence: 'Açıklanan yatırımın kurla çevrilmiş karşılığının yaklaşık %27’sine eşit.',
      ratio,
      percentageExact,
    };
  } else {
    return {
      sentence: 'Açıklanan yatırımın kurla çevrilmiş karşılığının yaklaşık %116’sına eşit.',
      highlightMessage: '30 günlük sigara satış karşılığı, Karapınar GES’in açıklanan yatırım bedelinin TL karşılığını aşıyor.',
      ratio,
      percentageExact,
    };
  }
}

/**
 * Türkçe ondalık virgülü (örn. "120,50") veya noktayı ("120.50") sayıya ayrıştırır.
 * Geçersiz, negatif veya sonsuz girişlerde null döner.
 */
export function parseTurkishNumber(input: string): number | null {
  if (input === null || input === undefined) return null;
  const trimmed = input.trim();
  if (trimmed === '') return null;

  // Boşlukları temizle, virgülü noktaya çevir
  const sanitized = trimmed.replace(/\s+/g, '').replace(',', '.');
  const parsed = Number(sanitized);

  if (isNaN(parsed) || !isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}

export interface PersonalSpendingResult {
  isValid: boolean;
  errorMessage?: string;
  isZero: boolean;
  totalSpent: number;
  displayText: string;
}

/**
 * Kişisel harcamayı hesaplar.
 * Kural: Asla "Bıraktın, şu kadar kazandın" denmez; nötr ve sakin bir dille sunulur.
 */
export function calculatePersonalSpending(
  dailyCigarettes: number,
  packPrice: number,
  periodDays: number,
  packSize: number = 20
): PersonalSpendingResult {
  if (
    isNaN(dailyCigarettes) ||
    !isFinite(dailyCigarettes) ||
    dailyCigarettes < 0 ||
    isNaN(packPrice) ||
    !isFinite(packPrice) ||
    packPrice < 0 ||
    isNaN(periodDays) ||
    !isFinite(periodDays) ||
    periodDays <= 0 ||
    packSize <= 0
  ) {
    return {
      isValid: false,
      errorMessage: 'Lütfen geçerli ve pozitif sayılar giriniz.',
      isZero: false,
      totalSpent: 0,
      displayText: 'Geçersiz giriş',
    };
  }

  if (dailyCigarettes === 0) {
    return {
      isValid: true,
      isZero: true,
      totalSpent: 0,
      displayText: 'Bu kullanım düzeyinde sigara harcaman yok.',
    };
  }

  const packsPerDay = dailyCigarettes / packSize;
  const totalSpent = packsPerDay * packPrice * periodDays;
  const roundedSpent = Math.round(totalSpent);
  const formatted = new Intl.NumberFormat('tr-TR').format(roundedSpent);

  return {
    isValid: true,
    isZero: false,
    totalSpent,
    displayText: `Bu kullanım düzeyinde ${periodDays} günlük harcaman yaklaşık ${formatted} TL.`,
  };
}

/**
 * Çevresel ölçek sabitleri ve hesaplamaları
 */
export const ENVIRONMENTAL_CONSTANTS = {
  ANNUAL_BUTTS_GLOBAL: 4.5e12, // 4,5 trilyon adet
  BUTT_LENGTH_M: 0.02,        // 2 cm
  BUTT_DIAMETER_M: 0.008,     // 0,8 cm
  PITCH_LENGTH_M: 105,        // Standart futbol sahası boyu
  PITCH_WIDTH_M: 68,          // Standart futbol sahası eni
  ANNUAL_TOXIC_WASTE_TONS: 766_600, // DSÖ/UNEP tahmini
  WATER_FOOTPRINT_PER_CIGARETTE_LITERS: 3.7, // Litre
  CIGARETTES_PER_PACK: 20,
};

/**
 * Futbol sahası ölçek hesabını yapar
 */
export function calculateFootballPitchEquivalence() {
  const buttAreaM2 =
    ENVIRONMENTAL_CONSTANTS.BUTT_LENGTH_M * ENVIRONMENTAL_CONSTANTS.BUTT_DIAMETER_M; // 0.00016 m²
  const totalButtAreaM2 = ENVIRONMENTAL_CONSTANTS.ANNUAL_BUTTS_GLOBAL * buttAreaM2; // 720.000.000 m² (720 km²)
  const pitchAreaM2 =
    ENVIRONMENTAL_CONSTANTS.PITCH_LENGTH_M * ENVIRONMENTAL_CONSTANTS.PITCH_WIDTH_M; // 7.140 m²
  const pitchCount = totalButtAreaM2 / pitchAreaM2; // ≈ 100.840,34

  return {
    buttAreaM2,
    totalButtAreaM2,
    totalButtAreaKm2: totalButtAreaM2 / 1_000_000,
    pitchAreaM2,
    pitchCountExact: pitchCount,
    pitchCountRounded: Math.round(pitchCount),
    approximateThousands: Math.round(pitchCount / 1000), // ≈ 101 bin
  };
}

/**
 * Paket başına su ayak izini hesaplar
 */
export function calculatePackWaterFootprint(): number {
  return (
    ENVIRONMENTAL_CONSTANTS.CIGARETTES_PER_PACK *
    ENVIRONMENTAL_CONSTANTS.WATER_FOOTPRINT_PER_CIGARETTE_LITERS
  ); // 20 * 3.7 = 74 litre
}
