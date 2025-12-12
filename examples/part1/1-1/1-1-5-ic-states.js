/**
 * IC 상태와 최적화/디옵티마이제이션 추적 예제
 *
 * 실행 방법:
 *   node --trace-opt --trace-deopt examples/part1/1-1/1-1-5-ic-states.js
 *
 * --trace-opt: 함수가 최적화될 때 로그 출력
 * --trace-deopt: 디옵티마이제이션 발생 시 로그 출력
 *
 * 이 예제는 히든 클래스 일관성이 V8 최적화에 미치는 영향을 보여준다.
 */

// ========================================
// 1. Monomorphic 케이스 - 최적화가 잘 되는 경우
// ========================================
function getXMono(obj) {
  return obj.x
}

// 동일한 구조 { x, y }를 가진 객체만 전달
for (let i = 0; i < 100000; i++) {
  getXMono({ x: i, y: i + 1 })
}

console.log('--- Monomorphic 테스트 완료 (getXMono 최적화됨) ---')

// ========================================
// 2. Polymorphic 케이스 - 여러 히든 클래스
// ========================================
function getXPoly(obj) {
  return obj.x
}

// 서로 다른 구조의 객체들을 전달
for (let i = 0; i < 100000; i++) {
  if (i % 3 === 0) {
    getXPoly({ x: i, y: i + 1 }) // 구조 1: { x, y }
  } else if (i % 3 === 1) {
    getXPoly({ x: i, z: i + 1 }) // 구조 2: { x, z }
  } else {
    getXPoly({ x: i, w: i + 1 }) // 구조 3: { x, w }
  }
}

console.log('--- Polymorphic 테스트 완료 (getXPoly도 최적화되지만 덜 효율적) ---')

// ========================================
// 3. 디옵티마이제이션 케이스 - 타입 변경
// ========================================
function add(a, b) {
  return a + b
}

// 숫자로만 호출하여 TurboFan이 숫자 덧셈으로 최적화하도록 유도
for (let i = 0; i < 100000; i++) {
  add(i, i + 1)
}

console.log('--- add 함수 최적화 완료 ---')

// 최적화가 완료될 시간을 주기 위해 잠시 대기
let dummy = 0
for (let i = 0; i < 1000000; i++) {
  dummy += i
}

// 갑자기 문자열을 전달하면 디옵티마이제이션 발생!
// 이유: TurboFan이 "a와 b는 항상 숫자"라고 가정하고 최적화했는데,
// 그 가정이 깨졌기 때문
const result = add('hello', ' world')
console.log('문자열 결과:', result)
