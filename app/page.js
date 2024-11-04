// pages/index.js
import TemperatureDashboard from '@/component/TemperatureDashboard/TemperatureDashboard';
import dynamic from 'next/dynamic';

const LazyHomePage = dynamic(() => import('@/component/HomePage/HomePage'), {
  loading: () => <p>Laoding the page...</p>,
});

export default function Home() {
  return <TemperatureDashboard />;
}
