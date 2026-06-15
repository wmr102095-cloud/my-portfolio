import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { colors } from '../theme/theme';

/* ── 스크롤 진입 감지 (AboutSection과 동일 패턴) ── */
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

/* ── 숙련도 태그 스타일 ── */
const LEVEL_STYLE = {
  '실무활용': {
    bg:   colors.primaryDark,
    text: '#f5ede3',
  },
  '자격증 준비중': {
    bg:   colors.accent,
    text: colors.primaryDark,
  },
  '학습중': {
    bg:   'transparent',
    text: colors.textMuted,
    border: `1px solid ${colors.border}`,
  },
};

/* ── 스킬 카테고리 데이터 ── */
const CATEGORIES = [
  {
    icon:     '🎨',
    label:    'Design',
    skills: [
      { name: 'Photoshop',   level: '자격증 준비중' },
      { name: 'Illustrator', level: '자격증 준비중' },
    ],
    badge: 'Adobe 자격증 취득 준비중',
  },
  {
    icon:     '💻',
    label:    'Development',
    skills: [
      { name: 'HTML / CSS',  level: '실무활용' },
      { name: 'JavaScript',  level: '실무활용' },
      { name: 'React',       level: '실무활용' },
      { name: 'Supabase',    level: '실무활용' },
    ],
    badge: null,
  },
  {
    icon:     '🛠️',
    label:    'Tools',
    skills: [
      { name: 'Figma',        level: '실무활용' },
      { name: 'Git / GitHub', level: '실무활용' },
      { name: 'Vite',         level: '학습중'   },
    ],
    badge: null,
  },
];

/* ── 개별 스킬 카드 ── */
function SkillCard({ icon, label, skills, badge, delay }) {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <Box
      ref={ref}
      sx={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        backgroundColor: colors.bgPrimary,
        border:     `1px solid ${colors.border}`,
        borderRadius: 3,
        p:          { xs: 3, md: 3.5 },
        display:    'flex',
        flexDirection: 'column',
      }}
    >
      {/* 카드 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }}>{icon}</Typography>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
            fontSize:   '1.1rem',
            color:      colors.textPrimary,
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* 구분선 */}
      <Box sx={{ borderTop: `1px solid ${colors.border}`, mb: 2.5 }} />

      {/* 스킬 목록 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, flexGrow: 1 }}>
        {skills.map(({ name, level }, i) => {
          const style = LEVEL_STYLE[level] ?? LEVEL_STYLE['학습중'];
          return (
            <Box
              key={name}
              sx={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                py:             1.8,
                borderBottom:   i < skills.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: colors.textSecondary, fontWeight: 500, fontSize: '0.9rem' }}
              >
                {name}
              </Typography>
              <Box
                sx={{
                  px:           1.5,
                  py:           0.35,
                  borderRadius: 20,
                  backgroundColor: style.bg,
                  border:       style.border ?? 'none',
                  color:        style.text,
                  fontSize:     '0.7rem',
                  fontWeight:   600,
                  letterSpacing: 0.3,
                  whiteSpace:   'nowrap',
                }}
              >
                {level}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Adobe 자격증 배지 */}
      {badge && (
        <Box
          sx={{
            mt:           3,
            pt:           2,
            borderTop:    `1px solid ${colors.border}`,
            display:      'flex',
            alignItems:   'center',
            gap:          1,
          }}
        >
          <Box
            sx={{
              width:           8,
              height:          8,
              borderRadius:    '50%',
              backgroundColor: colors.accent,
              flexShrink:      0,
            }}
          />
          <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.75rem' }}>
            {badge}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

/* ── Skill 섹션 ── */
export default function SkillSection() {
  const [headerRef, headerVisible] = useFadeIn(0.1);

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        width: '100%',
        py:    { xs: 10, md: 14 },
        px:    { xs: 2, md: 4 },
        backgroundColor: colors.bgSecondary,
      }}
    >
      <Container maxWidth="lg">

        {/* 섹션 헤더 */}
        <Box
          ref={headerRef}
          sx={{
            mb:         { xs: 7, md: 9 },
            opacity:    headerVisible ? 1 : 0,
            transform:  headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600, display: 'block', mb: 2 }}
          >
            Skills
          </Typography>
          <Box
            sx={{
              display:     'flex',
              alignItems:  'flex-end',
              justifyContent: 'space-between',
              flexWrap:    'wrap',
              gap:         3,
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.4rem', md: '3.2rem' } }}
            >
              무엇을<br />할 수 있나요
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.textMuted, maxWidth: 300, lineHeight: 1.9, fontSize: '0.92rem', pb: 0.5 }}
            >
              디자인 툴과 개발 스택을 함께 다룹니다.<br />
              두 영역 사이의 언어를 모두 구사합니다.
            </Typography>
          </Box>
        </Box>

        {/* 카테고리 카드 3개 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap:     { xs: 3, md: 4 },
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.label} {...cat} delay={i * 150} />
          ))}
        </Box>

      </Container>
    </Box>
  );
}
