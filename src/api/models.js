
import { createAPI } from '@/utils/request'

// 获取车辆分页信息列表

export const getSimleType = data => createAPI(`/truckType/page`, 'get', data)

// 添加车辆类型

export const addSimleType = data => createAPI(`/truckType`, 'post', data)

// 删除车辆类型

export const delSimleType = id => createAPI(`/truckType/${id}`, 'delete', id)

// 获取车辆类型详情

export const getTruckTypeId = data => createAPI(`/truckType/${data.id}`, 'get', data)

// 更新车辆类型
export const updateSimleType = (data) => createAPI(`/truckType/${data.id}`, 'put', data)

// 获取车辆类型下拉
export const getSimleList = data => createAPI(`/truckType/simple`, 'get', data)
