export type CourseStatus = 'active' | 'pending' | 'ended'

export interface SupervisionCourse {
  id: number
  course: string
  room: string
  roomType: string
  college: string
  teacher: string
  date: string
  time: string
  status: CourseStatus
  featured?: boolean
}

export interface SupervisionTab {
  label: string
  value: 'active' | 'today' | 'all'
}

export interface SelectOption {
  label: string
  value: string
}

export type ScheduleCourseTone = 'orange' | 'purple' | 'blue' | 'yellow' | 'green'

export interface ScheduleWeekDay {
  key: string
  weekday: string
  date: string
}

export interface ScheduleTimeSlot {
  id: number
  label: string
}

export interface ScheduleCourse {
  id: number
  title: string
  className: string
  teacher: string
  room: string
  dayIndex: number
  startSlot: number
  endSlot: number
  status: CourseStatus
  tone: ScheduleCourseTone
}

export const supervisionTabs: SupervisionTab[] = [
  { label: '上课中', value: 'active' },
  { label: '今日', value: 'today' },
  { label: '全部', value: 'all' },
]

export const courseTimeOptions: SelectOption[] = [
  { label: '第一节', value: '第一节' },
  { label: '第二节', value: '第二节' },
  { label: '第三节', value: '第三节' },
  { label: '第四节', value: '第四节' },
  { label: '第五节', value: '第五节' },
]

export const courseTypeOptions: SelectOption[] = [
  { label: '请选择', value: '' },
  { label: '智慧教室', value: 'smart' },
  { label: '普通教室', value: 'normal' },
  { label: '实验室', value: 'lab' },
]

const longCourseName = '高等数学线性代数（可能较长，预留较宽位置）'

const courseTemplates: Omit<SupervisionCourse, 'id'>[] = [
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-11',
    time: '08:00-09:40',
    status: 'active',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-11',
    time: '08:00-09:40',
    status: 'active',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-11',
    time: '08:00-09:40',
    status: 'active',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-11',
    time: '08:00-09:40',
    status: 'pending',
    featured: true,
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-10',
    time: '08:00-09:40',
    status: 'pending',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-10',
    time: '08:00-09:40',
    status: 'pending',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-10',
    time: '08:00-09:40',
    status: 'pending',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-10',
    time: '08:00-09:40',
    status: 'pending',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-10',
    time: '08:00-09:40',
    status: 'ended',
  },
  {
    course: longCourseName,
    room: '101-101教室',
    roomType: '智慧教室',
    college: '学院名称',
    teacher: '教员名字（职称）',
    date: '2026-05-10',
    time: '08:00-09:40',
    status: 'ended',
  },
]

export const supervisionCourses: SupervisionCourse[] = Array.from({ length: 800 }, (_, index) => {
  const template = courseTemplates[index % courseTemplates.length]

  return {
    ...template,
    id: index + 1,
    featured: index % courseTemplates.length === 3,
  }
})

export const scheduleRoomOptions: SelectOption[] = [
  { label: '101-101教室', value: '101-101教室' },
  { label: '102-203教室', value: '102-203教室' },
  { label: '201-智慧教室', value: '201-智慧教室' },
]

export const scheduleWeekDays: ScheduleWeekDay[] = [
  { key: 'mon', weekday: '星期一', date: '2026年5月6日' },
  { key: 'tue', weekday: '星期二', date: '2026年5月7日' },
  { key: 'wed', weekday: '星期三', date: '2026年5月8日' },
  { key: 'thu', weekday: '星期四', date: '2026年5月9日' },
  { key: 'fri', weekday: '星期五', date: '2026年5月10日' },
  { key: 'sat', weekday: '星期六', date: '2026年5月11日' },
  { key: 'sun', weekday: '星期日', date: '2026年5月12日' },
]

export const scheduleTimeSlots: ScheduleTimeSlot[] = [
  { id: 0, label: '08:00-08:45' },
  { id: 1, label: '08:55-09:40' },
  { id: 2, label: '10:20-11:05' },
  { id: 3, label: '11:15-12:00' },
  { id: 4, label: '14:30-15:15' },
  { id: 5, label: '15:25-16:10' },
  { id: 6, label: '16:20-17:05' },
]

