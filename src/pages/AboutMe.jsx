import { useState, useRef, useEffect, memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from '../theme/theme';
import { usePortfolio } from '../context/PortfolioContext';

/* ── 카테고리 메타 ── */
const CATEGORY_META = {
  Frontend:  { color: '#9f8473', bg: '#9f847318' },
  Framework: { color: '#5c7a9f', bg: '#5c7a9f18' },
  Design:    { color: '#9f6478', bg: '#9f647818' },
  Backend:   { color: '#5f8c6e', bg: '#5f8c6e18' },
  Tools:     { color: '#72706a', bg: '#72706a18' },
};

const AVAILABLE_SKILLS = [
  { icon: '💚', name: 'Vue.js',       category: 'Frontend', desc: 'Progressive JavaScript Framework' },
  { icon: '🔴', name: 'Angular',      category: 'Frontend', desc: 'TypeScript 기반 SPA 프레임워크' },
  { icon: '🔷', name: 'TypeScript',   category: 'Frontend', desc: '정적 타입을 지원하는 JavaScript 확장' },
  { icon: '🟢', name: 'Node.js',      category: 'Backend',  desc: 'JavaScript 서버 런타임 환경' },
  { icon: '🐍', name: 'Python',       category: 'Backend',  desc: '범용 프로그래밍 언어' },
  { icon: '☕', name: 'Java',          category: 'Backend',  desc: '객체지향 프로그래밍 언어' },
  { icon: '🔧', name: 'Git',          category: 'Tools',    desc: '분산 버전 관리 시스템' },
  { icon: '📱', name: 'React Native', category: 'Tools',    desc: '크로스플랫폼 모바일 앱 개발' },
  { icon: '🍃', name: 'MongoDB',      category: 'Tools',    desc: 'NoSQL 도큐먼트 데이터베이스' },
];

/* ── 훅 ── */
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

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    '& fieldset':             { borderColor: colors.border },
    '&:hover fieldset':       { borderColor: colors.primary },
    '&.Mui-focused fieldset': { borderColor: colors.primary },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: colors.primary },
};

/* ── 기본 정보 행 ── */
const InfoRow = memo(function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.2,
               borderBottom: `1px solid ${colors.border}`, '&:last-child': { borderBottom: 'none' } }}>
      <Box sx={{ color: colors.primary, display: 'flex', alignItems: 'center', flexShrink: 0 }} aria-hidden="true">
        {icon}
      </Box>
      <Typography variant="caption" sx={{ color: colors.textMuted, width: 64, flexShrink: 0, fontSize: '0.75rem' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.textPrimary, fontWeight: 500, fontSize: '0.92rem' }}>
        {value}
      </Typography>
    </Box>
  );
});

