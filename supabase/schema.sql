create table if not exists public.animal_results (
  result_id text primary key,
  visitor_id text not null,
  session_id text,
  created_at timestamptz not null,
  received_at timestamptz not null default now(),
  primary_animal text,
  primary_animal_name text,
  secondary_animal text,
  secondary_animal_name text,
  match integer,
  second_match integer,
  scores jsonb not null default '{}'::jsonb,
  raw_scores jsonb not null default '{}'::jsonb,
  duration_seconds integer,
  is_mixed boolean not null default false,
  is_balanced boolean not null default false,
  dominant_dimension text,
  max_streak integer,
  answers jsonb not null default '{}'::jsonb,
  ip_hash text
);

create index if not exists animal_results_created_at_idx
  on public.animal_results (created_at desc);

create index if not exists animal_results_primary_animal_idx
  on public.animal_results (primary_animal);

create index if not exists animal_results_visitor_id_idx
  on public.animal_results (visitor_id);

alter table public.animal_results enable row level security;

grant usage on schema public to service_role;
grant select, insert, update, delete on public.animal_results to service_role;
