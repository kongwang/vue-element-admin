import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/tasks',
    method: 'get',
    params: query
  })
}

export function fetchTask(taskId) {
  return request({
    url: '/tasks/' + taskId + '/info',
    method: 'get'
  })
}

export function stopTask(taskId) {
  return request({
    url: '/tasks/' + taskId + '/stop',
    method: 'put'
  })
}

export function startTask(taskId) {
  return request({
    url: '/tasks/' + taskId + '/start',
    method: 'put'
  })
}

export function removeTask(taskId) {
  return request({
    url: '/tasks/' + taskId + '/remove',
    method: 'put'
  })
}

export function createTask(taskInfo) {
  return request({
    url: '/tasks',
    method: 'post',
    data: taskInfo
  })
}

export function updateTask(taskInfo) {
  return request({
    url: '/tasks/' + taskInfo.uuid,
    method: 'put',
    data: taskInfo
  })
}
