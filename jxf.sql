SET NAMES UTF8;
drop database if exists jfx;
create database jfx charset=utf8;
use jfx;
create table user(
    uid int primary key not null auto_increment,
    uname varchar(32),
    email varchar(32),
    upwd  varchar(32),
    sex  char(4),
    balance varchar(250)
);

create table user_address(
    address_id int primary key not null auto_increment,
    uid int,
    username varchar(32),
    addressname varchar(32),
    cityname varchar(32),
    address varchar(32),
    address_state  char(4),
    phone  varchar(32) 
);

create table collect(
    cid int primary key not null auto_increment,
    uid int,
    pid int,
    p_color varchar(10),
    p_size varchar(10),
    wid int
);

create table product(
    pid int primary key not null auto_increment,
    b_order varchar(10),
    s_order varchar(10),
    p_sex char(4),
    p_title varchar(32),
    p_info varchar(100),
    p_num varchar(32),
    p_cz varchar(32),
    p_price varchar(32),
    p_color varchar(10),
    picadd varchar(1000),
    up_date varchar(32)
);

create table warehouse(
    wid int primary key not null auto_increment,
    pid int,
    p_color varchar(10),
    p_size varchar(10),
    p_save varchar(20)
);
create table dd(
    ddid int primary key not null auto_increment,
    address_id int,
    uid int,
    pid int,
    p_color varchar(10),
    p_size varchar(10)
);