/* ── 프로필 카드 ── */
const ProfileCard = memo(function ProfileCard({ basicInfo, onPhotoChange }) {
  const inputRef = useRef(null);
  const { photo } = basicInfo;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '160px 1fr' },
               gap: { xs: 3, sm: 4 }, p: { xs: 3, md: 4 },
               border: `1px solid ${colors.border}`, borderRadius: 3,
               backgroundColor: colors.bgSecondary, mb: { xs: 4, md: 6 } }}>
      <Box>
        <input
          ref={inputRef} type="file" accept="image/*"
          style={{ display: 'none' }}
          aria-label="프로필 사진 파일 선택"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onPhotoChange(URL.createObjectURL(f)); }}
        />
        <Box
          onClick={() => inputRef.current?.click()}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={photo ? '프로필 사진 변경' : '프로필 사진 업로드'}
          sx={{
            width: '100%', aspectRatio: '1/1', maxWidth: 160, mx: { xs: 'auto', sm: 0 },
            borderRadius: 2.5, border: `2px dashed ${photo ? colors.primary : colors.border}`,
            backgroundColor: photo ? 'transparent' : `${colors.primary}08`, cursor: 'pointer',
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 1,
            transition: 'border-color 0.2s, background-color 0.2s',
            '&:hover, &:focus-visible': {
              borderColor: colors.primary,
              backgroundColor: `${colors.primary}12`,
              outline: `2px solid ${colors.primary}50`,
              outlineOffset: 2,
            },
          }}>
          {photo
            ? <Box
                component="img" src={photo} alt={`${basicInfo.name} 프로필 사진`}
                loading="lazy" decoding="async"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            : (
              <>
                <PersonIcon sx={{ fontSize: '2.5rem', color: colors.textMuted, opacity: 0.5 }} aria-hidden="true" />
                <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.68rem', textAlign: 'center', px: 1 }}>
                  클릭하여<br />사진 업로드
                </Typography>
              </>
            )}
        </Box>
        {photo && (
          <Typography
            onClick={() => inputRef.current?.click()}
            variant="caption"
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            sx={{ display: 'block', textAlign: 'center', mt: 1, color: colors.textMuted,
                  cursor: 'pointer', fontSize: '0.72rem',
                  '&:hover': { color: colors.primary },
                  '&:focus-visible': { outline: `1px solid ${colors.primary}`, borderRadius: 1 } }}>
            사진 변경
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700,
                          fontSize: { xs: '1.8rem', md: '2rem' }, color: colors.textPrimary, mb: 2 }}>
          {basicInfo.name}
        </Typography>
        <InfoRow icon={<SchoolIcon sx={{ fontSize: '1rem' }} />} label="학력" value={basicInfo.education} />
        <InfoRow icon={<SchoolIcon sx={{ fontSize: '1rem' }} />} label="전공" value={basicInfo.major} />
        <InfoRow icon={<WorkIcon   sx={{ fontSize: '1rem' }} />} label="경력" value={basicInfo.experience} />
      </Box>
    </Box>
  );
});

