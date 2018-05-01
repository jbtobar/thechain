DROP DATABASE IF EXISTS thechain;
CREATE DATABASE thechain TEMPLATE template0;




\c thechain;


create table userbase (
  id serial primary key,
  username varchar(40) unique not null,
  passphrase varchar(200),
  creation_date timestamp,
  body jsonb
);

INSERT INTO userbase(username,passphrase,creation_date,body) 
VALUES ('testuser',
  'U2FsdGVkX1+wkQMWy7VKFsOzMmv2by7yZa1+TFaPklgb/uXPQBL1VcnZ1guxlDdH1WoLVYacUd/I4F1qfyM7+Ges86olA0yTg1roffLXQLg/vnHfdQ6qPvETCDsXGnYIO8o3iNPqwYBmpJJs1kM6UzRqNgmdMpoDrMs1frs4vU0=',
  current_timestamp,
  '{"exists":true,"username":"testuser","seedaddress":"3MzMwvrenZgDAoCkHqVcvgRZDi8yRYzcQvm","seedphrase":"U2FsdGVkX1+wkQMWy7VKFsOzMmv2by7yZa1+TFaPklgb/uXPQBL1VcnZ1guxlDdH1WoLVYacUd/I4F1qfyM7+Ges86olA0yTg1roffLXQLg/vnHfdQ6qPvETCDsXGnYIO8o3iNPqwYBmpJJs1kM6UzRqNgmdMpoDrMs1frs4vU0=","account_config":{"email":"yes@yesno.com","searchable":"false"}}'
);



SELECT data->>'name' AS name FROM cards

-- SELECT

CREATE TABLE epictable
(
    mytable_key    serial primary key,
    moobars        VARCHAR(40) not null,
    foobars        DATE
);




CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO pups (name, breed, age, sex)
  VALUES ('Tyler', 'Retrieved', 3, 'M');
