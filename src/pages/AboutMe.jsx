import { useState, useRef, useEffect } from 'react';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import { colors } from '../theme/theme';

/* ── 카테고리 메타 (색상 팔레트) ── */
const CATEGORY_META = {
  Frontend:  { color: '#9f8473', bg: '#9f847318', label: 'Frontend'      },
  Framework: { color: '#5c7a9f', bg: '#5c7a9f18', label: 'Framework'     },
  Design:    { color: '#9f6478', bg: '#9f647818', label: 'Design'         },
  Backend:   { color: '#5f8c6e', bg: '#5f8c6e18', label: 'Backend'        },
  Tools:     { color: '#72706a', bg: '#72706a18', label: 'Tools & Other'  },
};

/* ── 추가 가능한 기술 목록 ── */
const AVAILABLE_SKILLS = [
  { icon: '💚', name: 'Vue.js',        category: 'Frontend',  desc: 'Progressive JavaScript Framework' },
  { icon: '🔴', name: 'Angular',       category: 'Frontend',  desc: 'TypeScript 기반 SPA 프레임워크' },
  { icon: '🔷', name: 'TypeScript',    category: 'Frontend',  desc: '정적 타입을 지원하는 JavaScript 확장' },
  { icon: '🟢', name: 'Node.js',       category: 'Backend',   desc: 'JavaScript 서버 런타임 환경' },
  { icon: '🐍', name: 'Python',        category: 'Backend',   desc: '범용 프로그래밍 언어' },
  { icon: '☕', name: 'Java',           category: 'Backend',   desc: '객체지향 프로그래밍 언어' },
  { icon: '🔧', name: 'Git',           category: 'Tools',     desc: '분산 버전 관리 시스템' },
  { icon: '📱', name: 'React Native',  category: 'Tools',     desc: '크로스플랫폼 모바일 앱 개발' },
  { icon: '🍃', name: 'MongoDB',       category: 'Tools',     desc: 'NoSQL 도큐먼트 데이터베이스' },
];

/* ── 초기 스킬 데이터 ── */
const INITIAL_SKILLS = [
  { id: 1, icon: '🔶', name: 'HTML',        level: 80, category: 'Frontend',  showInMain: true,  desc: '시맨틱 마크업과 웹 표준을 이해하고 있습니다.' },
  { id: 2, icon: '🎨', name: 'CSS',         level: 75, category: 'Frontend',  showInMain: true,  desc: 'Flexbox, Grid, 반응형 디자인을 활용합니다.' },
  { id: 3, icon: '⚡', name: 'JavaScript',  level: 70, category: 'Frontend',  showInMain: true,  desc: 'ES6+ 문법과 DOM 조작에 익숙합니다.' },
  { id: 4, icon: '⚛️', name: 'React',       level: 60, category: 'Framework', showInMain: true,  desc: '컴포넌트 기반 UI 개발을 학습 중입니다.' },
  { id: 5, icon: '🎯', name: 'Figma',       level: 65, category: 'Design',    showInMain: true,  desc: 'UI/UX 프로토타이핑과 디자인 시스템 구성.' },
];

/* ── 스토리 데이터 ── */
const aboutMeData = {
  basicInfo: {
    name:       '김재우',
    education:  '울산과학대학교 건축과 중퇴',
    major:      '실내인테리어',
    experience: '신입',
    photo:      '',
  },
  sections: [
    {
      id:         'dev-story',
      title:      '나의 개발 스토리',
      content:    '건축과 인테리어를 공부하며 공간을 설계하는 일에 익숙했습니다. 그러다 IT 시대에 누군가의 아이디어를 세계에 알리는 가장 강력한 도구가 웹이라는 걸 알았고, 그 도구를 아름답고 직관적으로 만드는 일 — 그게 디자인이었습니다. 공간 디자인에서 화면 디자인으로, 저는 여전히 \'사람이 머무르고 싶은 곳\'을 만드는 일을 하고 있습니다.',
      showInHome: true,
    },
    {
      id:         'philosophy',
      title:      '개발 철학',
      content:    '누구나 편리하고 이쁜 사이트를 만드는 것이 목표입니다. 어렵고 복잡한 기술도 결국 사용자에게 닿는 순간은 단순하고 아름다워야 한다고 생각합니다. 첫눈에 이해되는 구조, 자연스럽게 손이 가는 버튼, 막힘없이 흘러가는 흐름 — 이것이 좋은 디자인의 조건이라고 믿습니다.',
      showInHome: true,
    },
    {
      id:         'personal',
      title:      '개인적인 이야기',
      content:    '건축과에서 공부하며 공간이 사람의 감정에 미치는 영향에 관심을 갖게 됐습니다. 그 관심은 실내인테리어로, 그리고 다시 디지털 공간인 웹으로 자연스럽게 이어졌습니다. 형태는 달라졌지만 결국 같은 질문입니다. "이 공간에서 사람들이 편안함을 느낄 수 있을까?" 지금은 그 질문을 화면 앞에서 매일 던지며 배우고 있습니다.',
      showInHome: false,
    },
  ],
};