/* ── 콘텐츠 아코디언 (편집 지원) ── */
const ContentAccordion = memo(function ContentAccordion({ sections, onUpdate }) {
  const [expanded, setExpanded] = useState('dev-story');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText]   = useState('');
  const [error, setError]         = useState('');

  const toggle = (id) => {
    if (editingId === id) return; // 편집 중엔 닫기 차단
    setExpanded(p => p === id ? false : id);
  };

  const startEdit = (section) => {
    setEditText(section.content);
    setEditingId(section.id);
    setError('');
  };

  const handleSave = () => {
    if (!editText.trim()) { setError('내용을 입력해주세요.'); return; }
    onUpdate(editingId, editText.trim());
    setEditingId(null);
    setError('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
    setError('');
  };

  return (
    <Box role="region" aria-label="이야기 섹션" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {sections.map((section) => {
        const isExpanded = expanded === section.id;
        const isEditing  = editingId === section.id;
        return (
          <Accordion
            key={section.id}
            expanded={isExpanded}
            onChange={() => toggle(section.id)}
            disableGutters elevation={0}
            sx={{
              border: `1px solid ${isEditing ? colors.primary : (isExpanded ? `${colors.primary}80` : colors.border)}`,
              borderRadius: '12px !important', backgroundColor: colors.bgSecondary,
              overflow: 'hidden', transition: 'border-color 0.2s', '&::before': { display: 'none' },
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: colors.textMuted }} />}
              sx={{ px: { xs: 2.5, md: 3 }, py: 0.5, minHeight: 56,
                    '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1.5, my: 1.5 } }}>
              <Typography sx={{
                fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600,
                fontSize: '1rem', color: isExpanded ? colors.textPrimary : colors.textSecondary,
              }}>
                {section.title}
              </Typography>
              {section.showInHome && (
                <Chip
                  icon={<HomeIcon sx={{ fontSize: '0.75rem !important' }} />}
                  label="홈 표시" size="small"
                  sx={{ height: 22, fontSize: '0.65rem', fontWeight: 600,
                        backgroundColor: `${colors.primary}20`, color: colors.primary,
                        border: `1px solid ${colors.primary}40`, '& .MuiChip-icon': { color: colors.primary, ml: '6px' } }}
                />
              )}
            </AccordionSummary>

            <AccordionDetails sx={{ px: { xs: 2.5, md: 3 }, pt: 0, pb: 3 }}>
              <Box sx={{ borderTop: `1px solid ${colors.border}`, pt: 2.5 }}>
                {isEditing ? (
                  <Box>
                    <TextField
                      multiline fullWidth minRows={3} maxRows={8}
                      value={editText}
                      onChange={(e) => { setEditText(e.target.value); if (error) setError(''); }}
                      autoFocus
                      error={!!error}
                      helperText={error}
                      aria-label={`${section.title} 내용 편집`}
                      placeholder="내용을 입력하세요..."
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          fontSize: '0.92rem', lineHeight: 1.8, color: colors.textSecondary,
                          '& fieldset': { borderColor: colors.border },
                          '&:hover fieldset': { borderColor: colors.primary },
                          '&.Mui-focused fieldset': { borderColor: colors.primary },
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Button
                        size="small" onClick={handleSave} variant="contained"
                        aria-label="변경사항 저장"
                        sx={{ fontSize: '0.78rem', px: 2.5, borderRadius: 1.5,
                              backgroundColor: colors.primaryDark, color: '#f5ede3',
                              '&:hover': { backgroundColor: colors.primary } }}>
                        저장
                      </Button>
                      <Button
                        size="small" onClick={handleCancel} variant="text"
                        aria-label="편집 취소"
                        sx={{ fontSize: '0.78rem', color: colors.textMuted }}>
                        취소
                      </Button>
                      {section.showInHome && (
                        <Typography variant="caption" sx={{ color: colors.primary, fontSize: '0.7rem', ml: 'auto' }}>
                          ✓ 저장 시 홈 탭에 즉시 반영
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1" sx={{ color: colors.textSecondary, lineHeight: 1.95,
                                                       fontSize: '0.95rem', whiteSpace: 'pre-wrap', mb: 2.5 }}>
                      {section.content}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => startEdit(section)}
                      startIcon={<EditIcon sx={{ fontSize: '0.85rem !important' }} />}
                      aria-label={`${section.title} 내용 편집`}
                      sx={{
                        fontSize: '0.75rem', color: colors.textMuted, px: 1.8,
                        border: `1px solid ${colors.border}`, borderRadius: 1.5,
                        '&:hover': { borderColor: colors.primary, color: colors.primary,
                                     backgroundColor: `${colors.primary}08` },
                        '&:focus-visible': { outline: `2px solid ${colors.primary}`, outlineOffset: 2 },
                      }}>
                      편집
                    </Button>
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
});

/* ── 스킬 카드 (레벨 편집 지원) ── */
const SkillCard = memo(function SkillCard({ skill, visible, index, onLevelChange }) {
  const [editLevel, setEditLevel]   = useState(false);
  const [localLevel, setLocalLevel] = useState(skill.level);
  const meta = CATEGORY_META[skill.category] ?? CATEGORY_META.Tools;

  useEffect(() => { setLocalLevel(skill.level); }, [skill.level]);

  const handleSave = () => {
    onLevelChange(skill.id, localLevel);
    setEditLevel(false);
  };

  const handleCancel = () => {
    setLocalLevel(skill.level);
    setEditLevel(false);
  };

  return (
    <Tooltip
      title={!editLevel && skill.desc ? skill.desc : ''}
      placement="top" arrow
      disableHoverListener={editLevel || !skill.desc}
      componentsProps={{ tooltip: { sx: { backgroundColor: colors.primaryDark, fontSize: '0.75rem' } } }}>
      <Box
        sx={{
          p: 2.5, borderRadius: 2.5,
          border: `1px solid ${editLevel ? colors.primary : colors.border}`,
          backgroundColor: colors.bgSecondary,
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:hover': { borderColor: meta.color, boxShadow: `0 4px 20px ${meta.color}25` },
        }}>

        {/* 헤더: 아이콘 + 이름 + 레벨% */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Typography sx={{ fontSize: '1.3rem', lineHeight: 1 }} aria-hidden="true">{skill.icon}</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: colors.textPrimary }}>{skill.name}</Typography>
          </Box>
          <Tooltip title={editLevel ? '' : '클릭하여 숙련도 편집'} placement="top" arrow>
            <Box
              onClick={() => setEditLevel(p => !p)}
              role="button"
              tabIndex={0}
              aria-label={`${skill.name} 숙련도 편집 (현재 ${skill.level}%)`}
              aria-pressed={editLevel}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditLevel(p => !p); } }}
              sx={{
                fontWeight: 700, fontSize: '0.88rem',
                color: editLevel ? colors.primary : meta.color,
                cursor: 'pointer', px: 1, py: 0.4, borderRadius: 1.5,
                backgroundColor: editLevel ? `${colors.primary}18` : 'transparent',
                transition: 'all 0.15s',
                '&:hover': { backgroundColor: `${meta.color}18` },
                '&:focus-visible': { outline: `2px solid ${colors.primary}`, outlineOffset: 2 },
              }}>
              {editLevel ? `${localLevel}%` : `${skill.level}%`}
            </Box>
          </Tooltip>
        </Box>

        {/* 프로그래스 바 */}
        <Box sx={{ height: 5, borderRadius: 3, backgroundColor: `${meta.color}20`,
                   mb: editLevel ? 1.5 : 2, overflow: 'hidden' }}>
          <Box sx={{
            height: '100%', borderRadius: 3,
            backgroundColor: editLevel ? colors.primary : meta.color,
            width: visible ? `${editLevel ? localLevel : skill.level}%` : '0%',
            transition: editLevel
              ? 'width 0.15s ease, background-color 0.2s'
              : `width 0.85s cubic-bezier(0.4, 0, 0.2, 1) ${index * 70}ms`,
          }} />
        </Box>

        {/* 인라인 레벨 편집기 */}
        {editLevel && (
          <Box sx={{ px: 0.5 }}>
            <Slider
              value={localLevel}
              onChange={(_, v) => setLocalLevel(v)}
              min={0} max={100} step={5}
              aria-label={`${skill.name} 숙련도`}
              aria-valuetext={`${localLevel}%`}
              sx={{
                color: colors.primary,
                '& .MuiSlider-thumb': { width: 14, height: 14 },
                '& .MuiSlider-rail': { opacity: 0.25 },
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
              <Button size="small" onClick={handleSave} variant="contained"
                sx={{ fontSize: '0.72rem', px: 1.5, py: 0.3, borderRadius: 1, minWidth: 0,
                      backgroundColor: colors.primaryDark, color: '#f5ede3',
                      '&:hover': { backgroundColor: colors.primary } }}>저장</Button>
              <Button size="small" onClick={handleCancel} variant="text"
                sx={{ fontSize: '0.72rem', px: 1, py: 0.3, borderRadius: 1, minWidth: 0,
                      color: colors.textMuted }}>취소</Button>
            </Box>
          </Box>
        )}

        {/* 카테고리 칩 + 홈 표시 아이콘 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ px: 1.2, py: 0.35, borderRadius: 20, backgroundColor: meta.bg,
                     color: meta.color, fontSize: '0.65rem', fontWeight: 600 }}>
            {skill.category}
          </Box>
          {skill.showInMain && (
            <Tooltip title="홈 스킬 섹션에 표시" arrow>
              <HomeIcon sx={{ fontSize: '0.9rem', color: colors.textMuted, opacity: 0.6 }} aria-label="홈에 표시됨" />
            </Tooltip>
          )}
        </Box>
      </Box>
    </Tooltip>
  );
});

/* ── 스킬 추가 다이얼로그 ── */
const BLANK = { icon: '🔵', name: '', category: 'Frontend', level: 50, desc: '', showInMain: false };

const AddSkillDialog = memo(function AddSkillDialog({ open, onClose, onAdd, existingNames }) {
  const [form, setForm] = useState(BLANK);
  const notAdded = AVAILABLE_SKILLS.filter(s => !existingNames.includes(s.name));

  const fill  = (s)  => setForm(p => ({ ...p, icon: s.icon, name: s.name, category: s.category, desc: s.desc }));
  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, name: form.name.trim(), id: Date.now() });
    setForm(BLANK);
    onClose();
  };
  const handleClose = () => { setForm(BLANK); onClose(); };

  return (
    <Dialog
      open={open} onClose={handleClose} maxWidth="sm" fullWidth
      aria-labelledby="add-skill-dialog-title"
      PaperProps={{ sx: { borderRadius: 3, backgroundColor: colors.bgSecondary, backgroundImage: 'none' } }}>
      <DialogTitle id="add-skill-dialog-title"
        sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700,
              fontSize: '1.2rem', color: colors.textPrimary, pb: 1 }}>
        스킬 추가
      </DialogTitle>
      <DialogContent sx={{ pt: '8px !important' }}>
        {notAdded.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.72rem',
                                                 display: 'block', mb: 1.5, letterSpacing: 1 }}>
              추천 기술 (클릭 시 자동 입력)
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} role="group" aria-label="추천 기술 목록">
              {notAdded.map(s => (
                <Box key={s.name} onClick={() => fill(s)}
                  role="button" tabIndex={0}
                  aria-label={`${s.name} 선택`}
                  aria-pressed={form.name === s.name}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fill(s); } }}
                  sx={{
                    px: 1.5, py: 0.6, borderRadius: 20, cursor: 'pointer',
                    border: `1px solid ${form.name === s.name ? colors.primary : colors.border}`,
                    backgroundColor: form.name === s.name ? `${colors.primary}20` : 'transparent',
                    color: colors.textSecondary, fontSize: '0.78rem', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 0.6, transition: 'all 0.15s',
                    '&:hover, &:focus-visible': { borderColor: colors.primary, backgroundColor: `${colors.primary}12` },
                    '&:focus-visible': { outline: `2px solid ${colors.primary}`, outlineOffset: 2 },
                  }}>
                  <span aria-hidden="true">{s.icon}</span> {s.name}
                </Box>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={{ borderTop: `1px solid ${colors.border}`, pt: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 1.5 }}>
            <TextField label="아이콘" value={form.icon} size="small"
              onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
              inputProps={{ style: { fontSize: '1.2rem', textAlign: 'center' } }} sx={fieldSx} />
            <TextField label="기술명" value={form.name} size="small" placeholder="예) TypeScript"
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))} sx={fieldSx} />
          </Box>
          <FormControl size="small" sx={fieldSx}>
            <InputLabel>카테고리</InputLabel>
            <Select value={form.category} label="카테고리"
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
              {Object.keys(CATEGORY_META).map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.75rem' }}>숙련도</Typography>
              <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 700, fontSize: '0.8rem' }}>{form.level}%</Typography>
            </Box>
            <Slider
              value={form.level}
              onChange={(_, v) => setForm(p => ({ ...p, level: v }))}
              min={0} max={100} step={5}
              aria-label="숙련도"
              aria-valuetext={`${form.level}%`}
              sx={{ color: CATEGORY_META[form.category]?.color ?? colors.primary,
                    '& .MuiSlider-thumb': { width: 14, height: 14 },
                    '& .MuiSlider-rail': { opacity: 0.25 } }}
            />
          </Box>
          <TextField label="간단한 설명 (선택)" value={form.desc} size="small"
            placeholder="예) ES6+ 문법과 DOM 조작에 익숙합니다."
            onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} sx={fieldSx} />
          <FormControlLabel
            control={
              <Switch checked={form.showInMain} size="small"
                onChange={e => setForm(p => ({ ...p, showInMain: e.target.checked }))}
                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: colors.primary },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: colors.primary } }} />
            }
            label={<Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.8rem' }}>홈 스킬 섹션에 표시</Typography>}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={handleClose} variant="text"
          sx={{ color: colors.textMuted, '&:hover': { backgroundColor: `${colors.primary}10` } }}>취소</Button>
        <Button onClick={handleAdd} disabled={!form.name.trim()} variant="contained"
          sx={{ backgroundColor: colors.primaryDark, color: '#f5ede3', px: 3, borderRadius: 1.5,
                '&:hover': { backgroundColor: colors.primary }, '&.Mui-disabled': { opacity: 0.4 } }}>
          추가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
});

