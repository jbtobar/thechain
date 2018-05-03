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
  creator varchar(40),
  organization varchar(40),
  parties jsonb,
  body jsonb,
  creation_date timestamp
);



CREATE TABLE realtime(
  id serial not null primary key,
  sender varchar(40),
  reciever varchar(40),
  title varchar(200),
  message text,
  actions jsonb,
  confirmations jsonb,
  creation_date timestamp
);

INSERT INTO realtime(sender,reciever,title,message,creation_date)
VALUES ('testuser','dalio','invitation','invitation testorg',current_timestamp)

CREATE FUNCTION notify_realtime() RETURNS trigger
  LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM pg_notify('addedrecord', TG_TABLE_NAME || ',id,' || NEW.id||',' || NEW.sender||',' || NEW.reciever||',' || NEW.title||',' || NEW.message ||',' || NEW.actions ||',' || NEW.confirmations );
    RETURN NULL;
END;
$$;

CREATE trigger updated_realtime_trigger AFTER INSERT ON realtime
FOR EACH ROW EXECUTE PROCEDURE notify_realtime()

-------------------------------------------------------------------------
CREATE TABLE realtime(
    id SERIAL NOT NULL PRIMARY KEY,
    title character varying(128)
);

CREATE FUNCTION notify_realtime() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM pg_notify('addedrecord', NEW.title);
    RETURN NULL;
END;
$$;

CREATE TRIGGER updated_realtime_trigger AFTER INSERT ON realtime
FOR EACH ROW EXECUTE PROCEDURE notify_realtime();
-------------------------------------------------------------------------

INSERT INTO contractbase(creator,organization,parties,body,creation_date)
VALUES ('test')


INSERT INTO organizationbase(name,username,owners,members,body,creation_date)
VALUES (  )

INSERT INTO userbase(username,passphrase,address,creation_date,body)
VALUES ('testuser',
  'U2FsdGVkX1+wkQMWy7VKFsOzMmv2by7yZa1+TFaPklgb/uXPQBL1VcnZ1guxlDdH1WoLVYacUd/I4F1qfyM7+Ges86olA0yTg1roffLXQLg/vnHfdQ6qPvETCDsXGnYIO8o3iNPqwYBmpJJs1kM6UzRqNgmdMpoDrMs1frs4vU0=',
  '3MzMwvrenZgDAoCkHqVcvgRZDi8yRYzcQvm',
  current_timestamp,
  '{"username":"testuser","account_config":{"email":"yes@yesno.com","searchable":"false"}}'
);



SELECT members->>''
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


-- ---------------------------------------------------------
To add the value use the JSON array append opperator (||)

UPDATE jsontesting
SET jsondata = jsondata || '["newString"]'::jsonb
WHERE id = 7;
Removing the value looks like this

UPDATE jsontesting
SET jsondata = jsondata - "newString"
WHERE id = 7;
Concatenating to a nested field looks like this

UPDATE jsontesting
SET jsondata = jsonb_set(
  jsondata::jsonb,
  array['nestedfield'],
  (jsondata->'nestedfield')::jsonb || '["newString"]'::jsonb)
WHERE id = 7;
-- ---------------------------------------------------------
UPDATE jsontesting SET jsondata = (
    CASE
        WHEN jsondata IS NULL THEN '[]'::JSONB
        ELSE jsondata
    END
) || '["newString"]'::JSONB WHERE id = 7;


UPDATE userbase SET organization = (
    CASE
        WHEN organization IS NULL THEN '[]'::JSONB
        ELSE organization
    END
) || '["newString"]'::JSONB WHERE username = 'dalio';

UPDATE userbase SET organization = (CASE WHEN organization IS NULL THEN '[]'::JSONB ELSE organization END) || '["newString"]'::JSONB WHERE username = 'dalio';



UPDATE userbase
SET organization = organization - 'newString2'
WHERE username = 'dalio';










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
