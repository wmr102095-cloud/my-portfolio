import { useEffect, useRef } from 'react';
import { colors } from '../theme/theme';

/* ── 상수 ─────────────────────────────────────────── */
const TRAIL_LEN  = 7;
const LERP_DOT   = 0.88;   // 도트: 마우스를 거의 즉시 추적
const LERP_RING  = 0.12;   // 링: 느린 관성으로 따라옴
const LERP_SCALE = 0.16;   // 스케일 전환 속도
const MAG_R      = 80;     // 자기장 반경 (px)
const MAG_F      = 0.36;   // 자기장 인력 강도 (0-1)

/* 터치/코어스 포인터 감지 (모듈 로드 시 1회 평가) */
const IS_TOUCH =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    if (IS_TOUCH) return;

    /* 기본 커서 전역 숨기기 */
    const styleEl = Object.assign(document.createElement('style'), {
      textContent: '*, *::before, *::after { cursor: none !important; }',
    });
    document.head.appendChild(styleEl);

    /* ── 위치/상태 (리렌더 없이 ref/변수로 관리) ── */
    const m     = { x: -300, y: -300 };   // 실제 마우스
    const dPos  = { x: -300, y: -300 };   // 도트 위치
    const rPos  = { x: -300, y: -300 };   // 링 위치
    const trail = Array.from({ length: TRAIL_LEN }, () => ({ x: -300, y: -300 }));

    let rScale = 1;      // 링 스케일 (Lerp)
    let dScale = 1;      // 도트 스케일 (Lerp)
    let state  = 'default';   // 'default' | 'hover' | 'text' | 'click'
    let raf    = null;

    /* ── 자기장 대상 요소 캐시 ─────────────────────── */
    let magnetEls = [];
    const refreshCache = () => {
      magnetEls = [
        ...document.querySelectorAll('button, a[href], [role="button"]'),
      ];
    };
    refreshCache();
    const cacheId = setInterval(refreshCache, 1500);

    /* ── 이벤트 핸들러 ──────────────────────────────── */
    const onMove = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (state === 'click') return;
      const t = e.target;
      const isBtn = t.closest('button, a[href], [role="button"]');
      const isPtr = !isBtn && window.getComputedStyle(t).cursor === 'pointer';
      const isTxt = !isBtn && !isPtr &&
        t.closest('p, h1, h2, h3, h4, h5, h6, span, label, input, textarea');
      if      (isBtn || isPtr) state = 'hover';
      else if (isTxt)          state = 'text';
      else                     state = 'default';
    };
    const onDown  = () => { state = 'click'; };
    const onUp    = () => { state = 'default'; };
    const onLeave = () => { m.x = m.y = -300; };

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mousedown',  onDown,  { passive: true });
    document.addEventListener('mouseup',    onUp,    { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });

    /* ── rAF 애니메이션 루프 ────────────────────────── */
    const tick = () => {
      /* 1. 자기장 오프셋 계산 */
      let mx = 0, my = 0;
      for (const el of magnetEls) {
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dist = Math.hypot(m.x - cx, m.y - cy);
        if (dist < MAG_R) {
          const force = (1 - dist / MAG_R) * MAG_F;
          mx += (cx - m.x) * force;
          my += (cy - m.y) * force;
        }
      }

      /* 2. 위치 Lerp */
      dPos.x += (m.x      - dPos.x) * LERP_DOT;
      dPos.y += (m.y      - dPos.y) * LERP_DOT;
      rPos.x += (m.x + mx - rPos.x) * LERP_RING;
      rPos.y += (m.y + my - rPos.y) * LERP_RING;

      /* 3. 트레일 체인 Lerp */
      for (let i = TRAIL_LEN - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.42;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.42;
      }
      trail[0].x = dPos.x;
      trail[0].y = dPos.y;

      /* 4. 스케일 Lerp (상태 기반) */
      const tRS = state === 'hover' ? 1.55
               : state === 'click' ? 0.68
               : state === 'text'  ? 0.22 : 1;
      const tDS = state === 'hover' ? 0
               : state === 'click' ? 0.55
               : state === 'text'  ? 0    : 1;
      rScale += (tRS - rScale) * LERP_SCALE;
      dScale += (tDS - dScale) * LERP_SCALE;

      /* 5. DOM 갱신 (리렌더 없이 style 직접 수정) */
      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        const isText = state === 'text';
        dot.style.transform    =
          `translate3d(${dPos.x}px,${dPos.y}px,0) translate(-50%,-50%) scale(${dScale.toFixed(3)})`;
        dot.style.width        = isText ? '2px'  : '8px';
        dot.style.height       = isText ? '20px' : '8px';
        dot.style.borderRadius = isText ? '2px'  : '50%';
      }

      if (ring) {
        ring.style.transform  =
          `translate3d(${rPos.x}px,${rPos.y}px,0) translate(-50%,-50%) scale(${rScale.toFixed(3)})`;
        ring.style.background = rScale > 1.1 ? `${colors.primary}18` : 'transparent';
      }

      trailRef.current.forEach((el, i) => {
        if (!el) return;
        const t   = trail[i];
        const fac = (TRAIL_LEN - i) / TRAIL_LEN;
        const sz  = Math.max(2, 6 * fac).toFixed(1);
        el.style.transform = `translate3d(${t.x}px,${t.y}px,0) translate(-50%,-50%)`;
        el.style.opacity   = (fac * 0.45).toFixed(2);
        el.style.width     = `${sz}px`;
        el.style.height    = `${sz}px`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      styleEl.remove();
      clearInterval(cacheId);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* 터치 기기 → null 반환 (렌더 건너뜀) */
  if (IS_TOUCH) return null;

  const base = {
    position: 'fixed',
    top: 0, left: 0,
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform',
    transform: 'translate3d(-300px,-300px,0)',
  };

  return (
    <>
      {/* ── 마우스 트레일: 7개 체인 도트 ── */}
      {Array.from({ length: TRAIL_LEN }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRef.current[i] = el; }}
          style={{
            ...base,
            zIndex: 99996,
            width: 6, height: 6,
            borderRadius: '50%',
            backgroundColor: colors.primary,
            opacity: 0,
          }}
        />
      ))}

      {/* ── 링: 자기장 + 느린 관성 팔로워 ── */}
      <div
        ref={ringRef}
        style={{
          ...base,
          zIndex: 99998,
          width: 36, height: 36,
          borderRadius: '50%',
          border: `1.5px solid ${colors.primary}`,
          background: 'transparent',
          transition: 'background 0.18s ease',
        }}
      />

      {/* ── 도트: 빠른 팔로워 (텍스트 위에서 세로 막대로 변형) ── */}
      <div
        ref={dotRef}
        style={{
          ...base,
          zIndex: 99999,
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: colors.primary,
          transition: 'width 0.15s ease, height 0.15s ease, border-radius 0.15s ease',
        }}
      />
    </>
  );
}
