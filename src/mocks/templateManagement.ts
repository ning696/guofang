export type TemplateStatus = 'enabled' | 'disabled'

export interface TemplateCategoryOption {
  label: string
  value: string
}

export interface EvaluationTemplate {
  id: number
  name: string
  category: string
  createdAt: string
  updatedAt: string
  status: TemplateStatus
}

export const templateCategoryOptions: TemplateCategoryOption[] = [
  { label: '督导专家', value: '督导专家' },
  { label: '同行评价', value: '同行评价' },
  { label: '学生评价', value: '学生评价' },
]

const referenceTemplates: EvaluationTemplate[] = [
  {
    id: 1,
    name: '研究生课堂教学质量评估（军校野外教学）',
    category: '督导专家',
    createdAt: '2026-04-14 17:05',
    updatedAt: '--',
    status: 'enabled',
  },
  {
    id: 2,
    name: '研究生课堂教学质量评估（高等数学）',
    category: '督导专家',
    createdAt: '2026-04-14 15:05',
    updatedAt: '2026-04-14 17:05',
    status: 'enabled',
  },
  {
    id: 3,
    name: '研究生课堂教学质量评估（高等数学）',
    category: '督导专家',
    createdAt: '2026-04-14 13:05',
    updatedAt: '2026-04-14 17:05',
    status: 'disabled',
  },
]

const courseNames = [
  '高等数学',
  '线性代数',
  '概率论与数理统计',
  '大学物理',
  '人工智能基础',
  '数据结构',
]

export const evaluationTemplates: EvaluationTemplate[] = Array.from({ length: 800 }, (_, index) => {
  if (index < referenceTemplates.length) {
    return referenceTemplates[index]
  }

  const category = templateCategoryOptions[index % templateCategoryOptions.length].value
  const courseName = courseNames[index % courseNames.length]
  const day = String(14 - (index % 6)).padStart(2, '0')
  const hour = String(17 - (index % 8)).padStart(2, '0')
  const minute = String((index * 5) % 60).padStart(2, '0')

  return {
    id: index + 1,
    name: `研究生课堂教学质量评估（${courseName}）`,
    category,
    createdAt: `2026-04-${day} ${hour}:${minute}`,
    updatedAt: index % 5 === 0 ? '--' : `2026-04-14 17:${minute}`,
    status: index % 7 === 0 ? 'disabled' : 'enabled',
  }
})
