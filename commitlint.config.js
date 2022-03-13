module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则
  roles: {
    // type类型定义：表示git提交的type必须在以下类型范围之内
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build'
      ]
    ],
    // subject 大小写不校验
    'subject-case': [0]
  }
}
