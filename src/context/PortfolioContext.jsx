import { createContext, useContext, useState } from 'react';

/* ── 초기 데이터 (단일 진실 공급원) ── */
const INITIAL_DATA = {
  basicInfo: {
    name:       '김재우',
    education:  '울산과학대학교 건축과 중퇴',
    major:      '실내인테리어',
    experience: '신입',
    photo:      `${import.meta.env.BASE_URL}profile.jpg`,
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
  skills: [
    { id: 1, icon: '🔶', name: 'HTML',        level: 80, category: 'Frontend',  showInMain: true,  desc: '시맨틱 마크업과 웹 표준을 이해하고 있습니다.' },
    { id: 2, icon: '🎨', name: 'CSS',         level: 75, category: 'Frontend',  showInMain: true,  desc: 'Flexbox, Grid, 반응형 디자인을 활용합니다.' },
    { id: 3, icon: '⚡', name: 'JavaScript',  level: 70, category: 'Frontend',  showInMain: true,  desc: 'ES6+ 문법과 DOM 조작에 익숙합니다.' },
    { id: 4, icon: '⚛️', name: 'React',       level: 60, category: 'Framework', showInMain: true,  desc: '컴포넌트 기반 UI 개발을 학습 중입니다.' },
    { id: 5, icon: '🎯', name: 'Figma',       level: 65, category: 'Design',    showInMain: true,  desc: 'UI/UX 프로토타이핑과 디자인 시스템 구성.' },
  ],
};

/* ── Context ── */
const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState(INITIAL_DATA);

  /* 홈 섹션용 파생 데이터 */
  const getHomeData = () => {
    const homeContent = aboutMeData.sections
      .filter((s) => s.showInHome)
      .map((s) => ({
        id:      s.id,
        title:   s.title,
        summary: s.content.length > 120
          ? s.content.substring(0, 120) + '…'
          : s.content,
      }));

    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4);

    return { content: homeContent, skills: topSkills, basicInfo: aboutMeData.basicInfo };
  };

  /* 스킬 추가 */
  const addSkill = (skill) =>
    setAboutMeData((p) => ({ ...p, skills: [...p.skills, skill] }));

  /* 프로필 사진 업데이트 (AboutMe → 홈 즉시 반영) */
  const updatePhoto = (photo) =>
    setAboutMeData((p) => ({ ...p, basicInfo: { ...p.basicInfo, photo } }));

  return (
    <PortfolioContext.Provider value={{ aboutMeData, setAboutMeData, getHomeData, addSkill, updatePhoto }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return ctx;
}
