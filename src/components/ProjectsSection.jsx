import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { colors } from '../theme/theme';

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

const PROJECTS = [
  {
    title: 'Game Community',
    desc:  '넥슨 게임 18종을 아우르는 커뮤니티 플랫폼. 게시물·댓글·좋아요·스토어 카테고리 필터 구현.',
    tech:  ['React', 'Supabase', 'MUI'],
    live:  'https://wmr102095-cloud.github.io/my-first-website/',
    icon:  '🎮',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
  },
  {
    title: 'Mini SNS',
    desc:  '친구 추가·팔로우·1:1 DM이 가능한 소셜 앱. Supabase 실시간 구독으로 메시지 즉시 수신.',
    tech:  ['React', 'Supabase', '실시간'],
    live:  'https://wmr102095-cloud.github.io/my-first-website/mini_sns/',
    icon:  '💬',
    gradient: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
  },
  {
    title: 'Portfolio',
    desc:  '이 포트폴리오 사이트. 타이핑 애니메이션·매거진 레이아웃·Supabase 방명록을 직접 설계·구현.',
    tech:  ['React', 'Vite', 'GitHub Pages'],
    live:  'https://wmr102095-cloud.github.io/my-portfolio/',
    icon:  '🗂️',
    gradient: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.accent} 100%)`,
  },
];

function ProjectCard({ title, desc, tech, live, icon, gradient, delay }) {
  const [ref, visible] = useFadeIn(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        border:     `1px solid ${colors.border}`,
        borderRadius: 3,
        overflow:   'hidden',
        backgroundColor: colors.bgPrimary,
        cursor:     'pointer',
        '&:hover': {
          borderColor: colors.primary,
          boxShadow:   `0 8px 32px ${colors.primaryDark}18`,
        },
        display:        'flex',
        flexDirection:  'column',
      }}
      onClick={() => window.open(live, '_blank', 'noopener noreferrer')}
    >
      {/* 썸네일 */}
      <Box
        sx={{
          height:     160,
          background: gradient,
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position:   'relative',
          overflow:   'hidden',
          transition: 'transform 0.4s ease',
          transform:  hovered ? 'scale(1.03)' : 'scale(1)',
        }}
      >
        <Typography sx={{ fontSize: '3rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>
          {icon}
        </Typography>
        {/* 방문 오버레이 */}
        <Box
          sx={{
            position:   'absolute',
            inset:      0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity:    hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: 2 }}>
            VISIT SITE ↗
          </Typography>
        </Box>
      </Box>

      {/* 카드 본문 */}
      <Box sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 600,
            fontSize:   '1.1rem',
            color:      colors.textPrimary,
            mb:         1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: colors.textMuted, lineHeight: 1.75, fontSize: '0.88rem', mb: 2.5, flexGrow: 1 }}
        >
          {desc}
        </Typography>

        {/* 태그 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {tech.map((t) => (
            <Box
              key={t}
              sx={{
                px:           1.4,
                py:           0.3,
                borderRadius: 20,
                border:       `1px solid ${colors.borderAccent}`,
                color:        colors.primary,
                fontSize:     '0.72rem',
                fontWeight:   500,
              }}
            >
              {t}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useFadeIn(0.1);
  const [ctaRef, ctaVisible] = useFadeIn(0.1);

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        width: '100%',
        py:    { xs: 10, md: 14 },
        px:    { xs: 2, md: 4 },
        backgroundColor: colors.bgPrimary,
      }}
    >
      <Container maxWidth="lg">

        {/* 헤더 */}
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
            Projects
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.4rem', md: '3.2rem' } }}
            >
              직접 만든<br />것들
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.textMuted, maxWidth: 300, lineHeight: 1.9, fontSize: '0.92rem', pb: 0.5 }}
            >
              설계부터 배포까지,<br />혼자 만들고 운영하는 프로젝트들입니다.
            </Typography>
          </Box>
        </Box>

        {/* 프로젝트 카드 3개 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap:     { xs: 3, md: 4 },
            mb:      { xs: 6, md: 8 },
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 140} />
          ))}
        </Box>

        {/* 더 보기 CTA */}
        <Box
          ref={ctaRef}
          sx={{
            opacity:    ctaVisible ? 1 : 0,
            transform:  ctaVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/projects')}
            sx={{
              borderColor: colors.primaryDark,
              color:       colors.primaryDark,
              px: 5, py: 1.5,
              fontSize:    '0.9rem',
              fontWeight:  600,
              borderRadius: 2,
              letterSpacing: 0.5,
              '&:hover': {
                backgroundColor: `${colors.primary}15`,
                borderColor:     colors.primary,
              },
            }}
          >
            모든 프로젝트 보기 →
          </Button>
        </Box>

      </Container>
    </Box>
  );
}
