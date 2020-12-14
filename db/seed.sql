drop table if exists puppygram_user2;

create table puppygram_user2 (
  puppygram_user_id serial primary key,
  username varchar(15),
  hash varchar(500),
  is_admin boolean
);