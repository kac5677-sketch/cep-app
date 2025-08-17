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
