import { SourceItem } from '../types/index.ts';

export const COMMON_DISCLAIMER_NOTE =
  "Parasal karşılıklar, açıklanmış yatırım tutarlarıyla yapılan ölçek karşılaştırmalarıdır; 'bu tesis yapılır' anlamına gelmez. 2025 verisi 2026 harcaması değildir. Bu çalışma bir yıllık hasılat ortalamasından türetilmiş süre karşılığı olup belirli bir günün gerçek satışı, şirket kârı ya da devlet zararı olarak değerlendirilemez.";

export const LAST_VERIFIED_DATE = '17 Ekim 2026';

export const SOURCES_LIST: SourceItem[] = [
  {
    id: 'tadab',
    title: 'Tütün ve Tütün Mamulleri İç Satış Hasılat Verileri (2025)',
    organization: 'T.C. Tarım ve Orman Bakanlığı - TADAB',
    date: '2025 Verisi',
    description: 'Yıllık 695.220.183.645 TL iç satış hasılatı üzerinden 365 gün esas alınarak günlük (≈1,90 milyar TL), haftalık (≈13,33 milyar TL) ve 30 günlük (≈57,14 milyar TL) ortalamalar hesaplanmıştır.',
    url: 'https://www.tarimorman.gov.tr/TADAB/Menu/22/Tutun-Ve-Tutun-Mamulleri-Daire-Baskanligi',
  },
  {
    id: 'aa-samsun',
    title: "Samsun 19 Mayıs Barajı İçme Suyu Arıtma Tesisleri",
    organization: 'Anadolu Ajansı',
    date: '25.03.2026',
    description: '19 Mayıs Barajı İçme Suyu Arıtma Tesisleri (72 mahalle, 100 milyon litre/gün kapasite, ~1,5 milyar TL yatırım tutarı).',
    url: 'https://www.aa.com.tr/tr/ekonomi/samsunda-taskin-sulama-ve-icme-suyu-yatirimlarina-8-65-milyar-liralik-yatirim-yapildi/3878315',
  },
  {
    id: 'karapinar-ges',
    title: 'Kalyon Karapınar Güneş Enerjisi Santrali (GES)',
    organization: 'Kalyon Enerji / Resmi Açıklamalar',
    date: 'İşletme Verisi',
    description: 'Yıllık yaklaşık 3 milyar kWh elektrik üretimiyle, 2 milyon kişinin yıllık evsel elektrik tüketimine denk üretim sağlayan devasa güneş santrali. Açıklanan tarihsel yatırım bedeli: 1 milyar ABD doları.',
    url: 'https://www.kalyonenerji.com/tr/haber-detay/kalyon-karapinar-gunes-enerji-santrali-2-milyon-kisinin-evsel-elektrik-ihtiyacini-karsilayacak-video',
  },
  {
    id: 'tcmb-kur',
    title: 'TCMB Gösterge Niteliğindeki Döviz Kurları (16 Ekim 2026)',
    organization: 'T.C. Merkez Bankası / e-Devlet Kapısı',
    date: '16.10.2026 Sabit Kuru',
    description: 'Karşılaştırmada 16 Ekim 2026 tarihli TCMB döviz satış kuru (1 USD = 49.4463 TL) esas alınarak 1 milyar USD = 49.446.300.000 TL olarak çevrilmiştir. Güncel veya dinamik kur değildir; sabit tarihsel karşılaştırma değeridir. Son kontrol: 17 Ekim 2026.',
    url: 'https://turkiye.gov.tr/doviz-kurlari',
  },
  {
    id: 'izmir-dikili',
    title: "İzmir'in 3. Büyük İleri Biyolojik Arıtma Tesisi Yükseliyor",
    organization: 'İzmir Büyükşehir Belediyesi / İZSU',
    date: '20.07.2026',
    description: 'Dikili İleri Biyolojik Atık Su Arıtma Tesisi ve çevre altyapısı (41.400 m³/gün kapasite, 8 km iletim hattı, paket maliyeti ~1,5 milyar TL). İçme suyu değil, atık su arıtımıdır.',
    url: 'https://www.izmir.bel.tr/tr/Haberler/izmir-in-3-buyuk-ileri-biyolojik-aritma-tesisi-yukseliyor/59042/156',
  },
  {
    id: 'saglik-bakanligi',
    title: 'Sağlık Bakanlığı 2026 Yılı Bütçesi ve Deprem Bölgesi Yatırımları',
    organization: 'T.C. Sağlık Bakanlığı',
    date: 'Kasım 2025',
    description: 'Deprem bölgesinde yürütülen 109 sağlık tesisi ve 5.123 yatak kapasitesini kapsayan 40,8 milyar TL tutarındaki sağlık yatırımları planı.',
    url: 'https://www.saglik.gov.tr/TR-114440/saglik-bakanliginin-2026-yili-butcesi-tbmm-plan-ve-butce-komisyonunda-kabul-edildi.html',
  },
  {
    id: 'who-fctc-butts',
    title: 'World No Tobacco Day 2022: Tobacco is Impacting Your Health and Our Planet',
    organization: 'Dünya Sağlık Örgütü (DSÖ) FCTC',
    date: '2022',
    description: 'Küresel ölçekte her yıl çevreye yaklaşık 4,5 trilyon sigara izmariti atıldığına dair resmi küresel tahmin.',
    url: 'https://fctc.who.int/newsroom/spotlight/environment/world-no-tobacco-day-2022---tobacco-is-impacting-your-health-and-the-future-of-our-planet',
  },
  {
    id: 'who-unep-microplastics',
    title: 'UNEP and Secretariat of the WHO FCTC Partner to Combat Microplastics in Cigarettes',
    organization: 'DSÖ FCTC & UNEP (Birleşmiş Milletler Çevre Programı)',
    date: '01.02.2022',
    description: 'Sigara izmaritlerinin yılda 766,6 milyon kg (766.600 ton) zehirli atık oluşturduğu ve filtrelerin plastik bazlı selüloz asetattan yapıldığı bilgisi.',
    url: 'https://fctc.who.int/newsroom/news/item/01-02-2022-unep-secretariat-of-the-who-fctc-partner-to-combat-microplastics-in-cigarettes',
  },
  {
    id: 'who-qa-footprint',
    title: 'Q&A: World No Tobacco Day 2022 - Environmental Impact',
    organization: 'Dünya Sağlık Örgütü (DSÖ)',
    date: '2022',
    description: 'Tütün üretim zincirinde sigara başına yaklaşık 3,7 litre su ayak izi (paket başına ~74 litre), filtrelerin plastik yapısı ve doğada parçalanmasının ~10 yılı bulabileceği verileri.',
    url: 'https://www.who.int/news-room/questions-and-answers/item/q-a-world-no-tobacco-day-2022',
  },
];
