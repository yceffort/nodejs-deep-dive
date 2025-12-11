/**
 * 바이트코드 확인 예제
 *
 * 실행 방법:
 *   node --print-bytecode --print-bytecode-filter=add 1-1-1-bytecode-example.js
 */

function add(a, b) {
  return a + b
}

console.log(add(1, 2))
