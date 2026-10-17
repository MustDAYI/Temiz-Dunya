export interface EnvironmentalFact {
  id: string;
  badge: string;
  title: string;
  description: string;
  detail: string;
  sourceNote: string;
}

export const ENVIRONMENTAL_FACTS: EnvironmentalFact[] = [
  {
    id: 'toxic-waste',
    badge: 'Yıllık Toksik Yük',
    title: '766.600 ton',
    description: 'Küresel ölçekte sigara izmaritlerinin oluşturduğu yıllık zehirli atık miktarı.',
    detail: 'Toprağa ve sulara karışan kimyasallar ekosistem dengesini olumsuz etkiler.',
    sourceNote: 'DSÖ / UNEP küresel yıllık toksik atık tahmini (2022)',
  },
  {
    id: 'filter-material',
    badge: 'Malzeme Yapısı',
    title: 'Filtre pamuk değil',
    description: 'Filtreler pamuk lifi değil, plastik esaslı selüloz asetattan üretilir.',
    detail: 'Zamanla parçalanarak mikroplastiklere dönüşebilir ve su kaynaklarına karışabilir.',
    sourceNote: 'DSÖ FCTC & UNEP mikroplastik raporu',
  },
  {
    id: 'decomposition-time',
    badge: 'Doğada Kalıcılık',
    title: 'Yaklaşık 10 yıl',
    description: 'Bir izmaritin doğada tamamen ufalanıp kaybolması için geçen tahmini süre.',
    detail: 'Güneş ışığı, nem ve ortam koşullarına göre bu süre değişkenlik gösterir.',
    sourceNote: "DSÖ soru & yanıt bülteni (koşullara bağlı parçalanma)",
  },
  {
    id: 'water-footprint',
    badge: 'Üretim Ayak İzi',
    title: 'Paket başına ~74 litre',
    description: 'Tütünün tarladan paketlemeye kadar uzanan üretim zincirindeki su ayak izi.',
    detail: 'Sigara başına ~3,7 litre su kullanılır. (20 adet × 3,7 L = 74 L. Bu bir tasarruf iddiası değil, yaşam döngüsü verisidir.)',
    sourceNote: 'DSÖ tütün üretim zinciri çevresel etki analizi',
  },
];
