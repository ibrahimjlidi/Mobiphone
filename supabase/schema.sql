create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total_dzd integer not null check (total_dzd >= 0),
  shipping_dzd integer not null default 0 check (shipping_dzd >= 0),
  delivery_first_name text not null,
  delivery_last_name text not null,
  delivery_email text not null,
  delivery_address text not null,
  delivery_city text not null,
  delivery_phone text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id integer not null,
  product_name text not null,
  product_image text not null default '',
  unit_price_dzd integer not null check (unit_price_dzd >= 0),
  quantity integer not null check (quantity > 0)
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id integer not null,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.favorites enable row level security;

drop policy if exists "Users can view their profile" on public.profiles;
drop policy if exists "Users can update their profile" on public.profiles;
drop policy if exists "Users can view their orders" on public.orders;
drop policy if exists "Users can create their orders" on public.orders;
drop policy if exists "Users can cancel their pending orders" on public.orders;
drop policy if exists "Users can view their order items" on public.order_items;
drop policy if exists "Users can create their order items" on public.order_items;
drop policy if exists "Users can manage their favorites" on public.favorites;

create policy "Users can view their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view their orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can create their orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users can cancel their pending orders" on public.orders for update using (auth.uid() = user_id and status in ('pending', 'confirmed')) with check (auth.uid() = user_id and status = 'cancelled');
create policy "Users can view their order items" on public.order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can create their order items" on public.order_items for insert with check (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can manage their favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
