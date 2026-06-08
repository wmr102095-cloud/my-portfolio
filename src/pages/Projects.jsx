import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { colors } from '../theme/theme';

export default function Projects() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: colors.bgPrimary,
        pt: { xs: 12, md: 14 },
        pb: 10,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
        >
          Page
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 4 }}>
          <Box component="span" sx={{ color: colors.primary }}>
            Projects
          </Box>
        </Typography>

        <Card>
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            <Typography variant="h5" sx={{ color: colors.primary, mb: 3, fontWeight: 600 }}>
              🚧 개발 예정
            </Typography>
            <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 2 }}>
              <strong style={{ color: colors.textPrimary }}>Projects 페이지</strong>가 개발될 공간입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>
              포트폴리오 작품들, 프로젝트 설명, 기술 스택, GitHub 링크 등이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
