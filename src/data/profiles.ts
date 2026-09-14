export type ProfileType = 'builder' | 'navigator' | 'integrator' | 'operator';

export interface Profile {
  id: ProfileType;
  name: string;
  tagline: string;
  description: string;
  environments: string[];
  watchOut: string;
  blindSpot: string;
  reflectionQuestion: string;
  shareSummary: string;
}

export const profiles: Record<ProfileType, Profile> = {
  builder: {
    id: 'builder',
    name: 'The Builder',
    tagline: 'High Craft / Lower Organization',
    description:
      'Your answers suggest that you derive much of your professional value from mastery and capability. You are likely to seek environments where you can learn, experiment, solve difficult problems, and exchange ideas with people who share your interests.',
    environments: [
      'Practitioner communities',
      'Technical meetups',
      'Workshops',
      'Research',
      'Open source',
      'Hands-on projects',
    ],
    watchOut: 'You may underestimate relationships, influence, and organizational context.',
    blindSpot: 'You may sometimes treat organizational problems as technical problems.',
    reflectionQuestion:
      'If your job title, company, and salary disappeared tomorrow, what professional capability would still make you feel valuable?',
    shareSummary:
      'I find professional meaning primarily through mastery, learning and making things work.',
  },
  navigator: {
    id: 'navigator',
    name: 'The Navigator',
    tagline: 'Lower Craft / High Organization',
    description:
      'Your answers suggest that you derive much of your professional value from people, responsibility, and influence. You are comfortable navigating ambiguity and coordinating people toward outcomes.',
    environments: [
      'Leadership communities',
      'Strategy',
      'Program management',
      'Transformation',
      'Executive forums',
      'Organizational design',
    ],
    watchOut:
      'You may underestimate how much deep craft knowledge creates credibility and innovation.',
    blindSpot:
      'You may sometimes assume influence will carry the day when deep expertise is what the situation actually needs.',
    reflectionQuestion:
      'If your network and title disappeared tomorrow, what would you still trust yourself to do?',
    shareSummary:
      'I find professional meaning primarily through people, responsibility, and influence.',
  },
  integrator: {
    id: 'integrator',
    name: 'The Integrator',
    tagline: 'High Craft / High Organization',
    description:
      'Your answers suggest you want both mastery and influence. You don\'t just want to understand how things work — you want to shape the environment in which they work.',
    environments: [
      'Technical leadership',
      'Architecture',
      'Engineering management',
      'Product engineering',
      'Transformation',
      'AI leadership',
    ],
    watchOut:
      'You may try to carry both the technical problem and the organizational problem simultaneously.',
    blindSpot:
      'You may spread yourself thin trying to be the expert and the coordinator at the same time.',
    reflectionQuestion:
      'When both mastery and influence matter, which do you reach for first — and why?',
    shareSummary:
      'I find professional meaning through both mastery and the ability to shape how work gets done.',
  },
  operator: {
    id: 'operator',
    name: 'The Operator',
    tagline: 'Lower Craft / Lower Organization',
    description:
      'Your answers suggest your professional identity may be less strongly tied to either mastery or organizational status. You may place greater emphasis on execution, stability, balance, or other sources of meaning.',
    environments: [
      'Stable operational roles',
      'Process-oriented teams',
      'Reliable execution',
      'Work-life balance',
      'Practical contribution',
    ],
    watchOut:
      'This is not a lesser profile — you may be less attached to professional identity and therefore more adaptable when roles and organizations change.',
    blindSpot:
      'You may undervalue how much your steadiness and reliability matter to the people around you.',
    reflectionQuestion:
      'Beyond titles and expertise, what gives your work meaning day to day?',
    shareSummary:
      'I find professional meaning in steady contribution, balance, and getting things done.',
  },
};
