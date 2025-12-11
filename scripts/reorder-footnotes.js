#!/usr/bin/env node

/**
 * 마크다운 파일의 각주를 본문 등장 순서대로 재정렬하는 스크립트
 *
 * 사용법: node scripts/reorder-footnotes.js <markdown-file>
 * 예시: node scripts/reorder-footnotes.js posts/part1/1-1.V8_엔진_심층_분석.md
 */

const fs = require('fs')

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: node scripts/reorder-footnotes.js <markdown-file>')
  process.exit(1)
}

let content = fs.readFileSync(filePath, 'utf8')

// 1. 본문에서 각주 참조 등장 순서 추출 (첫 등장 순서대로)
const refPattern = /\[\^(\d+)\](?!:)/g
const seenRefs = new Set()
const refOrder = []

let match
while ((match = refPattern.exec(content)) !== null) {
  const refNum = match[1]
  if (!seenRefs.has(refNum)) {
    seenRefs.add(refNum)
    refOrder.push(refNum)
  }
}

console.log('본문 등장 순서:', refOrder)

// 2. 각주 정의 추출
const defPattern = /^\[\^(\d+)\]: (.+)$/gm
const definitions = new Map()

while ((match = defPattern.exec(content)) !== null) {
  definitions.set(match[1], match[2])
}

console.log('각주 정의 개수:', definitions.size)

// 3. 매핑 테이블 생성 (기존 번호 -> 새 번호)
const oldToNew = new Map()
refOrder.forEach((oldNum, index) => {
  const newNum = String(index + 1)
  oldToNew.set(oldNum, newNum)
  console.log(
    `[^${oldNum}] -> [^${newNum}]: ${definitions.get(oldNum)?.substring(0, 50)}...`
  )
})

// 4. 본문의 각주 참조를 임시 플레이스홀더로 변경 (충돌 방지)
for (const [oldNum, newNum] of oldToNew) {
  const refRegex = new RegExp(`\\[\\^${oldNum}\\](?!:)`, 'g')
  content = content.replace(refRegex, `[^__TMP_${newNum}__]`)
}

// 5. 임시 플레이스홀더를 최종 번호로 변경
for (let i = 1; i <= refOrder.length; i++) {
  const tmpRegex = new RegExp(`\\[\\^__TMP_${i}__\\]`, 'g')
  content = content.replace(tmpRegex, `[^${i}]`)
}

// 6. 기존 각주 정의 블록 제거 (--- 구분선 포함)
content = content.replace(/\n---\n\n(\[\^\d+\]: .+\n\n?)+/g, '')

// 7. 파일 끝의 불필요한 빈 줄 정리
content = content.trimEnd() + '\n'

// 8. 새로운 순서로 각주 정의 추가
content += '\n---\n\n'
refOrder.forEach((oldNum, index) => {
  const newNum = index + 1
  const def = definitions.get(oldNum)
  if (def) {
    content += `[^${newNum}]: ${def}\n\n`
  }
})

content = content.trimEnd() + '\n'

fs.writeFileSync(filePath, content)
console.log('\n완료!')
