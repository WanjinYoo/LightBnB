INSERT INTO users (name, email, password) VALUES ('Wanjin','dksladjsla@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
,('wanwan','wanwan@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
,('wan','wan@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),('jin','jin@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active) VALUES (1,'beauty_house','dirty','good photo','bad photo',20,2,2,3,'CANADA','1120 Barclay st','VANCOUVER','BC','V2J1H9',true),(2, 'firehouse','very dirty','good photo','bad photo',30,1,1,1,'CANADA','1121 Barclay st','VANCOUVER','BC','V2J1H9',true)
,(3, 'coldhouse','very clean','good photo','bad photo',40,2,2,2,'CANADA','1122 Barclay st','VANCOUVER','BC','V2J1H9',true)
,(4, 'naturehouse','clean','good photo','bad photo',50,5,5,5,'CANADA','1123 Barclay st','VANCOUVER','BC','V2J1H9',false);

INSERT INTO reservations (start_date,end_date,property_id,guest_id) VALUES ('2012-01-01','2013-01-01',1,1)
,('2013-01-01','2014-01-01',2,2)
,('2014-01-01','2015-01-01',3,3)
,('2015-01-01','2016-01-01',4,4);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating) VALUES (1,1,1,1),(2,2,2,2),(3,3,3,3),(4,4,4,4)