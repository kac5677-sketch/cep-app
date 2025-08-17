import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// ------------------------------------------------------------
// CEP Profile Self-Assessment Web App (Single-file React)
// Landing (Logo + Theory) → 3 Steps: Color (25) → Energy (20) → Style (6) → Result
// - Mobile & Desktop responsive
// - Instant results, explanations, charts, copy-to-clipboard
// - Tailwind-friendly classes (optional)
// ------------------------------------------------------------

export default function App() {
  const [step, setStep] = useState(0); // 0: Landing, 1: Color, 2: Energy, 3: Style, 4: Result
  const [showTheory, setShowTheory] = useState(true);

  // ---------------------------
  // BRAND / TEXTS
  // ---------------------------
  const subtitle = "Find Your Color, Flow Your Energy";
  const academicSubtitle = "Color · Energy · Style 기반 성향 진단";

  // ---------------------------
  // 1) COLOR (25 items / 5 each)
  // ---------------------------
  const colorBlocks = [
    { key: "Green", label: "Green", color: "#2ECC71" },
    { key: "Red", label: "Red", color: "#E74C3C" },
    { key: "Brown", label: "Brown", color: "#8B5E3C" },
    { key: "Silver", label: "Silver", color: "#BDC3C7" },
    { key: "Blue", label: "Blue", color: "#3498DB" },
  ];

  const colorQuestions: string[] = [
    // Green 1-5
    "새로운 아이디어를 떠올리고 시도하는 것이 즐겁다.",
    "사람들과 네트워킹하며 기회를 만든다.",
    "반복적이고 똑같은 업무를 하면 쉽게 지루해진다.",
    "기존 규칙보다 새로운 시도를 더 선호한다.",
    "나의 성장과 팀의 성장을 연결한다.",
    // Red 6-10
    "내 에너지가 팀 분위기를 바꾸는 경우가 많다.",
    "목표가 주어지면 일단 행동부터 시작한다.",
    "성과와 인정이 나의 동기를 크게 높인다.",
    "속도를 내서 일을 마무리할 때 보람을 느낀다.",
    "무언가를 발표하거나 앞에 서는 일이 잘 맞는다.",
    // Brown 11-15
    "갑작스러운 변화보다 안정된 환경에서 일하는 게 좋다.",
    "갈등 상황에서 중재자 역할을 자주 맡는다.",
    "체계와 절차를 지키며 일을 처리한다.",
    "리스크를 미리 고려하고 대비한다.",
    "꾸준히 반복하는 일에서도 성실하다.",
    // Silver 16-20
    "작은 실수나 오류를 잘 발견한다.",
    "규칙과 원칙이 있어야 안심된다.",
    "품질과 정확성을 유지하는 게 강점이다.",
    "세부 데이터를 다루는 일을 선호한다.",
    "기준에 맞지 않으면 지적해야 속이 편하다.",
    // Blue 21-25
    "자료를 분석하고 정보를 정리하는 게 즐겁다.",
    "일을 시작하기 전, 전체 그림을 설계한다.",
    "새로운 지식을 배우고 축적하는 데 흥미가 많다.",
    "장기적인 관점에서 전략을 세우는 게 잘 맞는다.",
    "실행보다 분석과 계획을 더 오래 한다.",
  ];

  const [colorAnswers, setColorAnswers] = useState<number[]>(Array(25).fill(0));

  // ---------------------------
  // 2) ENERGY (20 items / 4×5)
  // ---------------------------
  const energyStages = [
    { key: "Rising", label: "Rising", icon: "🌱" },
    { key: "Peak", label: "Peak", icon: "☀️" },
    { key: "Harvest", label: "Harvest", icon: "🍂" },
    { key: "Deep", label: "Deep", icon: "❄️" },
  ];

  const energyQuestions: string[] = [
    // Rising 1-5
    "새로운 일을 시작할 때 설레고 에너지가 난다.",
    "시도하지 않은 방법을 먼저 해보는 편이다.",
    "변화를 두려워하기보다 기회로 여긴다.",
    "초기 단계에서 방향을 잡는 것을 잘한다.",
    "아직 결과가 불확실해도 실행해보는 편이다.",
    // Peak 6-10
    "속도를 내어 일을 밀어붙일 때 가장 집중된다.",
    "경쟁 상황이 있으면 더 동기부여가 된다.",
    "성과와 결과물이 눈에 보일 때 큰 보람을 느낀다.",
    "내가 나서서 추진할 때 일이 잘 굴러간다.",
    "한 번 몰입하면 단기간에 큰 성과를 낼 수 있다.",
    // Harvest 11-15
    "마무리와 완성도를 높이는 데 강하다.",
    "과정에서 나온 결과를 정리·평가하는 것이 즐겁다.",
    "기준과 원칙에 맞게 다듬는 것을 선호한다.",
    "다른 사람의 성과를 평가하고 피드백 주는 편이다.",
    "일의 완성도를 확인하고 개선점을 찾는다.",
    // Deep 16-20
    "새로운 아이디어보다는 기존 것을 심화시키는 편이다.",
    "자료를 깊이 탐구하고 분석하는 데 시간을 쓴다.",
    "눈에 띄지 않아도 조용히 준비하고 쌓아가는 것을 선호한다.",
    "장기적인 안목으로 기반을 다지는 것을 좋아한다.",
    "실행보다 리서치·준비 과정에서 만족을 느낀다.",
  ];
  const [energyAnswers, setEnergyAnswers] = useState<number[]>(Array(20).fill(0));

  // ---------------------------
  // 3) STYLE (6 items)
  // ---------------------------
  const styleQuestions: { text: string; type: "Expressive" | "Reflective" }[] = [
    { text: "회의에서 적극적으로 발언하는 편이다.", type: "Expressive" },
    { text: "내 의견을 빠르게 드러내는 편이다.", type: "Expressive" },
    { text: "다른 사람의 말을 충분히 듣고 난 뒤 말한다.", type: "Reflective" },
    { text: "눈에 띄는 행동보다 관찰과 분석을 선호한다.", type: "Reflective" },
    { text: "중요한 상황에서 결정을 신속히 내린다.", type: "Expressive" },
    { text: "결정하기 전에 충분히 자료를 모으고 고민한다.", type: "Reflective" },
  ];
  const [styleAnswers, setStyleAnswers] = useState<number[]>(Array(6).fill(0));

  // ---------------------------
  // SCORING
  // ---------------------------
  const colorScores = useMemo(() => {
    const blockSums = [0, 0, 0, 0, 0];
    for (let i = 0; i < 25; i++) {
      const block = Math.floor(i / 5); // 0..4
      blockSums[block] += colorAnswers[i] || 0;
    }
    return {
      Green: blockSums[0],
      Red: blockSums[1],
      Brown: blockSums[2],
      Silver: blockSums[3],
      Blue: blockSums[4],
    };
  }, [colorAnswers]);

  const energyScores = useMemo(() => {
    const sums = [0, 0, 0, 0];
    for (let i = 0; i < 20; i++) {
      const block = Math.floor(i / 5); // 0..3
      sums[block] += energyAnswers[i] || 0;
    }
    return { Rising: sums[0], Peak: sums[1], Harvest: sums[2], Deep: sums[3] };
  }, [energyAnswers]);

  const styleScores = useMemo(() => {
    let expressive = 0,
      reflective = 0;
    styleAnswers.forEach((v, idx) => {
      const type = styleQuestions[idx].type;
      if (type === "Expressive") expressive += v || 0;
      else reflective += v || 0;
    });
    return { Expressive: expressive, Reflective: reflective };
  }, [styleAnswers]);

  const topColor = useMemo(() => {
    const entries = Object.entries(colorScores);
    return entries.sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  }, [colorScores]);

  const topEnergy = useMemo(() => {
    const entries = Object.entries(energyScores);
    return entries.sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  }, [energyScores]);

  const topStyle = useMemo(
    () => (styleScores.Expressive >= styleScores.Reflective ? "Expressive" : "Reflective"),
    [styleScores]
  );

  // ---------------------------
  // EXPLANATIONS
  // ---------------------------
  const colorExplains: Record<string, { keyword: string; strengths: string[]; cautions: string[] }> = {
    Green: {
      keyword: "성장·확장·연결",
      strengths: ["기회 발굴", "네트워킹", "빠른 시범 실행"],
      cautions: ["마무리 약함", "산만함"],
    },
    Red: {
      keyword: "열정·동기·퍼포먼스",
      strengths: ["실행력", "동기부여", "분위기 촉발"],
      cautions: ["번아웃 위험", "디테일 누락"],
    },
    Brown: {
      keyword: "안정·운영·균형",
      strengths: ["체계", "리스크 관리", "신뢰성"],
      cautions: ["변화 저항", "유연성 부족"],
    },
    Silver: {
      keyword: "기준·규범·정밀",
      strengths: ["오류 탐지", "품질 보장", "규정 준수"],
      cautions: ["완벽주의", "경직성"],
    },
    Blue: {
      keyword: "통찰·전략·학습",
      strengths: ["분석력", "장기 시야", "지식 축적"],
      cautions: ["실행 지연", "과분석"],
    },
  };

  const energyExplains: Record<string, { desc: string; tips: string[] }> = {
    Rising: { desc: "시작·개척의 에너지", tips: ["빠른 실험", "방향 설정", "새로운 접근 환영"] },
    Peak: { desc: "실행·정점의 에너지", tips: ["속도/성과", "짧고 명확한 목표", "추진"] },
    Harvest: { desc: "정리·평가의 에너지", tips: ["완성도 개선", "표준화", "피드백"] },
    Deep: { desc: "분석·축적의 에너지", tips: ["리서치", "장기 설계", "기반 다지기"] },
  };

  const typeOneLiners: Record<string, string> = {
    // Green
    "Green|Rising|Expressive": "개척자: 아이디어를 외부로 퍼뜨리는 개척형",
    "Green|Rising|Reflective": "탐색자: 조용히 기회를 살피는 탐색형",
    "Green|Peak|Expressive": "도전자: 실행과 확장을 밀어붙이는 도전자형",
    "Green|Peak|Reflective": "조율자: 협력 속에서 균형을 잡는 조율자형",
    "Green|Harvest|Expressive": "전략가: 성과를 정리하고 방향을 제시",
    "Green|Harvest|Reflective": "관리자: 안정적 관계와 성과를 유지",
    "Green|Deep|Expressive": "탐험가: 미지의 영역을 개척",
    "Green|Deep|Reflective": "연구자: 지식을 차분히 쌓아 성장 기반 마련",
    // Red
    "Red|Rising|Expressive": "점화자: 열정으로 주변을 끌어올림",
    "Red|Rising|Reflective": "촉진자: 조심스럽게 분위기를 살림",
    "Red|Peak|Expressive": "퍼포머: 속도/성과 극대화",
    "Red|Peak|Reflective": "전문화: 집중력으로 세밀하게 완성",
    "Red|Harvest|Expressive": "리더: 성과 평가/정리하며 팀 이끎",
    "Red|Harvest|Reflective": "코치: 지원과 동기부여 제공",
    "Red|Deep|Expressive": "혁신가: 숨은 불씨를 발화해 돌파",
    "Red|Deep|Reflective": "영감가: 내적 통찰로 비전 전달",
    // Brown
    "Brown|Rising|Expressive": "정립자: 새 판을 짜고 질서를 구축",
    "Brown|Rising|Reflective": "준비자: 신중히 기반을 다지며 출발",
    "Brown|Peak|Expressive": "운영자: 추진력으로 실행 프로세스 관리",
    "Brown|Peak|Reflective": "최적자: 절차 개선으로 효율 향상",
    "Brown|Harvest|Expressive": "관리자: 리스크 통제/안정적 성과",
    "Brown|Harvest|Reflective": "감사자: 세밀 점검과 절차 완성도",
    "Brown|Deep|Expressive": "플래너: 장기 프로젝트 설계 주도",
    "Brown|Deep|Reflective": "안정자: 신뢰 기반의 버팀목",
    // Silver
    "Silver|Rising|Expressive": "설계자: 구조와 규칙을 제정",
    "Silver|Rising|Reflective": "관찰자: 세밀히 지켜보며 규범 점검",
    "Silver|Peak|Expressive": "분석가: 데이터 검증과 기준 실행",
    "Silver|Peak|Reflective": "품질자: 정밀하게 과정 관리",
    "Silver|Harvest|Expressive": "표준가: 기준/원칙 확립",
    "Silver|Harvest|Reflective": "감별자: 차이를 가려내고 평가",
    "Silver|Deep|Expressive": "체계자: 장기적 시스템/구조 마련",
    "Silver|Deep|Reflective": "기준자: 내적 원칙으로 신뢰 구축",
    // Blue
    "Blue|Rising|Expressive": "번역자: 지식을 연결하고 확산",
    "Blue|Rising|Reflective": "탐구자: 자료 수집과 학습 몰입",
    "Blue|Peak|Expressive": "실행가: 전략을 현실화/추진",
    "Blue|Peak|Reflective": "설계자: 집중적으로 구조/프로세스 설계",
    "Blue|Harvest|Expressive": "통찰가: 결과 평가와 미래 제시",
    "Blue|Harvest|Reflective": "시스템자: 지식 정리/데이터 관리",
    "Blue|Deep|Expressive": "비전가: 장기 전략과 혁신 방향 제시",
    "Blue|Deep|Reflective": "리서처: 깊이 있는 분석/연구",
  };

  const resultKey = `${topColor}|${topEnergy}|${topStyle}`;
  const oneLiner = typeOneLiners[resultKey] || "문항을 모두 완료해주세요.";

  // ---------------------------
  // Helpers
  // ---------------------------
  const allAnsweredColor = colorAnswers.every((v) => v > 0);
  const allAnsweredEnergy = energyAnswers.every((v) => v > 0);
  const allAnsweredStyle = styleAnswers.every((v) => v > 0);

  const barDataColors = [
    { name: "Green", value: colorScores.Green },
    { name: "Red", value: colorScores.Red },
    { name: "Brown", value: colorScores.Brown },
    { name: "Silver", value: colorScores.Silver },
    { name: "Blue", value: colorScores.Blue },
  ];

  const radarDataEnergy = [
    { stage: "Rising", value: energyScores.Rising },
    { stage: "Peak", value: energyScores.Peak },
    { stage: "Harvest", value: energyScores.Harvest },
    { stage: "Deep", value: energyScores.Deep },
  ];

  const barDataStyle = [
    { name: "Expressive", value: styleScores.Expressive },
    { name: "Reflective", value: styleScores.Reflective },
  ];

  const copySummary = async () => {
    const summary = `CEP Profile

- Color(본질): ${topColor} (${colorExplains[topColor]?.keyword || ""})
- Energy(에너지 단계): ${topEnergy} (${energyExplains[topEnergy]?.desc || ""})
- Style(소통): ${topStyle}

한 줄 요약: ${oneLiner}

점수표
- Color: Green ${colorScores.Green}, Red ${colorScores.Red}, Brown ${colorScores.Brown}, Silver ${colorScores.Silver}, Blue ${colorScores.Blue}
- Energy: Rising ${energyScores.Rising}, Peak ${energyScores.Peak}, Harvest ${energyScores.Harvest}, Deep ${energyScores.Deep}
- Style: Expressive ${styleScores.Expressive}, Reflective ${styleScores.Reflective}`;
    try {
      await navigator.clipboard.writeText(summary);
      alert("결과 요약을 클립보드에 복사했어요!");
    } catch (e) {
      alert("복사 권한을 허용하거나 수동으로 복사해주세요.");
    }
  };

  const resetAll = () => {
    setColorAnswers(Array(25).fill(0));
    setEnergyAnswers(Array(20).fill(0));
    setStyleAnswers(Array(6).fill(0));
    setStep(0);
  };

  // ---------------------------
  // UI Components
  // ---------------------------
  const StepHeader = () => (
    <div className="w-full max-w-5xl mx-auto mt-6 mb-4 px-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-extrabold tracking-tight">CEP Profile</div>
        <div className="text-xs md:text-sm opacity-70">{subtitle}</div>
      </div>
      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${Math.max(0, step - 1) * (100 / 3)}%` }}
        />
      </div>
      <div className="flex gap-2 text-xs md:text-sm mt-1 opacity-70">
        <span className={step === 1 ? "font-semibold" : ""}>1. 컬러</span>
        <span>·</span>
        <span className={step === 2 ? "font-semibold" : ""}>2. 에너지</span>
        <span>·</span>
        <span className={step === 3 ? "font-semibold" : ""}>3. 스타일</span>
      </div>
    </div>
  );

  const Likert = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
    <div className="flex gap-2 items-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          className={`w-9 h-9 rounded-full border text-sm flex items-center justify-center ${
            value === n ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => onChange(n)}
          aria-label={`${n}점`}
        >
          {n}
        </button>
      ))}
    </div>
  );

  const Question = ({
    idx,
    text,
    value,
    onChange,
  }: {
    idx: number;
    text: string;
    value: number;
    onChange: (v: number) => void;
  }) => (
    <div className="p-4 rounded-2xl border bg-white flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="text-sm md:text-base pr-4">
        <span className="font-semibold mr-2">{idx + 1}.</span>
        {text}
      </div>
      <Likert value={value} onChange={onChange} />
    </div>
  );

  const SectionCard = ({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) => (
    <div className="w-full max-w-5xl mx-auto px-4 mt-6 mb-6">
      <div className="mb-3">
        <div className="text-xl md:text-2xl font-bold">{title}</div>
        {subtitle && <div className="text-sm opacity-70 mt-1">{subtitle}</div>}
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  );

  // ---------------------------
  // Landing View (Logo + Theory)
  // ---------------------------
  const ViewLanding = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-6 pt-14 pb-8 text-center">
        <div className="text-4xl md:text-6xl font-extrabold tracking-tight">CEP Profile</div>
        <div className="mt-2 text-sm md:text-base opacity-70">{academicSubtitle}</div>
        <div className="mt-1 text-base md:text-xl">{subtitle}</div>

        <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
          <button className="px-5 py-3 rounded-xl bg-blue-600 text-white" onClick={() => setStep(1)}>
            진단 시작
          </button>
          <button
            className="px-5 py-3 rounded-xl bg-white border"
            onClick={() => setShowTheory((v) => !v)}
          >
            {showTheory ? "이론 배경 접기" : "이론 배경 보기"}
          </button>
        </div>
      </div>

      {showTheory && (
        <div className="w-full max-w-5xl mx-auto px-6 pb-16 grid gap-6">
          <div className="bg-white rounded-2xl border p-6">
            <div className="text-xl font-bold mb-2">1) 심리학적 기반 (Carl Jung → MBTI)</div>
            <ul className="list-disc pl-5 text-sm md:text-base">
              <li>Jung: 심리 기능(사고·감정·감각·직관), 외향/내향 → Style(표현/성찰) 근거</li>
              <li>MBTI: 본질 성향 + 상황 발현 → Color(본질) + Energy(상황) 구조</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border p-6">
            <div className="text-xl font-bold mb-2">2) 행동·조직 심리 (DISC, Birkman)</div>
            <ul className="list-disc pl-5 text-sm md:text-base">
              <li>DISC: 행동 에너지의 방향·강도 → Expressive / Reflective</li>
              <li>Birkman: 보이는 행동 vs Needs → Color / Energy / Style 분리</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border p-6">
            <div className="text-xl font-bold mb-2">3) 전통 지혜 (개념적 차용)</div>
            <ul className="list-disc pl-5 text-sm md:text-base">
              <li>자연의 흐름(사계)에서 착안 → Energy 단계 (Rising/Peak/Harvest/Deep)</li>
              <li>균형 개념(양/음)을 쉬운 언어로 단순화 → Expressive / Reflective</li>
            </ul>
          </div>
          <div className="text-center">
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white" onClick={() => setStep(1)}>
              지금 바로 진단하러 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ---------------------------
  // Views per Step
  // ---------------------------
  const ViewColor = () => (
    <>
      <StepHeader />
      <SectionCard title="1) 컬러 자가진단 (25문항 / 5점 척도)" subtitle="1 = 전혀 아니다 · 5 = 매우 그렇다">
        {colorQuestions.map((q, i) => (
          <Question
            key={i}
            idx={i}
            text={`${q} (${colorBlocks[Math.floor(i / 5)].label})`}
            value={colorAnswers[i]}
            onChange={(v) => {
              const next = [...colorAnswers];
              next[i] = v;
              setColorAnswers(next);
            }}
          />
        ))}
      </SectionCard>
      <div className="w-full max-w-5xl mx-auto px-4 mb-10 flex justify-between gap-3">
        <button className="px-4 py-3 rounded-xl bg-gray-100" onClick={resetAll}>
          처음으로
        </button>
        <button
          className={`px-4 py-3 rounded-xl text-white ${
            allAnsweredColor ? "bg-blue-600" : "bg-gray-400"
          }`}
          disabled={!allAnsweredColor}
          onClick={() => setStep(2)}
        >
          다음: 에너지 단계
        </button>
      </div>
    </>
  );

  const ViewEnergy = () => (
    <>
      <StepHeader />
      <SectionCard
        title="2) 에너지 단계 (20문항 / 공통)"
        subtitle="Rising/Peak/Harvest/Deep 각 5문항 · 1-5점"
      >
        {energyQuestions.map((q, i) => (
          <Question
            key={i}
            idx={i}
            text={`${q} (${energyStages[Math.floor(i / 5)].label})`}
            value={energyAnswers[i]}
            onChange={(v) => {
              const next = [...energyAnswers];
              next[i] = v;
              setEnergyAnswers(next);
            }}
          />
        ))}
      </SectionCard>
      <div className="w-full max-w-5xl mx-auto px-4 mb-10 flex justify-between gap-3">
        <button className="px-4 py-3 rounded-xl bg-gray-100" onClick={() => setStep(1)}>
          이전
        </button>
        <button
          className={`px-4 py-3 rounded-xl text-white ${
            allAnsweredEnergy ? "bg-blue-600" : "bg-gray-400"
          }`}
          disabled={!allAnsweredEnergy}
          onClick={() => setStep(3)}
        >
          다음: 스타일 (Expressive/Reflective)
        </button>
      </div>
    </>
  );

  const ViewStyle = () => (
    <>
      <StepHeader />
      <SectionCard title="3) 소통 스타일 (Expressive / Reflective)" subtitle="6문항 · 1-5점">
        {styleQuestions.map((q, i) => (
          <Question
            key={i}
            idx={i}
            text={`${q.text} (${q.type})`}
            value={styleAnswers[i]}
            onChange={(v) => {
              const next = [...styleAnswers];
              next[i] = v;
              setStyleAnswers(next);
            }}
          />
        ))}
      </SectionCard>
      <div className="w-full max-w-5xl mx-auto px-4 mb-10 flex justify-between gap-3">
        <button className="px-4 py-3 rounded-xl bg-gray-100" onClick={() => setStep(2)}>
          이전
        </button>
        <button
          className={`px-4 py-3 rounded-xl text-white ${
            allAnsweredStyle ? "bg-blue-600" : "bg-gray-400"
          }`}
          disabled={!allAnsweredStyle}
          onClick={() => setStep(4)}
        >
          결과 보기
        </button>
      </div>
    </>
  );

  const ResultCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white border rounded-2xl p-5">
      <div className="font-bold mb-2">{title}</div>
      <div className="text-sm md:text-base opacity-80">{children}</div>
    </div>
  );

  const ViewResult = () => (
    <>
      <StepHeader />
      <div className="w-full max-w-6xl mx-auto px-4 mt-6 mb-10 grid gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <ResultCard title="나의 CEP 결과">
            <div className="text-lg md:text-xl font-extrabold mt-1">
              {topColor} · {topEnergy} · {topStyle}
            </div>
            <div className="mt-1">{oneLiner}</div>
          </ResultCard>
          <ResultCard title="핵심 요약">
            <div>
              <b>Color</b>: {topColor} — {colorExplains[topColor]?.keyword}
            </div>
            <div className="mt-1">
              <b>Energy</b>: {topEnergy} — {energyExplains[topEnergy]?.desc}
            </div>
            <div className="mt-1">
              <b>Style</b>: {topStyle}
            </div>
          </ResultCard>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-2xl p-4">
            <div className="font-bold mb-2">Color 점수</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barDataColors}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white border rounded-2xl p-4">
            <div className="font-bold mb-2">Energy 단계</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarDataEnergy} outerRadius={80}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stage" />
                  <PolarRadiusAxis />
                  <Radar dataKey="value" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white border rounded-2xl p-4">
            <div className="font-bold mb-2">Style (Expressive/Reflective)</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barDataStyle}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Explanations */}
        <div className="grid md:grid-cols-3 gap-4">
          <ResultCard title="Color 설명">
            <ul className="list-disc pl-5">
              <li>
                <b>키워드</b>: {colorExplains[topColor]?.keyword}
              </li>
              <li>
                <b>강점</b>: {colorExplains[topColor]?.strengths.join(", ")}
              </li>
              <li>
                <b>주의</b>: {colorExplains[topColor]?.cautions.join(", ")}
              </li>
            </ul>
          </ResultCard>
          <ResultCard title="Energy 설명">
            <ul className="list-disc pl-5">
              <li>
                <b>개요</b>: {energyExplains[topEnergy]?.desc}
              </li>
              <li>
                <b>추천</b>: {energyExplains[topEnergy]?.tips.join(", ")}
              </li>
            </ul>
          </ResultCard>
          <ResultCard title="커뮤니케이션 Tip">
            <div className="text-sm">
              {topStyle === "Expressive" ? (
                <ul className="list-disc pl-5">
                  <li>직접적이고 빠른 피드백을 선호</li>
                  <li>즉시 반응 + 행동 제안이 효과적</li>
                  <li>결정 사항을 명확히 제시</li>
                </ul>
              ) : (
                <ul className="list-disc pl-5">
                  <li>충분한 정보와 시간을 제공</li>
                  <li>정리된 문서/자료 기반 소통</li>
                  <li>깊이 있는 질문과 경청</li>
                </ul>
              )}
            </div>
          </ResultCard>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-3">
          <button className="px-4 py-3 rounded-xl bg-blue-600 text-white" onClick={copySummary}>
            결과 요약 복사
          </button>
          <button className="px-4 py-3 rounded-xl bg-gray-100" onClick={() => setStep(3)}>
            다시: 스타일
          </button>
          <button className="px-4 py-3 rounded-xl bg-gray-100" onClick={resetAll}>
            처음으로
          </button>
        </div>

        <div className="text-xs opacity-60 mt-2">
          ※ 본 도구는 CEP Profile(Color·Energy·Style) 모델을 기반으로 한 자가진단입니다. 결과는 학습/코칭 목적이며 의료적 진단이 아닙니다.
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {step === 0 && <ViewLanding />}
      {step === 1 && <ViewColor />}
      {step === 2 && <ViewEnergy />}
      {step === 3 && <ViewStyle />}
      {step === 4 && <ViewResult />}
    </div>
  );
}
