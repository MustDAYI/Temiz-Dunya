import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-copy">
          Mustafa Dayıbaş · Gönüllülük Çalışması
        </p>
        <p className="footer-sub">
          Bu çalışma hiçbir kamu veya özel kurum ortaklığı ya da onayı içermez.
          Veriler kamuya açık resmi raporlardan derlenmiş bağımsız bir farkındalık projesidir.
        </p>
      </div>
    </footer>
  );
};
