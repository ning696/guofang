export type CategoryStatus = 'enabled' | 'disabled'

export interface EvaluationCategory {
  id: number
  name: string
  userGroup: string
  createdAt: string
  updatedAt: string
  status: CategoryStatus
}

const referenceCategories: EvaluationCategory[] = [
  {
    id: 1,
    name: '测试组',
    userGroup: '督导组',
    createdAt: '2026-04-14 17:05',
    updatedAt: '--',
    status: 'enabled',
  },
  {
    id: 2,
    name: '督导组',
    userGroup: '督导组',
    createdAt: '2026-04-14 15:05',
    updatedAt: '2026-04-14 17:05',
    status: 'enabled',
  },
  {
    id: 3,
    name: '实习组',
    userGroup: '学生组',
    createdAt: '2026-04-14 13:05',
    updatedAt: '2026-04-14 17:05',
    status: 'disabled',
  },
]

const categoryNames = ['测试组', '督导组', '实训组', '课堂组', '教研组', '课程组']
const userGroups = ['督导组', '学生组', '教师组']

export const evaluationCategories: EvaluationCategory[] = Array.from({ length: 800 }, (_, index) => {
  if (index < referenceCategories.length) {
    return referenceCategories[index]
  }

  const day = String(14 - (index % 6)).padStart(2, '0')
  const hour = String(17 - (index % 8)).padStart(2, '0')
  const minute = String((index * 5) % 60).padStart(2, '0')

  return {
    id: index + 1,
    name: categoryNames[index % categoryNames.length],
    userGroup: userGroups[index % userGroups.length],
    createdAt: `2026-04-${day} ${hour}:${minute}`,
    updatedAt: index % 5 === 0 ? '--' : `2026-04-14 17:${minute}`,
    status: index % 7 === 0 ? 'disabled' : 'enabled',
  }
})
