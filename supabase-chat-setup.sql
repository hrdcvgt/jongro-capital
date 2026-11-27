-- Run this once in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;
create table if not exists public.chat_conversations (
 id uuid primary key default gen_random_uuid(),
 customer_name text not null check (char_length(customer_name) between 1 and 40),
 token_hash text not null,
 status text not null default 'open' check (status in ('open','closed')),
 created_at timestamptz not null default now()
);
create table if not exists public.chat_messages (
 id bigint generated always as identity primary key,
 conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
 sender text not null check (sender in ('customer','admin')),
 message text not null check (char_length(message) between 1 and 2000),
 created_at timestamptz not null default now()
);
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
-- No anon/authenticated policies: all data access goes through protected server routes
-- using the Supabase service-role key, which must never be exposed to the browser.
