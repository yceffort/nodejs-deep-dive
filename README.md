# Node.js Deep dive

## Chapter 0. 프롤로그: 자바스크립트 런타임의 본질

### 0-1. 왜 다시 Node.js인가? (Bun, Deno 시대의 생존 전략)

### 0-2. 프론트엔드 인프라와 Node.js의 관계

## Chapter 1. Node.js 아키텍처 (The Core)

### 1-1. V8 엔진 심층 분석: Bytecode 컴파일과 인라인 캐싱(Inline Caching)

### 1-2. libuv와 비동기 I/O: 커널(Kernel)과 스레드 풀의 협업

### 1-3. 이벤트 루프(Event Loop)의 진실: Phase별 동작과 흔한 오해들

### 1-4. Task Queue 우선순위 전쟁: nextTick vs Promise vs setTimeout

### 1-5. 실행 컨텍스트와 콜 스택 추적

## Chapter 2. 코드 실행과 모듈 로딩 (Execution & Loading)

### 2-1. vm 모듈과 샌드박스: Node.js 모듈 시스템의 시초

### 2-2. CommonJS 로더 해부: Module.\_load와 래퍼 함수(Wrapper Function)의 실체

### 2-3. ESM 로더의 단계별 동작: 파싱(Parsing) → 인스턴스화(Instantiation) → 평가(Evaluation)

### 2-4. Dual Package Hazard: 런타임에서 두 개의 모듈 인스턴스가 충돌하는 원리

### 2-5. Custom Loaders API: ts-node나 vite가 코드를 즉석에서 변환하여 실행하는 방법

## Chapter 3. 메모리 관리와 데이터 처리 (Memory & Data)

### 3-1. V8 메모리 구조 (New/Old Space)와 GC 알고리즘 (Orinoco)

### 3-2. Buffer와 TypedArray: V8 힙 외부(Off-heap) 메모리 다루기

### 3-3. Stream의 배압(Backpressure): 메모리 폭발 없이 대용량 데이터 처리하기

### 3-4. Web Streams API: Node.js와 브라우저의 표준 통일 (Blob, File)

### 3-5. [Deep Dive] 메모리 누수(Memory Leak) 패턴 분석과 디버깅

## Chapter 4. 네트워킹과 프로토콜 (Networking)

### 4-1. TCP/IP와 소켓 프로그래밍: net 모듈 내부 구현

### 4-2. HTTP/1.1 Keep-Alive: 에이전트(Agent)와 커넥션 풀링(Connection Pooling) 최적화

### 4-3. HTTP/2와 멀티플렉싱: 하나의 커넥션으로 성능 극대화하기

### 4-4. HTTP/3(QUIC)와 UDP의 부상

### 4-5. TLS/SSL 핸드셰이크: Node.js가 암호화 통신을 처리하는 법

## Chapter 5. 보안 (Security)

### 5-1. Node.js 보안 모델과 위협 벡터

### 5-2. Permission Model: 파일/네트워크 접근 제어

### 5-3. Policy 기반 모듈 로딩: 무결성 검증

### 5-4. vm 모듈의 함정: 샌드박스가 아닌 이유

### 5-5. Prototype Pollution 공격과 방어

### 5-6. crypto 모듈 제대로 쓰기

## Chapter 6. 동시성과 컨텍스트 (Concurrency)

### 6-1. Worker Threads: CPU 집약적 작업 처리 (데이터 전송 vs 공유 메모리)

### 6-2. AsyncLocalStorage (ALS): 요청(Request)별 컨텍스트 격리와 상태 공유

### 6-3. Child Process와 파이프라인(Pipeline) 설계

### 6-4. 동시성 제어 패턴: Semaphore와 Mutex 구현

## Chapter 7. 성능 최적화와 관측 가능성 (Performance & Observability)

### 7-1. 이벤트 루프 지연(Lag) 측정: 서버가 멈추는 순간을 포착하기

### 7-2. CPU 프로파일링과 불꽃 차트(Flame Graph) 분석법

### 7-3. Heap Snapshot: 메모리 덤프를 떠서 범인 색출하기

### 7-4. async_hooks: APM 도구(Datadog, New Relic)가 내부를 들여다보는 원리

### 7-5. OpenTelemetry를 이용한 분산 추적 구현

## Chapter 8. 네이티브 확장과 생태계 (Native Extensions)

### 8-1. Node-API (N-API): JS와 네이티브 언어(C++/Rust)의 가교

### 8-2. Rust와 Neon/NAPI-RS: 안전하고 빠른 네이티브 모듈 만들기

### 8-3. WebAssembly (WASI) in Node.js

### 8-4. Node.js 코어 기여 가이드 및 생태계의 미래

## Chapter 9. 에필로그

### 9-1. 견고한 소프트웨어를 위한 제언