/* ── IntersectionObserver 훅 ── */
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

/* ── 기본 정보 아이템 ── */
function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.2,
               borderBottom: `1px solid ${colors.border}`, '&:last-child': { borderBottom: 'none' } }}>
      <Box sx={{ color: colors.primary, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
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
}

/* ── 프로필 카드 ── */
function ProfileCard({ data, photo, onPhotoChange }) {
  const inputRef = useRef(null);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '160px 1fr' },
        gap:  { xs: 3, sm: 4 },
        p:    { xs: 3, md: 4 },
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        backgroundColor: colors.bgSecondary,
        mb:   { xs: 4, md: 6 },
      }}
    >
      <Box>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onPhotoChange(URL.createObjectURL(file));
          }}
        />
        <Box
          onClick={() => inputRef.current?.click()}
          sx={{
            width: '100%', aspectRatio: '1 / 1', maxWidth: 160,
            mx: { xs: 'auto', sm: 0 }, borderRadius: 2.5,
            border: `2px dashed ${photo ? colors.primary : colors.border}`,
            backgroundColor: photo ? 'transparent' : `${colors.primary}08`,
            cursor: 'pointer', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
            transition: 'border-color 0.2s, background-color 0.2s',
            '&:hover': { borderColor: colors.primary, backgroundColor: `${colors.primary}12` },
          }}
        >
          {photo ? (
            <Box component="img" src={photo} alt="프로필 사진"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>
              <PersonIcon sx={{ fontSize: '2.5rem', color: colors.textMuted, opacity: 0.5 }} />
              <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.68rem', textAlign: 'center', px: 1 }}>
                클릭하여<br />사진 업로드
              </Typography>
            </>
          )}
        </Box>
        {photo && (
          <Typography onClick={() => inputRef.current?.click()} variant="caption"
            sx={{ display: 'block', textAlign: 'center', mt: 1, color: colors.textMuted,
                  cursor: 'pointer', fontSize: '0.72rem', '&:hover': { color: colors.primary } }}>
            사진 변경
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700,
                          fontSize: { xs: '1.8rem', md: '2rem' }, color: colors.textPrimary, mb: 2 }}>
          {data.name}
        </Typography>
        <InfoRow icon={<SchoolIcon sx={{ fontSize: '1rem' }} />} label="학력"   value={data.education}  />
        <InfoRow icon={<SchoolIcon sx={{ fontSize: '1rem' }} />} label="전공"   value={data.major}      />
        <InfoRow icon={<WorkIcon   sx={{ fontSize: '1rem' }} />} label="경력"   value={data.experience} />
      </Box>
    </Box>
  );
}

