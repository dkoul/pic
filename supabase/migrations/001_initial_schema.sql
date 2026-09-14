-- Professional Identity Compass — Initial Schema

-- Questions table (seeded from application)
create table if not exists questions (
  id integer primary key,
  question_text text not null,
  display_order integer not null,
  active boolean not null default true
);

create table if not exists answers (
  id text not null,
  question_id integer not null references questions(id) on delete cascade,
  answer_text text not null,
  craft_weight integer not null default 0,
  organization_weight integer not null default 0,
  display_order integer not null,
  primary key (id, question_id)
);

create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  craft_score integer not null,
  organization_score integer not null,
  profile text not null,
  reflection text,
  public_id text unique
);

create table if not exists assessment_answers (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references assessments(id) on delete cascade,
  question_id integer not null,
  answer_id text not null
);

-- Indexes
create index if not exists idx_assessments_user_id on assessments(user_id);
create index if not exists idx_assessments_public_id on assessments(public_id);
create index if not exists idx_assessment_answers_assessment_id on assessment_answers(assessment_id);

-- Row Level Security
alter table assessments enable row level security;
alter table assessment_answers enable row level security;

-- Users can create their own assessments
create policy "Users can insert own assessments"
  on assessments for insert
  with check (auth.uid() = user_id);

-- Users can read their own assessments
create policy "Users can read own assessments"
  on assessments for select
  using (auth.uid() = user_id);

-- Public share links via public_id (read-only, no answers exposed)
create policy "Anyone can read shared assessments"
  on assessments for select
  using (public_id is not null);

-- Users can update their own reflection
create policy "Users can update own assessments"
  on assessments for update
  using (auth.uid() = user_id);

-- Users can delete their own assessments
create policy "Users can delete own assessments"
  on assessments for delete
  using (auth.uid() = user_id);

-- Assessment answers: users can insert for their own assessments
create policy "Users can insert own assessment answers"
  on assessment_answers for insert
  with check (
    exists (
      select 1 from assessments
      where assessments.id = assessment_answers.assessment_id
      and assessments.user_id = auth.uid()
    )
  );

-- Users can read their own assessment answers
create policy "Users can read own assessment answers"
  on assessment_answers for select
  using (
    exists (
      select 1 from assessments
      where assessments.id = assessment_answers.assessment_id
      and assessments.user_id = auth.uid()
    )
  );

-- Users can delete their own assessment answers
create policy "Users can delete own assessment answers"
  on assessment_answers for delete
  using (
    exists (
      select 1 from assessments
      where assessments.id = assessment_answers.assessment_id
      and assessments.user_id = auth.uid()
    )
  );
