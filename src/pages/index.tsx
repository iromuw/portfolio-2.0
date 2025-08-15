import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation('common');
  const [key, setKey] = useState(0); // 用 key 觸發 re-render

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [i18n.language]); // 語言改變時觸發

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    console.log(`Current language: ${i18n.language}`);
    console.log('t(title):', i18n.t('title'));
    console.log('i18n store:', i18n.store.data);
  };

  return (
    <div key={i18n.language} style={{ textAlign: 'center', padding: 40 }}>
      <h1>{t('title')} - [{i18n.language}]</h1>
      <p>{t('description')}</p>

      <button onClick={() => handleChangeLanguage('en')}>
        {t('changeToEnglish')}
      </button>
      <button onClick={() => handleChangeLanguage('zh')}>
        {t('changeToChinese')}
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
  },
});