/* ── 스킬 섹션 ── */
function SkillsSection({ skills, onAdd, onLevelChange }) {
  const [sectionRef, sectionVisible] = useFadeIn(0.08);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [sortByLevel, setSortByLevel]       = useState(true);
  const [addOpen, setAddOpen]               = useState(false);

  const categories = ['전체', ...Object.keys(CATEGORY_META).filter(c => skills.some(s => s.category === c))];
  const filtered   = activeCategory === '전체' ? skills : skills.filter(s => s.category === activeCategory);
  const sorted     = sortByLevel ? [...filtered].sort((a, b) => b.level - a.level) : filtered;
  const existingNames = skills.map(s => s.name);

  return (
    <>
      <Box ref={sectionRef} sx={{ mt: { xs: 7, md: 10 } }} role="region" aria-label="기술 스택">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                   flexWrap: 'wrap', gap: 2, mb: 3.5 }}>
          <Box>
            <Typography variant="overline" sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.68rem', display: 'block', mb: 0.5 }}>
              Skills
            </Typography>
            <Typography sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700,
                               fontSize: { xs: '1.5rem', md: '1.8rem' }, color: colors.textPrimary }}>
              기술 스택
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={sortByLevel ? '등록 순 정렬' : '숙련도 순 정렬'} arrow>
              <Button
                onClick={() => setSortByLevel(p => !p)} size="small"
                aria-label={sortByLevel ? '등록 순으로 정렬' : '숙련도 순으로 정렬'}
                startIcon={<SortIcon sx={{ fontSize: '1rem !important' }} />}
                sx={{ color: sortByLevel ? colors.primary : colors.textMuted,
                      borderColor: sortByLevel ? colors.primary : colors.border, border: '1px solid',
                      borderRadius: 1.5, px: 1.8, fontSize: '0.75rem', fontWeight: 600,
                      '&:hover': { backgroundColor: `${colors.primary}10`, borderColor: colors.primary } }}>
                {sortByLevel ? '숙련도순' : '등록순'}
              </Button>
            </Tooltip>
            <Button
              onClick={() => setAddOpen(true)} size="small" variant="contained"
              aria-label="새 스킬 추가"
              startIcon={<AddIcon sx={{ fontSize: '1rem !important' }} />}
              sx={{ backgroundColor: colors.primaryDark, color: '#f5ede3', borderRadius: 1.5,
                    px: 1.8, fontSize: '0.75rem', fontWeight: 600,
                    '&:hover': { backgroundColor: colors.primary } }}>
              스킬 추가
            </Button>
          </Box>
        </Box>

        {/* 카테고리 필터 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }} role="group" aria-label="카테고리 필터">
          {categories.map(cat => {
            const meta   = CATEGORY_META[cat];
            const active = activeCategory === cat;
            return (
              <Box
                key={cat} onClick={() => setActiveCategory(cat)}
                role="button" tabIndex={0}
                aria-label={`${cat} 카테고리 필터`} aria-pressed={active}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveCategory(cat); } }}
                sx={{
                  px: 1.8, py: 0.5, borderRadius: 20, cursor: 'pointer',
                  border: `1px solid ${active ? (meta?.color ?? colors.primary) : colors.border}`,
                  backgroundColor: active ? (meta?.bg ?? `${colors.primary}18`) : 'transparent',
                  color: active ? (meta?.color ?? colors.primary) : colors.textMuted,
                  fontSize: '0.75rem', fontWeight: active ? 700 : 500, transition: 'all 0.15s',
                  '&:hover': { borderColor: meta?.color ?? colors.primary, color: meta?.color ?? colors.primary },
                  '&:focus-visible': { outline: `2px solid ${colors.primary}`, outlineOffset: 2 },
                }}>
                {cat === '전체'
                  ? `전체 (${skills.length})`
                  : `${cat} (${skills.filter(s => s.category === cat).length})`}
              </Box>
            );
          })}
        </Box>

        {/* 스킬 그리드 */}
        <Box sx={{ display: 'grid',
                   gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                   gap: { xs: 2, md: 2.5 } }}>
          {sorted.map((skill, i) => (
            <SkillCard
              key={skill.id} skill={skill} visible={sectionVisible}
              index={i} onLevelChange={onLevelChange}
            />
          ))}
        </Box>

        {/* 통계 */}
        <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {Object.keys(CATEGORY_META)
            .filter(c => skills.some(s => s.category === c))
            .map(c => {
              const meta  = CATEGORY_META[c];
              const count = skills.filter(s => s.category === c).length;
              const avg   = Math.round(skills.filter(s => s.category === c).reduce((a, s) => a + s.level, 0) / count);
              return (
                <Box key={c} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: meta.color, flexShrink: 0 }} aria-hidden="true" />
                  <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.72rem' }}>
                    {c} {count}개 · 평균 {avg}%
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </Box>

      <AddSkillDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={onAdd} existingNames={existingNames} />
    </>
  );
}

