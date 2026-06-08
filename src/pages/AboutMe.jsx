import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { colors } from '../theme/theme';

export default function AboutMe() {
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
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
        >
          Page
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 4 }}>
          About{' '}
          <Box component="span" sx={{ color: colors.secondary }}>
            Me
          </Box>
        </Typography>

        <Card>
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            <Typography variant="h5" sx={{ color: colors.primary, mb: 3, fontWeight: 600 }}>
              🚧 개발 예정
            </Typography>
            <Typography variant="body1" sx={{ color: colors.textSecondary, mb: 2 }}>
              <strong style={{ color: colors.textPrimary }}>About Me 페이지</strong>가 개발될 공간입니다.
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>
              상세한 자기소개, 경력, 학력, 관심 분야 등이 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
