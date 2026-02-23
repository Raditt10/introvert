'use client';

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#0F172A] -z-10">
      {/* 
        The 3D canvas and Miku model have been removed per user request
        to improve performance ("terlalu berat"). 
        This div simply serves as the dark background. 
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/20 to-transparent pointer-events-none" />
    </div>
  );
}
