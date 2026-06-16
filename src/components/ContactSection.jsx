import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import { colors } from '../theme/theme';
import { supabase } from '../supabaseClient';

const EMOJIS = ['👋', '😊', '🔥', '💡', '✨', '🎉', '👍', '❤️'];

const sectionBase = {
  width: '100%',
  py: { xs: 8, md: 12 },
  px: { xs: 2, md: 4 },
};

function SkeletonCard() {
  const shimmer = {
    background: `linear-gradient(90deg, ${colors.border} 25%, ${colors.bgPrimary}90 50%, ${colors.border} 75%)`,
    backgroundSize: '400% 100%',
    borderRadius: '6px',
    '@keyframes shimmer': {
      '0%': { backgroundPosition: '100% 0' },
      '100%': { backgroundPosition: '-100% 0' },
    },
    animation: 'shimmer 1.4s ease-in-out infinite',
  };
  return (
    <Box sx={{
      p: { xs: 2.5, md: 3 },
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      backgroundColor: colors.bgSecondary,
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ ...shimmer, height: '14px', width: '38%' }} />
        <Box sx={{ ...shimmer, height: '14px', width: '18%', animationDelay: '0.1s' }} />
      </Box>
      <Box sx={{ ...shimmer, height: '12px', width: '90%', mb: 0.9, animationDelay: '0.05s' }} />
      <Box sx={{ ...shimmer, height: '12px', width: '65%', animationDelay: '0.15s' }} />
    </Box>
  );
}