/* ── 콘텐츠 아코디언 ── */
function ContentAccordion({ sections }) {
  const [expanded, setExpanded] = useState('dev-story');
  const toggle = (id) => setExpanded((prev) => (prev === id ? false : id));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {sections.map((section) => (
        <Accordion
          key={section.id}
          expanded={expanded === section.id}
          onChange={() => toggle(section.id)}
          disableGutters elevation={0}
          sx={{
            border: `1px solid ${expanded === section.id ? colors.primary : colors.border}`,
            borderRadius: '12px !important', backgroundColor: colors.bgSecondary,
            overflow: 'hidden', transition: 'border-color 0.2s', '&::before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colors.textMuted }} />}
            sx={{ px: { xs: 2.5, md: 3 }, py: 0.5, minHeight: 56,
                  '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1.5, my: 1.5 } }}>
            <Typography sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600,
                               fontSize: '1rem', color: expanded === section.id ? colors.textPrimary : colors.textSecondary }}>
              {section.title}
            </Typography>
            {section.showInHome && (
              <Chip icon={<HomeIcon sx={{ fontSize: '0.75rem !important' }} />} label="홈 표시" size="small"
                sx={{ height: 22, fontSize: '0.65rem', fontWeight: 600,
                      backgroundColor: `${colors.primary}20`, color: colors.primary,
                      border: `1px solid ${colors.primary}40`, '& .MuiChip-icon': { color: colors.primary, ml: '6px' } }} />
            )}
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 2.5, md: 3 }, pt: 0, pb: 3 }}>
            <Box sx={{ borderTop: `1px solid ${colors.border}`, pt: 2.5 }}>
              <Typography variant="body1"
                sx={{ color: colors.textSecondary, lineHeight: 1.95, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                {section.content}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

/* ── 스킬 카드 (진행 바 + 툴팁) ── */
function SkillCard({ skill, visible, index }) {
  const meta = CATEGORY_META[skill.category] ?? CATEGORY_META.Tools;

  return (
    <Tooltip
      title={skill.desc || ''}
      placement="top"
      arrow
      disableHoverListener={!skill.desc}
      componentsProps={{
        tooltip: {
          sx: { backgroundColor: colors.primaryDark, fontSize: '0.75rem',
                '.MuiTooltip-arrow': { color: colors.primaryDark } },
        },
      }}
    >
      <Box
        sx={{
          p: 2.5, borderRadius: 2.5, border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgSecondary, cursor: skill.desc ? 'help' : 'default',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:hover': { borderColor: meta.color, boxShadow: `0 4px 20px ${meta.color}25` },
        }}
      >
        {/* 헤더: 아이콘 + 이름 + 퍼센트 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Typography sx={{ fontSize: '1.3rem', lineHeight: 1 }}>{skill.icon}</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: colors.textPrimary }}>
              {skill.name}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: meta.color }}>
            {skill.level}%
          </Typography>
        </Box>

        {/* 진행 바 */}
        <Box sx={{ height: 5, borderRadius: 3, backgroundColor: `${meta.color}20`, mb: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              height: '100%', borderRadius: 3,
              backgroundColor: meta.color,
              width: visible ? `${skill.level}%` : '0%',
              transition: `width 0.85s cubic-bezier(0.4, 0, 0.2, 1) ${index * 70}ms`,
            }}
          />
        </Box>

        {/* 카테고리 칩 + showInMain 뱃지 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ px: 1.2, py: 0.35, borderRadius: 20, backgroundColor: meta.bg,
                     color: meta.color, fontSize: '0.65rem', fontWeight: 600 }}>
            {skill.category}
          </Box>
          {skill.showInMain && (
            <Tooltip title="홈 스킬 섹션에 표시" arrow>
              <HomeIcon sx={{ fontSize: '0.9rem', color: colors.textMuted, opacity: 0.6 }} />
            </Tooltip>
          )}
        </Box>
      </Box>
    </Tooltip>
  );
}

/* ── 스킬 추가 다이얼로그 ── */
const BLANK_FORM = { icon: '🔵', name: '', category: 'Frontend', level: 50, desc: '', showInMain: false };

function AddSkillDialog({ open, onClose, onAdd, existingNames }) {
  const [form, setForm] = useState(BLANK_FORM);

  const notAdded = AVAILABLE_SKILLS.filter((s) => !existingNames.includes(s.name));

  const fill = (s) => setForm((prev) => ({ ...prev, icon: s.icon, name: s.name, category: s.category, desc: s.desc }));

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, name: form.name.trim(), id: Date.now() });
    setForm(BLANK_FORM);
    onClose();
  };

  const handleClose = () => { setForm(BLANK_FORM); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: 3, backgroundColor: colors.bgSecondary, backgroundImage: 'none' } }}>
      <DialogTitle sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700,
                          fontSize: '1.2rem', color: colors.textPrimary, pb: 1 }}>
        스킬 추가
      </DialogTitle>

      <DialogContent sx={{ pt: '8px !important' }}>
        {/* 추천 스킬 빠른 추가 */}
        {notAdded.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.72rem',
                                                 display: 'block', mb: 1.5, letterSpacing: 1 }}>
              추천 기술 (클릭하면 폼에 자동 입력)
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {notAdded.map((s) => (
                <Box
                  key={s.name}
                  onClick={() => fill(s)}
                  sx={{
                    px: 1.5, py: 0.6, borderRadius: 20, cursor: 'pointer',
                    border: `1px solid ${colors.border}`,
                    backgroundColor: form.name === s.name ? `${colors.primary}20` : 'transparent',
                    borderColor:     form.name === s.name ? colors.primary : colors.border,
                    color: colors.textSecondary, fontSize: '0.78rem', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 0.6,
                    transition: 'all 0.15s',
                    '&:hover': { borderColor: colors.primary, backgroundColor: `${colors.primary}12` },
                  }}
                >
                  <span>{s.icon}</span> {s.name}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ borderTop: `1px solid ${colors.border}`, pt: 2.5,
                   display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* 아이콘 + 기술명 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 1.5 }}>
            <TextField
              label="아이콘"
              value={form.icon}
              onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
              size="small"
              inputProps={{ style: { fontSize: '1.2rem', textAlign: 'center' } }}
              sx={fieldSx}
            />
            <TextField
              label="기술명"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              size="small"
              placeholder="예) TypeScript"
              sx={fieldSx}
            />
          </Box>

          {/* 카테고리 */}
          <FormControl size="small" sx={fieldSx}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={form.category}
              label="카테고리"
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            >
              {Object.keys(CATEGORY_META).map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 숙련도 슬라이더 */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.75rem' }}>
                숙련도
              </Typography>
              <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 700, fontSize: '0.8rem' }}>
                {form.level}%
              </Typography>
            </Box>
            <Slider
              value={form.level}
              onChange={(_, v) => setForm((p) => ({ ...p, level: v }))}
              min={0} max={100} step={5}
              sx={{
                color: CATEGORY_META[form.category]?.color ?? colors.primary,
                '& .MuiSlider-thumb': { width: 14, height: 14 },
                '& .MuiSlider-rail': { opacity: 0.25 },
              }}
            />
          </Box>

          {/* 설명 (선택) */}
          <TextField
            label="간단한 설명 (선택)"
            value={form.desc}
            onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))}
            size="small"
            placeholder="예) ES6+ 문법과 DOM 조작에 익숙합니다."
            sx={fieldSx}
          />

          {/* 홈 표시 여부 */}
          <FormControlLabel
            control={
              <Switch
                checked={form.showInMain}
                onChange={(e) => setForm((p) => ({ ...p, showInMain: e.target.checked }))}
                size="small"
                sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: colors.primary },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: colors.primary } }}
              />
            }
            label={
              <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.8rem' }}>
                홈 스킬 섹션에 표시
              </Typography>
            }
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={handleClose} variant="text"
          sx={{ color: colors.textMuted, '&:hover': { backgroundColor: `${colors.primary}10` } }}>
          취소
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!form.name.trim()}
          variant="contained"
          sx={{ backgroundColor: colors.primaryDark, color: '#f5ede3', px: 3, borderRadius: 1.5,
                '&:hover': { backgroundColor: colors.primary }, '&.Mui-disabled': { opacity: 0.4 } }}
        >
          추가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    '& fieldset':         { borderColor: colors.border },
    '&:hover fieldset':   { borderColor: colors.primary },
    '&.Mui-focused fieldset': { borderColor: colors.primary },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: colors.primary },
};

