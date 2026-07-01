export type IndicatorStatus = 'enabled' | 'disabled'

export interface EvaluationIndicator {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  status: IndicatorStatus
}

const referenceIndicators: EvaluationIndicator[] = [
  {
    id: 1,
    name: '学习效果',
    createdAt: '2026-04-14 17:05',
    updatedAt: '--',
    status: 'enabled',
  },
  {
    id: 2,
    name: '教学组织',
    createdAt: '2026-04-14 15:05',
    updatedAt: '2026-04-14 17:05',
    status: 'enabled',
  },
  {
    id: 3,
    name: '教学方法',
    createdAt: '2026-04-14 13:05',
    updatedAt: '2026-04-14 17:05',
    status: 'disabled',
  },
]

const indicatorNames = ['学习效果', '教学组织', '教学方法', '教学内容', '教学态度', '课堂互动']

export const evaluationIndicators: EvaluationIndicator[] = Array.from({ length: 800 }, (_, index) => {
  if (index < referenceIndicators.length) {
    return referenceIndicators[index]
  }

  const day = String(14 - (index % 6)).padStart(2, '0')
  const hour = String(17 - (index % 8)).padStart(2, '0')
  const minute = String((index * 5) % 60).padStart(2, '0')

  return {
    id: index + 1,
    name: indicatorNames[index % indicatorNames.length],
    createdAt: `2026-04-${day} ${hour}:${minute}`,
    updatedAt: index % 5 === 0 ? '--' : `2026-04-14 17:${minute}`,
    status: index % 7 === 0 ? 'disabled' : 'enabled',
  }
})
