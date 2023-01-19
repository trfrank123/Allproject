create DATABASE C22_project4;
\c C22_project4;

create table education(
id serial primary key
,education_level varchar(20) NOT NULL
);

INSERT INTO education (education_level) VALUES ('初中或以下'), ('高中'), ('高級文憑，副學士'), ('學士'), ('碩士，深造文憑'), ('博士');

---------------

create table age (
id serial primary key
,age_range varchar (10) NOT NULL
);

INSERT INTO age (age_range) VALUES('14 - 18'), ('19 - 25'), ('26 -30'), ('31 - 35'), ('36 - 40'), ('41 - 45'), ('46 - 50'), ('51 - 55'), ('56 - 60');

---------------

create table job_function (
id serial primary key
,job_type varchar(50) NOT NULL
);

INSERT INTO job_function (job_type)
VALUES('學生'), ('農業、林業及漁業'), ('採礦及採石'), ('製造. 電力及燃氣供應'), ('自來水供應；污水處理、廢棄物管理及污染防治活動'), ('建造, 進出口貿易、批發及零售業'), ('運輸、倉庫、郵政及速遞服務'), ('住宿及膳食服務活動, 資訊及通訊'), ('金融及保險活動'), ('地產活動, 專業、科學及技術活動'), ('行政及支援服務活動'), 
('公共行政, 教育'), ('人類保健及社會工作活動'), ('藝術、娛樂及康樂活動'), ('其他服務活動'), ('家庭住戶內部工作活動'), ('享有治外法權的組織及團體活動');

---------------

create table budget_for_course (
id serial primary key
,budget_range varchar(20) NOT NULL
);

INSERT INTO budget_for_course (budget_range)
VALUES('不想透露'), ('$ 20,000 以下'), ('$ 20,001 - 40,000'), ('$ 40,001 - 60,000'), ('$ 60,001 - 80,000'), ('$ 80,001 - 10,0000'), ('$ 100,001 以上');

---------------
create table salary (
    id serial primary key
    ,salary_range varchar(20) NOT NULL
);

INSERT INTO salary (salary_range)
VALUES('$ 10,000 以下'), ('$ 10,001 - 15,000'), ('$ 15,001 - 20,000'), ('$ 20,001 - 25,000'), ('$ 25,001 - 30,000'), ('$ 30,001 - 35,000'), 
('$ 35,001 - 40,000'), ('$ 40,001 - 45,000'), ('$ 45,001 - 50,000'), ('$ 50,001 以上');

---------------

create table identity (
id serial primary key
,identity varchar(100) NOT NULL
);

INSERT INTO identity (identity)
VALUES('工作中'), ('在校'), ('即將畢業'), ('暫時空閒');

---------------

create table year_experience (
id serial primary key
,year_range varchar(100) NOT NULL
);

INSERT INTO year_experience (year_range)
VALUES('0 - 1 年'), ('1 - 3 年'), ('3 - 6 年'), ('6 - 9 年'), ('9 - 12 年'), ('12 - 15 年'), ('15 - 20 年'), ('20 年以上');

-------------
create table location (
id serial primary key
,area varchar(3)
,district varchar(4)
);

INSERT INTO location (area, district)
VALUES('港島', '中西區'), ('港島', '灣仔'),('港島', '東區'),('港島', '南區'),
('九龍', '油尖旺'),('九龍', '深水埗'), ('九龍', '九龍城'), ('九龍', '黃大仙'), ('九龍', '觀塘'), 
('新界', '葵青'), ('新界', '荃灣'), ('新界', '屯門'), ('新界', '元朗'), ('新界', '北區'), ('新界', '大埔'), ('新界', '沙田'), ('新界', '西貢'), ('新界', '離島');

--------------


create table "user" (
id serial primary key
,username varchar(50) unique
,password varchar(72)
,email varchar(50) NOT NULL
,work_experience integer NOT NULL
,education integer REFERENCES education(id)
,age integer REFERENCES age(id)
,job_function integer REFERENCES job_functions(id)
,budget_for_course integer REFERENCES budget_for_course(id)
,gender varchar(1) NOT NULL
,phone varchar(8)
,identity integer REFERENCES identity(id)
,score float
,number_of_rating integer
,icon varchar(255)
);

INSERT INTO "user" (username, password, email, work_experience, education, age, job_function, budget_for_course, gender, phone, identity, ideal_work_location, ideal_career1, ideal_career2, ideal_career3, expect_salary)
VALUES ('regene', '123123', 'regenech@gmail.com', 3, 4, 3, 6, 4, 'F', '33333333', 2, 5, 2, 3, 4, 3); 

-------------------------------
-- above already checked, no problem 
-------------------------------

create table career_path(
id serial primary key
,path_name varchar NOT NULL
,min_future_salary integer NOT NULL
,max_future_salary integer NOT NULL
);

INSERT INTO
VALUES()

---------------

create table image(
id serial primary key
,source varchar(100)
,name varchar(255)
);

create table course_education_requirement(
id serial primary key
,education_requirement varchar(100) NOT NULL
);

create table organization(
id serial primary key
,organization_name varchar(255) NOT NULL
,organization_hotline varchar(8) NOT NULL
,organization_hotline2 varchar(8) NOT NULL
,establishment_year varchar(4) NOT NULL
,address varchar(255) NOT NULL
);

create table language (
id serial primary key
,language varchar (50) NOT NULL
)

create table course_type (
id serial primary key
,type varchar (100) NOT NULL
)

create table courses (
id serial primary key
,price integer NOT NULL
,start_time date NOT NULL
,discription text NOT NULL
,career_path integer NOT NULL
,image integer FOREIGN KEY REFERENCES image(id)
,requirements integer FOREIGN KEY REFERENCES course_education_requirement(id)
,location varchar(200) NOT NULL
,study_period integer NOT NULL
,organization integer FOREIGN KEY REFERENCES organization(id)
,quota integer NOT NULL
,language integer FOREIGN KEY REFERENCES language(id)
,contact varchar(8) NOT NULL
,type integer FOREIGN KEY REFERENCES course_type(id)
);

