-- initialize start --t
CREATE TABLE "skill"(
    "id" SERIAL primary key,
    "type" VARCHAR(255) NOT NULL
);

CREATE TABLE "request"(
    "id" SERIAL primary key,
    "post_user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "detail" VARCHAR(255) NOT NULL,
    "reward" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITH TIME zone NOT NULL,
    "modified_at" TIMESTAMP(0) WITH TIME zone NULL,
    "start_time" TIMESTAMP(0) WITH TIME zone NOT NULL,
    "deadline" TIMESTAMP(0) WITH TIME zone NOT NULL,
    "require_worker" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "is_accepted" BOOLEAN NOT NULL,
    "is_completed" BOOLEAN NOT NULL
);

CREATE TABLE "users"(
    "id" SERIAL primary key,
    "created_at" TIMESTAMP(0) WITH TIME zone NOT NULL,
    "modified_at" TIMESTAMP(0) WITH TIME zone NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NULL,
    "email" VARCHAR(255) NULL,
    "phone" INTEGER NULL,
    "profile_image" VARCHAR(255) NULL,
    "skill" VARCHAR(255) NULL,
    "is_employer" BOOLEAN NOT NULL,
    "is_admin" BOOLEAN NULL,
    "accept_marketing" BOOLEAN NULL
);

CREATE TABLE "messenger"(
    "id" SERIAL primary key,
    "chat_message" VARCHAR(255) NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "is_read" BOOLEAN NULL
);

CREATE TABLE "freelancer_relationship"(
    "id" SERIAL primary key,
    "user_id" INTEGER NOT NULL,
    "request_id" INTEGER NOT NULL
);

CREATE TABLE "skill_relationship"(
    "id" SERIAL primary key,
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL
);

CREATE TABLE "bookmark"(
    "id" SERIAL primary key,
    "user_id" INTEGER NOT NULL,
    "request_id" INTEGER NOT NULL
);

CREATE TABLE "rating"(
    "id" SERIAL primary key,
    "rate_to_user_id" INTEGER NOT NULL,
    "rate_from_user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(0) WITH TIME zone NOT NULL,
    "score" INTEGER NOT NULL
);

CREATE TABLE "report_problem"(
    "id" SERIAL primary key,
    "request_id" INTEGER NOT NULL,
    "report_from_user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(0) WITH TIME zone NOT NULL
);

CREATE TABLE "category"(
    "id" SERIAL primary key,
    "type" VARCHAR(255) NOT NULL
);

ALTER TABLE
    "request"
ADD
    CONSTRAINT "request_post_user_id_foreign" FOREIGN KEY("post_user_id") REFERENCES "users"("id");

ALTER TABLE
    "request"
ADD
    CONSTRAINT "request_skill_id_foreign" FOREIGN KEY("skill_id") REFERENCES "skill"("id");

ALTER TABLE
    "request"
ADD
    CONSTRAINT "request_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("id");

ALTER TABLE
    "messenger"
ADD
    CONSTRAINT "messenger_sender_id_foreign" FOREIGN KEY("sender_id") REFERENCES "users"("id");

ALTER TABLE
    "freelancer_relationship"
ADD
    CONSTRAINT "freelancer_relationship_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

ALTER TABLE
    "freelancer_relationship"
ADD
    CONSTRAINT "freelancer_relationship_request_id_foreign" FOREIGN KEY("request_id") REFERENCES "request"("id");

ALTER TABLE
    "skill_relationship"
ADD
    CONSTRAINT "skill_relationship_skill_id_foreign" FOREIGN KEY("skill_id") REFERENCES "skill"("id");

ALTER TABLE
    "skill_relationship"
ADD
    CONSTRAINT "skill_relationship_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

ALTER TABLE
    "bookmark"
ADD
    CONSTRAINT "bookmark_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");

ALTER TABLE
    "bookmark"
ADD
    CONSTRAINT "bookmark_request_id_foreign" FOREIGN KEY("request_id") REFERENCES "request"("id");

ALTER TABLE
    "rating"
ADD
    CONSTRAINT "rating_rate_to_user_id_foreign" FOREIGN KEY("rate_to_user_id") REFERENCES "users"("id");

ALTER TABLE
    "rating"
ADD
    CONSTRAINT "rating_rate_from_user_id_foreign" FOREIGN KEY("rate_from_user_id") REFERENCES "users"("id");

ALTER TABLE
    "report_problem"
ADD
    CONSTRAINT "report_problem_request_id_foreign" FOREIGN KEY("request_id") REFERENCES "request"("id");

ALTER TABLE
    "report_problem"
ADD
    CONSTRAINT "report_problem_report_from_user_id_foreign" FOREIGN KEY("report_from_user_id") REFERENCES "users"("id");

-- end --
-- sample data start --
insert into
    "users" (created_at, username, password, is_employer)
values
    (
        '2022-09-08 16:03:06.06774+08',
        'testFreelancer',
        'testFreelancer',
        false
    );

