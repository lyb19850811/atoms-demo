import { describe, it, expect, beforeEach } from 'vitest'
import { getCurrentUser, setCurrentUser, clearCurrentUser, isOnboarded, markOnboarded } from '../user.js'

beforeEach(() => {
  localStorage.clear()
})

describe('用户状态', () => {
  it('setCurrentUser 后 getCurrentUser 可读取', () => {
    setCurrentUser({ id: 'u1', nickname: '张三' })
    expect(getCurrentUser()).toEqual({ id: 'u1', nickname: '张三' })
  })

  it('clearCurrentUser 清除用户', () => {
    setCurrentUser({ id: 'u1', nickname: '张三' })
    clearCurrentUser()
    expect(getCurrentUser()).toBeNull()
  })

  it('无数据时 getCurrentUser 返回 null', () => {
    expect(getCurrentUser()).toBeNull()
  })
})

describe('首次引导标记', () => {
  it('默认未看过，标记后已看过', () => {
    expect(isOnboarded()).toBe(false)
    markOnboarded()
    expect(isOnboarded()).toBe(true)
  })
})
