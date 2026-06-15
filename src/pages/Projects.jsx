import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { colors } from '../theme/theme';

const PROJECTS = [
  {
    title:    'Game Community',
    subtitle: '게이머를 위한 커뮤니티 플랫폼',
    desc:     '넥슨 게임 18종을 아우르는 커뮤니티 플랫폼입니다. 게임별 게시판, 댓글·좋아요 시스템, 스토어 카테고리 및 가격 필터, 게임별 색상 앰비언트 다크 테마를 구현했습니다. Supabase RLS(행 수준 보안)를 적용하여 인증된 사용자만 게시물을 작성할 수 있도록 설계했습니다.',
    tech:     ['React', 'Supabase', 'MUI', 'GitHub Pages'],
    role:     '기획 · 디자인 · 개발 · 배포 (1인)',
    github:   'https://github.com/wmr102095-cloud/my-first-website',
    live:     'https://wmr102095-cloud.github.io/my-first-website/',
    icon:     '🎮',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    points:   ['넥슨 게임 18종 데이터 구성 및 커뮤니티 분리', '스토어 카테고리·가격 필터 기능', '게시물 상세 배경 게임 색상 앰비언트 처리', 'Supabase RLS 기반 인증 보안'],
  },
  {
    title:    'Mini SNS',
    subtitle: '친구와 연결되는 소셜 네트워크',
    desc:     '친구 추가, 팔로우, 1:1 DM이 가능한 소셜 네트워크 앱입니다. Supabase 실시간 구독을 활용해 메시지를 즉시 수신하고, 친구 요청 시스템과 대화 목록 UI를 구현했습니다. Playwright를 활용한 E2E 검증도 진행했습니다.',
    tech:     ['React', 'Supabase', '실시간 구독', 'Playwright'],
    role:     '기획 · 디자인 · 개발 · 배포 (1인)',
    github:   'https://github.com/wmr102095-cloud/my-first-website',
    live:     'https://wmr102095-cloud.github.io/my-first-website/mini_sns/',
    icon:     '💬',
    gradient: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
    points:   ['Supabase 실시간 구독으로 즉시 메시지 수신', '친구 요청·수락·거절 시스템', '대화 목록 및 1:1 DM UI', 'Playwright E2E 테스트 검증'],
  },
  {
    title:    'Portfolio',
    subtitle: '이 포트폴리오 사이트',
    desc:     '이 포트폴리오 사이트입니다. 타이핑 애니메이션, 스크롤 페이드인, 매거진형 레이아웃을 직접 설계했습니다. Supabase 방명록으로 방문자와 소통할 수 있으며, GitHub Actions를 통해 자동 배포됩니다.',
    tech:     ['React', 'Vite', 'MUI', 'Supabase', 'GitHub Pages'],
    role:     '기획 · 디자인 · 개발 · 배포 (1인)',
    github:   'https://github.com/wmr102095-cloud/my-portfolio',
    live:     'https://wmr102095-cloud.github.io/my-portfolio/',
    icon:     '🗂️',
    gradient: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.accent} 100%)`,
    points:   ['타이핑 애니메이션 (useEffect 기반)', '스크롤 페이드인 (IntersectionObserver)', 'Supabase 방명록 (이름·이모지·별점)', 'GitHub Actions 자동 배포'],
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap:     { xs: 0, md: 6 },
        py:      { xs: 6, md: 8 },
        borderTop: `1px solid ${colors.border}`,
        alignItems: 'center',
      }}
    >
      {/* 썸네일 (짝수 인덱스는 왼쪽, 홀수는 오른쪽) */}
      <Box sx={{ order: { xs: 0, md: isEven ? 0 : 1 } }}>
        <Box
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => window.open(project.live, '_blank', 'noopener noreferrer')}
          sx={{
            height:     { xs: 200, md: 260 },
            borderRadius: 3,
            background: project.gradient,
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor:     'pointer',
            position:   'relative',
            overflow:   'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            transform:  hovered ? 'scale(1.02)' : 'scale(1)',
            boxShadow:  hovered ? `0 16px 40px ${colors.primaryDark}25` : 'none',
            mb:         { xs: 4, md: 0 },
          }}
        >
          <Typography sx={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
            {project.icon}
          </Typography>
          <Box
            sx={{
              position:   'absolute',
              inset:      0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity:    hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: 3 }}>
              VISIT SITE ↗
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 텍스트 */}
      <Box sx={{ order: { xs: 1, md: isEven ? 1 : 0 } }}>
        <Typography
          variant="overline"
          sx={{ color: colors.primary, letterSpacing: 4, fontSize: '0.68rem', fontWeight: 600, display: 'block', mb: 1.5 }}
        >
          {project.role}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize:   { xs: '1.8rem', md: '2.2rem' },
            color:      colors.textPrimary,
            lineHeight: 1.2,
            mb:         0.5,
          }}
        >
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, mb: 2.5 }}>
          {project.subtitle}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textSecondary, lineHeight: 1.85, fontSize: '0.92rem', mb: 3 }}>
          {project.desc}
        </Typography>

        {/* 구현 포인트 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3.5 }}>
          {project.points.map((pt) => (
            <Box key={pt} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.primary, flexShrink: 0 }} />
              <Typography variant="caption" sx={{ color: colors.textMuted, fontSize: '0.82rem', lineHeight: 1.6 }}>
                {pt}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* 태그 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3.5 }}>
          {project.tech.map((t) => (
            <Box
              key={t}
              sx={{
                px: 1.5, py: 0.4,
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

        {/* 링크 버튼 */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => window.open(project.live, '_blank', 'noopener noreferrer')}
            sx={{
              backgroundColor: colors.primaryDark,
              color: '#f5ede3',
              px: 2.5, py: 1,
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: 1.5,
              '&:hover': { backgroundColor: colors.primary },
            }}
          >
            Live ↗
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => window.open(project.github, '_blank', 'noopener noreferrer')}
            sx={{
              borderColor: colors.border,
              color:       colors.textSecondary,
              px: 2.5, py: 1,
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: 1.5,
              '&:hover': { borderColor: colors.primary, color: colors.primary, backgroundColor: `${colors.primary}10` },
            }}
          >
            GitHub
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function Projects() {
  return (
    <Box component="main" sx={{ minHeight: '100vh', backgroundColor: colors.bgPrimary }}>

      {/* 페이지 히어로 */}
      <Box
        sx={{
          pt:         { xs: 16, md: 20 },
          pb:         { xs: 6,  md: 8  },
          px:         { xs: 2,  md: 4  },
          borderBottom: `1px solid ${colors.border}`,
          background: `radial-gradient(ellipse at 20% 60%, ${colors.accent}33 0%, ${colors.bgPrimary} 60%)`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: colors.primary, letterSpacing: 5, fontSize: '0.68rem', fontWeight: 600, display: 'block', mb: 3 }}
          >
            Projects
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Typography
              variant="h1"
              sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: { xs: '2.8rem', md: '4rem' } }}
            >
              직접 만든<br />것들
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.textMuted, maxWidth: 340, lineHeight: 1.9, fontSize: '0.92rem', pb: 0.5 }}
            >
              설계부터 배포까지 혼자 기획하고 개발한<br />
              프로젝트 {PROJECTS.length}개입니다.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* 프로젝트 목록 */}
      <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </Container>
      </Box>

    </Box>
  );
}