/* ── 스킬 섹션 ── */
function SkillsSection({ skills, onAdd }) {
  const [sectionRef, sectionVisible] = useFadeIn(0.08);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [sortByLevel, setSortByLevel] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  const categories = ['전체', ...Object.keys(CATEGORY_META).filter((c) =>
    skills.some((s) => s.category === c),
  )];

  const filtered = activeCategory === '전체' ? skills : skills.filter((s) => s.category === activeCategory);
  const sorted = sortByLevel
    ? [...filtered].sort((a, b) => b.level - a.level)
    : filtered;

  const existingNames = skills.map((s) => s.name);

  return (
    <>
      <Box ref={sectionRef} sx={{ mt: { xs: 7, md: 10 } }}>
        {/* 섹션 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                   flexWrap: 'wrap', gap: 2, mb: 3.5 }}>
          <Box>
            <Typography variant="overline"
              sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.68rem', display: 'block', mb: 0.5 }}>
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
                onClick={() => setSortByLevel((p) => !p)}
                size="small"
                startIcon={<SortIcon sx={{ fontSize: '1rem !important' }} />}
                sx={{
                  color: sortByLevel ? colors.primary : colors.textMuted,
                  borderColor: sortByLevel ? colors.primary : colors.border,
                  border: '1px solid',
                  borderRadius: 1.5, px: 1.8, fontSize: '0.75rem', fontWeight: 600,
                  '&:hover': { backgroundColor: `${colors.primary}10`, borderColor: colors.primary },
                }}
              >
                {sortByLevel ? '숙련도순' : '등록순'}
              </Button>
            </Tooltip>
            <Button
              onClick={() => setAddOpen(true)}
              size="small"
              startIcon={<AddIcon sx={{ fontSize: '1rem !important' }} />}
              variant="contained"
              sx={{ backgroundColor: colors.primaryDark, color: '#f5ede3',
                    borderRadius: 1.5, px: 1.8, fontSize: '0.75rem', fontWeight: 600,
                    '&:hover': { backgroundColor: colors.primary } }}
            >
              스킬 추가
            </Button>
          </Box>
        </Box>

        {/* 카테고리 필터 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat];
            const active = activeCategory === cat;
            return (
              <Box
                key={cat}
                onClick={() => setActiveCategory(cat)}
                sx={{
                  px: 1.8, py: 0.5, borderRadius: 20, cursor: 'pointer',
                  border: `1px solid ${active ? (meta?.color ?? colors.primary) : colors.border}`,
                  backgroundColor: active ? (meta?.bg ?? `${colors.primary}18`) : 'transparent',
                  color: active ? (meta?.color ?? colors.primary) : colors.textMuted,
                  fontSize: '0.75rem', fontWeight: active ? 700 : 500,
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: meta?.color ?? colors.primary, color: meta?.color ?? colors.primary },
                }}
              >
                {cat === '전체' ? `전체 (${skills.length})` : `${cat} (${skills.filter(s => s.category === cat).length})`}
              </Box>
            );
          })}
        </Box>

        {/* 스킬 카드 그리드 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {sorted.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} visible={sectionVisible} index={i} />
          ))}
        </Box>

        {/* 요약 정보 */}
        <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px solid ${colors.border}`,
                   display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {Object.keys(CATEGORY_META)
            .filter((c) => skills.some((s) => s.category === c))
            .map((c) => {
              const meta = CATEGORY_META[c];
              const count = skills.filter((s) => s.category === c).length;
              const avg = Math.round(skills.filter((s) => s.category === c).reduce((a, s) => a + s.level, 0) / count);
              return (
                <Box key={c} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: meta.color, flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.72rem' }}>
                    {c} {count}개 · 평균 {avg}%
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </Box>

      <AddSkillDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={onAdd}
        existingNames={existingNames}
      />
    </>
  );
}

/* ── About Me 페이지 ── */
export default function AboutMe() {
  const [data]   = useState(aboutMeData);
  const [photo, setPhoto]   = useState(data.basicInfo.photo);
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  const handleAddSkill = (newSkill) => setSkills((prev) => [...prev, newSkill]);

  return (
    <Box component="main" sx={{ minHeight: '100vh', backgroundColor: colors.bgPrimary }}>

      {/* 페이지 히어로 */}
      <Box
        sx={{
          pt: { xs: 16, md: 20 }, pb: { xs: 6, md: 8 }, px: { xs: 2, md: 4 },
          borderBottom: `1px solid ${colors.border}`,
          background: `radial-gradient(ellipse at 80% 40%, ${colors.accent}30 0%, ${colors.bgPrimary} 60%)`,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="overline"
            sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600, display: 'block', mb: 2 }}>
            About Me
          </Typography>
          <Typography variant="h1"
            sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.6rem', md: '3.6rem' } }}>
            안녕하세요,<br />김재우입니다
          </Typography>
        </Container>
      </Box>

      {/* 본문 */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">

          <ProfileCard data={data.basicInfo} photo={photo} onPhotoChange={setPhoto} />

          <Typography variant="overline"
            sx={{ color: colors.textMuted, letterSpacing: 4, fontSize: '0.68rem', display: 'block', mb: 2.5 }}>
            이야기
          </Typography>
          <ContentAccordion sections={data.sections} />

          <SkillsSection skills={skills} onAdd={handleAddSkill} />

        </Container>
      </Box>
    </Box>
  );
}
