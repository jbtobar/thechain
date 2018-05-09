DROP DATABASE IF EXISTS thechain;
CREATE DATABASE thechain;
CREATE USER thechainuser WITH PASSWORD 'th3ch@1nUz3r';

ALTER ROLE thechainuser SET client_encoding TO 'utf8';
ALTER ROLE thechainuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE thechainuser SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE thechain TO thechainuser;

\c thechain;

create table userbase (
  id serial primary key,
  username varchar(40) unique not null,
  passphrase varchar(200),
  address varchar(200),
  ethaddress varchar(200),
  btcaddress varchar(200),
  creation_date timestamp,
  body jsonb,
  organization jsonb
);

CREATE TABLE txbase (
  id serial primary key,
  transactionid varchar(200),
  body jsonb,
  creation_date timestamp
);

CREATE TABLE organizationbase (
id serial primary key,
username varchar(40) unique not null,
name varchar(200),
owners jsonb,
members jsonb,
body jsonb,
creation_date timestamp
);


CREATE TABLE contractbase (
id serial primary key,
body varchar(200),
creation_date timestamp
);

CREATE TABLE contractlog (
id serial primary key,
body jsonb
)

\q
