export interface TeachingBuilding {
  id: string
  name: string
}

export type ClassroomPatrolStatus = 'active' | 'empty'

export interface ClassroomPatrolCard {
  room: string
  status: ClassroomPatrolStatus
  course?: string
  teacher?: string
  time?: string
  selected?: boolean
}

export const classroomPatrolMeta = {
  defaultBuildingId: 'second',
  currentTime: '',
}

export const teachingBuildings: TeachingBuilding[] = [
  { id: 'first', name: '第一教学楼' },
  { id: 'second', name: '第二教学楼' },
  { id: '101', name: '101教学楼' },
  { id: '102', name: '102教学楼' },
  { id: '103', name: '103教学楼' },
  { id: 'training', name: '实验实训大楼' },
  { id: 'info', name: '信息综合大楼' },
]

export const classroomPatrolCards: ClassroomPatrolCard[] = [
  {
    room: 'A-101',
    status: 'active',
    course: '人工智能基础',
    teacher: '李老师',
    time: '08:00 - 09:40（1-2节）',
  },
  {
    room: 'A-102',
    status: 'empty',
  },
  {
    room: 'A-103',
    status: 'active',
    course: '人工智能基础',
    teacher: '王副主',
    time: '08:00 - 09:40（1-2节）',
    selected: true,
  },
  {
    room: 'A-104',
    status: 'empty',
  },
  {
    room: 'A-105',
    status: 'active',
    course: '人工智能基础',
    teacher: '陈教授',
    time: '08:00 - 09:40（1-2节）',
  },
  {
    room: 'A-106',
    status: 'active',
    course: '人工智能基础',
    teacher: '刘老师',
    time: '08:00 - 09:40（1-2节）',
  },
]

export interface ClassroomLiveMetric {
  label: string
  value: string | number
}

export interface ClassroomLiveMetricRow {
  label: string
  tone: 'interact' | 'listen' | 'question' | 'process'
  metrics: ClassroomLiveMetric[]
}
export interface ClassroomLiveMessage {
  author: string
  time: string
  content: string
}

export const classroomLiveMessages = [
  {
    author: '黄凯文',
    time: '2026-4-8 12:03',
    content: '板书内容很丰富！',
  },
  {
    author: '张玮',
    time: '2026-4-8 12:03',
    content: '逻辑清晰，重点明确，受益匪浅~',
  },
  {
    author: '李涵',
    time: '2026-4-8 12:03',
    content: '课堂内容充实，讲解细致，能把复杂知识点讲得通俗易懂。',
  },
  {
    author: '刘佳佳',
    time: '2026-4-8 12:03',
    content: '理论结合实际，实用性很强，非常值得一听。',
  },
  {
    author: '徐梦丽',
    time: '2026-4-8 12:03',
    content: '老师讲的很好~',
  },
] satisfies ClassroomLiveMessage[]

export const classroomLiveDetail = {
  course: '概率论与数理统计',
  teacher: '李老师',
  className: '大一20班',
  room: '103-201',
  onlineCount: 1,
  controlTabs: ['在线评价', '球机', '半球机', '常态化录播'],
  activeControlTab: '在线评价',
  metricRows: [
    {
      label: '互动',
      tone: 'interact',
      metrics: [
        { value: 14, label: '课堂互动次数' },
        { value: 5, label: '课件发布次数' },
        { value: '100%', label: '出勤率' },
      ],
    },
    {
      label: '抢答',
      tone: 'listen',
      metrics: [
        { value: 27, label: '累计发言学生数' },
        { value: 4, label: '参与抢答人次' },
        { value: '99%', label: '抢答平均参与率' },
      ],
    },
    {
      label: '提问',
      tone: 'question',
      metrics: [
        { value: 3, label: '累计发布提问次数' },
        { value: 7, label: '累计随堂提问次数' },
        { value: 20, label: '累计点名提问次数' },
      ],
    },
    {
      label: '互动答题',
      tone: 'process',
      metrics: [
        { value: 10, label: '累计发布个数' },
        { value: 12, label: '答题总数' },
        { value: '45%', label: '平均参与率' },
        { value: '98%', label: '平均正确率' },
      ],
    },
  ] satisfies ClassroomLiveMetricRow[],
}