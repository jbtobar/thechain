DROP DATABASE IF EXISTS thechain;
CREATE DATABASE thechain TEMPLATE template0;




\c thechain;


create table userbase (
  id serial primary key,
  username varchar(40) unique not null,
  passphrase varchar(200),
  address varchar(200),
  creation_date timestamp,
  body jsonb,
  organization jsonb
);

INSERT INTO userbase(username,passphrase,address,creation_date,body)
VALUES ('testuser',
  'U2FsdGVkX1+wkQMWy7VKFsOzMmv2by7yZa1+TFaPklgb/uXPQBL1VcnZ1guxlDdH1WoLVYacUd/I4F1qfyM7+Ges86olA0yTg1roffLXQLg/vnHfdQ6qPvETCDsXGnYIO8o3iNPqwYBmpJJs1kM6UzRqNgmdMpoDrMs1frs4vU0=',
  '3MzMwvrenZgDAoCkHqVcvgRZDi8yRYzcQvm',
  current_timestamp,
  '{"username":"testuser","account_config":{"email":"yes@yesno.com","searchable":"false"}}'
);


-- INSERT INTO userbase(username,passphrase,creation_date,body)
-- VALUES (username,encrypted,current_timestamp,  fdfds);
SELECT data->>'name' AS name FROM cards

SELECT body->>'passphrase' AS passphrase FROM userbase

SELECT passphrase FROM userbase WHERE username = 'testuser';

UPDATE userbase SET body->>'email' = 'Mora@mi' WHERE username='testuser';

UPDATE userbase
SET body = jsonb_set(body, '{email}', '"Mora@mi"', true),
body = jsonb_set(body, '{username}', '"fu"', true)
WHERE username='testuser';

update userbase set
  body = body || '{"city": "ottawa", "phone": "phonenum", "prefix": "prefixedName"}'
where number = 1;






SELECT *
FROM comments
WHERE session_id=1
  AND user_id in (10,11,12,13,14,15,16);


SELECT username
FROM userbase
WHERE address in ('3MzMwvrenZgDAoCkHqVcvgRZDi8yRYzcQvm',
     '3N2yczgEYMcMkuMCs52iBZfkCrPnSTRAoYw',
     '3MqWgNDKeJhA8poSfAgXvhEhKTSzYVwkqx9',
     '3MujfJGxKzRkDZ17BZ7KqSo3UhAxvNFyQfq' );








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
