import { notFound } from 'next/navigation';
import { chapters } from '@/lib/chapters';
import ChapterView from '@/components/ChapterView';

export function generateStaticParams() {
  return chapters.map((c) => ({ id: String(c.id) }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const chapter = chapters.find((c) => c.id === parseInt(params.id));
  if (!chapter) return { title: 'Bab Tidak Ditemukan' };
  return {
    title: `${chapter.subtitle} — Sang Introvert`,
    description: `Baca ${chapter.title}: ${chapter.subtitle}`,
  };
}

export default function ChapterPage({ params }: { params: { id: string } }) {
  const chapter = chapters.find((c) => c.id === parseInt(params.id));
  if (!chapter) notFound();

  return <ChapterView chapter={chapter} />;
}
