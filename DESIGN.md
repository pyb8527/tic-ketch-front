# Design System — TicKetch

> 긴장은 또렷하게, 결제는 안심되게. 밝고 신뢰감 있는 실시간 좌석 예매 경험.

라이트 우선 · 다크 지원 · WCAG AA. 모든 프론트엔드 구현(`/Qfrontend-design`, 코딩 에이전트, `/Qdesign-audit`)은 이 문서를 단일 진실 공급원(SSOT)으로 참조한다.

---

## 1. Brand Identity

**제품.** TicKetch는 콘서트·공연 좌석을 실시간으로 예매하는 서비스다. 대기열 입장 → 좌석 선택(SSE 실시간 상태) → 선점(타이머) → 결제로 이어지는 고긴장·고전환 플로우를 다룬다. 사용자는 인기 공연 오픈런에 몰리는 일반 소비자다.

**브랜드 성격 (3 형용사).** 신뢰감 있는(trustworthy) · 명료한(clear) · 기민한(responsive).

**톤.** 인터파크·예스24·Toss 결제 같은 대중적 커머스의 안심되는 질감을 기본으로 하되, 좌석/대기열/타이머처럼 실시간 긴장이 필요한 지점에서는 색과 모션으로 또렷한 신호를 준다. 화려함보다 "지금 무슨 일이 일어나는지 즉시 읽힌다"가 최우선.

**한 줄 디자인 철학.** 정보 위계는 차분하게, 상태 변화는 즉각적으로 — 사용자가 단 한 번도 "내 좌석 어떻게 됐지?"를 묻지 않게 한다.

**레퍼런스 무드.** Toss(결제 신뢰감), 인터파크/예스24(티켓팅 친숙함), Linear(상태 명료성).

---

## 2. Colors

모든 색은 OKLCH로 정의한다(지각적 균일성). HEX는 참고용 근사치다. 기본 테마는 **라이트**, 다크는 `.dark` 클래스 토글로 매핑한다.

### 2-1. Brand Colors

- **Primary (Indigo)** — CTA, 핵심 액션, 브랜드 식별. 차분하면서 신뢰감 있는 인디고.
- **Success (Emerald)** — 예약 가능 좌석, 결제 완료, "입장 가능" 등 긍정/진행 신호. 액센트 1.
- **Accent 보조는 두지 않는다** — Primary 1 + Success 1로 제한(restraint over variety). 그 외는 모두 시맨틱/뉴트럴.

#### Primary (Indigo) 스케일

| Step | OKLCH | HEX≈ | 용도 |
|------|-------|------|------|
| 50  | `oklch(0.971 0.014 277)` | `#EFEFFB` | 연한 배경, 선택 칩 배경(라이트) |
| 100 | `oklch(0.936 0.032 277)` | `#DEDDF7` | hover 배경, 보조 표면 |
| 200 | `oklch(0.882 0.060 277)` | `#C3C0F0` | border, 비활성 강조 |
| 300 | `oklch(0.806 0.098 277)` | `#9D97E6` | 보조 텍스트(다크 배경) |
| 400 | `oklch(0.704 0.150 277)` | `#736BDE` | hover 상태 fill |
| 500 | `oklch(0.606 0.196 277)` | `#5B4FE0` | Primary 기준값 |
| **600** | `oklch(0.548 0.213 277)` | `#4F46E5` | **기본 CTA fill** |
| 700 | `oklch(0.488 0.205 277)` | `#4138CC` | CTA hover/active |
| 800 | `oklch(0.420 0.172 277)` | `#372FA6` | pressed |
| 900 | `oklch(0.360 0.130 277)` | `#2E2880` | 강조 텍스트(라이트 배경) |
| 950 | `oklch(0.255 0.090 277)` | `#1E1A52` | 다크 표면 위 강조 |

