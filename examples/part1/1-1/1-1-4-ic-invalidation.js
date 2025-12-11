/**
 * 인라인 캐싱 무효화 패턴 확인 예제
 *
 * 실행 방법:
 *   node --allow-natives-syntax examples/1-1/1-1-4-ic-invalidation.js
 *
 * V8 네이티브 함수 %HaveSameMap()을 사용하여 두 객체가
 * 같은 히든 클래스(Map)를 공유하는지 확인합니다.
 */

console.log('='.repeat(60))
console.log('패턴 1: 객체 생성 순서 불일치')
console.log('='.repeat(60))

function createUserNameFirst(name, age) {
  const user = {}
  user.name = name
  user.age = age
  return user
}

function createUserAgeFirst(name, age) {
  const user = {}
  user.age = age // 순서가 다름!
  user.name = name
  return user
}

const user1 = createUserNameFirst('Alice', 30)
const user2 = createUserNameFirst('Bob', 25)
const user3 = createUserAgeFirst('Charlie', 35)

console.log('user1: name → age 순서로 생성')
console.log('user2: name → age 순서로 생성 (user1과 동일)')
console.log('user3: age → name 순서로 생성 (순서 다름!)')
console.log('')
console.log('user1과 user2가 같은 Map 공유:', %HaveSameMap(user1, user2), '← 예상: true')
console.log('user1과 user3가 같은 Map 공유:', %HaveSameMap(user1, user3), '← 예상: false')

// ============================================================
console.log('\n' + '='.repeat(60))
console.log('패턴 2: 동적 속성 추가')
console.log('='.repeat(60))

function createProduct(data) {
  const product = { name: data.name }
  if (data.price !== undefined) {
    product.price = data.price
  }
  if (data.discount !== undefined) {
    product.discount = data.discount
  }
  return product
}

const p1 = createProduct({ name: 'A', price: 100 })
const p2 = createProduct({ name: 'B', price: 200, discount: 10 })
const p3 = createProduct({ name: 'C' })

console.log('p1: { name, price }')
console.log('p2: { name, price, discount }')
console.log('p3: { name }')
console.log('')
console.log('p1과 p2가 같은 Map 공유:', %HaveSameMap(p1, p2), '← 예상: false (속성 개수 다름)')
console.log('p1과 p3가 같은 Map 공유:', %HaveSameMap(p1, p3), '← 예상: false (속성 개수 다름)')

// ============================================================
console.log('\n' + '='.repeat(60))
console.log('패턴 3: delete 연산자')
console.log('='.repeat(60))

const obj1 = { x: 1, y: 2, z: 3 }
const obj2 = { x: 4, y: 5, z: 6 }

console.log('obj1: { x: 1, y: 2, z: 3 }')
console.log('obj2: { x: 4, y: 5, z: 6 }')
console.log('')
console.log('delete 전 - obj1과 obj2가 같은 Map 공유:', %HaveSameMap(obj1, obj2), '← 예상: true')

delete obj2.y

console.log('')
console.log('delete obj2.y 실행 후...')
console.log('')
console.log('delete 후 - obj1과 obj2가 같은 Map 공유:', %HaveSameMap(obj1, obj2), '← 예상: false')

console.log('\n' + '='.repeat(60))
console.log('결론: 세 가지 패턴 모두 히든 클래스 분기를 발생시켜')
console.log('      인라인 캐싱 효율을 떨어뜨립니다.')
console.log('='.repeat(60))
