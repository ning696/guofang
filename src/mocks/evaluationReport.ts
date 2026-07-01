export interface EvaluationRankingItem {
  rank: number
  name: string
  score: number
}

export interface EvaluationReportMetric {
  id: 'reviewTotal' | 'courseTotal' | 'teacherTotal' | 'courseRate' | 'teacherRate'
  value: string
  label: string
}

export interface EvaluationReportChartItem {
  academy: string
  reviewTotal: number
  courseTotal: number
  teacherTotal: number
}

export const evaluationReportDateRange = {
  start: '2026-04-16',
  end: '2026-05-16',
}

export const teacherEvaluationRankings: EvaluationRankingItem[] = [
  { rank: 1, name: '李姓名', score: 94.5 },
  { rank: 2, name: '吴姓名', score: 92.4 },
  { rank: 3, name: '刘姓名', score: 91.5 },
  { rank: 4, name: '张姓名', score: 90.5 },
  { rank: 5, name: '欧阳姓名', score: 90.2 },
  { rank: 6, name: '李姓名', score: 89.5 },
  { rank: 7, name: '齐姓名', score: 89.2 },
  { rank: 8, name: '朱姓名', score: 88.3 },
  { rank: 9, name: '刘姓名', score: 88.1 },
  { rank: 10, name: '张姓名', score: 87.5 },
]

export const courseEvaluationRankings: EvaluationRankingItem[] = [
  { rank: 1, name: '线性代数', score: 93.5 },
  { rank: 2, name: '高等数学', score: 91.4 },
  { rank: 3, name: '概率论与数理统计', score: 90.5 },
  { rank: 4, name: '人工智能基础课程名称', score: 90.2 },
  { rank: 5, name: '课程名称', score: 89.5 },
  { rank: 6, name: '课程名称课程名称', score: 88.5 },
  { rank: 7, name: '课程名称课程名称课程名称课程名称', score: 88.3 },
  { rank: 8, name: '课程名称课程名称课程名称', score: 88.1 },
  { rank: 9, name: '课程名称', score: 87.5 },
  { rank: 10, name: '课程名称课程名称', score: 87.4 },
]

export const evaluationReportMetrics: EvaluationReportMetric[] = [
  { id: 'reviewTotal', value: '1211', label: '评价总次数' },
  { id: 'courseTotal', value: '521', label: '评价课程总数' },
  { id: 'teacherTotal', value: '690', label: '被评教员总数' },
  { id: 'courseRate', value: '51%', label: '被评课程总占比' },
  { id: 'teacherRate', value: '61%', label: '被评教员总占比' },
]

export const evaluationReportChartData: EvaluationReportChartItem[] = [
  { academy: '学院A', reviewTotal: 116, courseTotal: 50, teacherTotal: 66 },
  { academy: '学院B', reviewTotal: 153, courseTotal: 64, teacherTotal: 89 },
  { academy: '学院C', reviewTotal: 124, courseTotal: 31, teacherTotal: 93 },
  { academy: '学院D', reviewTotal: 199, courseTotal: 133, teacherTotal: 66 },
  { academy: '学院E', reviewTotal: 136, courseTotal: 69, teacherTotal: 67 },
  { academy: '学院F', reviewTotal: 116, courseTotal: 87, teacherTotal: 29 },
  { academy: '学院G', reviewTotal: 225, courseTotal: 98, teacherTotal: 127 },
  { academy: '学院H', reviewTotal: 116, courseTotal: 50, teacherTotal: 66 },
  { academy: '学院I', reviewTotal: 201, courseTotal: 127, teacherTotal: 74 },
  { academy: '学院J', reviewTotal: 167, courseTotal: 69, teacherTotal: 98 },
]
