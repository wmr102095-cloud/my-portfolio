import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { colors } from '../theme/theme';

/* ── 스크롤 진입 감지 훅 ── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── 스토리 카드 데이터 ── */
const STORIES = [
  {
    num: '01',
    title: 'Why Design',
    body:
      'IT 시대에 누군가의 아이디어를 세계에 알리는 가장 강력한 도구가 웹이라는 걸 알았고, 그 도구를 아름답고 직관적으로 만드는 일 — 그게 디자인이었습니다.',
  },
  {
    num: '02',
    title: 'My Value',
    body:
      '실용적이면서도 아름다운 것을 만듭니다. 보기 좋은 제품이 쓰기도 좋다고 믿습니다. 디자인의 이유를 논리로 설명할 수 있는 디자이너가 되고 싶습니다.',
  },
  {
    num: '03',
    title: 'Where I\'m Going',
    body:
      '디자인 시스템을 직접 설계하고 코드로 구현하는 풀스택 프로덕트 디자이너. 디자인과 개발 사이의 언어 장벽을 없애는 사람이 되고 싶습니다.',
  },
];

/* ── 강점 리스트 ── */
const STRENGTHS = [
  '디자이너와 개발자 양쪽 언어를 모두 구사 — 협업 속도가 빠릅니다',
  '아이디어를 머릿속에서 바로 작동하는 프로토타입으로 구현합니다',
  '"왜 이렇게 생겨야 하는가"를 논리적으로 설명할 수 있는 디자이너입니다',
];

/* ── 개별 카드 (stagger 딜레이 포함) ── */
function StoryCard({ num, title, body, delay }) {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <Box
      ref={ref}
      sx={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        borderTop: `2px solid ${colors.primary}`,
        pt: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '3rem',
          fontWeight: 700,
          lineHeight: 1,
          color: `${colors.textMuted}30`,
          mb: 1.5,
          userSelect: 'none',
        }}
      >
        {num}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 600,
          color: colors.textPrimary,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: colors.textSecondary,
          lineHeight: 1.85,
          fontSize: '0.92rem',
        }}
      >
        {body}
      </Typography>
    </Box>
  );
}

/* ── About Me 섹션 ── */
export default function AboutSection() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useFadeIn(0.1);
  const [strengthRef, strengthVisible] = useFadeIn(0.1);
  const [ctaRef, ctaVisible] = useFadeIn(0.1);

  return (
    <Box
      component="section"
      id="about"
      sx={{
        width: '100%',
        py: { xs: 10, md: 14 },
        px: { xs: 2, md: 4 },
        backgroundColor: colors.bgSecondary,
      }}
    >
      <Container maxWidth="lg">

        {/* 섹션 헤더 */}
        <Box
          ref={headerRef}
          sx={{
            mb: { xs: 7, md: 10 },
            opacity:   headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600, display: 'block', mb: 2 }}
          >
            About Me
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.4rem', md: '3.2rem' } }}
            >
              이 포트폴리오를<br />만든 사람
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: colors.textMuted,
                maxWidth: 320,
                lineHeight: 1.9,
                fontSize: '0.92rem',
                pb: 0.5,
              }}
            >
              디자인과 개발, 두 언어를 모두 구사하는<br />
              프로덕트 디자이너 지망생입니다.
            </Typography>
          </Box>
        </Box>

        {/* 스토리 카드 3개 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: { xs: 5, md: 6 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {STORIES.map((s, i) => (
            <StoryCard key={s.num} {...s} delay={i * 160} />
          ))}
        </Box>

        {/* 구분선 */}
        <Box sx={{ borderTop: `1px solid ${colors.border}`, mb: { xs: 6, md: 8 } }} />

        {/* 강점 리스트 */}
        <Box
          ref={strengthRef}
          sx={{
            mb: { xs: 7, md: 9 },
            opacity:   strengthVisible ? 1 : 0,
            transform: strengthVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.68rem', display: 'block', mb: 4 }}
          >
            What I Bring
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {STRENGTHS.map((text, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2.5,
                  opacity:   strengthVisible ? 1 : 0,
                  transform: strengthVisible ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.5s ease ${i * 120}ms, transform 0.5s ease ${i * 120}ms`,
                }}
              >
                {/* 액센트 마커 */}
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: colors.primary,
                    flexShrink: 0,
                    mt: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f5ede3' }} />
                </Box>
                <Typography
                  variant="body1"
                  sx={{ color: colors.textSecondary, lineHeight: 1.75, fontSize: '0.95rem' }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* CTA */}
        <Box
          ref={ctaRef}
          sx={{
            opacity:   ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/about')}
            sx={{
              borderColor: colors.primaryDark,
              color: colors.primaryDark,
              px: 5,
              py: 1.5,
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: 2,
              letterSpacing: 0.5,
              '&:hover': {
                backgroundColor: `${colors.primary}15`,
                borderColor: colors.primary,
              },
            }}
          >
            더 알아보기 →
          </Button>
        </Box>

      </Container>
    </Box>
  );
}
