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

const CATEGORY_COLOR = {
  Frontend:  '#9f8473',
  Framework: '#5c7a9f',
  Design:    '#9f6478',
  Backend:   '#5f8c6e',
  Tools:     '#72706a',
};

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

/* ── About Me 섹션 (홈) ── */
export default memo(function AboutSection() {
  const navigate = useNavigate();
  const { homeData, isSyncing } = usePortfolio();

  const [headerRef,  headerVisible]  = useFadeIn(0.1);
  const [profileRef, profileVisible] = useFadeIn(0.1);
  const [storyRef,   storyVisible]   = useFadeIn(0.1);
  const [skillRef,   skillVisible]   = useFadeIn(0.1);
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
              transition: 'border-color 0.4s',
              borderColor: isSyncing ? `${colors.primary}60` : colors.border,
            }}>
              {basicInfo.photo
                ? <Box
                    component="img"
                    src={basicInfo.photo}
                    alt={`${basicInfo.name} 프로필 사진`}
                    loading="lazy"
                    decoding="async"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }} role="list">
            {skills.map((skill, i) => {
              const color = CATEGORY_COLOR[skill.category] ?? colors.primary;
              return (
                <Tooltip
                  key={skill.id}
                  title={`${skill.name} · ${skill.level}%`} arrow
                  componentsProps={{ tooltip: { sx: { backgroundColor: colors.primaryDark, fontSize: '0.75rem' } } }}>
                  <Box
                    role="listitem"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                          opacity: skillVisible ? 1 : 0,
                          transform: skillVisible ? 'translateY(0)' : 'translateY(12px)',
                          transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                          cursor: 'default' }}>
                    <Box sx={{
                      width: 52, height: 52, borderRadius: 2, border: `1px solid ${color}30`,
                      backgroundColor: `${color}10`, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1.5rem', transition: 'all 0.2s',
                      '&:hover': { backgroundColor: `${color}20`, borderColor: `${color}60`,
                                   transform: 'translateY(-2px)' },
                    }} aria-hidden="true">
                      {skill.icon}
                    </Box>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: colors.textMuted }}>
                      {skill.name}
                    </Typography>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
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
