import { describe, it, expect } from 'vitest';
import {
  TADAB_2025_ANNUAL_REVENUE,
  DAILY_REVENUE,
  WEEKLY_REVENUE,
  MONTHLY_30_REVENUE,
  formatRevenueShort,
  formatRatioSentence,
  calculateRatio,
  calculatePersonalSpending,
  parseTurkishNumber,
  calculateFootballPitchEquivalence,
  calculatePackWaterFootprint,
  KARAPINAR_GES_USD,
  TCMB_USD_TRY_RATE_2026_10_16,
  KARAPINAR_GES_TL,
  formatKarapinarRatioSentence,
} from '../lib/calculations.ts';

describe('TADAB 2025 Hasılat ve Süre Hesapları', () => {
  it('yıllık hasılat ve gün/hafta/30 gün türetimleri tam hassasiyette ve doğru olmalı', () => {
    expect(TADAB_2025_ANNUAL_REVENUE).toBe(695_220_183_645);
    
    // Günlük ≈ 1.904.712.831,90 TL
    expect(DAILY_REVENUE).toBeCloseTo(1_904_712_831.90, 1);
    expect(formatRevenueShort(DAILY_REVENUE)).toBe('≈1,90 milyar TL');

    // Haftalık ≈ 13.332.989.823,33 TL
    expect(WEEKLY_REVENUE).toBeCloseTo(13_332_989_823.33, 1);
    expect(formatRevenueShort(WEEKLY_REVENUE)).toBe('≈13,33 milyar TL');

    // 30 Günlük ≈ 57.141.384.957,12 TL
    expect(MONTHLY_30_REVENUE).toBeCloseTo(57_141_384_957.12, 1);
    expect(formatRevenueShort(MONTHLY_30_REVENUE)).toBe('≈57,14 milyar TL');
  });
});

describe('Oran Cümlesi Biçimlendirme Kuralları', () => {
  it("oran 1'in altındaysa 'Açıklanan maliyetin %X'ine eşit' üretmeli", () => {
    // 1,905B / 2,4B ≈ 0,7936 -> %79
    const ratioUnder1 = 1_904_712_832 / 2_400_000_000;
    expect(formatRatioSentence(ratioUnder1)).toBe("Açıklanan maliyetin %79'una eşit");
  });

  it("oran 1 veya üstündeyse 'Açıklanan tutarın X,XX katı' üretmeli", () => {
    // 1,905B / 1,5B ≈ 1,2698 -> 1,27 katı
    const ratioOver1 = calculateRatio(1_904_712_832, 1_500_000_000);
    expect(ratioOver1).toBeCloseTo(1.27, 2);
    expect(formatRatioSentence(ratioOver1)).toBe('Açıklanan tutarın 1,27 katı');
  });

  it('asla tesis yapılır veya kapasite çarpanı iddiasında bulunmamalı', () => {
    const text = formatRatioSentence(1.27);
    expect(text).not.toContain('yapılır');
    expect(text).not.toContain('mahalle');
    expect(text).not.toContain('yatak');
  });
});

describe('Karapınar GES Hesaplamaları ve Oranları', () => {
  it('tarihsel yatırım bedeli ve 16.10.2026 kuru doğru çevrilmeli', () => {
    expect(KARAPINAR_GES_USD).toBe(1_000_000_000);
    expect(TCMB_USD_TRY_RATE_2026_10_16).toBe(49.4463);
    expect(KARAPINAR_GES_TL).toBe(49_446_300_000);
  });

  it('1 günlük seçimde yaklaşık %3,9 cümlesi üretmeli', () => {
    const res = formatKarapinarRatioSentence('1day');
    expect(res.sentence).toBe('Açıklanan yatırımın kurla çevrilmiş karşılığının yaklaşık %3,9’una eşit.');
    expect(res.percentageExact).toBeCloseTo(3.85, 1);
  });

  it('7 günlük seçimde yaklaşık %27 cümlesi üretmeli', () => {
    const res = formatKarapinarRatioSentence('7days');
    expect(res.sentence).toBe('Açıklanan yatırımın kurla çevrilmiş karşılığının yaklaşık %27’sine eşit.');
    expect(res.percentageExact).toBeCloseTo(26.96, 1);
  });

  it('30 günlük seçimde yaklaşık %116 ve aşma vurgu mesajı üretmeli', () => {
    const res = formatKarapinarRatioSentence('30days');
    expect(res.sentence).toBe('Açıklanan yatırımın kurla çevrilmiş karşılığının yaklaşık %116’sına eşit.');
    expect(res.percentageExact).toBeCloseTo(115.56, 1);
    expect(res.highlightMessage).toBe('30 günlük sigara satış karşılığı, Karapınar GES’in açıklanan yatırım bedelinin TL karşılığını aşıyor.');
  });
});