> primary-600 텍스트(흰색 #FFF) 대비 ≈ 5.9:1 (AA 본문 통과). primary-700은 ≈ 7.4:1.

#### Success (Emerald) 스케일 — 좌석 가능 / 결제 완료 / 입장 가능

| Step | OKLCH | HEX≈ | 용도 |
|------|-------|------|------|
| 50  | `oklch(0.975 0.025 165)` | `#E6FBF3` | 가능 좌석 배경(라이트) |
| 100 | `oklch(0.940 0.055 165)` | `#C4F5E3` | 칩/배지 배경 |
| 300 | `oklch(0.820 0.120 165)` | `#5FE0B0` | 좌석 fill(다크) |
| 500 | `oklch(0.700 0.150 162)` | `#16C088` | 좌석 가능 기준값 |
| 600 | `oklch(0.640 0.145 162)` | `#0FA876` | success hover / 텍스트(라이트) |
| 700 | `oklch(0.560 0.125 162)` | `#0C8A61` | 라이트 배경 위 텍스트(대비 4.6:1) |

### 2-2. Neutral Scale (쿨 그레이)

| Step | OKLCH | HEX≈ | 라이트 역할 | 다크 역할 |
|------|-------|------|------------|----------|
| 0   | `oklch(1 0 0)`           | `#FFFFFF` | page background | — |
| 50  | `oklch(0.985 0.002 270)` | `#FAFAFB` | subtle background | — |
| 100 | `oklch(0.970 0.004 270)` | `#F3F4F6` | surface / card | — |
| 200 | `oklch(0.930 0.006 270)` | `#E4E6EB` | border, divider | — |
| 300 | `oklch(0.880 0.008 270)` | `#CDD0D8` | strong border, disabled fill | text(다크) |
| 400 | `oklch(0.710 0.010 270)` | `#9CA0AB` | placeholder, muted icon | muted text(다크) |
| 500 | `oklch(0.580 0.012 270)` | `#71757F` | **muted text** | secondary text(다크) |
| 600 | `oklch(0.480 0.012 270)` | `#5A5E68` | secondary text | — |
| 700 | `oklch(0.390 0.012 270)` | `#454952` | body text | border(다크) |
| 800 | `oklch(0.280 0.010 270)` | `#2E313A` | heading text | surface elevated(다크) |
| 900 | `oklch(0.210 0.008 270)` | `#1F222B` | — | surface(다크) |
| 950 | `oklch(0.155 0.006 270)` | `#13151C` | — | page background(다크) |

> 본문 텍스트 neutral-700 on white ≈ 9.3:1, neutral-500 on white ≈ 4.7:1 (보조 텍스트 AA 통과).

### 2-3. Semantic Colors

| 의미 | 라이트 (텍스트/fill) | 다크 | OKLCH (base) | 용도 |
|------|----------------------|------|--------------|------|
| **Success** | success-700 / success-500 | success-300 | `oklch(0.700 0.150 162)` | 좌석 가능, 결제 완료, 연결됨 |
| **Warning** | amber-700 / amber-400 | amber-300 | `oklch(0.800 0.150 80)` ≈ `#F2B705` | 선점중 좌석, 타이머 임박(≤60s), 잔여 적음 |
| **Error/Danger** | red-600 / red-500 | red-400 | `oklch(0.620 0.222 25)` ≈ `#E5484D` | 매진, 결제 실패, 선점 충돌, 만료 |
| **Info** | sky-700 / sky-500 | sky-300 | `oklch(0.680 0.130 235)` ≈ `#2E90E5` | 안내, 대기 상태 중립 정보 |

Warning/Error/Info 보조 스텝(설계 시 함께 생성):
- Warning: `50 oklch(0.97 0.03 85)` / `100 oklch(0.93 0.07 85)` / `700 oklch(0.55 0.12 70)`(라이트 텍스트, 대비 4.5:1+)
- Error: `50 oklch(0.96 0.02 25)` / `100 oklch(0.92 0.05 25)` / `700 oklch(0.51 0.20 25)`
- Info: `50 oklch(0.97 0.02 235)` / `700 oklch(0.50 0.13 245)`

### 2-4. Seat Grade Colors (티켓팅 특화)

`SeatDto.seatGradeId`를 색으로 구분한다. 등급 색은 좌석 fill의 **테두리/라벨**에 적용하고, 좌석 **상태**(가능/선점/판매/선택)는 아래 2-5 상태 색이 우선한다(상태 > 등급).

| 등급 | 색 OKLCH | HEX≈ | 비고 |
|------|----------|------|------|
| VIP | `oklch(0.62 0.17 300)` | `#9B5FD6` | 퍼플 |
| R   | `oklch(0.55 0.21 277)` | `#5B4FE0` | 인디고(primary 계열) |
| S   | `oklch(0.68 0.13 235)` | `#2E90E5` | 스카이 |
| A   | `oklch(0.70 0.15 162)` | `#16C088` | 이메랄드 |
| 기타 | neutral-500 | — | fallback |

> 등급은 색 + 텍스트 라벨(VIP/R/S/A)을 **항상 함께** 노출한다(색맹 안전).

### 2-5. Seat State Colors (상태 우선)

| 상태 | 라이트 | 다크 | 인터랙션 |
|------|--------|------|----------|
| AVAILABLE | fill success-50, border success-500, text success-700 | fill transparent, border success-400, text success-300 | hover: fill success-100 / 다크 success-900, cursor-pointer |
| SELECTED | fill primary-600, text white, ring 2px primary-300 + offset | 동일, ring offset = 다크 surface | 선택 토글 |
| HELD (타인 선점) | fill warning-50, border warning-400, text warning-700 | fill warning-900/40, border warning-400 | cursor-not-allowed, 흐릿하지 않게(정보 유지) |
| SOLD | fill neutral-100, border neutral-200, text neutral-400 | fill neutral-900, text neutral-600 | cursor-not-allowed, 빗금 패턴 권장 |

### 2-6. Dark Mode 매핑 규칙

- **반전이 아니라 재매핑.** page bg → neutral-950, surface → neutral-900, elevated surface → neutral-800, border → neutral-700.
- **Primary 조정.** 다크 배경에서는 CTA를 primary-500로 한 톤 밝혀 채도 유지(primary-600은 어두운 면에서 가라앉음).
- **Success/Semantic.** 다크에서는 base 대신 300 스텝 사용(저명도 배경 위 가독 확보).
- **그림자.** 다크에서는 box-shadow 대신 border(neutral-700) + 미세 inner highlight로 elevation 표현.
- 토글 기준: `<html class="dark">`, Tailwind `darkMode: 'class'`.

### 2-7. 기존 토큰 → 신규 매핑 (마이그레이션)

| 기존 (`tailwind.config.js`) | 신규 |
|------|------|
| `bg #0f1117` | 라이트 `neutral-0` / 다크 `neutral-950` |
| `surface #1a1d27` | 라이트 `neutral-100` / 다크 `neutral-900` |
| `accent #6c63ff` | `primary-600` (다크 `primary-500`) |
| `accent2 #00d4aa` | `success-500` |
| `danger #ff6b6b` | `error-500` |
| `warn #ffd93d` | `warning-400` |
| `muted` (미정의 — 버그) | `neutral-500` (정식 토큰화 필수) |
| `gray-200/100` (텍스트) | 라이트 `neutral-800/700`, 다크 `neutral-200/100` |

---

## 3. Typography

### 3-1. Font Stack

- **Headings / Display:** `"Sora", "Pretendard", sans-serif` — 기하학적이고 또렷한 디스플레이 페이스. 공연 타이틀·순번·금액 등 시선 집중 지점에 사용. (Pretendard 한글 fallback 보장)
- **Body / UI:** `"Pretendard Variable", "Pretendard", system-ui, sans-serif` — 한국어+라틴 모두 우수한 한국 커머스 표준 본문체. `word-break: keep-all` 적용.
- **Mono / Numeric:** `"JetBrains Mono", "Pretendard", monospace` — 타이머(`mm:ss`), 좌석 번호, 결제 금액, 예매 코드 등 **tabular-nums** 필요 지점.

> 범용 산세리프 블랙리스트(스킬 정의 7종) 미사용. 모든 스택에 fallback chain 존재.

### 3-2. Type Scale (1.250 Major Third 근사)

| 토큰 | size / line-height | letter-spacing | 용도 |
|------|--------------------|----------------|------|
| xs   | 0.75rem / 1rem (12/16)   | 0.01em  | 배지, 캡션, 범례 |
| sm   | 0.875rem / 1.25rem (14/20) | 0      | 보조 텍스트, 메타 |
| base | 1rem / 1.5rem (16/24)    | 0       | 본문 기준 |
| lg   | 1.125rem / 1.75rem (18/28) | 0      | 카드 제목, 강조 본문 |
| xl   | 1.25rem / 1.75rem (20/28) | -0.01em | 섹션 헤딩 |
| 2xl  | 1.5rem / 2rem (24/32)    | -0.01em | 페이지 H1(서브) |
| 3xl  | 1.875rem / 2.25rem (30/36) | -0.02em | 페이지 H1 |
| 4xl  | 2.25rem / 2.5rem (36/40) | -0.02em | 대기열 순번, 히어로 |
| 5xl  | 3rem / 1 (48)            | -0.02em | 대형 카운트(순번/잔여시간 강조) |

### 3-3. Weights

- Regular 400 (본문) · Medium 500 (UI 라벨/버튼) · Semibold 600 (카드 제목) · Bold 700 (헤딩/숫자 강조). 최소 3 weight 사용.

### 3-4. Multi-script

- **CJK:** Pretendard로 한글 처리, `word-break: keep-all`, `overflow-wrap: anywhere`로 공연 제목 줄바꿈 자연화.
- 숫자(금액·순번·시간)는 항상 `font-variant-numeric: tabular-nums`로 자릿수 흔들림 방지.

---

## 4. Spacing & Layout

### 4-1. Base Unit

- **4px (0.25rem)** 기준. 모든 간격은 토큰에서 유래(매직 넘버 금지).

### 4-2. Scale

`0 · 1(4) · 2(8) · 3(12) · 4(16) · 5(20) · 6(24) · 8(32) · 10(40) · 12(48) · 16(64) · 20(80) · 24(96)` (px)

### 4-3. Layout

- **Max content width:** `max-w-5xl` (64rem / 1024px). 좌석맵은 내부 `max-w-2xl`(42rem) 중앙 정렬.
- **Grid:** 공연 목록 — 모바일 1 / sm 2 / lg 3 컬럼, gap `6`(24px).
- **Container padding:** 모바일 `16px` / 태블릿 `24px` / 데스크탑 `24px`(`px-6`).
- **수직 리듬:** 페이지 섹션 간 `space-y-6`~`8`, 카드 내부 `p-5`~`6`.

### 4-4. Breakpoints (Tailwind 기본 유지)

`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536` (px). 모바일 퍼스트로 작성하되, 데스크탑/모바일 동등 대응(좌석맵은 가로 스크롤 허용).

---

## 5. Motion

### 5-1. Duration

- **fast 120ms** — hover/focus, 좌석 선택 토글, 버튼 상태.
- **normal 220ms** — 카드 hover lift, 모달/토스트 진입, 패널 전개.
- **slow 400ms** — 페이지 진입 stagger, 대기열 순번 카운트 전환.

### 5-2. Easing

- default `cubic-bezier(0.4, 0, 0.2, 1)`
- enter `cubic-bezier(0, 0, 0.2, 1)`
- exit `cubic-bezier(0.4, 0, 1, 1)`

### 5-3. 티켓팅 특화 모션

- **실시간 연결 표시:** success 점 `animate-pulse`(2s) — 좌석맵/대기열 상단.
- **타이머 임박(≤60s):** 숫자 색 error 전환 + `pulse` 1s. 만료 시 카드 전체 shake 1회.
- **대기열 순번 감소:** 숫자 변경 시 위로 슬라이드 + fade(normal). 과한 점프 금지.
- **좌석 상태 변경(SSE):** 변경된 좌석만 `fast` fill 트랜지션, 전체 리렌더 깜빡임 금지.

### 5-4. Rules

- `transform`·`opacity`만 애니메이트(GPU 합성). width/height/top 애니 금지.
- `prefers-reduced-motion: reduce` 시 모든 비필수 애니 제거, pulse는 정적 색으로 대체.

---

## 6. Component Tokens

### 6-1. Border Radius

| 토큰 | 값 | 용도 |
|------|----|----|
| none | 0 | 빗금/표 |
| sm | 6px | 배지, 좌석 칩 |
| md | 10px | 버튼, 인풋 |
| lg | 14px | 카드 |
| xl | 20px | 모달, 대기열 패널 |
| full | 9999px | 상태 배지(pill), 아바타, 펄스 점 |

기본값: 카드 `lg` · 버튼 `md` · 인풋 `md` · 좌석 `sm`.

### 6-2. Shadows (라이트 elevation)

| 토큰 | 값 | 용도 |
|------|----|----|
| sm | `0 1px 2px oklch(0.2 0.01 270 / 0.06)` | 카드 기본 |
| md | `0 4px 12px oklch(0.2 0.01 270 / 0.08)` | 카드 hover, 드롭다운 |
| lg | `0 12px 32px oklch(0.2 0.01 270 / 0.12)` | 모달, 대기열 패널 |
| xl | `0 24px 56px oklch(0.2 0.01 270 / 0.16)` | 결제 확인 시트 |

**다크 전략:** box-shadow 대신 `border: 1px solid neutral-700` + 표면 단계차로 elevation 표현.

### 6-3. States

- **Hover:** fill 한 스텝 진하게(600→700) 또는 표면 elevation +1. scale은 카드 한정 `1.01`.
- **Active/Pressed:** fill +1 스텝(700→800), `scale(0.98)`(fast).
- **Focus:** `ring-2` primary-500 + `ring-offset-2`(offset 색 = 현재 표면). 키보드 포커스 항상 가시.
- **Disabled:** `opacity-40` + `cursor-not-allowed`, 색상 변화 없음(레이아웃 유지).
- **Loading:** 버튼 내 spinner(`border-2`, 현재 텍스트색, t-transparent) + 라벨 유지, 너비 고정.

---

## 7. Component Guidelines

### 7-1. Core Components

| Component | Variants | Default Size | Notes |
|-----------|----------|-------------|-------|
| **Button** | primary, secondary, ghost, success, danger | md (`h-10 px-4 rounded-md text-sm font-medium`) | lg(`h-12 px-8`)=주요 CTA(선점/결제). loading 시 spinner+라벨, 너비 고정. icon-only(`h-10 w-10`) |
| **Input** | text, email, password, select, textarea | md (`h-10 px-3 rounded-md border-neutral-200`) | focus: ring primary-500. error: border error-500 + helper text error-700. label 항상 존재 |
| **Card** | default, interactive, elevated | `rounded-lg p-5 bg-surface shadow-sm` | interactive(공연 카드): hover md shadow + border primary-200 + `-translate-y-0.5`. 클릭 영역 전체 |
| **Badge** | status, grade, count | sm (`text-xs px-2 py-0.5 rounded-full`) | 상태=시맨틱 색, 등급=등급 색+라벨. 색만으로 의미 전달 금지 |
| **Modal/Sheet** | sm, md, lg | md (`max-w-lg rounded-xl shadow-lg`) | backdrop `bg-neutral-950/50 backdrop-blur-sm`. esc/backdrop 닫기, focus-trap. 모바일 bottom-sheet |
| **Toast** | success, error, warning, info | — | 우상단(데스크탑)/상단(모바일). success 3s 자동, error 수동 닫기. alert() 전면 금지 |
| **Spinner / Skeleton** | sm, md | — | 데이터 로딩은 skeleton 우선, 액션 진행은 spinner. "로딩 중..." 텍스트 단독 금지 |

#### Button variant 정의

- **primary** — `bg-primary-600 text-white hover:bg-primary-700`. 페이지당 1개 원칙.
- **success** — `bg-success-600 text-white hover:bg-success-700`. "좌석 선택하러 가기", "결제 완료" 등 진행 확정.
- **danger** — `bg-error-500 text-white hover:bg-error-600`. 취소/환불.
- **secondary** — `bg-neutral-100 text-neutral-800 border border-neutral-200 hover:bg-neutral-200`.
- **ghost** — `text-neutral-700 hover:bg-neutral-100`. 페이지네이션·보조 액션.

### 7-2. Layout Components

- **Header:** `h-16` sticky top-0, `bg-surface/80 backdrop-blur border-b border-neutral-200`. 좌측 워드마크(Sora bold, primary), 우측 내비/로그아웃 + 다크모드 토글. `max-w-5xl` 정렬.
- **Page Shell:** Header + `<main max-w-5xl mx-auto px-6 py-8>`. 사이드바 없음(단일 컬럼 커머스).
- **Footer:** 최소 — 카피라이트 + 약관 링크, `text-sm text-neutral-500`. 결제 플로우에서는 숨김(집중).
- **Empty / Error state:** 아이콘 + 1줄 설명 + 복구 액션 버튼. 빈 목록·만료·실패에 일관 적용.

### 7-3. 도메인 컴포넌트 (티켓팅 핵심)

#### SeatMap
- 무대 라벨을 상단 중앙에 `bg-neutral-100 border border-primary-200` pill로. 좌석은 행(rowName) 그룹, 행 라벨 좌측 고정.
- 좌석 칩 `w-9 h-9 rounded-sm`(모바일 `w-8 h-8`), 상태 색(2-5) + 등급 테두리(2-4). 선택 시 ring.
- **범례 필수**: 가능/선점중/판매완료/선택됨 + 등급 색. 색+텍스트 동반.
- SSE 갱신은 변경 좌석만 fast 트랜지션. 가로 넘침은 스크롤 컨테이너(`overflow-x-auto`)로.

#### QueuePage (대기열)
- 중앙 패널 `max-w-md rounded-xl shadow-lg`(다크 border). 
- **내 순번**을 `text-5xl Sora bold primary`로 최대 강조, 전체 대기 인원은 보조(`text-2xl neutral`). 
- "입장 가능!"은 success + pulse, CTA는 success 버튼. 진행 상태(대기중/입장가능/이탈)별 색·문구 명확히. 폴링 중 미세 로딩 인디케이터.

#### ReservationTimer
- `font-mono text-2xl tabular-nums`. 평상시 success-600, **≤60s error-500 + pulse**. 만료 시 onExpire + 토스트 + 복구 안내.
- 결제 페이지 상단 sticky로 항상 보이게(잔여시간 압박 = 전환 동력).

#### PaymentPage
- 결제 요약 카드(공연/좌석/등급/금액)를 `elevated`로, 금액은 mono tabular. 타이머 sticky.
- 결제 버튼 lg success, loading 시 비활성+spinner. 성공/실패는 토스트+상태 화면(alert 금지).

---

## 8. Accessibility

**Target level: WCAG AA** (WCAG 2.1 기준).

- **대비:** 본문 텍스트 ≥ 4.5:1, 대형(18px+/14px bold) ≥ 3:1, UI 컴포넌트·그래픽 경계 ≥ 3:1. 좌석 상태는 색 + 형태/라벨로 이중 부호화(색맹 대응).
- **포커스:** 모든 인터랙티브 요소 키보드 도달·가시 포커스 링(primary-500, offset 2px). 좌석은 화살표/탭 내비 가능하게.
- **모션:** `prefers-reduced-motion` 존중(5-4).
- **시맨틱:** 버튼은 `<button>`, 링크는 `<a>`. 좌석 칩은 `<button>` + `aria-label="A열 3번, R석, 예약가능"`, `aria-pressed`(선택), `disabled`(판매/선점). 상태 변화는 `aria-live="polite"`(순번·연결), 타이머 임박은 `assertive`.
- **명도 무관 정보:** "실시간 연결됨", 좌석 상태, 등급 — 색에만 의존하지 않고 텍스트/아이콘 동반.
- **터치 타깃:** 최소 `44×44px`(좌석 칩 모바일 포함 — 간격으로 확보).
- **폼:** 모든 input에 연결된 `<label>`, 에러는 텍스트로도 설명(`aria-describedby`).

---

## 9. Do / Don't

**Do**
- 상태(가능/선점/판매/선택)는 항상 색 + 텍스트/형태로 함께 전달한다.
- 타이머·순번·금액은 mono tabular-nums로 자릿수 흔들림을 막는다.
- 모든 색은 토큰에서 온다. 라이트/다크 둘 다 검증한 대비만 사용한다.
- 페이지당 primary 버튼은 하나. 진행 확정은 success로 위계를 구분한다.
- 로딩은 skeleton, 알림은 toast. 사용자 행동에는 항상 가시 피드백.

**Don't**
- `alert()`/`confirm()`로 피드백 처리 금지 — toast/모달 사용.
- 색만으로 좌석/상태 의미 전달 금지.
- 매직 넘버(임의 px, 임의 hex) 금지 — 토큰만.
- 범용 산세리프 블랙리스트(스킬 정의 7종) 폰트 금지.
- SSE 갱신 시 좌석맵 전체 깜빡임/리렌더 금지 — 변경분만.
- `muted` 같은 미정의 토큰 사용 금지(neutral-500로 정식화).
- width/height/layout 속성 애니메이션 금지(transform/opacity만).