/* ── About Me 페이지 ── */
export default function AboutMe() {
  const { aboutMeData, addSkill, updatePhoto, updateSection, updateSkillLevel } = usePortfolio();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg]   = useState('');

  const notify = useCallback((msg) => {
    setSnackMsg(msg);
    setSnackOpen(true);
  }, []);

  const handleUpdateSection = useCallback((id, content) => {
    updateSection(id, content);
    notify('홈 탭에 자동으로 반영되었습니다 ✓');
  }, [updateSection, notify]);

  const handleUpdateSkillLevel = useCallback((skillId, level) => {
    updateSkillLevel(skillId, level);
    notify('스킬 레벨이 업데이트되었습니다 ✓');
  }, [updateSkillLevel, notify]);

  const handleAddSkill = useCallback((skill) => {
    addSkill(skill);
    notify('스킬이 추가되었습니다 ✓');
  }, [addSkill, notify]);

  return (
    <Box component="main" sx={{ minHeight: '100vh', backgroundColor: colors.bgPrimary }}>
      {/* 헤더 */}
      <Box sx={{
        pt: { xs: 16, md: 20 }, pb: { xs: 6, md: 8 }, px: { xs: 2, md: 4 },
        borderBottom: `1px solid ${colors.border}`,
        background: `radial-gradient(ellipse at 80% 40%, ${colors.accent}30 0%, ${colors.bgPrimary} 60%)`,
      }}>
        <Container maxWidth="md">
          <Typography variant="overline"
            sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600, display: 'block', mb: 2 }}>
            About Me
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.6rem', md: '3.6rem' } }}>
            안녕하세요,<br />김재우입니다
          </Typography>
        </Container>
      </Box>

      {/* 본문 */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <ProfileCard basicInfo={aboutMeData.basicInfo} onPhotoChange={updatePhoto} />

          <Typography variant="overline"
            sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.68rem', display: 'block', mb: 2.5 }}>
            이야기
          </Typography>
          <ContentAccordion sections={aboutMeData.sections} onUpdate={handleUpdateSection} />

          <SkillsSection
            skills={aboutMeData.skills}
            onAdd={handleAddSkill}
            onLevelChange={handleUpdateSkillLevel}
          />
        </Container>
      </Box>

      {/* 저장 알림 */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        aria-live="polite">
        <Alert
          severity="success"
          onClose={() => setSnackOpen(false)}
          sx={{ borderRadius: 2, backgroundColor: colors.primaryDark, color: '#f5ede3',
                '& .MuiAlert-icon': { color: '#f5ede3' },
                '& .MuiAlert-action .MuiButtonBase-root': { color: '#f5ede3' } }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