export default function ContactSection() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', message: '', emoji: '', rating: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (!error) setEntries(data || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from('guestbook').insert({
      name: form.name.trim(),
      message: form.message.trim(),
      emoji: form.emoji || null,
      rating: form.rating || null,
    });
    setSubmitting(false);
    if (error) {
      setSnackbar({ open: true, message: '오류가 발생했습니다. 다시 시도해주세요.', severity: 'error' });
    } else {
      setForm({ name: '', message: '', emoji: '', rating: 0 });
      setSnackbar({ open: true, message: '방명록이 등록되었습니다! 감사합니다 😊', severity: 'success' });
      fetchEntries();
    }
  }

  function closeSnackbar() {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }

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
      <Container maxWidth="md">

        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: colors.secondary, letterSpacing: 4, mb: 2, display: 'block' }}
          >
            Contact
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Get in{' '}
            <Box component="span" sx={{ color: colors.secondary }}>
              Touch
            </Box>
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textMuted, maxWidth: 480, mx: 'auto' }}>
            프로젝트 협업, 피드백, 또는 그냥 인사도 환영해요.
          </Typography>
        </Box>

        {/* 연락처 카드 */}
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="subtitle2"
              sx={{ color: colors.textMuted, fontWeight: 600, mb: 2.5, textTransform: 'uppercase', letterSpacing: 2 }}
            >
              연락처
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<EmailIcon />}
                href="mailto:wmr102095@gmail.com"
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  borderColor: colors.border,
                  color: colors.textSecondary,
                  borderRadius: 2,
                  py: 1.5,
                  px: 2.5,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    borderColor: colors.primary,
                    color: colors.primary,
                    backgroundColor: `${colors.primary}11`,
                  },
                }}
              >
                wmr102095@gmail.com
              </Button>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/wmr102095-cloud"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  borderColor: colors.border,
                  color: colors.textSecondary,
                  borderRadius: 2,
                  py: 1.5,
                  px: 2.5,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    borderColor: colors.textPrimary,
                    color: colors.textPrimary,
                    backgroundColor: `${colors.textPrimary}11`,
                  },
                }}
              >
                github.com/wmr102095-cloud
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Divider sx={{ borderColor: colors.border, mb: 6 }} />

        {/* 방명록 작성 폼 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: colors.textPrimary }}>
            방명록
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textMuted, mb: 3 }}>
            방문 기념으로 한 마디 남겨주세요!
          </Typography>
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                {/* 이름 */}
                <TextField
                  label="이름"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  inputProps={{ maxLength: 30 }}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: colors.border },
                      '&:hover fieldset': { borderColor: colors.textMuted },
                      '&.Mui-focused fieldset': { borderColor: colors.primary },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: colors.primary },
                  }}
                />

                {/* 이모지 선택 */}
                <Box>
                  <Typography variant="caption" sx={{ color: colors.textMuted, mb: 1.5, display: 'block' }}>
                    이모지 선택 (선택사항)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {EMOJIS.map((em) => (
                      <Box
                        key={em}
                        role="button"
                        tabIndex={0}
                        onClick={() => setForm((prev) => ({ ...prev, emoji: prev.emoji === em ? '' : em }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setForm((prev) => ({ ...prev, emoji: prev.emoji === em ? '' : em }));
                          }
                        }}
                        sx={{
                          width: 44,
                          height: 44,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          cursor: 'pointer',
                          borderRadius: 1.5,
                          border: `2px solid ${form.emoji === em ? colors.primary : colors.border}`,
                          backgroundColor: form.emoji === em ? `${colors.primary}22` : 'transparent',
                          transition: 'all 0.15s',
                          '&:hover': { borderColor: colors.primaryLight },
                          userSelect: 'none',
                          outline: 'none',
                          '&:focus-visible': {
                            borderColor: colors.primaryLight,
                            boxShadow: `0 0 0 2px ${colors.primary}44`,
                          },
                        }}
                      >
                        {em}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* 메시지 */}
                <TextField
                  label="메시지"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  multiline
                  rows={3}
                  inputProps={{ maxLength: 300 }}
                  fullWidth
                  helperText={`${form.message.length}/300`}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: colors.border },
                      '&:hover fieldset': { borderColor: colors.textMuted },
                      '&.Mui-focused fieldset': { borderColor: colors.primary },
                    },
                    '& .MuiInputLabel-root.Mui-focused': { color: colors.primary },
                    '& .MuiFormHelperText-root': { color: colors.textMuted, textAlign: 'right' },
                  }}
                />

                {/* 별점 */}
                <Box>
                  <Typography variant="caption" sx={{ color: colors.textMuted, mb: 1, display: 'block' }}>
                    별점 (선택사항)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Typography
                        key={star}
                        component="span"
                        onClick={() => setForm((prev) => ({ ...prev, rating: prev.rating === star ? 0 : star }))}
                        sx={{
                          cursor: 'pointer',
                          color: star <= form.rating ? '#FFD700' : colors.textMuted,
                          fontSize: '2rem',
                          lineHeight: 1,
                          transition: 'color 0.15s, transform 0.1s',
                          '&:hover': { color: '#FFD700', transform: 'scale(1.15)' },
                          userSelect: 'none',
                        }}
                      >
                        {star <= form.rating ? '★' : '☆'}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* 제출 버튼 */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting || !form.name.trim() || !form.message.trim()}
                    endIcon={
                      submitting
                        ? <CircularProgress size={16} color="inherit" />
                        : <SendIcon />
                    }
                    sx={{
                      backgroundColor: colors.primary,
                      '&:hover': { backgroundColor: colors.primaryLight },
                      px: 4,
                      py: 1.2,
                    }}
                  >
                    {submitting ? '등록 중...' : '방명록 남기기'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* 방명록 목록 */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: colors.textSecondary, fontWeight: 500, mb: 2.5 }}
          >
            {loading
              ? '불러오는 중...'
              : entries.length > 0
              ? `총 ${entries.length}개의 방명록`
              : '아직 방명록이 없어요'}
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </Box>
          ) : entries.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body2" sx={{ color: colors.textMuted }}>
                  첫 번째 방명록을 남겨주세요! 👋
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {entries.map((entry) => (
                <Card
                  key={entry.id}
                  sx={{
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: `${colors.primary}55` },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 1 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {entry.emoji && (
                          <Typography sx={{ fontSize: '1.2rem', lineHeight: 1 }}>
                            {entry.emoji}
                          </Typography>
                        )}
                        <Typography variant="subtitle2" sx={{ color: colors.textPrimary, fontWeight: 600 }}>
                          {entry.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {entry.rating && (
                          <Typography sx={{ color: '#FFD700', fontSize: '0.85rem', letterSpacing: 1 }}>
                            {'★'.repeat(entry.rating)}
                          </Typography>
                        )}
                        <Typography variant="caption" sx={{ color: colors.textMuted }}>
                          {new Date(entry.created_at).toLocaleDateString('ko-KR')}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: 1.7,
                      }}
                    >
                      {entry.message}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={closeSnackbar} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