describe('Kişisel Harcama Hesapları', () => {
  const packPrice = 120;
  const cigarettesPerDay = 20;
  const packSize = 20;

  it('günde 20 adet, 120 TL paket fiyatı ile 1 gün -> 120 TL olmalı', () => {
    const result = calculatePersonalSpending(cigarettesPerDay, packPrice, 1, packSize);
    expect(result.isValid).toBe(true);
    expect(result.totalSpent).toBe(120);
    expect(result.displayText).toBe('Bu kullanım düzeyinde 1 günlük harcaman yaklaşık 120 TL.');
  });

  it('günde 20 adet, 120 TL paket fiyatı ile 1 hafta (7 gün) -> 840 TL olmalı', () => {
    const result = calculatePersonalSpending(cigarettesPerDay, packPrice, 7, packSize);
    expect(result.isValid).toBe(true);
    expect(result.totalSpent).toBe(840);
    expect(result.displayText).toBe('Bu kullanım düzeyinde 7 günlük harcaman yaklaşık 840 TL.');
  });

  it('günde 20 adet, 120 TL paket fiyatı ile 30 gün -> 3.600 TL olmalı', () => {
    const result = calculatePersonalSpending(cigarettesPerDay, packPrice, 30, packSize);
    expect(result.isValid).toBe(true);
    expect(result.totalSpent).toBe(3600);
    expect(result.displayText).toBe('Bu kullanım düzeyinde 30 günlük harcaman yaklaşık 3.600 TL.');
  });

  it('günde 20 adet, 120 TL paket fiyatı ile 1 yıl (365 gün) -> 43.800 TL olmalı', () => {
    const result = calculatePersonalSpending(cigarettesPerDay, packPrice, 365, packSize);
    expect(result.isValid).toBe(true);
    expect(result.totalSpent).toBe(43800);
    expect(result.displayText).toBe('Bu kullanım düzeyinde 365 günlük harcaman yaklaşık 43.800 TL.');
  });

  it('0 sigara girildiğinde sigara harcaman yok mesajı dönmeli ve asla suçlayıcı olmamalı', () => {
    const result = calculatePersonalSpending(0, packPrice, 30, packSize);
    expect(result.isValid).toBe(true);
    expect(result.isZero).toBe(true);
    expect(result.totalSpent).toBe(0);
    expect(result.displayText).toBe('Bu kullanım düzeyinde sigara harcaman yok.');
    expect(result.displayText).not.toContain('Bıraktın');
    expect(result.displayText).not.toContain('kazandın');
  });

  it('boş, negatif, NaN veya Infinity girişlerinde güvenli doğrulama sağlamalı', () => {
    expect(calculatePersonalSpending(-5, 120, 30).isValid).toBe(false);
    expect(calculatePersonalSpending(20, -100, 30).isValid).toBe(false);
    expect(calculatePersonalSpending(NaN, 120, 30).isValid).toBe(false);
    expect(calculatePersonalSpending(20, Infinity, 30).isValid).toBe(false);
  });

  it('Türkçe ondalık virgülü doğru ayrıştırmalı', () => {
    expect(parseTurkishNumber('120,50')).toBe(120.5);
    expect(parseTurkishNumber(' 120.50 ')).toBe(120.5);
    expect(parseTurkishNumber('0')).toBe(0);
    expect(parseTurkishNumber('-10')).toBeNull();
    expect(parseTurkishNumber('abc')).toBeNull();
    expect(parseTurkishNumber('')).toBeNull();
  });
});

describe('Çevre ve Ölçek Hesapları', () => {
  it('4,5 trilyon izmaritin alanı 720 km² ve yaklaşık 101 bin futbol sahası olmalı', () => {
    const equiv = calculateFootballPitchEquivalence();
    
    // 4,5e12 * 0,02 * 0,008 = 720.000.000 m²
    expect(equiv.totalButtAreaM2).toBe(720_000_000);
    expect(equiv.totalButtAreaKm2).toBe(720);

    // Saha 105 * 68 = 7.140 m²
    expect(equiv.pitchAreaM2).toBe(7_140);

    // 720.000.000 / 7.140 ≈ 100.840 ≈ 101 bin
    expect(equiv.pitchCountRounded).toBe(100_840);
    expect(equiv.approximateThousands).toBe(101);
  });

  it('toksik atık ve paket su ayak izi testleri', () => {
    // 766.600 / 20 = 38.330
    const ratioTest = 766_600 / 20;
    expect(ratioTest).toBe(38_330);

    // Paket başına su ayak izi: 20 * 3,7 = 74 litre
    expect(calculatePackWaterFootprint()).toBe(74);
  });
});
