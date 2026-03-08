'use client';

import dynamic from 'next/dynamic';
import Main from '@/components/Main';

// Dynamically import Scene so Three.js only runs on client
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });
const AnimeBackground = dynamic(() => import('@/components/Background'), { ssr: false });

export default function Home() {
  return (
    <main className="relative" style={{ height: '400vh' }}>
      {/* Fixed 3D Canvas – sits behind everything */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Anime character background overlays – above 3D, below content */}
      <AnimeBackground />

      {/* HTML Overlay – scrollable content on top */}
      <div className="relative z-10">
        <Main />
      </div>
    </main>
  );
}
