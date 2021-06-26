import request from '../utils/rerquest'
// 树组织
export function getDeptTree() {
  return request({
    url: `api/admin/getDeptTree`,
    method: 'GET',
  })
}

/**
 *
 * @param {Number} pageIndex 页码
 * @param {Number} pageSize 页容量
 * @param {string} serviceTag 服务标签
 * @param {string} mobile 手机号
 * @param {string} realName 姓名
 * @param {string} partyOrganizationId 所属组织id
 */
export function getPartyMembers(params) {
  return request({
    url: 'api/work/user/getPartyMembers',
    method: 'POST',
    options: params,
  })
}
