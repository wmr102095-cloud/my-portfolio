import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { colors } from '../theme/theme';

const sectionBase = {
  width: '100%',
  py: { xs: 8, md: 12 },
  px: { xs: 2, md: 4 },
};

/* ── Hero 섹션 ── */
function HeroSection() {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        ...sectionBase,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: `radial-gradient(ellipse at 50% 60%, ${colors.primaryDark}33 0%, ${colors.bgPrimary} 70%)`,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
        >
          Hero Section
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 3, lineHeight: 1.2 }}>
          여기는{' '}
          <Box component="span" sx={{ color: colors.primary }}>
            Hero 섹션
          </Box>
          입니다
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: colors.textSecondary, maxWidth: 560, mx: 'auto', mb: 1 }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
        <Typography variant="caption" sx={{ color: colors.textMuted }}>
          [ 이 영역은 개발 예정입니다 ]
        </Typography>
      </Container>
    </Box>
  );
}

/* ── About Me 섹션 ── */
function AboutSection() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        ...sectionBase,
        backgroundColor: colors.bgSecondary,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
        >
          About Me Section
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
          About{' '}
          <Box component="span" sx={{ color: colors.secondary }}>
            Me
          </Box>
        </Typography>
        <Card sx={{ mb: 4, textAlign: 'left' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 2 }}>
              여기는 <strong style={{ color: colors.textPrimary }}>About Me 섹션</strong>입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>
              간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderColor: colors.secondary,
            color: colors.secondary,
            '&:hover': {
              borderColor: colors.accent,
              color: colors.accent,
              backgroundColor: `${colors.accent}11`,
            },
          }}
        >
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

/* ── Skill Tree 섹션 ── */
function SkillSection() {
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Figma'];
  return (
    <Box
      component="section"
      id="skills"
      sx={{
        ...sectionBase,
        backgroundColor: colors.bgPrimary,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
        >
          Skill Tree Section
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
          Skill{' '}
          <Box component="span" sx={{ color: colors.primary }}>
            Tree
          </Box>
        </Typography>
        <Card sx={{ mb: 3, textAlign: 'left' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 3 }}>
              여기는 <strong style={{ color: colors.textPrimary }}>Skill Tree 섹션</strong>입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted, mb: 3 }}>
              기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
            </Typography>
            <Divider sx={{ borderColor: colors.border, mb: 3 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill) => (
                <Box
                  key={skill}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 20,
                    border: `1px solid ${colors.borderAccent}`,
                    color: colors.secondary,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

/* ── Projects 섹션 ── */
function ProjectsSection() {
  const placeholders = ['프로젝트 1', '프로젝트 2', '프로젝트 3'];
  return (
    <Box
      component="section"
      id="projects"
      sx={{
        ...sectionBase,
        backgroundColor: colors.bgSecondary,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
        >
          Projects Section
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
          <Box component="span" sx={{ color: colors.primary }}>
            Projects
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textMuted, mb: 4 }}>
          여기는 <strong style={{ color: colors.textSecondary }}>Projects 섹션</strong>입니다.
          대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
            mb: 4,
          }}
        >
          {placeholders.map((title) => (
            <Card
              key={title}
              sx={{
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px dashed ${colors.borderFocus}`,
                backgroundColor: `${colors.primary}0A`,
                transition: 'border-color 0.2s, transform 0.2s',
                '&:hover': {
                  borderColor: colors.primaryLight,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="body2" sx={{ color: colors.textMuted }}>
                {title} 썸네일 예정
              </Typography>
            </Card>
          ))}
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: colors.primary,
            '&:hover': { backgroundColor: colors.primaryLight },
          }}
        >
          더 보기
        </Button>
      </Container>
    </Box>
  );
}

/* ── Contact 섹션 ── */
function ContactSection() {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        ...sectionBase,
        backgroundColor: colors.bgPrimary,
        background: `radial-gradient(ellipse at 50% 100%, ${colors.primaryDark}22 0%, ${colors.bgPrimary} 65%)`,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
        >
          Contact Section
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
          <Box component="span" sx={{ color: colors.secondary }}>
            Contact
          </Box>
        </Typography>
        <Card sx={{ textAlign: 'left' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 2 }}>
              여기는 <strong style={{ color: colors.textPrimary }}>Contact 섹션</strong>입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>
              연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

/* ── Home 페이지 (5개 섹션 조합) ── */
export default function Home() {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}