insert into
    "users" (created_at, username, password, is_employer)
values
    (
        '2022-09-08 16:03:06.06774+08',
        'testEmployer',
        'testEmployer',
        true
    );

insert into
    "category" (type)
values
    ('normal');

insert into
    "category" (type)
values
    ('urgent');

insert into
    "category" (type)
values
    ('infinite');

insert into
    "skill" (type)
values
    ('html');

insert into
    "skill" (type)
values
    ('css');

insert into
    "skill" (type)
values
    ('js');

insert into
    "request" (
        post_user_id,
        category_id,
        skill_id,
        title,
        detail,
        reward,
        created_at,
        start_time,
        deadline,
        require_worker,
        is_deleted,
        is_accepted,
        is_completed
    )
values
    (
        2,
        1,
        1,
        'htmlJob',
        'htmlDetail',
        100,
        '2022-09-08 16:03:06.06774+08',
        '2022-09-08 16:03:06.06774+08',
        '2022-09-09 16:03:06.06774+08',
        1,
        false,
        false,
        false
    );

insert into
    "request" (
        post_user_id,
        category_id,
        skill_id,
        title,
        detail,
        reward,
        created_at,
        start_time,
        deadline,
        require_worker,
        is_deleted,
        is_accepted,
        is_completed
    )
values
    (
        2,
        2,
        2,
        'cssJob',
        'cssDetail',
        200,
        '2022-09-08 16:03:06.06774+08',
        '2022-09-08 16:03:06.06774+08',
        '2022-09-09 16:03:06.06774+08',
        1,
        false,
        false,
        false
    );

insert into
    "request" (
        post_user_id,
        category_id,
        skill_id,
        title,
        detail,
        reward,
        created_at,
        start_time,
        deadline,
        require_worker,
        is_deleted,
        is_accepted,
        is_completed
    )
values
    (
        2,
        3,
        3,
        'jsJob',
        'jsDetail',
        300,
        '2022-09-08 16:03:06.06774+08',
        '2022-09-08 16:03:06.06774+08',
        '2022-09-09 16:03:06.06774+08',
        1,
        false,
        false,
        false
    );

insert into
    "skill_relationship" (user_id, skill_id)
values
    (1, 1);

insert into
    "skill_relationship" (user_id, skill_id)
values
    (1, 2);

insert into
    "skill_relationship" (user_id, skill_id)
values
    (1, 3);

insert into
    "freelancer_relationship" (user_id, request_id)
values
    (1, 1);

-- end --
-- add date of birth to users, add back the value to sample users start --
ALTER TABLE
    "users"
ADD
    COLUMN date_of_birth date;

UPDATE
    "users"
SET
    date_of_birth = '2000-01-01'
WHERE
    id = 1;

UPDATE
    "users"
SET
    date_of_birth = '2000-01-01'
WHERE
    id = 2;

ALTER TABLE
    "users"
ALTER COLUMN
    date_of_birth
SET
    NOT NULL;

-- end --
-- amend according to Dennis comment start --
ALTER TABLE
    "users" DROP COLUMN skill;

alter table
    "request"
alter column
    deadline DROP NOT NULL;

ALTER TABLE
    "request"
ADD
    "location" varchar(255);

ALTER TABLE
    "freelancer_relationship"
ADD
    is_confirmed boolean;

UPDATE
    "freelancer_relationship"
SET
    is_confirmed = false
WHERE
    id = 1;

ALTER TABLE
    "freelancer_relationship"
ALTER COLUMN
    is_confirmed
SET
    NOT NULL;

insert into
    "freelancer_relationship" (user_id, request_id, is_confirmed)
values
    (1, 2, false);

-- end --
-- 2022-09-09 --
-- add bookmark sample data--
insert into
    "bookmark" (user_id, request_id)
values
    (1, 1);

-- end --
-- rename freelancer_relationship column name to status
ALTER TABLE
    freelancer_relationship RENAME COLUMN is_confirmed TO status;

-- 1 > freelancer want to get the post, but employer not yet decide
-- 2 > employer confirm the freelancer
-- 3 > employer reject the freelancer
ALTER TABLE
    freelancer_relationship DROP COLUMN status;

ALTER TABLE
    freelancer_relationship
ADD
    COLUMN status integer;

UPDATE
    "freelancer_relationship"
SET
    status = 1
WHERE
    id = 1;

UPDATE
    "freelancer_relationship"
SET
    status = 2
WHERE
    id = 2;

-- end
-- rename freelancer_relationship column user_id 
ALTER TABLE
    freelancer_relationship RENAME COLUMN user_id TO freelancer_user_id;

-- end
-- 2022-09-13 --
-- add time for request's delete, accept, complete
ALTER TABLE
    request
ADD
    COLUMN deleted_time TIMESTAMP with time zone;

ALTER TABLE
    request
ADD
    COLUMN accepted_time TIMESTAMP with time zone;

ALTER TABLE
    request
ADD
    COLUMN completed_time TIMESTAMP with time zone;

