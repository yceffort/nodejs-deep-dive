/**
 * 디옵티마이제이션 예제
 *
 * 실행 방법:
 *   node --trace-deopt 1-1-3-deopt-example.js
 *   node --trace-opt --trace-deopt 1-1-3-deopt-example.js
 */

function calculate(x) {
  return x * 2 + 1
}

// 정수로 충분히 호출하여 최적화 유도
for (let i = 0; i < 10000; i++) {
  calculate(i)
}

console.log('--- 최적화 완료, 이제 문자열 전달 ---')

// 갑자기 문자열 전달 → 디옵티마이제이션 발생!
calculate('hello')
