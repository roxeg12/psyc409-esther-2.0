// Centralized navigation configuration with sub-items

export interface NavigationSubItem {
  label: string
  path?: string
  onClick?: () => void
}

export interface NavigationConfig {
  label: string
  path: string
  subItems: NavigationSubItem[]
}

export const navigationConfig: NavigationConfig[] = [
  {
    label: 'Academics',
    path: '/academics',
    subItems: [
      { label: 'Grades', path: '/academics/grades' },
      { label: 'Classes', path: '/academics/classes' },
      { label: 'Degree', path: '/academics/degree' },
      { label: 'Graduation' }
    ]
  },
  {
    label: 'Registration',
    path: '/registration',
    subItems: [
      { label: 'Register for Classes' },
      { label: 'View Schedule' },
      { label: 'Plan Ahead' },
      { label: 'Course Catalog' },
      { label: 'Registration Timeline' }
    ]
  },
  {
    label: 'Finances',
    path: '/finances',
    subItems: [
      { label: 'Bill Payment Suite' },
      { label: 'Financial Aid' }
    ]
  },
  {
    label: 'Personal Information',
    path: '/personal',
    subItems: [
      { label: 'Student Profile' },
      { label: 'Parent/Guardian and Emergency Contact Information' },
      { label: 'Name Pronunciation' },
      { label: 'Manage Directory Information' },
      { label: 'E-Questionnaires' }
    ]
  },
  {
    label: 'Resources',
    path: '/resources',
    subItems: [
      { label: 'Academic Resources' },
      { label: 'Student Life' },
      { label: 'Housing and Dining' },
      { label: 'Emergency Services' },
      { label: 'CLIC' }
    ]
  }
]

