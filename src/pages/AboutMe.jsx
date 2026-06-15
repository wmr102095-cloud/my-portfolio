import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { colors } from '../theme/theme';

const STORY_BLOCKS = [
  {
    label: '시작',
    title: '웹이라는 도구를 발견했습니다',
    body:  'IT 시대에 누군가의 아이디어를 세계에 알릴 수 있는 가장 강력한 방법이 웹이라는 걸 알게 됐습니다. 코드로 무언가를 만들 수 있다는 사실이 매력적이었고, 그 도구를 더 아름답고 직관적으로 만드는 일이 바로 디자인이었습니다.',
  },
  {
    label: '가치관',
    title: '실용성과 아름다움은 하나입니다',
    body:  '보기 좋은 제품이 쓰기도 좋습니다. 디자인은 꾸밈이 아니라 문제 해결의 방식이라고 생각합니다. 왜 이렇게 생겨야 하는지, 사용자는 어떻게 느낄지를 항상 먼저 생각합니다.',
  },
  {
    label: '목표',
    title: '두 언어를 모두 구사하는 디자이너',
    body:  '디자인 시스템을 직접 설계하고 코드로 구현할 수 있는 풀스택 프로덕트 디자이너가 목표입니다. 디자이너와 개발자 사이의 언어 장벽을 없애고, 아이디어에서 작동하는 제품까지 혼자 이어줄 수 있는 사람이 되고 싶습니다.',
  },
];

const STRENGTHS = [
  { icon: '⚡', text: '디자인 툴과 코드, 두 영역을 함께 다룰 수 있습니다' },
  { icon: '🔍', text: '"왜 이렇게 생겨야 하는가"를 논리로 설명합니다' },
  { icon: '🛠️', text: '아이디어를 바로 작동하는 프로토타입으로 구현합니다' },
  { icon: '🤝', text: '개발자와 디자이너 모두와 원활하게 소통합니다' },
];

export default function AboutMe() {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{ minHeight: '100vh', backgroundColor: colors.bgPrimary }}
    >
      {/* 페이지 히어로 */}
      <Box
        sx={{
          pt:         { xs: 16, md: 20 },
          pb:         { xs: 8,  md: 12 },
          px:         { xs: 2,  md: 4  },
          borderBottom: `1px solid ${colors.border}`,
          background: `radial-gradient(ellipse at 80% 50%, ${colors.accent}33 0%, ${colors.bgPrimary} 60%)`,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600, display: 'block', mb: 3 }}
          >
            About Me
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.8rem', md: '4rem' }, mb: 3 }}
          >
            디자인을<br />코드로 말합니다
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.textMuted, maxWidth: 480, lineHeight: 1.9, fontSize: '1rem' }}
          >
            프로덕트 디자이너 지망생으로,<br />
            디자인 감각과 기술적 깊이를 함께 갖추고 있습니다.
          </Typography>
        </Container>
      </Box>

      {/* 스토리 블록 */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, backgroundColor: colors.bgSecondary }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 8 } }}>
            {STORY_BLOCKS.map(({ label, title, body }, i) => (
              <Box
                key={label}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '140px 1fr' },
                  gap: { xs: 2, md: 5 },
                  pt:  i > 0 ? { xs: 6, md: 8 } : 0,
                  borderTop: i > 0 ? `1px solid ${colors.border}` : 'none',
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: colors.primary, letterSpacing: 3, fontSize: '0.68rem', fontWeight: 600, pt: 0.5 }}
                >
                  {label}
                </Typography>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 600,
                      color:      colors.textPrimary,
                      mb:         2.5,
                      fontSize:   { xs: '1.4rem', md: '1.6rem' },
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: colors.textSecondary, lineHeight: 1.9, fontSize: '0.96rem' }}
                  >
                    {body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 강점 섹션 */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.68rem', display: 'block', mb: 5 }}
          >
            What I Bring
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            {STRENGTHS.map(({ icon, text }) => (
              <Box
                key={text}
                sx={{
                  display:         'flex',
                  alignItems:      'flex-start',
                  gap:             2,
                  p:               3,
                  border:          `1px solid ${colors.border}`,
                  borderRadius:    2.5,
                  backgroundColor: colors.bgSecondary,
                  transition:      'border-color 0.2s',
                  '&:hover':       { borderColor: colors.primary },
                }}
              >
                <Typography sx={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, mt: 0.2 }}>{icon}</Typography>
                <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.75, fontSize: '0.92rem' }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 하단 CTA */}
      <Box
        sx={{
          py:           { xs: 8, md: 10 },
          px:           { xs: 2, md: 4 },
          borderTop:    `1px solid ${colors.border}`,
          textAlign:    'center',
          background:   `radial-gradient(ellipse at 50% 100%, ${colors.accent}22 0%, ${colors.bgPrimary} 65%)`,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, mb: 2 }}>
            함께 만들어볼까요?
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textMuted, mb: 4, lineHeight: 1.9 }}>
            프로젝트 협업이나 채용 문의는 언제든 환영합니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              sx={{
                backgroundColor: colors.primaryDark,
                color: '#f5ede3',
                px: 4, py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': { backgroundColor: colors.primary },
              }}
            >
              연락하기
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/projects')}
              sx={{
                borderColor: colors.primaryDark,
                color: colors.primaryDark,
                px: 4, py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': { backgroundColor: `${colors.primary}15`, borderColor: colors.primary },
              }}
            >
              프로젝트 보기
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
