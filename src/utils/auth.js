// 获取当前权限
export function getCurrentAuthority() {
  return ['admin'];
}
// 传入的权限是将要到达的路由所要求的权限
// 如果当前的角色没有包含在传入的权限内，说明不符合权限
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}
// 只要不是 guest 就代表了已登录，例如 user、admin
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== 'guest';
}
