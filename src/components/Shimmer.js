// Shimmer.jsx

export default function Shimmer({ count = 50 }) {
  return (
    <>
      <style>{`
        @keyframes shimmer-sweep { 100% { transform: translateX(100%); } }

        .shimmer-card {
          width: 250px;
          height: 200px;
          border-radius: 12px;      /* ~ rounded-xl */
          background-color: #e5e7eb;/* ~ slate-200 */
          position: relative;
          overflow: hidden;
        }
        .shimmer-card::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.55) 50%,
            rgba(255,255,255,0) 100%
          );
          animation: shimmer-sweep 1.25s infinite;
        }
      `}</style>

      <div className="p-4 py-15 m-4 mx-auto max-w-screen-5xl flex flex-wrap justify-center gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="shimmer-card" />
        ))}
      </div>
    </>
  );
}
