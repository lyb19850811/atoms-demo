import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ChatPanel from '../components/ChatPanel.jsx'

const baseProps = {
  messages: [],
  generating: false,
  thinkingText: '',
  phase: null,
  samples: [],
  onSend: () => {}
}

describe('ChatPanel', () => {
  it('带思考过程的助手消息显示「思考过程」折叠块', () => {
    render(<ChatPanel {...baseProps} messages={[{ role: 'assistant', content: '已生成', thinking: '功能设计：xxx' }]} />)
    expect(screen.getByText(/思考过程/)).toBeInTheDocument()
    expect(screen.getByText('已生成')).toBeInTheDocument()
  })

  it('用户消息不显示思考过程块', () => {
    render(<ChatPanel {...baseProps} messages={[{ role: 'user', content: '做一个番茄钟' }]} />)
    expect(screen.queryByText(/思考过程/)).not.toBeInTheDocument()
    expect(screen.getByText('做一个番茄钟')).toBeInTheDocument()
  })
})
