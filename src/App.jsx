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

  const colorQuestions = [
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

  const [colorAnswers, setColorAnswers] = useState(Array(25).fill(0));

  // ---------------------------
  // 2) ENERGY (20 items / 4×5)
  // ---------------------------
  const energyStages = [
    { key: "Rising", label: "Rising", icon: "🌱" },
    { key: "Peak", label: "Peak", icon: "☀️" },
    { key: "Harvest", label: "Harvest", icon: "🍂" },
    { key: "Deep", label: "Deep", icon: "❄️" },
  ];

  const energyQuestions = [
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

  const [energyAnswers, setEnergyAnswers] = useState(Array(20).fill(0));

  // ---------------------------
  // 3) STYLE (6 items)
  // ---------------------------
  const styleQuestions = [
    { text: "회의에서 적극적으로 발언하는 편이다.", type: "Expressive" },
    { text: "내 의견을 빠르게 드러내는 편이다.", type: "Expressive" },
    { text: "다른 사람의 말을 충분히 듣고 난 뒤 말한다.", type: "Reflective" },
    { text: "눈에 띄는 행동보다 관찰과 분석을 선호한다.", type: "Reflective" },
    { text: "중요한 상황에서 결정을 신속히 내린다.", type: "Expressive" },
    { text: "결정하기 전에 충분히 자료를 모으고 고민한다.", type: "Reflective" },
  ];

  const [styleAnswers, setStyleAnswers] = useState(Array(6).fill(0));

  // ---------------------------
  // SCORING
  // ---------------------------
  const colorScores = useMemo(() => {
    const blockSums = [0, 0, 0, 0, 0];
    for (let i = 0; i < 25; i++) {
      const block = Math.floor(i / 5);
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
      const block = Math.floor(i / 5);
      sums[block] += energyAnswers[i] || 0;
    }
    return { Rising: sums[0], Peak: sums[1], Harvest: sums[2], Deep: sums[3] };
  }, [energyAnswers]);

  const styleScores = useMemo(() => {
    let expressive = 0, reflective = 0;
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
  // 결과 화면, 설명 등은 그대로 유지 (생략)
  // ---------------------------

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* step에 따라 다른 뷰 렌더링 */}
      {/* ViewLanding / ViewColor / ViewEnergy / ViewStyle / ViewResult */}
    </div>
  );
}