-- end
-- change freelancer_relationship column  status to varchar
ALTER TABLE
    freelancer_relationship DROP COLUMN status;

ALTER TABLE
    freelancer_relationship
ADD
    COLUMN status varchar(255);

UPDATE
    "freelancer_relationship"
SET
    status = 'applied'
WHERE
    id = 1;

UPDATE
    "freelancer_relationship"
SET
    status = 'confirmed'
WHERE
    id = 2;

-- end
-- update sample request working location
UPDATE
    request
SET
    location = 'home'
WHERE
    id < 4;

-- end
-- update sample employer nickname
UPDATE
    users
SET
    nickname = 'sampleEmployerName'
WHERE
    id = 2;

-- end
-- add users intro, last login time, login attempt count
ALTER TABLE
    users
ADD
    COLUMN intro varchar(255);

ALTER TABLE
    users
ADD
    COLUMN last_login_time TIMESTAMP with time zone;

ALTER TABLE
    users
ADD
    COLUMN attempt integer;

-- end
-- add more sample to TABLE skill_relationship
insert into
    skill_relationship (user_id, skill_id)
values
    (2, 1);

insert into
    skill_relationship (user_id, skill_id)
values
    (2, 2);

--end
-- add more detail to sample freelancer
UPDATE
    users
SET
    nickname = 'freelancerNo1',
    email = 'test@gmail.com',
    phone = '99934567',
    profile_image = 'testImage.jpg',
    intro = 'I am the best freelancer in the world'
WHERE
    id = 1;

--end
-- update sample request to make the employer management page
UPDATE
    request
SET
    is_accepted = true
WHERE
    id = 1;

UPDATE
    request
SET
    is_accepted = true,
    is_completed = true
WHERE
    id = 2;

--end
-- 2022-09-14
-- delete is_employer column
ALTER TABLE
    users DROP COLUMN is_employer;

-- end
-- users intro cannot be null
UPDATE
    users
SET
    intro = 'I am the goodest boss'
WHERE
    id = 2;

ALTER TABLE
    "users"
ALTER COLUMN
    intro
SET
    NOT NULL;

-- end
-- 2022-09-15
-- a column as password_hash
alter table
    users
add
    password_hash varchar(255);

-- end
-- temp set date of birth can null 
alter table
    "users"
alter column
    date_of_birth DROP NOT NULL;

-- end
-- temp set intro can null 
alter table
    "users"
alter column
    intro DROP NOT NULL;

-- end
-- 2022-09-16
-- add request image
alter table
    request
add
    request_image varchar(255);

--end
--2022-09-16
-- add location area TABLE
CREATE TABLE "location" (
    "id" SERIAL primary key,
    "area" VARCHAR(255) NOT NULL
);

-- insert area to location area table
insert into
    "location" (area)
values
    ('HK');

insert into
    "location" (area)
values
    ('NT');

insert into
    "location" (area)
values
    ('KL');

insert into
    "location" (area)
values
    ('home');

-- add column location area in request table
ALTER TABLE
    "request"
add
    column location_area_id INTEGER;

UPDATE
    "request"
SET
    location_area_id = 1
where
    id = 1;

UPDATE
    "request"
SET
    location_area_id = 2
where
    id = 2;

UPDATE
    "request"
SET
    location_area_id = 3
where
    id = 3;

ALTER TABLE
    "request"
ALTER column
    location_area_id
SET
    NOT NULL;

ALTER TABLE
    "request"
ADD
    CONSTRAINT "request_location_area_id_foreign" FOREIGN KEY("location_area_id") REFERENCES "location"("id");

--end
--2022-09-18
-- add skill type
insert into
    skill (type)
values
    ('photography'),
    ('teaching'),
    ('cleaning'),
    ('cooking'),
    ('shopping'),
    ('finding'),
    ('repairing'),
    ('programming');

-- end
--2022-09-19
-- change required worker to can null
alter table
    "request"
alter column
    require_worker DROP NOT NULL;

-- end
-- rewrite the column name of accept job
alter table
    request RENAME COLUMN is_accepted TO is_applied;

alter table
    request
ADD
    COLUMN is_accepted boolean;

--end
-- change post detail to varchar
ALTER TABLE
    request
ALTER COLUMN
    detail TYPE varchar;

--end
-- alter existing sample data to fit the new skill type
UPDATE
    "request"
SET
    skill_id = 11
where
    id > 0;

UPDATE
    "skill_relationship"
SET
    skill_id = 11
where
    id > 0;

--end
-- delete sample skill
DELETE FROM
    skill
WHERE
    id < 4;

--end 
alter table
    messenger
add
    column request_id integer;

ALTER TABLE
    "messenger"
ADD
    CONSTRAINT "messenger_request_id_foreign" FOREIGN KEY("request_id") REFERENCES "request"("id");

-- 2022-09-21 --
-- 
UPDATE
    "request"
SET
    detail = '{"content":"<p><em>test content</em> is <u>here</u></p>"}'
WHERE
    id > 0;

--end