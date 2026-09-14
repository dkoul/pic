export interface Answer {
  id: string;
  text: string;
  craftWeight: number;
  organizationWeight: number;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: 'You have a completely free Saturday. What sounds more rewarding?',
    answers: [
      { id: 'a', text: 'Learn something new and build something with it.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Meet people from different organizations and hear how they solve problems.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 2,
    text: 'You join a new company. What gives you confidence first?',
    answers: [
      { id: 'a', text: 'Knowing that I can solve difficult problems.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Knowing how to build relationships and understand how things get done.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 3,
    text: 'Your team faces a difficult problem nobody has solved before. Your first instinct is to:',
    answers: [
      { id: 'a', text: 'Dig into the problem and figure out how it works.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Bring the right people together and work out how to tackle it.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 4,
    text: 'Which compliment feels better?',
    answers: [
      { id: 'a', text: '"You really know your stuff."', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: '"You know how to get people moving."', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 5,
    text: 'A technology or skill you mastered is becoming obsolete. What bothers you most?',
    answers: [
      { id: 'a', text: 'Losing something I spent years mastering.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Losing the influence and position that came with being the expert.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 6,
    text: 'At a professional meetup, which conversation would most likely keep you engaged?',
    answers: [
      { id: 'a', text: '"Here\'s how I solved this problem."', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: '"Here\'s how I got three teams with different priorities to agree."', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 7,
    text: 'You discover a better way of doing something, but nobody has asked for it. What do you do?',
    answers: [
      { id: 'a', text: 'Experiment with it because I want to see whether it works.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'First understand who would benefit and whether the organization is ready for it.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 8,
    text: 'You are offered two career paths with similar pay. Which is more attractive?',
    answers: [
      { id: 'a', text: 'Become a recognized expert in a difficult field.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Take responsibility for a larger team or business area.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 9,
    text: 'During a crisis, what role do you naturally gravitate toward?',
    answers: [
      { id: 'a', text: 'The person solving the hardest problem.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'The person coordinating everyone solving the problem.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 10,
    text: 'You change companies. Which loss would be harder for you?',
    answers: [
      { id: 'a', text: 'Losing access to interesting technical or professional challenges.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Losing the relationships, reputation, and influence I built.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 11,
    text: 'A junior colleague asks for your help. What feels more satisfying?',
    answers: [
      { id: 'a', text: 'Teaching them how to solve the problem themselves.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Helping them understand how to navigate the organization.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 12,
    text: 'You disagree with a decision made by leadership. What bothers you more?',
    answers: [
      { id: 'a', text: 'That the decision is technically or professionally wrong.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'That the decision ignores the people and realities needed to execute it.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 13,
    text: 'Imagine you could never receive another promotion. What would still motivate you?',
    answers: [
      { id: 'a', text: 'Becoming exceptionally good at something.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Taking on increasingly complex responsibility and influence.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 14,
    text: 'Which book are you more likely to pick up?',
    answers: [
      { id: 'a', text: 'Something that teaches you a new skill or way of thinking.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Something about leadership, strategy, organizations, or human behavior.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 15,
    text: 'You attend a conference where nobody knows your title or company. What would make the day worthwhile?',
    answers: [
      { id: 'a', text: 'Discovering ideas that change how you practice your profession.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Meeting people whose perspectives and experiences broaden your world.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 16,
    text: 'Your organization goes through a major restructuring. What is your first thought?',
    answers: [
      { id: 'a', text: '"What skills do I need to develop for whatever comes next?"', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: '"Who are the key people and how will the new structure work?"', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 17,
    text: 'You are given a problem outside your formal job description. Which reaction is closer to yours?',
    answers: [
      { id: 'a', text: '"Interesting. I want to figure this out."', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: '"Who owns this, and how do we get the right people involved?"', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 18,
    text: 'What kind of recognition would mean more to you?',
    answers: [
      { id: 'a', text: 'Being regarded as exceptionally capable in your field.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'Being trusted with important decisions and responsibility.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 19,
    text: 'If your job title disappeared tomorrow, what would remain?',
    answers: [
      { id: 'a', text: 'My knowledge, skills, and ability to create value.', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: 'My relationships, judgment, and ability to influence outcomes.', craftWeight: 0, organizationWeight: 3 },
    ],
  },
  {
    id: 20,
    text: 'Ten years from now, which statement would make you prouder?',
    answers: [
      { id: 'a', text: '"I became extraordinarily good at something that mattered."', craftWeight: 3, organizationWeight: 0 },
      { id: 'b', text: '"I became someone who could bring people and organizations together to accomplish difficult things."', craftWeight: 0, organizationWeight: 3 },
    ],
  },
];
