import { useEffect, useRef, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { colors } from '../theme/theme';
import { usePortfolio } from '../context/PortfolioContext';

function useFadeIn(threshold = 0.1) {
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

const CATEGORY_META = {
  Frontend:  { color: '#9f8473', bg: '#9f847320' },
  Framework: { color: '#5c7a9f', bg: '#5c7a9f20' },
  Design:    { color: '#9f6478', bg: '#9f647820' },
  Backend:   { color: '#5f8c6e', bg: '#5f8c6e20' },
  Tools:     { color: '#72706a', bg: '#72706a20' },
};

/* ── 스킬 카드 (홈용) ── */
const HomeSkillCard = memo(function HomeSkillCard({ skill, visible, index }) {
  const meta = CATEGORY_META[skill.category] ?? CATEGORY_META.Tools;

  return (
    <Box
      role="article"
      aria-label={`${skill.name} ${skill.level}%`}
      sx={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
        p: { xs: 2.5, md: 3 },
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        backgroundColor: colors.bgPrimary,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transition2: undefined,
        '&:hover': { borderColor: meta.color, transition: 'border-color 0.2s' },
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: 1.5, backgroundColor: meta.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}
            aria-hidden="true">
            {skill.icon}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: colors.textPrimary, lineHeight: 1.2 }}>
              {skill.name}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: meta.color, fontWeight: 600 }}>
              {skill.category}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: meta.color }} aria-hidden="true">
          {skill.level}%
        </Typography>
      </Box>

      <Box sx={{ height: 5, borderRadius: 3, backgroundColor: `${meta.color}20`, overflow: 'hidden' }}
        role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}
        aria-label={`${skill.name} 숙련도`}>
        <Box sx={{
          height: '100%', borderRadius: 3, backgroundColor: meta.color,
          width: visible ? `${skill.level}%` : '0%',
          transition: `width 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${index * 120 + 200}ms`,
        }} />
      </Box>
    </Box>
  );
});

/* ── Skill 섹션 (홈) ── */
export default memo(function SkillSection() {
  const navigate = useNavigate();
  const { homeData, isSyncing } = usePortfolio();
  const [headerRef, headerVisible] = useFadeIn(0.1);
  const [gridRef,   gridVisible]   = useFadeIn(0.08);
  const [ctaRef,    ctaVisible]    = useFadeIn(0.1);

  const { skills: topSkills } = homeData;

  return (
    <Box component="section" id="skills" aria-label="Skills"
      sx={{ width: '100%', py: { xs: 10, md: 14 }, px: { xs: 2, md: 4 },
            backgroundColor: colors.bgSecondary }}>
      <Container maxWidth="lg">

        {/* 헤더 */}
        <Box ref={headerRef}
          sx={{ mb: { xs: 7, md: 9 }, opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="overline"
              sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600 }}>
              Skills
            </Typography>
            {/* 연동 상태 표시 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Box sx={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: isSyncing ? '#5f8c6e' : `${colors.primary}60`,
                transition: 'background-color 0.4s',
                animation: 'skillSyncPulse 2.5s ease-in-out infinite',
                '@keyframes skillSyncPulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%':      { opacity: 0.4 },
                },
              }} />
              <Typography variant="caption" sx={{
                color: isSyncing ? '#5f8c6e' : colors.textMuted,
                fontSize: '0.65rem', letterSpacing: 0.8, transition: 'color 0.4s',
              }}>
                {isSyncing ? '반영됨' : '실시간 연동'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Typography variant="h2"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.4rem', md: '3.2rem' } }}>
              무엇을<br />할 수 있나요
            </Typography>
            <Typography variant="body2"
              sx={{ color: colors.textMuted, maxWidth: 300, lineHeight: 1.9, fontSize: '0.92rem', pb: 0.5 }}>
              숙련도 상위 {topSkills.length}개 기술입니다.<br />
              전체 스킬은 About Me에서 확인하세요.
            </Typography>
          </Box>
        </Box>

        {/* 상위 4개 스킬 카드 */}
        <Box ref={gridRef}
          sx={{ display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                gap: { xs: 2.5, md: 3 }, mb: { xs: 6, md: 8 } }}
          role="list">
          {topSkills.map((skill, i) => (
            <HomeSkillCard key={skill.id} skill={skill} visible={gridVisible} index={i} />
          ))}
        </Box>

        {/* CTA */}
        <Box ref={ctaRef}
          sx={{ opacity: ctaVisible ? 1 : 0, transform: ctaVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <Button variant="outlined" size="large" onClick={() => navigate('/about')}
            aria-label="About Me 탭에서 전체 스킬 보기"
            sx={{ borderColor: colors.primaryDark, color: colors.primaryDark, px: 5, py: 1.5,
                  fontSize: '0.9rem', fontWeight: 600, borderRadius: 2, letterSpacing: 0.5,
                  '&:hover': { backgroundColor: `${colors.primary}15`, borderColor: colors.primary } }}>
            전체 스킬 보기 →
          </Button>
        </Box>

      </Container>
    </Box>
  );
});
