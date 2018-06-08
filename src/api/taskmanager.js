import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/taskmanager/tasks',
    method: 'get',
    query
  })
}

export function fetchTask(taskId) {
  return request({
    url: '/taskmanager/{taskId}/info',
    method: 'get',
    params: { taskId }
  })
}

export function stopTask(taskId) {
  return request({
    url: '/taskmanager/{taskId}/stop',
    method: 'put',
    params: { taskId }
  })
}

export function startTask(taskId) {
  return request({
    url: '/taskmanager/{taskId}/start',
    method: 'put'
  })
}

export function removeTask(taskId) {
  return request({
    url: '/taskmanager/{taskId}/remove',
    method: 'put'
  })
}

export function createTask(taskInfo) {
  return request({
    url: '/taskmanager/create',
    method: 'post',
    taskInfo
  })
}

export function updateTask(taskInfo) {
  return request({
    url: '/taskmanager/{taskId}/modify',
    method: 'post',
    taskInfo
  })
}
