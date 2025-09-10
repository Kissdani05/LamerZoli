-- Add optional SWS ID field to registrations
begin;
alter table if exists public.registrations
  add column if not exists sws_id text;
commit;
