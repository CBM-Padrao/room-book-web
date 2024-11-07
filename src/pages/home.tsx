import { Calendar } from '../components/Calendar';
import { Sidebar } from '../components/Sidebar';

export function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Calendar />
    </div>
  );
}
