import { useEffect, useRef, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { colors } from '../theme/theme';
import { usePortfolio } from '../context/PortfolioContext';

function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── rAF 카운트업 훅 ── */
function useCountUp(target, duration = 1100, active = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, active]);
  return value;
}

const CATEGORY_COLOR = {
  Frontend:  '#9f8473',
  Framework: '#5c7a9f',
  Design:    '#9f6478',
  Backend:   '#5f8c6e',
  Tools:     '#72706a',
};

const STATS = [
  { value: 3, label: '직접 만든 프로젝트', suffix: '개' },
  { value: 5, label: '주요 기술 스택',     suffix: '+' },
  { value: 6, label: '개발 경력',          suffix: '개월' },
];

/* ── 기본 정보 행 ── */
const MiniInfoRow = memo(function MiniInfoRow({ label, value }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, py: 0.9,
               borderBottom: `1px solid ${colors.border}`, '&:last-child': { borderBottom: 'none' } }}>
      <Typography variant="caption" sx={{ color: colors.textMuted, width: 48, flexShrink: 0, fontSize: '0.7rem' }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: colors.textPrimary, fontWeight: 500, fontSize: '0.78rem', lineHeight: 1.4 }}>
        {value}
      </Typography>
    </Box>
  );
});

/* ── 실시간 연동 표시 ── */
function SyncDot({ active }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
      <Box sx={{
        width: 6, height: 6, borderRadius: '50%',
        backgroundColor: active ? '#5f8c6e' : `${colors.primary}60`,
        transition: 'background-color 0.4s',
        animation: 'syncPulse 2.5s ease-in-out infinite',
        '@keyframes syncPulse': {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.4 },
        },
      }} />
      <Typography variant="caption" sx={{
        color: active ? '#5f8c6e' : colors.textMuted,
        fontSize: '0.65rem', letterSpacing: 0.8, transition: 'color 0.4s',
      }}>
        {active ? '반영됨' : '실시간 연동'}
      </Typography>
    </Box>
  );
}

/* ── 원형 SVG 스킬 뱃지 ── */
function CircleSkillIcon({ skill, color, visible, index }) {
  const SIZE = 68;
  const STROKE = 3.5;
  const r = (SIZE - STROKE) / 2;
  const circ = 2 * Math.PI * r;
  const offset = visible ? circ - (skill.level / 100) * circ : circ;

  return (
    <Tooltip
      title={`${skill.name} · ${skill.level}%`} arrow
      componentsProps={{ tooltip: { sx: { backgroundColor: colors.primaryDark, fontSize: '0.75rem' } } }}>
      <Box
        role="listitem"
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
          cursor: 'default',
        }}>
        <Box sx={{
          position: 'relative', width: SIZE, height: SIZE,
          transition: 'transform 0.25s ease, filter 0.25s ease',
          willChange: 'transform',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.1)',
            filter: `drop-shadow(0 4px 12px ${color}60)`,
          },
        }}>
          <svg
            width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
            aria-hidden="true">
            <circle cx={SIZE / 2} cy={SIZE / 2} r={r}
              fill="none" stroke={`${color}20`} strokeWidth={STROKE} />
            <circle cx={SIZE / 2} cy={SIZE / 2} r={r}
              fill="none" stroke={color} strokeWidth={STROKE}
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: `stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms` }} />
          </svg>
          <Box sx={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 0.2,
          }}>
            <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }} aria-hidden="true">
              {skill.icon}
            </Typography>
            <Typography sx={{ fontSize: '0.5rem', fontWeight: 700, color, lineHeight: 1.2 }}>
              {skill.level}%
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: colors.textMuted }}>
          {skill.name}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/* ── 통계 숫자 카운터 ── */
function StatItem({ stat, visible, index }) {
  const count = useCountUp(stat.value, 1200, visible);
  return (
    <Box sx={{
      textAlign: 'center',
      opacity:   visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
    }}>
      <Typography sx={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize:  { xs: '2rem', md: '2.6rem' },
        fontWeight: 700,
        color: colors.textPrimary,
        lineHeight: 1,
        letterSpacing: -0.5,
      }}>
        {count}
        <Box component="span" sx={{ fontSize: '1rem', color: colors.primary, ml: 0.3 }}>
          {stat.suffix}
        </Box>
      </Typography>
      <Typography sx={{
        fontSize: '0.72rem', color: colors.textMuted,
        mt: 0.8, letterSpacing: 0.5, fontWeight: 500,
      }}>
        {stat.label}
      </Typography>
    </Box>
  );
}

