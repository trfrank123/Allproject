create database project3;
\c project3

create table "users" (
id serial primary key
,username varchar(50) unique
,password_hash varchar(72)
,nickname varchar(50)
,email varchar(100)
,photo varchar(256)
);


INSERT INTO "users" (username, password_hash, nickname, email,photo) VALUES ('aaa', '123', 'abc', 'abc@gmail.com','photo');

create table rolexInfo (
id serial primary key
,image varchar(80)
,model varchar(70)
,year varchar(4)
,reference_number varchar(20) unique
,price_2018 money
,price_2020 money
,price_2022 money
);


INSERT INTO rolexInfo (image, model, year, reference_number, price_2018, price_2020, price_2022) 
VALUES ('Rolex+Air-King+ref.jpg', 'AirKing', '2016', '116900', '6200', '6450', '7450' ),
('m124270-0001_collection_upright_landscape.jpg', 'Explorer I', '2021', '124270', '0', '0', '7200' ),
('Rolex-214270-0003-ps-1300x1500.jpg', 'Explorer I', '2010', '214270', '6500', '6550', '0' ),
('Rolex+Explorer+Two-Tone+ref.jpg', 'Explorer I - Two-Tone', '2021', '124273', '0', '0', '11150' ),
('Rolex-ExplorerII-216570-White.jpg', 'Explorer II', '2011', '216570', '8100', '8350', '0' ),
('m226570-0002_modelpage_front_facing_landscape.jpg', 'Explorer II', '2021', '226570', '0', '0', '9500' ),
('m116400gv-0001_modelpage_front_facing_landscape.png', 'Milgauss', '2007', '116400 GV', '8200', '8500', '9150' ),
('Rolex-Milgauss-116400-GV-Blue-GV-Z.jpg', 'Milgauss', '2014', '116400 Z Blue', '8200', '8500', '9150' ),
('IMG_5685.jpg', 'Annv Submariner', '2003', '16610LV/126600LV', '6400', '9550', '9550' ),
('', 'Annv Gold GMT II', '2006', '116718LN', '33250', '33250', '39350' ),
('', 'Annv Stainless-Gold GMT II', '2008', '116713LN', '13000', '13000', '15250' ),
('', 'DateJust 41', '2016', '126300 Oyster', '7900', '7900', '7900' ),
('', 'SeaDweller 43', '2017', '126600', '11350', '11700', '12950' ),
('', 'SeaDweller DeepSea (DSSD)', '2008', '116660', '11350', '11700', '12950' ),
('', 'SeaDweller DeepSea (DSSD) - Two-tone', '2019', '126603', '0', '0', '17000' ),
('', 'SS/Plat Yacht Master', '2013', '116622', '12350', '12350', '12350' ),
('', 'Stainless & Gold Submariner', '2020', '126613', '9300', '14300', '14700' ),
('', 'Stainless Blue Dial White Gold Bezel Skydweller', '2018', '326934', '14400', '14800', '15200' ),
('', 'Stainless DateJust', '2004', '116200', '7350', '7350', '7600' ),
('', 'Stainless DateJust II - 41mm Oyster', '2010', '116334', '9350', '9350', '10000' ),
('', 'Stainless DateJust II - 41mm Oyster Two-Tone', '2010', '116333', '12700', '12700', '13550' ),
('', 'Stainless Daytona Ceramic', '2016', '116500', '12400', '13150', '14550' ),
('', 'Stainless GMT II', '2018', '126710 BLNR/BRLO', '9250', '9700', '10550' ),
('', 'Stainless GMT II', '2022', '126720VTNR', '0', '0', '11050' ),
('', 'Stainless Submariner Date', '2010', '116610N', '8500', '9500', '10100' ),
('', 'Steel & Gold Datejust TT', '2005', '116233 Jubilee', '10900', '13250', '13550' ),
('', 'Submariner (no date)', '2012', '114060/124060', '7500', '8100', '8950' ),
('', 'White Gold Day-Date Presidential', '2008', '218239/228239', '37550', '39250', '40350' ),
('', 'White Gold Daytona', '2006', '116509', '37450', '39350', '40450' ),
('', 'White Gold GMT', '2014', ' 116719/126719', '36750', '38250', '41600' ),
('', 'Yacht Master 42 - White Gold-OysterFlex', '2022', '226659', '0', '0', '29650' ),
('', 'Yacht Master 42 - Yellow Gold-OysterFlex', '2022', '226658', '0', '0', '28300' ),
('', 'Yacht Master II - Steel', '2021', '116680', '0', '0', '18750' ),
('', 'Yellow Gold Day-Date Presidential 40', '2011', '218238/228238', '34850', '36650', '37450' ),
('', '18k Everose Skydweller', '2016', '326935', '48850', '49950', '49950' ),
('', '18K EveroseLady DateJust - 179165', '2002', '179165', '26050', '26050', '27650' ),
('', '18K Gold Skydweller', '2020', '326238', '0', '41500', '41500' ),
('', '18K Lady DateJust', '2001', '179168', '20600', '20600', '25250' ),
('', '18K Submariner', '2009', '116618', '34250', '36950', '37950' ),
('', '18K Submariner', '2015', '116619', '36850', '38350', '40650' ),
('', '18k Yellow Gold Skydweller 326938', '2014', '326938', '38150', '46650', '46750' )
;


create table suggestion (
id serial primary key
,user_id integer NOT NULL references "users"(id)
,suggestion varchar(300)
,date timestamp
);