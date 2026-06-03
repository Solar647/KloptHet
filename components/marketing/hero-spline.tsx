'use client'

export function HeroSpline() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .spline-mobile-bg {
          display: none;
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 160% 80% at 70% 40%,
            rgba(30,80,180,.65) 0%,
            rgba(15,40,110,.45) 35%,
            rgba(5,15,60,.2) 65%,
            transparent 100%
          );
        }
        .spline-desktop-iframe {
          display: block;
          animation: splineFadeIn 1.8s ease forwards;
        }
        @keyframes splineFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 1023px) {
          .spline-mobile-bg { display: block; }
          .spline-desktop-iframe { display: none; }
        }
      `}</style>

      <div className="spline-mobile-bg" />

      <iframe
        className="spline-desktop-iframe"
        src="https://my.spline.design/bganimation-NotapPXDYaifuZfA2eRMLFUX/"
        frameBorder="0"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-57%, -50%) translateZ(0)',
          width: 'calc(110vh * 1716 / 775)',
          height: '110vh',
          border: 'none',
          pointerEvents: 'none',
          minWidth: '110%',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        title="KloptHet hero achtergrond"
      />
    </div>
  )
}