/* ── About Me 섹션 (홈) ── */
export default memo(function AboutSection() {
  const navigate = useNavigate();
  const { homeData, isSyncing } = usePortfolio();

  const [headerRef,  headerVisible]  = useFadeIn(0.1);
  const [profileRef, profileVisible] = useFadeIn(0.1);
  const [storyRef,   storyVisible]   = useFadeIn(0.1);
  const [skillRef,   skillVisible]   = useFadeIn(0.1);
  const [statsRef,   statsVisible]   = useFadeIn(0.15);
  const [ctaRef,     ctaVisible]     = useFadeIn(0.1);

  const { content, skills, basicInfo } = homeData;

  return (
    <Box component="section" id="about" aria-label="About Me"
      sx={{ width: '100%', py: { xs: 10, md: 14 }, px: { xs: 2, md: 4 },
            backgroundColor: colors.bgSecondary }}>
      <Container maxWidth="lg">

        {/* 섹션 헤더 */}
        <Box ref={headerRef}
          sx={{ mb: { xs: 7, md: 9 }, opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="overline"
              sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600 }}>
              About Me
            </Typography>
            <SyncDot active={isSyncing} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Typography variant="h2"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.4rem', md: '3.2rem' } }}>
              이 포트폴리오를<br />만든 사람
            </Typography>
            <Typography variant="body2"
              sx={{ color: colors.textMuted, maxWidth: 300, lineHeight: 1.9, fontSize: '0.92rem', pb: 0.5 }}>
              건축과 인테리어에서 시작해<br />디자인하고 직접 만드는 사람입니다.
            </Typography>
          </Box>
        </Box>

        {/* 프로필 + 스토리 그리드 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
                   gap: { xs: 5, md: 6 }, mb: { xs: 6, md: 8 } }}>

          {/* 프로필 카드 */}
          <Box ref={profileRef}
            sx={{ opacity: profileVisible ? 1 : 0, transform: profileVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
            <Box sx={{
              width: '100%', maxWidth: { xs: 140, md: '100%' }, mx: { xs: 'auto', md: 0 },
              aspectRatio: '1/1', borderRadius: 2.5, overflow: 'hidden', mb: 2,
              border: `1px solid ${colors.border}`, backgroundColor: `${colors.primary}10`,
              transition: 'border-color 0.4s, box-shadow 0.35s',
              borderColor: isSyncing ? `${colors.primary}60` : colors.border,
              '&:hover': {
                borderColor: `${colors.primary}70`,
                boxShadow: `0 8px 32px ${colors.primary}28`,
              },
              '&:hover img': {
                transform: 'scale(1.07)',
                filter: 'brightness(1.06)',
              },
            }}>
              {basicInfo.photo
                ? <Box
                    component="img"
                    src={basicInfo.photo}
                    alt={`${basicInfo.name} 프로필 사진`}
                    loading="lazy"
                    decoding="async"
                    sx={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.45s ease, filter 0.45s ease',
                      willChange: 'transform',
                    }}
                  />
                : <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', color: colors.textMuted, fontSize: '2rem' }}
                    aria-label="프로필 사진 없음">
                    👤
                  </Box>
              }
            </Box>
            <Typography sx={{
              fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700,
              fontSize: '1.15rem', color: colors.textPrimary, mb: 1.5,
              textAlign: { xs: 'center', md: 'left' },
            }}>
              {basicInfo.name}
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <MiniInfoRow label="학력" value={basicInfo.education} />
              <MiniInfoRow label="전공" value={basicInfo.major} />
              <MiniInfoRow label="경력" value={basicInfo.experience} />
            </Box>
          </Box>

          {/* 스토리 콘텐츠 */}
          <Box ref={storyRef}
            sx={{ opacity: storyVisible ? 1 : 0, transform: storyVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                  display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            {content.map((item, i) => (
              <Box key={item.id}
                sx={{ opacity: storyVisible ? 1 : 0, transform: storyVisible ? 'translateY(0)' : 'translateY(16px)',
                      transition: `opacity 0.5s ease ${i * 120 + 100}ms, transform 0.5s ease ${i * 120 + 100}ms` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: colors.primary,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    aria-hidden="true">
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f5ede3' }} />
                  </Box>
                  <Typography sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600,
                                     fontSize: '1rem', color: colors.textPrimary }}>
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body2"
                  sx={{ color: colors.textSecondary, lineHeight: 1.85, fontSize: '0.92rem', pl: '36px' }}>
                  {item.summary}
                </Typography>
                {i < content.length - 1 && (
                  <Box sx={{ mt: 3.5, borderBottom: `1px solid ${colors.border}` }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* 주요 스킬 */}
        <Box ref={skillRef}
          sx={{ mb: { xs: 6, md: 8 }, pt: 4, borderTop: `1px solid ${colors.border}`,
                opacity: skillVisible ? 1 : 0, transform: skillVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <Typography variant="overline"
            sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.65rem', display: 'block', mb: 2.5 }}>
            주요 기술
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2.5, md: 3.5 }, flexWrap: 'wrap' }} role="list">
            {skills.map((skill, i) => {
              const color = CATEGORY_COLOR[skill.category] ?? colors.primary;
              return (
                <CircleSkillIcon
                  key={skill.id}
                  skill={skill}
                  color={color}
                  visible={skillVisible}
                  index={i}
                />
              );
            })}
          </Box>
        </Box>

        {/* 통계 카운터 */}
        <Box ref={statsRef}
          sx={{
            display: 'flex', justifyContent: 'center', gap: { xs: 5, md: 8 },
            py: { xs: 4, md: 5 },
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
            mb: { xs: 6, md: 8 },
          }}>
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} visible={statsVisible} index={i} />
          ))}
        </Box>

        {/* CTA */}
        <Box ref={ctaRef}
          sx={{ opacity: ctaVisible ? 1 : 0, transform: ctaVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <Button variant="outlined" size="large" onClick={() => navigate('/about')}
            aria-label="About Me 페이지로 이동"
            sx={{ borderColor: colors.primaryDark, color: colors.primaryDark, px: 5, py: 1.5,
                  fontSize: '0.9rem', fontWeight: 600, borderRadius: 2, letterSpacing: 0.5,
                  '&:hover': { backgroundColor: `${colors.primary}15`, borderColor: colors.primary } }}>
            더 알아보기 →
          </Button>
        </Box>

      </Container>
    </Box>
  );
});
