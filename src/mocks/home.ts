export interface Classroom {
  name: string
  tone: 'blue' | 'cyan' | 'violet'
}

export interface PatrolRecord {
  course: string
  teacher: string
  room: string
  dimmed?: boolean
}

export interface StatCard {
  label: string
  value: number
  type: 'patrol' | 'teacher' | 'review'
}

export interface SupervisionAction {
  title: string
  type: 'lesson' | 'schedule'
}

export const classrooms: Classroom[] = [
  { name: 'A-101', tone: 'blue' },
  { name: '102-207', tone: 'cyan' },
  { name: '信息大楼', tone: 'violet' },
  { name: '101-201', tone: 'blue' },
  { name: '102-305', tone: 'cyan' },
  { name: '实训楼A座', tone: 'violet' },
  { name: 'B-201', tone: 'blue' },
  { name: '103-401', tone: 'cyan' },
  { name: '工程楼C栋', tone: 'violet' },
  { name: '101-203', tone: 'blue' },
  { name: '101-301', tone: 'cyan' },
  { name: '工程实训楼', tone: 'violet' },
  { name: '103-306', tone: 'blue' },
  { name: '第一教学楼', tone: 'cyan' },
  { name: 'D-102', tone: 'violet' },
  { name: '201-305', tone: 'blue' },
  { name: '综合楼', tone: 'cyan' },
  { name: 'E-401', tone: 'violet' },
  { name: '202-101', tone: 'blue' },
  { name: '实验楼', tone: 'cyan' },
  { name: 'F-203', tone: 'violet' },
  { name: '203-402', tone: 'blue' },
  { name: '图书馆', tone: 'cyan' },
  { name: 'G-301', tone: 'violet' },
  { name: '204-105', tone: 'blue' },
  { name: '行政楼', tone: 'cyan' },
  { name: 'H-202', tone: 'violet' },
  { name: '205-306', tone: 'blue' },
  { name: '科技楼', tone: 'cyan' },
  { name: 'I-401', tone: 'violet' },
  { name: '206-201', tone: 'blue' },
  { name: '艺术楼', tone: 'cyan' },
  { name: 'J-103', tone: 'violet' },
  { name: '207-405', tone: 'blue' },
  { name: '体育馆', tone: 'cyan' },
  { name: 'K-204', tone: 'violet' },
]

export const recentPatrols: PatrolRecord[] = [
  { course: '人工智能大数据基础', teacher: '教师名称', room: '教室名称' },
  { course: '概率论与数理统计', teacher: '教师名称', room: '教室名称' },
  { course: '高等数学', teacher: '刘教授', room: '101-101教室' },
  { course: '实验实训大楼', teacher: '', room: '102-207教室' },
  { course: '高等数学', teacher: '刘教授', room: '101-101教室' },
  { course: '线性代数', teacher: '张教授', room: 'A-201教室' },
  { course: '计算机网络', teacher: '王老师', room: '实训楼B-305' },
  { course: '数据结构与算法', teacher: '李教授', room: '信息大楼301' },
  { course: '操作系统原理', teacher: '赵老师', room: '102-401教室' },
  { course: '软件工程', teacher: '陈教授', room: 'C-103教室' },
  { course: '数据库系统', teacher: '刘老师', room: '工程楼205' },
  { course: 'Web前端开发', teacher: '杨教授', room: 'D-307教室' },
]

export const stats: StatCard[] = [
  { label: '巡课次数', value: 139, type: 'patrol' },
  { label: '评价教师数量', value: 36, type: 'teacher' },
  { label: '评价次数', value: 95, type: 'review' },
]

export const supervisionActions: SupervisionAction[] = [
  { title: '今日课表', type: 'schedule' },
  { title: '上课中课程', type: 'lesson' },
]