export const scheduleCourses: ScheduleCourse[] = [
  {
    id: 1,
    title: '高等数学',
    className: '2026研一5班',
    teacher: '李老师(教授)',
    room: '101-101教室',
    dayIndex: 0,
    startSlot: 0,
    endSlot: 0,
    status: 'ended',
    tone: 'orange',
  },
  {
    id: 2,
    title: '大学英语',
    className: '2026研一5班',
    teacher: '李老师(教授)',
    room: '101-101教室',
    dayIndex: 0,
    startSlot: 4,
    endSlot: 4,
    status: 'pending',
    tone: 'purple',
  },
  {
    id: 3,
    title: '数学建模',
    className: '2026研一5班',
    teacher: '李老师(教授)',
    room: '101-101教室',
    dayIndex: 0,
    startSlot: 6,
    endSlot: 6,
    status: 'pending',
    tone: 'orange',
  },
  {
    id: 4,
    title: '课程名称课程名称课程名称',
    className: '班级',
    teacher: '教员',
    room: '101-101教室',
    dayIndex: 1,
    startSlot: 1,
    endSlot: 1,
    status: 'pending',
    tone: 'orange',
  },
  {
    id: 5,
    title: '高等数学',
    className: '2026研一5班',
    teacher: '李老师(教授)',
    room: '101-101教室',
    dayIndex: 1,
    startSlot: 3,
    endSlot: 3,
    status: 'pending',
    tone: 'orange',
  },
  {
    id: 6,
    title: '概率论与数理统计',
    className: '2026研一5班',
    teacher: '刘老师(教授)',
    room: '101-101教室',
    dayIndex: 1,
    startSlot: 4,
    endSlot: 5,
    status: 'pending',
    tone: 'blue',
  },
  {
    id: 7,
    title: '思想道德与法治',
    className: '2025研二3班',
    teacher: '刘老师(教授)',
    room: '101-101教室',
    dayIndex: 2,
    startSlot: 0,
    endSlot: 0,
    status: 'pending',
    tone: 'yellow',
  },
  {
    id: 8,
    title: '大学英语',
    className: '2025研二3班',
    teacher: '刘老师(教授)',
    room: '101-101教室',
    dayIndex: 2,
    startSlot: 5,
    endSlot: 5,
    status: 'pending',
    tone: 'purple',
  },
  {
    id: 9,
    title: '专业研讨',
    className: '2026研一5班',
    teacher: '何老师(教授)',
    room: '101-101教室',
    dayIndex: 3,
    startSlot: 0,
    endSlot: 1,
    status: 'pending',
    tone: 'blue',
  },
  {
    id: 10,
    title: '高等数学',
    className: '2025研二3班',
    teacher: '刘老师(副教授)',
    room: '101-101教室',
    dayIndex: 3,
    startSlot: 3,
    endSlot: 3,
    status: 'pending',
    tone: 'orange',
  },
  {
    id: 11,
    title: '形式与政策',
    className: '2026研一2班',
    teacher: '汪老师(教授)',
    room: '101-101教室',
    dayIndex: 4,
    startSlot: 2,
    endSlot: 2,
    status: 'active',
    tone: 'blue',
  },
  {
    id: 12,
    title: '人工智能基础',
    className: '2025研二3班',
    teacher: '刘老师(教授)',
    room: '101-101教室',
    dayIndex: 4,
    startSlot: 4,
    endSlot: 4,
    status: 'pending',
    tone: 'orange',
  },
  {
    id: 13,
    title: '思想道德与法治',
    className: '2025研二3班',
    teacher: '刘老师',
    room: '101-101教室',
    dayIndex: 5,
    startSlot: 3,
    endSlot: 3,
    status: 'pending',
    tone: 'green',
  },
  {
    id: 14,
    title: '思想道德与法治',
    className: '2025研二3班',
    teacher: '刘老师(教授)',
    room: '101-101教室',
    dayIndex: 5,
    startSlot: 0,
    endSlot: 0,
    status: 'pending',
    tone: 'yellow',
  },
  {
    id: 15,
    title: '专业研讨',
    className: '2025研二3班',
    teacher: '刘老师(教授)',
    room: '101-101教室',
    dayIndex: 6,
    startSlot: 1,
    endSlot: 1,
    status: 'pending',
    tone: 'orange',
  },
  {
    id: 16,
    title: '线性代数',
    className: '2026研一1班',
    teacher: '陈老师(副教授)',
    room: '102-203教室',
    dayIndex: 0,
    startSlot: 1,
    endSlot: 2,
    status: 'active',
    tone: 'blue',
  },
  {
    id: 17,
    title: '军事理论',
    className: '2025本三2班',
    teacher: '赵老师',
    room: '102-203教室',
    dayIndex: 3,
    startSlot: 4,
    endSlot: 4,
    status: 'pending',
    tone: 'green',
  },
  {
    id: 18,
    title: '实验设计',
    className: '2026研一3班',
    teacher: '孙老师(讲师)',
    room: '201-智慧教室',
    dayIndex: 2,
    startSlot: 2,
    endSlot: 3,
    status: 'pending',
    tone: 'purple',
  },
]
