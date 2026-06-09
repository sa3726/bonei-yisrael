-- PROFILES (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  full_name text,
  phone text,
  family_size int,
  address text,
  status text default 'Exploring', -- Exploring, Interested, Committed
  role text default 'member', -- member, admin
  notes text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- EVENTS
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  date date,
  time text,
  location text,
  capacity int,
  status text default 'Upcoming',
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- EVENT REGISTRATIONS
create table if not exists event_registrations (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(event_id, user_id)
);

-- COMMUNICATIONS
create table if not exists communications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text default 'Announcement', -- Announcement, Newsletter
  body text,
  status text default 'Draft', -- Draft, Sent
  sent_at timestamptz,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- DONATIONS
create table if not exists donations (
  id uuid default gen_random_uuid() primary key,
  donor_name text,
  donor_email text,
  amount numeric not null,
  campaign text default 'General Fund',
  anonymous boolean default false,
  notes text,
  date date default current_date,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- FORUM THREADS
create table if not exists forum_threads (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  category text default 'General',
  pinned boolean default false,
  author_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now()
);

-- FORUM REPLIES
create table if not exists forum_replies (
  id uuid default gen_random_uuid() primary key,
  thread_id uuid references forum_threads(id) on delete cascade,
  body text not null,
  author_id uuid references profiles(id) on delete cascade,
  created_at timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table events enable row level security;
alter table event_registrations enable row level security;
alter table communications enable row level security;
alter table donations enable row level security;
alter table forum_threads enable row level security;
alter table forum_replies enable row level security;

-- Policies: logged-in users can read everything
create policy "Members can read profiles" on profiles for select using (auth.role() = 'authenticated');
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Members can read events" on events for select using (auth.role() = 'authenticated');
create policy "Admins can insert events" on events for insert with check (auth.role() = 'authenticated');
create policy "Admins can update events" on events for update using (auth.role() = 'authenticated');

create policy "Members can read registrations" on event_registrations for select using (auth.role() = 'authenticated');
create policy "Members can register" on event_registrations for insert with check (auth.uid() = user_id);
create policy "Members can unregister" on event_registrations for delete using (auth.uid() = user_id);

create policy "Members can read comms" on communications for select using (auth.role() = 'authenticated');
create policy "Admins can manage comms" on communications for insert with check (auth.role() = 'authenticated');

create policy "Members can read donations" on donations for select using (auth.role() = 'authenticated');
create policy "Admins can manage donations" on donations for insert with check (auth.role() = 'authenticated');

create policy "Members can read threads" on forum_threads for select using (auth.role() = 'authenticated');
create policy "Members can post threads" on forum_threads for insert with check (auth.uid() = author_id);
create policy "Authors can update threads" on forum_threads for update using (auth.uid() = author_id);

create policy "Members can read replies" on forum_replies for select using (auth.role() = 'authenticated');
create policy "Members can post replies" on forum_replies for insert with check (auth.uid() = author_id);
create policy "Authors can update replies" on forum_replies for update using (auth.uid() = author_id);
create policy "Authors can delete replies" on forum_replies for delete using (auth.uid() = author_id);
